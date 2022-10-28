import { allImagesByTestData } from "./all_images"

const locationNames = Object.keys(allImagesByTestData).map(locName => {
  if (allImagesByTestData[locName].length) {
    return locName
  }
}).filter(el => el !== undefined)

const fetchLocationNamesApi = (req, res) => {
  const all = req.query.all
  // console.log("all", all);
  res.status(200).json(locationNames)
}

export default fetchLocationNamesApi