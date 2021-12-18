import * as functions from "firebase-functions";
// @ts-ignore
import express from "express"
import * as router from "./routers/route"
import * as admin from "firebase-admin"
import imageSize from 'image-size';
import axios from 'axios';

const db = admin.firestore()
const app = express()
// @ts-ignore
app.use(`/`, router)
const FieldValue = admin.firestore.FieldValue


export const api = functions.region(`asia-northeast1`).https.onRequest(app)

export const addImageUrl = functions.region(`asia-northeast1`).storage.object().onFinalize(async (obj) => {
  const root = obj.name as string
  const rootChunk = root.split(`/`)
  const topCollection = rootChunk[0]
  const photoLabel = rootChunk[1]
  const fileName = rootChunk[2]

  // imagesコレクションにフォルダを追加した場合の処理
  try {
    if (obj.contentType?.match(/application\/x-www-form-urlencoded/)) {
      if (topCollection !== `images`) throw new Error(`imagesじゃないところに入れてるよ`)
      await db.collection(topCollection).doc(photoLabel).set({
        id: 0
      })
      functions.logger.log(`フォルダの追加完了`, root)
    }
  } catch (error) {
    functions.logger.log(error)
  }

  // imagesコレクション内にimage/jpegを追加した場合の処理
  try {
    if (!obj.contentType?.match(/image\//)) return
    if (topCollection !== `images`) throw new Error(`imagesに入れて下さい`)
    const imageUrl = `https://storage.googleapis.com/${obj.bucket}/${obj.name}`
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${obj.bucket}/o/${topCollection}%2F${photoLabel}%2F${fileName}?alt=media`

    // 画像のwidth heightを取得
    const { data: res } = await axios.get(firebaseUrl, { responseType: 'arraybuffer' })
    const img = imageSize(res as string)

    // const res = await fetch(firebaseUrl, { responseType: 'arraybuffer' })

    // transactionでidをuniqueな値(連番の数字)にする
    const photoLabelDocRef = db.collection(topCollection).doc(photoLabel)
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(photoLabelDocRef)

      // idの連番をインクリメント
      const newId: number = (doc.data() && doc.data()!.id || 0) + 1
      transaction.update(photoLabelDocRef, { id: newId })

      const chunkFileName = fileName.split(`.`)
      const fileNameWithoutExt = chunkFileName[0]
      await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).set({
        id: `${photoLabel}_${newId}`,
        filename: fileName,
        width: img.width,
        height: img.height,
        url: imageUrl,
        createAt: FieldValue.serverTimestamp()
      })
    })
    functions.logger.log(`${photoLabel}フォルダへ${fileName}の追加が完了`)
  } catch (error) {
    functions.logger.log(`imageの追加が出来ませんでした`, error)
  }
})

export const deleteImageUrl = functions.region(`asia-northeast1`).storage.object().onDelete(async (obj) => {
  try {
    const filePath = obj.name
    const chunkFilePath = filePath!.split(`/`)
    const topCollection = chunkFilePath[0]
    const photoLabel = chunkFilePath[1]
    const fileName = chunkFilePath[2]
    const chunkFileName = fileName.split(`.`)
    const fileNameWithoutExt = chunkFileName[0]
    if (topCollection !== `images`) return
    // imagesコレクション内でディレクトリが削除された場合
    if (obj.contentType?.match(/application\/x-www-form-urlencoded/)) {
      await db.collection(topCollection).doc(photoLabel).delete()
      functions.logger.log(`${topCollection}/${photoLabel}を削除しました`)
    }
    // imagesコレクション内でimageオブジェクトが削除された場合
    if (obj.contentType?.match(/image\//)) {
      await db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`).delete();
    }

  } catch (error) {
    functions.logger.log('deleteImageUrlのエラー', error);
  }
})