import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ImagesType } from "@/@types/types";

export type PhotoType = {
  locationImage: ImagesType;
  loadedLocationImage: () => void;
  photoElRef: React.RefObject<HTMLAnchorElement>;
  h2ElRef: React.RefObject<HTMLHeadingElement>;
} & TypeForTest;

type TypeForTest = {
  opacity?: boolean;
};

export const Photo = ({ locationImage, loadedLocationImage, photoElRef, h2ElRef, opacity = true }: PhotoType) => {
  const locationName = locationImage.id.split(`_`)[0];

  return (
    <>
      <li key={locationImage.id} className={`w-1/2 md:w-1/5 mb-5 inline-block`}>
        <Link href={`/photo/${locationName}?image=1`} passHref>
          <motion.a
            ref={photoElRef}
            whileHover={{ scale: [1, 1.11, 1.1], transition: { duration: 0.5, times: [0, 0.8, 1] } }}
            // onMouseOver={hover}
            // onMouseOut={unHover}
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
        <h2
          ref={h2ElRef}
          data-testid={`h2`}
          className={`font-extralight ${opacity ? `opacity-0` : `opacity-100`}`}
        >{`${locationName.charAt(0).toUpperCase()}${locationName.slice(1)}`}</h2>
      </li>
    </>
  );
};
