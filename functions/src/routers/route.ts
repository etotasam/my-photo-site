import * as express from "express"
// import * as express from "express"
// import * as admin from "firebase-admin"
import * as admin from "firebase-admin"
const serviceAccount = require("../../serviceAccountKey.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
const router = express.Router()

router
  .route(`/locations`)
  .get(async (req, res) => {
    // const all = req.params.all
    const all = req.query.all
    try {
      const imagesRef = db.collection(`images`)
      const snapshot = await imagesRef.get()
      let locations: string[] = []
      let promises: Promise<void>[] = []
      if (snapshot) {
        snapshot.forEach((doc) => {
          if (all == "true") {
            locations = [...locations, doc.id]
          }
          //? 中身(imgeデータ)があるドキュメントIDだけ取得する
          if (all == "false") {
            promises.push(
              new Promise<void>((resolve) => {
                db.collection(`images`).doc(doc.id).collection("photos").get().then(ref => {
                  if (ref.docs.length) {
                    locations.push(doc.id)
                  }
                  resolve()
                })
              })
            )
          }
        })
        if (promises.length) {
          await Promise.all(promises)
        }
        res.set("Access-Control-Allow-Origin", "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.json(locations)
      }
    } catch (error) {
      console.error(error);
    }
  })


router
  .route(`/all_images`)
  .get(async (req, res) => {
    try {
      const imagesRef = db.collection(`images`)
      const snapshot = await imagesRef.get()
      let locations: string[] = []
      if (snapshot) {
        snapshot.forEach(doc => {
          locations.push(doc.id)
        })
      }
      let allImages = {}
      await Promise.all(locations.map(async location => {
        const locationRef = db.collection(`images`).doc(location).collection(`photos`)
        const snapshot = await locationRef.get()
        let images: any[] = []
        if (snapshot) {
          snapshot.forEach(doc => {
            images.push({ documentId: doc.id, ...doc.data() })
          })
        }
        allImages = { ...allImages, [location]: images }
      }))
      res.json(allImages)

    } catch (error) {
      console.error(error);
    }
  })


router
  .route(`/images/:location`)
  .get(async (req, res) => {
    const { location } = req.params
    try {
      const snapshoto = await db.collection(`images`).doc(location).collection(`photos`).orderBy(`createAt`, `desc`).get()
      let images: any[] = []
      snapshoto.forEach(doc => {
        images.push({
          documentId: doc.id,
          ...doc.data()
        })
      })
      res.json(images)
    } catch (error) {
      console.error(error)
    }
  })


module.exports = router;