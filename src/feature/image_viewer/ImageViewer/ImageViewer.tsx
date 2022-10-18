import React from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
//! type
import type { ImagesType } from "@/types";
//! context
import { useHeihgtStateContext } from "@/context/heightStateContext";
//! hooks
import { useAdjustSizeForWrapperPhoto } from "@/hooks";
//! component
import { LoadingBound } from "@/components/Element/LoadingBound";

export type ImageViewerPropsType = {
  isImageLoaded: boolean;
  locationImages: ImagesType[];
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  imageIndexByQuery: string | string[] | undefined;
  imageLoadedStateWithPara: (state: boolean) => void;
};

export const ImageViewer = ({
  locationImages,
  imageClick,
  tapOn,
  tapOff,
  imageLoadedStateWithPara,
  isImageLoaded,
  imageIndexByQuery,
}: ImageViewerPropsType) => {
  return (
    <>
      <div className="relative t-main-height flex justify-center items-center">
        <AnimatePresence>
          {locationImages.map(
            (imageData, index) =>
              Number(imageIndexByQuery) === index + 1 && (
                <Image
                  key={imageData.id}
                  imageData={imageData}
                  imageClick={imageClick}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  imageLoadedStateWithPara={imageLoadedStateWithPara}
                />
              )
          )}
          {!isImageLoaded && <LoadingBound />}
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
  imageLoadedStateWithPara: (state: boolean) => void;
};
export const Image = ({ imageData, imageClick, tapOn, tapOff, imageLoadedStateWithPara }: ImageType) => {
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { photoSize } = useAdjustSizeForWrapperPhoto({ imageData, headerHeight, footerHeight });
  //? imageの読み込み状態
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  React.useEffect(() => {
    imageLoadedStateWithPara(isImageLoaded);
  }, [isImageLoaded]);

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
          className={`relative leading-3 cursor-pointer`}
          style={{ ...photoSize }}
          onClick={(e) => imageClick(e)}
        >
          <NextImage
            src={imageData.url}
            alt={`Image`}
            priority={true}
            layout={`fill`}
            objectFit={`contain`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </motion.div>
      </div>
    </>
  );
};
