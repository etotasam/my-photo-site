import { AnimatePresence } from "framer-motion";
//! component
import { NavOnSP, NavOnSPType } from "../NavOnSP";
import { NavOnPC, NavOnPCType } from "../NavOnPC";
import { MainModal } from "../MainModal";

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
  const { locationNames, toLink, photoLabelName } = props;
  //? MainModal props
  const { photoLabelName: photoLabelNameUseInModal } = props;

  return (
    <header
      ref={headerRef}
      className={`t-header-height fixed flex justify-center top-0 left-0 w-[100vw] z-50 duration-300 ${
        isModalActive ? `bg-white` : `bg-white/90`
      }`}
    >
      <div className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}>
        {device === "SP" && <NavOnSP isModalActive={isModalActive} toggleModal={toggleModal} />}
        {device === "PC" && (
          <NavOnPC locationNames={locationNames.sort()} toLink={toLink} photoLabelName={photoLabelName} />
        )}
        {/* //? title */}
        <div className={`absolute right-0`}>
          <a
            href={`/`}
            className={`text-green-600 text-xl tracking-wider font-extralight`}
            onClick={(e) => handleClick(e)}
          >
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </a>
        </div>
      </div>
      <AnimatePresence>
        {isModalActive && <MainModal locations={locationNames.sort()} photoLabelName={photoLabelNameUseInModal} />}
      </AnimatePresence>
    </header>
  );
};
