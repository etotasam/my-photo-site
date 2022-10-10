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

export type TestViewerType = {
  imageData: ImagesType;
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, direction: string) => void;
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => void;
  isImageLoading: boolean;
  closeLoadingModal: () => void;
  className?: string;
};

export const TestViewer = ({
  imageData,
  imageClick,
  tapOn,
  tapOff,
  isImageLoading,
  closeLoadingModal,
  className,
}: TestViewerType) => {
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
          // onClick={(e) => imageClick(e)}
        >
          <div
            onClick={(e) => imageClick(e, "left")}
            className={"cursor-pointer absolute top-0 z-10 left-0 w-[50%] h-full"}
          ></div>
          <div onClick={(e) => imageClick(e, "right")} className={"absolute top-0 right-0 w-[50%] z-10 h-full"}></div>
          <NextImage
            className={`cursor-pointer z-[-1]`}
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
