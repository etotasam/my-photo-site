import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type NavOnPCType = {
  locationNames: string[];
  toLink: (location: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  photoLabelName: string | string[] | undefined;
};

const variants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 },
    filter: "blur(0px)",
  },
};

export const NavOnPC = ({ locationNames, toLink, photoLabelName }: NavOnPCType) => {
  return (
    <>
      <ul className={`flex`}>
        {locationNames &&
          locationNames.map((locationName: string, index: number) => (
            <li key={locationName} className={`pr-3 text-gray-900 font-thin`}>
              <motion.a
                variants={variants}
                initial="initial"
                animate="animate"
                onClick={(e) => toLink(locationName, e)}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={clsx(`inline-block cursor-pointer`, photoLabelName === locationName && `text-green-600`)}
              >
                {`${locationName.charAt(0).toUpperCase()}${locationName.slice(1)}`}
              </motion.a>
            </li>
          ))}
      </ul>
    </>
  );
};
