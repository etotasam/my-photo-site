import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { HeaderNavOnMobile } from "../HeaderNavOnMobile";
import { HeaderNavOnPC } from "../HeaderNavOnPC";
import { MainModal } from "../MainModal";
import { useWindowResize } from "@/hooks";
//! context
import { ModalState, useModalStateContext, useModalDispatchContext } from "@/context/modalStateContext";
import { useHeihgtDispatchContext } from "@/context/heightStateContext";
import { useLocationNamesStateContext } from "@/context/locationNamesContext";

export const Header = () => {
  const router = useRouter();
  const { isModalActive }: ModalState = useModalStateContext();
  const { modalOpenDispathcer, modalCloseDispatcher } = useModalDispatchContext();
  const { setHeaderHeightDispatcher } = useHeihgtDispatchContext();
  const { locationNames } = useLocationNamesStateContext();

  const breakpointWidth = 768;

  //? viewportの幅からモバイルかどうかを判断
  const { width: windowWidth } = useWindowResize();
  const isMobile = windowWidth < breakpointWidth;
  useEffect(() => {
    if (isModalActive) return modalCloseDispatcher();
  }, [isMobile]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    modalCloseDispatcher();
    if (router.pathname === "/") return;
    router.push(`/`);
    return;
  };

  // set <header> height to HeadersContext
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const headerHeight: number = ref.current.clientHeight;
    setHeaderHeightDispatcher(headerHeight);
  }, [ref]);

  return (
    <header
      ref={ref}
      className={`t-header-height fixed flex justify-center top-0 left-0 w-[100vw] z-50 duration-300 ${
        isModalActive ? `bg-white` : `bg-white/90`
      }`}
    >
      <div className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}>
        {windowWidth === 0 ? (
          ``
        ) : isMobile ? (
          <HeaderNavOnMobile />
        ) : (
          isMobile !== undefined && <HeaderNavOnPC locations={locationNames.sort()} />
        )}
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
      <AnimatePresence>{isModalActive && <MainModal locations={locationNames.sort()} />}</AnimatePresence>
    </header>
  );
};
