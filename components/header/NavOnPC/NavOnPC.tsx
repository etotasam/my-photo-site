import React from "react";
import { motion } from "framer-motion";

export type NavOnPCType = {
  locationNames: string[];
  toLink: (location: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  photoLabelName: string | string[] | undefined;
};

export const NavOnPC = ({ locationNames, toLink, photoLabelName }: NavOnPCType) => {
  return (
    <>
      <ul data-testid={`pc`} className={`flex`}>
        {locationNames &&
          locationNames.map((location: string) => (
            <li key={location} className={`pr-3 text-gray-900 font-thin`}>
              <motion.a
                onClick={(e) => toLink(location, e)}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={`inline-block cursor-pointer ${photoLabelName === location && `text-green-600`}`}
              >
                {`${location.charAt(0).toUpperCase()}${location.slice(1)}`}
              </motion.a>
            </li>
          ))}
      </ul>
    </>
  );
};
