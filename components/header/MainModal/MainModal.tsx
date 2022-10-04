import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export type NavMenuModalType = {
  locations: string[] | undefined;
  photoLabelName: string | string[] | undefined;
};

export const MainModal = ({ locations, photoLabelName }: NavMenuModalType) => {
  const router = useRouter();
  let photo_label: string;
  if (typeof photoLabelName === "string") {
    photo_label = photoLabelName;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, location: string) => {
    e.preventDefault();
    if (photo_label === location) return;
    router.push(`/photo/${location}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className={`t-modal-height bg-white w-[100vw] flex justify-center items-center`}
      >
        <div className={`border border-gray-400 px-5 py-7 min-w-[200px]`}>
          <ul>
            {locations &&
              locations.map((location) => (
                <li key={location} className={`text-center pb-2 last-of-type:pb-0`}>
                  <a
                    onClick={(e) => handleClick(e, location)}
                    className={`${photo_label === location ? `text-green-600` : `text-gray-500 cursor-pointer`}`}
                  >
                    {`${location.charAt(0).toUpperCase()}${location.slice(1)}`}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};
