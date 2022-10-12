import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import clsx from "clsx";
//! context
import { useModalDispatchContext } from "@/context/modalStateContext";

export type NavMenuModalType = {
  locationNames: string[] | undefined;
  imagesLocationNamesOnRouterQuery: string | string[] | undefined;
};

export const NavMenuModal = ({ locationNames, imagesLocationNamesOnRouterQuery }: NavMenuModalType) => {
  const router = useRouter();
  const imagesLocationName = React.useRef<string>();
  if (typeof imagesLocationNamesOnRouterQuery === "string") {
    imagesLocationName.current = imagesLocationNamesOnRouterQuery;
  }

  const { modalCloseDispatcher } = useModalDispatchContext();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, locaName: string) => {
    e.preventDefault();
    if (imagesLocationName.current === locaName) return;
    router.push(`/photo/${locaName}?image=1`);
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
            {locationNames &&
              locationNames.map((locaName) => (
                <li key={locaName} className={`text-center pb-2 last-of-type:pb-0`}>
                  <a
                    onClick={(e) => handleClick(e, locaName)}
                    className={clsx(
                      imagesLocationName.current === locaName ? `text-white/50` : `text-white/90 cursor-pointer`
                    )}
                  >
                    {`${locaName.charAt(0).toUpperCase()}${locaName.slice(1)}`}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};
