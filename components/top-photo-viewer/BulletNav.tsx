import React, { useEffect } from "react";
import { ImagesType } from "@/@types/types";
import { motion, useAnimation } from "framer-motion";

type Params = {
  topImages: ImagesType[];
  currentPhotoIndex: number | null;
  setCurrentPhotoIndex: (num: number) => void;
};

const BulletNav = ({ topImages, currentPhotoIndex, setCurrentPhotoIndex }: Params) => {
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
      <ul className={`w-[10%] md:w-full min-h-[30px] list-none flex flex-col md:flex-row items-center`}>
        {topImages.map((photo, index) => (
          <motion.li
            layout
            key={photo.id}
            whileHover="scale"
            animate={currentPhotoIndex === index ? "scale" : "initial_scale"}
            variants={variants}
            className={` flex justify-center items-center w-[10px] h-[10px] cursor-pointer ${
              index !== 0 && `mt-4`
            } md:mt-0 ${index !== 0 && `md:ml-2`}`}
            onClick={() => setCurrentPhotoIndex(index)}
          >
            <motion.span
              variants={variants}
              animate={currentPhotoIndex === index ? "current_color" : "default_color"}
              className={`block rounded-[50%] w-1 h-1`}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default BulletNav;
