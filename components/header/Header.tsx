import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import { AnimatePresence } from "framer-motion";
import useSWR from "swr";
import axios from "axios";
import HeaderNavByMobile from "./HeaderNavByMobile";
import HeaderNavByPC from "./HeaderNavByPC";
import MainModal from "./MainModal";
import { useHeadersContext, InitialState } from "./HeadersContext";

type State = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};

const Header: React.FC = () => {
  const router = useRouter();
  const { state, dispatch }: State = useHeadersContext();
  const [isMobile, setIsMobile] = useState<boolean>();
  // const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const breakpoint = useSelector((state: StoreState) => state.breakpoint);

  const apiUrl = process.env.API_URL;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`${apiUrl}/locations`, fetcher);

  let viewPortwWidth: number;
  useEffect(() => {
    function setViewPortWidth() {
      viewPortwWidth = window.innerWidth;
      const isWidthMobile = viewPortwWidth < breakpoint;
      setIsMobile(isWidthMobile);
      if (!isWidthMobile) return dispatch({ type: `inactive` });
    }
    setViewPortWidth();
    window.addEventListener("resize", setViewPortWidth);
    return () => {
      window.removeEventListener("resize", setViewPortWidth);
    };
  }, [isMobile]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch({ type: `inactive` });
    router.push(`/`);
    return;
  }

  return (
    <header
      className={`t-header-height bg-white fixed flex justify-center top-0 left-0 w-full z-50 duration-300 ${
        state.isModalActive ? `bg-opacity-100` : `bg-opacity-90`
      }`}
    >
      <div
        className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}
      >
        {isMobile ? (
          <HeaderNavByMobile />
        ) : (
          isMobile !== undefined && (
            <HeaderNavByPC params={data} error={error} />
          )
        )}
        <div className={`absolute right-0`}>
          <a
            href={`/`}
            className={`n-title-font text-green-600 text-xl tracking-wider font-extralight`}
            onClick={(e) => handleClick(e)}
          >
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </a>
        </div>
      </div>
      <AnimatePresence>
        {state.isModalActive && <MainModal params={data} error={error} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
