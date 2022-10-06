import React, { memo, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import BulletNav from "../BulletNav";
import { ImagesType } from "@/@types/types";
// import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
//! components
import { TopPhoto, TopPhotoContainer } from "../TopPhoto";
import { Loading } from "@/feature/Loading";
// import { LoadingBound } from "@/components/LoadingBound";
//! hooks
// import { usePhotoSlide } from "@/hooks/usePhotoSlide";
// import { useCreateUrlToLink } from "../TopPhoto/hooks/useCreateURLtoLink";

export type TopImageType = {
  topImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
  currentPhotoIndex: number | undefined;
  isTopImageAllLoaded: boolean;
  imageOnloaded: () => void;
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
  console.log("currentPhotoIndex", currentPhotoIndex);
  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        <AnimatePresence>
          {topImages.map(
            (photo, index) =>
              (!isTopImageAllLoaded || currentPhotoIndex === index) && (
                <TopPhotoContainer
                  key={photo.id}
                  photo={photo}
                  allImages={allImages}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  isOnloaded={imageOnloaded}
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

// export default memo(KeyVisual);
