import * as express from "express"
import * as admin from "firebase-admin"
const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
const router = express.Router()

router
  .route(`/locations`)
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
      res.set("Access-Control-Allow-Origin", "*");
      res.set('Access-Control-Allow-Methods', 'GET');
      res.json(locations)
    } catch (error) {
      console.log(error);
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


module.exports = router