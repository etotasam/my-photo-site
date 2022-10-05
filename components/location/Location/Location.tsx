import React, { memo, useState, useEffect, useRef } from "react";
import { Photo, PhotoContainer } from "../Photo";
import { ImagesType } from "@/@types/types";
//! component
// import { LoadingBound } from "@/components/LoadingBound";

export type LocationType = {
  locationsImages: ImagesType[];
};

export const Location = ({ locationsImages }: LocationType) => {
  const [isAllImagesloaded, setIsAllImagesloaded] = useState(false);
  const [locationImagesLoaded, setLocationImagesLoaded] = useState(0);
  useEffect(() => {
    if (locationImagesLoaded >= locationImagesLoaded) {
      setIsAllImagesloaded(true);
    }
  }, [locationImagesLoaded]);

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`t-under-border text-green-600 mt-5 mx-auto`}>Location</h1>
      </div>
      <ul className={`mt-10 mx-auto relative`}>
        {locationsImages &&
          locationsImages.map((locationImage, index) => (
            <PhotoContainer
              key={locationImage.id}
              locationImage={locationImage}
              imageIndex={index}
              loadedLocationImage={() => setLocationImagesLoaded((v) => v + 1)}
              isAllImagesloaded={isAllImagesloaded}
            />
            // <Photo
            //   imageIndex={index}
            //   key={locationImage.id}
            //   locationImage={locationImage}
            //   loadedLocationImage={() => setLocationImagesLoaded((v) => v + 1)}
            //   isAllImagesloaded={isAllImagesloaded}
            // />
          ))}
        {/* {!isAllImagesloaded && <LoadingBound />} */}
      </ul>
    </>
  );
};
