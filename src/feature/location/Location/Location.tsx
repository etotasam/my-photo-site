import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
//!type
import { ImagesType } from "@/types";
//! component
import { PhotoContainer } from "../component/Photo";
import { HeadlineAnime } from "@/components/Element/Headline";
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

  //? アニメーションのトリガー
  const { ref: triggerRef, inView } = useInView({ triggerOnce: true });

  return (
    <section>
      <HeadlineAnime>Location</HeadlineAnime>
      <ul ref={triggerRef} className={`mt-10 mx-auto relative`}>
        {locationsImages &&
          locationsImages.map((locationImage, index) => (
            <PhotoContainer
              inView={inView}
              key={locationImage.id}
              locationImage={locationImage}
              imageIndex={index}
              loadedLocationImage={() => setLocationImagesLoaded((v) => v + 1)}
              isAllImagesloaded={isAllImagesloaded}
            />
          ))}
      </ul>
    </section>
  );
};
