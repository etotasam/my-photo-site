import * as functions from "firebase-functions";
// @ts-ignore
import express from "express"
const router = require("./routers/route")

import * as addImageUrl from "./addImage"
import * as deleteImageUrl from "./deleteImage"

const app = express()

app.use(`/`, router)

export const addImage = { ...addImageUrl }
export const deleteImage = { ...deleteImageUrl }
export const api = functions.region(`asia-northeast1`).https.onRequest(app)