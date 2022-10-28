import axios from "axios";
//! type
import { ImagesType } from "@/types";

// const apiUrl = process.env.API_URL
const apiUrl = process.env.NEXT_PUBLIC_IS_DEV ? `http://localhost:3000/api` : process.env.API_URL;

export const fetchAllImagesApi = async (): Promise<Record<string, ImagesType[]>> => {
  const { data: allImages }: { data: Record<string, ImagesType[]> } = await axios.get(`${apiUrl}/all_images`)
  return allImages
}

export const fetchLocationNamesApi = async (all = false): Promise<string[]> => {
  const { data: locations }: { data: string[] } = await axios.get(`${apiUrl}/locations?all=${all}`);
  return locations
}

export const fetchImagesByLocationApi = async (photo_label: string): Promise<ImagesType[]> => {
  const { data: images }: { data: ImagesType[] } = await axios.get(`${apiUrl}/images/${photo_label}`);
  return images
}
