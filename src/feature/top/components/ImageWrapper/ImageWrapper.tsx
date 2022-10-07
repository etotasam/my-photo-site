import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
//! type
import { ImagesType } from "@/types";
//! component
import { MyLink } from "@/components/Element/MyLink";
//! hooks

export type ImageWrapperType = {
  photo: ImagesType;
  allImages: Record<string, ImagesType[]>;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  isOnloaded: () => void;
  toLink: string;
};

export const ImageWrapper = React.memo(({ photo, allImages, tapOn, tapOff, isOnloaded, toLink }: ImageWrapperType) => {
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

  return (
    <motion.div initial="hide" animate="show" exit="hide" variants={variables}>
      <MyLink href={toLink} className="block cursor-pointer">
        <NextImage
          onTouchStart={tapOn}
          onTouchEnd={tapOff}
          onLoad={isOnloaded}
          src={photo.url}
          layout="fill"
          objectFit="cover"
          alt={``}
        />
      </MyLink>
    </motion.div>
  );
});
