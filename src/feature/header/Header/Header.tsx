import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
//! component
import { NavOnSP, NavOnSPType } from "../component/NavOnSP";
import { NavOnPC, NavOnPCType } from "../component/NavOnPC";
import { NavMenuModal } from "../component/NavMenuModal";

export type HeaderType = {
  device: "PC" | "SP" | undefined;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  headerRef: React.RefObject<HTMLElement>;
} & NavOnSPType &
  NavOnPCType;

export const Header = (props: HeaderType) => {
  //? Header props
  const { device, handleClick, headerRef } = props;
  //? NavOnSP props
  const { toggleModal, isModalActive } = props;
  //? NavOnPC props
  const { locationNames, toLink, imagesLocationNamesOnRouterQuery } = props;
  //? MainModal props
  const {
    locationNames: locationNamesForModal,
    imagesLocationNamesOnRouterQuery: imagesLocationNamesOnRouterQueryForModal,
  } = props;

  return (
    <header
      ref={headerRef}
      className={clsx(
        `t-header-height fixed flex justify-center top-0 left-0 w-[100vw] z-30 duration-300 bg-white/90`
        // isModalActive ? `bg-transparent` : `bg-white/90`
      )}
    >
      <div className={`flex relative items-center w-[95vw] sm:w-[90vw] max-w-[1024px] mx-auto`}>
        {device === "SP" && <NavOnSP isModalActive={isModalActive} toggleModal={toggleModal} />}
        {device === "PC" && (
          <NavOnPC
            locationNames={locationNames.sort()}
            toLink={toLink}
            imagesLocationNamesOnRouterQuery={imagesLocationNamesOnRouterQuery}
          />
        )}
        {/* //? title */}
        <div className={`absolute right-3`}>
          <a
            href={`/`}
            className={clsx(
              "text-xl tracking-wider font-extralight",
              isModalActive ? `text-white/90` : `text-green-600`
            )}
            onClick={(e) => handleClick(e)}
          >
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </a>
        </div>
      </div>
      {/* //? modal */}
      <AnimatePresence>
        {isModalActive && (
          <NavMenuModal
            locationNames={locationNamesForModal.sort()}
            imagesLocationNamesOnRouterQuery={imagesLocationNamesOnRouterQueryForModal}
          />
        )}
      </AnimatePresence>
    </header>
  );
};
