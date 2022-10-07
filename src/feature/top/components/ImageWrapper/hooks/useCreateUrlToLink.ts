import React from "react";
//! types
import { ImagesType } from "@/types";

type PropType = {
  photo: ImagesType;
  allImages: Record<string, ImagesType[]>;
}
export const useCreateUrlToLink = ({ photo, allImages }: PropType) => {
  const [toLink, setToLink] = React.useState<string>("/");
  const createURL = React.useCallback(() => {
    const locationName = photo.id.split(`_`)[0];
    const locationsImages = allImages[locationName];
    const imagesSortedInDescById = locationsImages.sort((a, b) => {
      if (Number(a.id.split(`_`).pop()) > Number(b.id.split(`_`).pop())) return -1;
      if (Number(a.id.split(`_`).pop()) < Number(b.id.split(`_`).pop())) return 1;
      return 0;
    });
    const imageIndex = imagesSortedInDescById.findIndex((el) => el.id === photo.id);
    setToLink(`/photo/${locationName}?image=${imageIndex + 1}`);
  }, [photo.id]);

  React.useEffect(() => {
    createURL();
  }, []);

  return { toLink }
}