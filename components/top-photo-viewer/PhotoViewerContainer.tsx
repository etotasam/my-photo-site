import React, { FC, memo, createContext } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhotoDisplay from "@/components/top-photo-viewer/PhotoDisplay";
import PhotoPagination from "./PhotoPagination";
import { ImagesType } from "@/assets/type/types";

// const PhotoImages = Photos.top_view_photos;
// const photosLength = PhotoImages.length;
export const CurrentPhotoIndexContext = createContext(null);

type Params = {
  topImagesByRandom: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

const TopPhotoViewer = ({ topImagesByRandom, allImages }: Params) => {
  const topImagesLength = topImagesByRandom.length;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>();
  const contextValue = {
    currentPhotoIndex,
    setCurrentPhotoIndex,
  };

  const getInitialPhotoIndex = (): void => {
    const min = 0;
    const max = topImagesLength - 1;
    const randamIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(randamIndex);
  }

  useEffect(() => {
    getInitialPhotoIndex();
  }, []);

  return (
    <CurrentPhotoIndexContext.Provider value={contextValue}>
      <div className={`md:w-[60%]`}>
        <div className={`relative pt-[100%]`}>
          <AnimatePresence>
            {topImagesByRandom.map(
              (photo, index) =>
                currentPhotoIndex === index && (
                  <PhotoDisplay
                    index={index}
                    key={photo.id}
                    photo={photo}
                    imagesLength={topImagesLength}
                    allImages={allImages}
                  />
                )
            )}
          </AnimatePresence>
        </div>
        <PhotoPagination topImagesByRandom={topImagesByRandom} />
      </div>
    </CurrentPhotoIndexContext.Provider>
  );
};

export default memo(TopPhotoViewer);
