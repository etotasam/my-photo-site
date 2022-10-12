import React from "react";
import { Photo } from "./Photo";
import { ImagesType } from "@/types";

type PhotoContainerType = {
  inView: boolean;
  locationImage: ImagesType;
  imageIndex: number;
  isAllImagesloaded: boolean;
  loadedLocationImage: () => void;
};

export const PhotoContainer = (props: PhotoContainerType) => {
  //? Photo props
  const { locationImage, loadedLocationImage, imageIndex, inView } = props;

  return (
    <Photo index={imageIndex} inView={inView} locationImage={locationImage} loadedLocationImage={loadedLocationImage} />
  );
};
