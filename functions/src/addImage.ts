import * as functions from "firebase-functions";
import { Storage } from "@google-cloud/storage"
import * as sharp from "sharp"
import * as path from "path"
import * as os from "os"
import imageSize from 'image-size';
import * as admin from "firebase-admin"

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue


export const addImageUrl = functions.region(`asia-northeast1`).storage.object().onFinalize(async (object) => {
  const filePath = object.name as string
  const contentType = object.contentType;
  const fileDir = path.dirname(filePath)
  const fileName = path.basename(filePath)
  const PREFIX = `resize_`
  // リサイズ済ファイルが登録された時に弾く
  if (fileName.startsWith(PREFIX)) {
    functions.logger.log(`リサイズは完了しています`)
    return
  }
  const topCollection = fileDir.split(`/`)[0]
  const photoLabel = fileDir.split(`/`)[1]

  const storage = new Storage();
  const bucket = storage.bucket(object.bucket);
  const file = bucket.file(filePath);
  const metadata = { contentType };

  // imagesコレクションにフォルダを追加した場合の処理
  try {
    if (object.contentType?.match(/application\/x-www-form-urlencoded/)) {
      if (topCollection !== `images`) throw new Error(`imagesじゃないところに入れてるよ`)
      await db.collection(topCollection).doc(photoLabel).set({
        id: 0
      })
      functions.logger.log(`フォルダの追加完了`, filePath)
    }
  } catch (error) {
    functions.logger.log(error)
  }

  // imagesコレクション内にimage/jpegを追加した場合の処理
  try {
    if (!object.contentType?.match(/image\//)) return
    if (topCollection !== `images`) throw new Error(`imagesに入れて下さい`)

    // 一時保存用ファイルパスの作成
    const tempFile = path.join(os.tmpdir(), filePath.split('/').pop()!);
    // リサイズ完了ファイルの一時保存パスの作成
    const resizeFilePath = path.normalize(path.join(fileDir, `${PREFIX}${fileName}`));
    const tempResizeFile = path.join(os.tmpdir(), resizeFilePath.split('/').pop()!);
    await file.download({ destination: tempFile })
    const img = imageSize(tempFile as string)


    let registerFilename = fileName
    const maxLongSide = 1050
    const isLargerFile = Math.max(img.width!, img.height!) > maxLongSide
    if (isLargerFile) {
      registerFilename = `${PREFIX}${fileName}`
      let maxWidth: number | null = null
      let maxHeight: number | null = null
      if (img.width! > img.height!) {
        maxWidth = Math.min(maxLongSide, img.width!)
      } else {
        maxHeight = Math.min(maxLongSide, img.height!)
      }
      // ファイルのリサイズ
      await sharp(tempFile).resize(maxWidth, maxHeight).toFile(tempResizeFile).catch(() => {
        functions.logger.log(`リサイズに失敗しました`)
      })
      // リサイズ前のファイルの削除
      await file.delete().catch(() => functions.logger.log(`リサイズ前のimageの削除に失敗しました`))
      // リサイズ済ファイルをstorageに追加
      await bucket.upload(tempResizeFile, { destination: path.join(fileDir, registerFilename), metadata }).catch(() => {
        functions.logger.log(`リサイズ済のファイル保存に失敗しました`)
      })
    }

    // transactionでidをuniqueな値(連番の数字)にする
    const photoLabelDocRef = db.collection(topCollection).doc(photoLabel)
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(photoLabelDocRef)

      // idの連番をインクリメント
      const newId: number = (doc.data() && doc.data()!.id || 0) + 1
      transaction.update(photoLabelDocRef, { id: newId })

      const registerImg = imageSize(isLargerFile ? tempResizeFile : tempFile)
      const fileNameWithoutExt = registerFilename.split(`.`)[0]
      const registerFilePath = path.join(fileDir, registerFilename)
      const imageSrcOnGCP = `https://storage.googleapis.com/${object.bucket}/${registerFilePath}`
      await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).set({
        id: `${photoLabel}_${newId}`,
        filename: registerFilename,
        width: registerImg.width,
        height: registerImg.height,
        url: imageSrcOnGCP,
        createAt: FieldValue.serverTimestamp()
      })
    })
    functions.logger.log(`${registerFilename}の情報をfirestoreへ追加しました`)
  } catch (error) {
    functions.logger.log(`imageデータをfirestoreに追加が出来ませんでした`, error)
  }
})