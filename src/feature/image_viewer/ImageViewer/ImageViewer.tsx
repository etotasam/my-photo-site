import React from "react";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
//! type
import type { ImagesType } from "@/types";
//! context
import { useHeihgtStateContext } from "@/context/heightStateContext";
//! hooks
import { useAdjustSizeForWrapperPhoto } from "@/hooks";
//! component
import { Loading } from "@/components/Element/Loading";

export type ImageViewerType = {
  imageData: ImagesType;
  imageTranstion: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  isImageLoading: boolean;
  closeLoadingModal: () => void;
  className?: string;
};

export const ImageViewer = ({
  imageData,
  imageTranstion,
  tapOn,
  tapOff,
  isImageLoading,
  closeLoadingModal,
  className,
}: ImageViewerType) => {
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { photoSize } = useAdjustSizeForWrapperPhoto({ imageData, headerHeight, footerHeight });

  return (
    <>
      <div className={className}>
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
            src={imageData.url}
            alt={``}
            priority={true}
            layout={`fill`}
            objectFit={`contain`}
            onLoad={closeLoadingModal}
          />
        </motion.div>
        <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
      </div>
    </>
  );
};
