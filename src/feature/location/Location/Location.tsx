import React, { memo, useState, useEffect, useRef } from "react";
//!type
import { ImagesType } from "@/types";
//! component
import { Photo, PhotoContainer } from "../component/Photo";
import { HeadlineAnime, Headline } from "@/components/Element/Headline";
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
    <section>
      <HeadlineAnime>Location</HeadlineAnime>
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
          ))}
        {/* {!isAllImagesloaded && <LoadingBound />} */}
      </ul>
    </section>
  );
};
