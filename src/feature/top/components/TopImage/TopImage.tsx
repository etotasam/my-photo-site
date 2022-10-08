import React from "react";
import { ImagesType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
//! components
import { BulletNav } from "../BulletNav";
import { ImageWrapper } from "../ImageWrapper";
import { Loading } from "@/components/Element/Loading";

export type TopImageType = {
  topImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
  currentPhotoIndex: number | undefined;
  isTopImageAllLoaded: boolean;
  imageOnloaded: (id: string) => void;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  setCurrentPhotoIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const TopImage = ({
  topImages,
  allImages,
  currentPhotoIndex,
  isTopImageAllLoaded,
  imageOnloaded,
  tapOn,
  tapOff,
  setCurrentPhotoIndex,
}: TopImageType) => {
  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        <AnimatePresence>
          {topImages.map(
            (imageData, index) =>
              (currentPhotoIndex === index || !isTopImageAllLoaded) && (
                <ImageWrapper
                  key={imageData.id}
                  imageData={imageData}
                  // allImages={allImages}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  isOnloaded={(id) => imageOnloaded(id)}
                />
              )
          )}
        </AnimatePresence>
        <AnimatePresence>{(!isTopImageAllLoaded || currentPhotoIndex === null) && <Loading />}</AnimatePresence>
      </div>
      <BulletNav
        topImages={topImages}
        currentPhotoIndex={currentPhotoIndex}
        setCurrentPhotoIndex={(num: number) => setCurrentPhotoIndex(num)}
      />
    </div>
  );
};
