import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ImagesType } from "@/@types/types";
//! hooks
// import { useCreateUrlToLink } from "./hooks/useCreateURLtoLink";

export type TopPhotoType = {
  photo: ImagesType;
  allImages: Record<string, ImagesType[]>;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  isOnloaded: () => void;
  toLink: string;
};

export const TopPhoto = React.memo(({ photo, allImages, tapOn, tapOff, isOnloaded, toLink }: TopPhotoType) => {
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
      <Link href={toLink} passHref>
        <a className="block cursor-pointer">
          <NextImage
            onTouchStart={tapOn}
            onTouchEnd={tapOff}
            onLoad={isOnloaded}
            src={photo.url}
            layout="fill"
            objectFit="cover"
            alt={``}
          />
        </a>
      </Link>
    </motion.div>
  );
});
