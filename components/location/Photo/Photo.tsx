import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ImagesType } from "@/@types/types";

type Props = {
  locationImage: ImagesType;
  index: number;
  hasBreak: boolean;
};

export const Photo = ({ locationImage, index, hasBreak }: Props) => {
  const label = locationImage.id.split(`_`)[0];
  return (
    <>
      {hasBreak ? (
        <li data-testid={`breaked`} key={locationImage.id} className={`w-1/2 md:w-1/5 mb-5 inline-block`}>
          <Link href={`/photo/${label}?image=1`} passHref>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [null, -2, 0],
                transition: { duration: 1, delay: index / 3 },
              }}
              whileHover={{
                scale: [null, 1.04, 1.03],
                transition: { duration: 0.5 },
              }}
              className={`block cursor-pointer relative w-[90%] pt-[45%] mx-auto`}
            >
              <NextImage
                className={`pointer-events-none`}
                layout="fill"
                objectFit="cover"
                src={locationImage.url}
                alt={``}
              />
            </motion.a>
          </Link>
          <motion.h2
            data-testid={`h2`}
            animate={{ opacity: [0, 1], x: [-5, 0] }}
            transition={{ duration: 0.5, delay: index / 2 }}
            className={`font-extralight`}
          >
            {`${label.charAt(0).toUpperCase()}${label.slice(1)}`}
          </motion.h2>
        </li>
      ) : (
        <li data-testid={`non-break`} className={`w-1/2 md:w-1/5 mb-5 inline-block`}></li>
      )}
    </>
  );
};
