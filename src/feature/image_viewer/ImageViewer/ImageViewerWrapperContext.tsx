import React from "react";
//! component
import { ImageViewerContainer } from "./ImageViewerContainer";
//! types
import type { ImagesType } from "@/types";
//! context
import { ImageLoadStateProvider } from "./context/imageLoadStateContext";

type PropsType = {
  locationImages: ImagesType[];
};

export const ImageViewerWrapperContext = ({ locationImages }: PropsType) => {
  return (
    <ImageLoadStateProvider>
      <ImageViewerContainer locationImages={locationImages} />;
    </ImageLoadStateProvider>
  );
};
