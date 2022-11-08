import { allImagesByTestData } from "./all_images"

const locationNames = Object.keys(allImagesByTestData).map(locName => {
  if (allImagesByTestData[locName].length) {
    return locName
  }
}).filter(el => el !== undefined)

const fetchLocationNamesApi = (_, res) => {
  res.status(200).json(locationNames)
}

export default fetchLocationNamesApi