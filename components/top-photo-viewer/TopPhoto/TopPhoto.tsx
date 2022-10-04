import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ImagesType } from "@/@types/types";

type PropsType = {
  photo: ImagesType;
  allImages: Record<string, ImagesType[]>;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  isOnloaded: () => void;
};

export const TopPhoto = React.memo(({ photo, allImages, tapOn, tapOff, isOnloaded }: PropsType) => {
  //? 写真表示のURLを作成
  const [toLink, setToLink] = useState<string>("/");
  const createURL = React.useCallback(() => {
    const locationName = photo.id.split(`_`)[0];
    const locationsImages = allImages[locationName];
    const imagesSortedInDescById = locationsImages.sort((a, b) => {
      if (Number(a.id.split(`_`).pop()) > Number(b.id.split(`_`).pop())) return -1;
      if (Number(a.id.split(`_`).pop()) < Number(b.id.split(`_`).pop())) return 1;
      return 0;
    });
    const imageIndex = imagesSortedInDescById.findIndex((el) => el.id === photo.id);
    setToLink(`/photo/${locationName}?image=${imageIndex + 1}`);
  }, [photo.id]);

  useEffect(() => {
    createURL();
  }, []);

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
