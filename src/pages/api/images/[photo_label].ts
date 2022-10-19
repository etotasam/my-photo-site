import { allImagesByTestData } from "../all_images"

const fetchImagesByLocationApi = (req, res) => {
  const { photo_label } = req.query
  res.status(200).json(allImagesByTestData[photo_label])
}

export default fetchImagesByLocationApi