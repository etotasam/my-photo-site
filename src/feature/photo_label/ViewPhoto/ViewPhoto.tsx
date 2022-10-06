import React from "react";
import NextImage from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import type { ImagesType } from "@/@types/types";
//! context

import { useHeihgtStateContext } from "@/context/heightStateContext";

//! hooks
import { useAdjustSizeForWrapperPhoto } from "@/hooks";
//! component
import { Loading } from "@/feature/Loading";

type Params = {
  imageRef: ImagesType;
  imageTranstion: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  isImageLoading: boolean;
  closeLoadingModal: () => void;
};

export const ViewPhoto = ({ imageRef, imageTranstion, tapOn, tapOff, isImageLoading, closeLoadingModal }: Params) => {
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { photoSize } = useAdjustSizeForWrapperPhoto(imageRef, headerHeight, footerHeight);

  return (
    <>
      <motion.div
        data-testid={`imageWrap`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onTouchStart={tapOn}
        onTouchEnd={tapOff}
        transition={{ duration: 0.5 }}
        className={`relative leading-3`}
        style={{ ...photoSize }}
        onClick={(e) => imageTranstion(e)}
      >
        <NextImage
          className={`cursor-pointer`}
          src={imageRef.url}
          alt={``}
          priority={true}
          layout={`fill`}
          objectFit={`contain`}
          onLoad={closeLoadingModal}
        />
      </motion.div>
      <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
    </>
  );
};
