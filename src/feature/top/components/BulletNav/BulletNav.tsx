import React, { useEffect } from "react";
import { ImagesType } from "@/types";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
//! context
import {
  useCurrentImageIndexDispatchContext,
  useCurrentImageIndexStateContext,
} from "@/context/currentImageIndexContext";

export type BulletNavType = {
  topImages: ImagesType[];
  currentPhotoIndex: number | undefined;
  // setCurrentPhotoIndex: (num: number) => void;
  className?: string;
};

export const BulletNav = ({ topImages, className }: BulletNavType) => {
  const { currentImageIndexDispathcer } = useCurrentImageIndexDispatchContext();
  const { currentImageIndex } = useCurrentImageIndexStateContext();
  const variants = {
    initial_scale: {
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    scale: {
      scale: 2.2,
      transition: {
        duration: 0.5,
      },
    },
    current_color: {
      backgroundColor: "#0ea865",
    },
    default_color: {
      backgroundColor: "#909090",
    },
  };
  return (
    <>
      <ul
        className={clsx(`w-[10%] md:w-full min-h-[30px] list-none flex flex-col md:flex-row items-center`, className)}
      >
        {topImages.map((photo, index) => (
          <motion.li
            layout
            key={photo.id}
            whileHover="scale"
            animate={currentImageIndex === index ? "scale" : "initial_scale"}
            variants={variants}
            className={clsx(
              `flex justify-center items-center w-[10px] h-[10px] cursor-pointer md:mt-0`,
              index !== 0 && `mt-4 md:ml-2`
            )}
          >
            <motion.span
              variants={variants}
              animate={currentImageIndex === index ? "current_color" : "default_color"}
              className={`block rounded-[50%] w-1 h-1`}
              onClick={() => currentImageIndexDispathcer(index)}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};
