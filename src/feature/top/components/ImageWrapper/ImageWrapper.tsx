import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
//! type
import { ImagesType } from "@/types";
//! component
import { MyLink } from "@/components/Element/MyLink";
//! hooks

export type ImageWrapperType = {
  imageData: ImagesType;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  isOnloaded: (id: string) => void;
  className?: string;
};

export const ImageWrapper = React.memo(({ imageData, tapOn, tapOff, isOnloaded, className }: ImageWrapperType) => {
  const variables = {
    hide: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const linkUrl = `/photo/${imageData.id.split("_")[0]}?image=1`;

  return (
    <motion.div initial="hide" animate="show" exit="hide" variants={variables} className={className}>
      <MyLink href={linkUrl} className="block cursor-pointer">
        <NextImage
          onTouchStart={tapOn}
          onTouchEnd={tapOff}
          onLoad={() => isOnloaded(imageData.id)}
          src={imageData.url}
          layout="fill"
          objectFit="cover"
          alt={``}
        />
      </MyLink>
    </motion.div>
  );
});
