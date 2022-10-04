import * as functions from "firebase-functions";
import * as path from "path"
import * as admin from "firebase-admin"

const db = admin.firestore()


export const deleteImageUrl = functions.region(`asia-northeast1`).storage.object().onDelete(async (object) => {
  try {
    const filePath = object.name
    //? 削除対象のあるディレクトリ
    const fileDir = path.dirname(filePath!)
    //? 削除対象のファイル、フォルダの名前
    const fileName = path.basename(filePath!)
    const topCollection = fileDir.split(`/`)[0]
    const photoLabel = fileDir.split(`/`)[1]
    const fileNameWithoutExt = fileName.split(`.`)[0]
    if (topCollection !== `images`) return
    //? imagesコレクション内でディレクトリが削除された場合
    if (object.contentType?.match(/application\/x-www-form-urlencoded/)) {
      functions.logger.log("fileName", fileName);
      functions.logger.log("photoLabel", photoLabel);
      await db.collection(topCollection).doc(photoLabel).delete()
    }

    const imageDataSrc = db.collection(topCollection).doc(photoLabel).collection(`photos`).doc(`${photoLabel}_${fileNameWithoutExt}`);
    const imageData = await imageDataSrc.get();
    if (!imageData.exists) return
    // imagesコレクション内でimageオブジェクトが削除された場合
    if (object.contentType?.match(/image\//)) {
      await imageDataSrc.delete();
      functions.logger.log(`firestoreの${fileDir}から${fileNameWithoutExt}を削除しました`)
    }

  } catch (error) {
    functions.logger.log('deleteImageUrlのエラー', error);
  }
})