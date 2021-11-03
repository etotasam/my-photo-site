import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index"; //useSelectorのstateの型
import Link from "next/link";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Plain: React.FC<ChildElement> = ({ children }) => {
  // const siteTitle = useSelector((state: StoreState) => state.siteTitle);

  return (
    <>
      <header
        className={`t-header-height bg-white fixed flex justify-center top-0 left-0 w-full z-50 duration-300`}
      >
        <div>
          <Link href={`/`}>
            <a
              className={`n-title-font text-green-600 text-xl tracking-wider font-extralight`}
            >
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </a>
          </Link>
        </div>
      </header>
      <main className={`t-main-height`}>{children}</main>
    </>
  );
};

export default Plain;
