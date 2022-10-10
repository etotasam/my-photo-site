import React from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
//! type
import type { ImagesType } from "@/types";
//! context
import { useHeihgtStateContext } from "@/context/heightStateContext";
//! hooks
import { useAdjustSizeForWrapperPhoto } from "@/hooks";

export type ImageViewerType = {
  imageData: ImagesType;
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  // isImageLoading: boolean;
  imageLoaded: () => void;
  className?: string;
};

export const ImageViewer = ({
  imageData,
  imageClick,
  tapOn,
  tapOff,
  // isImageLoading,
  imageLoaded,
  className,
}: ImageViewerType) => {
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { photoSize } = useAdjustSizeForWrapperPhoto({ imageData, headerHeight, footerHeight });

  type Test = {
    initial?: { x: number };
    exit?: { x: number };
    animate?: { x: number };
  };

  return (
    <>
      <div className={clsx("absolute")}>
        <motion.div
          data-testid={`imageWrap`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onTouchStart={tapOn}
          onTouchEnd={tapOff}
          transition={{ duration: 0.3 }}
          className={`relative leading-3 cursor-pointer`}
          style={{ ...photoSize }}
          onClick={(e) => imageClick(e)}
        >
          <NextImage
            src={imageData.url}
            alt={``}
            priority={true}
            layout={`fill`}
            objectFit={`contain`}
            onLoad={imageLoaded}
          />
        </motion.div>
      </div>
      {/* <AnimatePresence>{isImageLoading && <LoadingBound />}</AnimatePresence> */}
    </>
  );
};
