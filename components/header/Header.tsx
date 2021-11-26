import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import { AnimatePresence } from "framer-motion";
import useSWR from "swr";
import axios from "axios";
import HeaderNavOnMobile from "./HeaderNavOnMobile";
import HeaderNavOnPC from "./HeaderNavOnPC";
import MainModal from "./MainModal";
import { useHeadersContext, InitialState } from "./HeadersContext";

type State = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};

const Header = () => {
  const router = useRouter();
  const { state, dispatch }: State = useHeadersContext();
  const switchPoint = useSelector((state: StoreState) => state.breakpoint);

  const apiUrl = process.env.API_URL;
  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data: locations, error } = useSWR(`${apiUrl}/locations`, fetcher);


  // viewportの幅からモバイルかどうかを判断
  const [isMobile, setIsMobile] = useState<boolean>();
  const setViewPortWidth = () => {
    const viewPortwWidth = window.innerWidth;
    const isWidthMobile = viewPortwWidth < switchPoint;
    setIsMobile(isWidthMobile);
    if (!isWidthMobile) return dispatch({ type: `inactiveModal` });
  }
  useEffect(() => {
    setViewPortWidth();
    window.addEventListener("resize", setViewPortWidth);
    return () => {
      window.removeEventListener("resize", setViewPortWidth);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({ type: `inactiveModal` });
    router.push(`/`);
    return;
  }


  // set <header> height to HeadersContext
  const element = useRef(null)
  useEffect(() => {
    const headerHeight: number = element.current.clientHeight;
    dispatch({ type: `setHeaderHeight`, payload: headerHeight });
  }, [element])

  return (
    <header
      ref={element}
      className={`t-header-height bg-white fixed flex justify-center top-0 left-0 w-full z-50 duration-300 ${
        state.isModalActive ? `bg-opacity-100` : `bg-opacity-90`
      }`}
    >
      <div
        className={`flex relative items-center w-[90%] max-w-[1024px] mx-auto`}
      >
        {isMobile ? (
          <HeaderNavOnMobile />
        ) : (
          isMobile !== undefined && (
            <HeaderNavOnPC locations={locations} error={error} />
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
        {state.isModalActive && (
          <MainModal locations={locations} error={error} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
