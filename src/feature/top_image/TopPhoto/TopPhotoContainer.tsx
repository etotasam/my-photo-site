import React from "react";
import { TopPhoto } from "./TopPhoto";
//! hooks
import { useCreateUrlToLink } from "./hooks/useCreateUrlToLink";
//! types
import { ImagesType } from "@/@types/types";

type TopPhotoContainerType = {
  photo: ImagesType;
  allImages: Record<string, ImagesType[]>;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  isOnloaded: () => void;
};

export const TopPhotoContainer = (props: TopPhotoContainerType) => {
  const { photo, allImages, tapOn, tapOff, isOnloaded } = props;

  const { toLink } = useCreateUrlToLink({ photo, allImages });

  return (
    <TopPhoto
      photo={photo}
      allImages={allImages}
      tapOn={tapOn}
      tapOff={tapOff}
      isOnloaded={isOnloaded}
      toLink={toLink}
    />
  );
};
