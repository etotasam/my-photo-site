import React from "react";
import { ImagesType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
//! components
import { BulletNav } from "../BulletNav";
import { ImageWrapper } from "../ImageWrapper";
import { Loading } from "@/components/Element/Loading";
//! context
import { useCurrentImageIndexStateContext } from "@/context/currentImageIndexContext";

export type TopImageType = {
  topImages: ImagesType[];
  isTopImageAllLoaded: boolean;
  imageOnloaded: (id: string) => void;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
};

export const TopImage = ({ topImages, isTopImageAllLoaded, imageOnloaded, tapOn, tapOff }: TopImageType) => {
  const { currentImageIndex } = useCurrentImageIndexStateContext();
  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        <AnimatePresence>
          {topImages.map(
            (imageData, index) =>
              (currentImageIndex === index || !isTopImageAllLoaded) && (
                <ImageWrapper
                  key={imageData.id}
                  imageData={imageData}
                  // allImages={allImages}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  isOnloaded={(id) => imageOnloaded(id)}
                  className={clsx(currentImageIndex !== index && "opacity-0")}
                />
              )
          )}
        </AnimatePresence>
        <AnimatePresence>{currentImageIndex === null && <Loading />}</AnimatePresence>
      </div>
      <BulletNav topImages={topImages} currentPhotoIndex={currentImageIndex} />
    </div>
  );
};
