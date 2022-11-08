import React from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
//! type
import type { ImagesType } from "@/types";
//! context
import { useHeihgtStateContext } from "@/context/heightStateContext";
import { useImageLoadDispatchContext } from "./context/imageLoadStateContext";
//! hooks
import { useAdjustSizeForWrapperPhoto } from "@/hooks";
//! component
import { LoadingBound } from "@/components/Element/LoadingBound";

export type ImageViewerPropsType = {
  locationImages: ImagesType[];
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  imageIndexByQuery: string | string[] | undefined;
  isImageLoading: boolean;
};

export const ImageViewer = ({
  locationImages,
  imageClick,
  tapOn,
  tapOff,
  isImageLoading,
  imageIndexByQuery,
}: ImageViewerPropsType) => {
  console.log(isImageLoading);
  return (
    <>
      <div className="relative t-main-height flex justify-center overflow-y-hidden items-center">
        <AnimatePresence>
          {locationImages.map(
            (imageData, index) =>
              Number(imageIndexByQuery) === index + 1 && (
                <Image
                  key={imageData.id}
                  imagesLength={locationImages.length}
                  imageData={imageData}
                  imageClick={imageClick}
                  tapOn={tapOn}
                  tapOff={tapOff}
                />
              )
          )}
          {isImageLoading && <LoadingBound />}
        </AnimatePresence>
      </div>
    </>
  );
};

//! parts
export type ImageType = {
  imageData: ImagesType;
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  imagesLength: number;
};
export const Image = ({ imageData, imageClick, tapOn, tapOff, imagesLength }: ImageType) => {
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { photoSize } = useAdjustSizeForWrapperPhoto({ imageData, headerHeight, footerHeight });

  const { imageLoadingDispatcher, imageLoadedDispatcher } = useImageLoadDispatchContext();

  React.useLayoutEffect(() => {
    imageLoadingDispatcher();
  }, []);
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
          transition={{ duration: 0.5 }}
          className={clsx(`relative leading-3`, imagesLength > 1 && `cursor-pointer`)}
          style={{ ...photoSize }}
          onClick={(e) => imageClick(e)}
        >
          <NextImage
            src={imageData.url}
            alt={`Image`}
            priority={true}
            layout={`fill`}
            objectFit={`contain`}
            onLoad={imageLoadedDispatcher}
          />
        </motion.div>
      </div>
    </>
  );
};
