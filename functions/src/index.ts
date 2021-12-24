import * as functions from "firebase-functions";
import * as express from "express"
import * as router from "./routers/route"

import * as addImageUrl from "./addImage"
import * as deleteImageUrl from "./deleteImage"

const app = express()
// @ts-ignore
app.use(`/`, router)

export const addImage = { ...addImageUrl }
export const deleteImage = { ...deleteImageUrl }
export const api = functions.region(`asia-northeast1`).https.onRequest(app)