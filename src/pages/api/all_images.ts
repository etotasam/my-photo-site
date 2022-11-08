
const fetchAllImages = (req, res) => {
  res.status(200).json(allImagesByTestData)
}

export default fetchAllImages


export const allImagesByTestData = {
  egypt: [
    {
      createAt: new Date(),
      filename: "img_1.jpg",
      height: 700,
      width: 1050,
      id: "egypt_1",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/egypt/_MG_5721.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_2.jpg",
      height: 1050,
      width: 700,
      id: "egypt_2",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/egypt/_MG_6327.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_3.jpg",
      height: 1050,
      width: 700,
      id: "egypt_3",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/egypt/_MG_5531.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_4.jpg",
      height: 700,
      width: 1050,
      id: "egypt_4",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/egypt/_MG_6357.jpg"
    },

  ],
  landscape: [
    {
      createAt: new Date(),
      filename: "img_1.jpg",
      height: 800,
      width: 533,
      id: "landscape_1",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/landscape/ _MG_1885.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_2.jpg",
      height: 1050,
      width: 700,
      id: "landscape_2",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/landscape/_MG_5808.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_3.jpg",
      height: 800,
      width: 533,
      id: "landscape_3",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/landscape/_MG_8652.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_4.jpg",
      height: 700,
      width: 892,
      id: "landscape_4",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/landscape/_MG_8672.jpg"
    },
  ],
  france: [
    {
      createAt: new Date(),
      filename: "img_1.jpg",
      height: 1050,
      width: 700,
      id: "france_1",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/france/resize__MG_2785.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_2.jpg",
      height: 1050,
      width: 700,
      id: "france_2",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/france/resize__MG_2814.jpg"
    },
  ],
  morocco: [
    {
      createAt: new Date(),
      filename: "img_1.jpg",
      height: 1050,
      width: 700,
      id: "morocco_1",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/morocco/_MG_1862.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_2.jpg",
      height: 700,
      width: 1050,
      id: "morocco_2",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/morocco/_MG_1914.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_3.jpg",
      height: 700,
      width: 1050,
      id: "morocco_3",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/morocco/_MG_1932.jpg"
    },
  ],
  jordan: [
    {
      createAt: new Date(),
      filename: "img_1.jpg",
      height: 1050,
      width: 700,
      id: "jordan_1",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/jordan/_MG_6711.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_2.jpg",
      height: 1050,
      width: 700,
      id: "jordan_2",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/jordan/_MG_6994.jpg"
    },
    {
      createAt: new Date(),
      filename: "img_3.jpg",
      height: 700,
      width: 1050,
      id: "jordan_3",
      url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/jordan/_MG_7025.jpg"
    },
  ],
  test: [{
    createAt: new Date(),
    filename: "img_3.jpg",
    height: 700,
    width: 1050,
    id: "test_3",
    url: "https://storage.googleapis.com/my-photo-site-9a0d8.appspot.com/images/jordan/_MG_7025.jpg"
  },],
  israel: []
} as const