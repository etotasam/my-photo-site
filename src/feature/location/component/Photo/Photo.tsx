import React from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
//! type
import { ImagesType } from "@/types";

export type PhotoType = {
  index: number;
  inView: boolean;
  locationImage: ImagesType;
  loadedLocationImage: () => void;
} & TypeForTest;

type TypeForTest = {
  opacity?: boolean;
};

export const Photo = ({ index, locationImage, loadedLocationImage, inView, opacity = true }: PhotoType) => {
  const locationName = locationImage.id.split(`_`)[0];

  const figureControl = useAnimation();
  const h2Control = useAnimation();

  React.useEffect(() => {
    if (!inView) return;
    figureControl.start((index: number) => {
      return { opacity: 1, y: 0, transition: { duration: 1, delay: index * 0.5 } };
    });
    h2Control.start((index: number) => {
      return { opacity: 1, x: 0, transition: { duration: 1, delay: index * 0.5 } };
    });
  }, [inView]);

  return (
    <>
      <li key={locationImage.id} className={`w-1/2 md:w-1/5 mb-5 inline-block`}>
        <Link href={`/photo/${locationName}?image=1`} passHref>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={figureControl}
            custom={index}
            whileHover={{ scale: [1, 1.11, 1.1], transition: { duration: 0.5, times: [0, 0.8, 1] } }}
            className={`block cursor-pointer relative w-[90%] pt-[45%] mx-auto ${
              opacity ? `opacity-0` : `opacity-100`
            }`}
          >
            <NextImage
              className={`pointer-events-none`}
              layout="fill"
              objectFit="cover"
              src={locationImage.url}
              alt={``}
              onLoad={loadedLocationImage}
            />
          </motion.a>
        </Link>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={h2Control}
          custom={index}
          data-testid={`h2`}
          className={`font-extralight ${opacity ? `opacity-0` : `opacity-100`}`}
        >{`${locationName.charAt(0).toUpperCase()}${locationName.slice(1)}`}</motion.h2>
      </li>
    </>
  );
};
