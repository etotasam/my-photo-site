import axios from "axios";
import { ImagesType } from "@/@types/types";

const apiUrl = process.env.API_URL;

export const fetchAllImagesApi = async () => {
  const { data: allImages }: { data: Record<string, ImagesType[]> } = await axios.get(`${apiUrl}/all_images`)
  return allImages
}

export const fetchLocationsApi = async () => {
  const { data: locations }: { data: string[] } = await axios.get(`${apiUrl}/locations`);
  return locations
}

export const fetchImagesByLocationApi = async (photo_label: string) => {
  const { data: images }: { data: ImagesType[] } = await axios.get(`${apiUrl}/images/${photo_label}`);
  return images
}
