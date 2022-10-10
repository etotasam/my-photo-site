import React from "react";
import { animate, AnimatePresence, motion } from "framer-motion";
import NextImage from "next/image";
import clsx from "clsx";
//! type
import type { ImagesType } from "@/types";
//! hooks
import { useAdjustSizeForWrapperPhoto } from "@/hooks";
import { useWindowResize } from "@/hooks";
//! context
import { useHeihgtStateContext } from "@/context/heightStateContext";
//! component
import { Loading } from "@/components/Element/Loading";

type PropType = {
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  isImageLoading: boolean;
  closeLoadingModal: () => void;
  className?: string;
  locationImages: ImagesType[];
  queryImage: string | string[] | undefined;
};

export const NewImageViewer = (props: PropType) => {
  const { queryImage, locationImages, isImageLoading, className, tapOn, tapOff, imageClick, closeLoadingModal } = props;

  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { photoSize } = useAdjustSizeForWrapperPhoto({ imageData, headerHeight, footerHeight });
  return (
    <>
      {/* {index + 1 === Number(queryImage) && ( */}
      <div className={"absolute top-0 left-0"}>
        <div
          data-testid={`imageWrap`}
          onTouchStart={tapOn}
          onTouchEnd={tapOff}
          className={`relative leading-3`}
          style={{ ...photoSize }}
          // onClick={(e) => imageClick(e)}
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
        </div>
      </div>
      {/* )} */}
      {/* </div> */}
      {/* <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence> */}
    </>
  );
};
