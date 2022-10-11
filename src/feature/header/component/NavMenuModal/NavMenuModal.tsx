import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import clsx from "clsx";
//! context
import { useModalDispatchContext } from "@/context/modalStateContext";

export type NavMenuModalType = {
  locations: string[] | undefined;
  photoLabelName: string | string[] | undefined;
};

export const NavMenuModal = ({ locations, photoLabelName }: NavMenuModalType) => {
  const router = useRouter();
  let photo_label: string;
  if (typeof photoLabelName === "string") {
    photo_label = photoLabelName;
  }

  const { modalCloseDispatcher } = useModalDispatchContext();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, location: string) => {
    e.preventDefault();
    if (photo_label === location) return;
    router.push(`/photo/${location}?image=1`);
    modalCloseDispatcher();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className={`bg-green-600 fixed top-0 left-0 z-[-1] min-h-[100vh] w-[100vw] flex justify-center items-center`}
      >
        <div className={`border border-white/90 px-5 py-7 min-w-[200px]`}>
          <ul>
            {locations &&
              locations.map((location) => (
                <li key={location} className={`text-center pb-2 last-of-type:pb-0`}>
                  <a
                    onClick={(e) => handleClick(e, location)}
                    className={clsx(photo_label === location ? `text-white/50` : `text-white/90 cursor-pointer`)}
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
