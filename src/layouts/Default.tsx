import React, { useEffect } from "react";
//! component
import { CommonMeta } from "@/components/CommonMeta";
import { HeaderContainer } from "@/feature/header/Header";
import { Footer } from "@/feature/footer";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const setHeight = (): void => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--window-vh", `${vh}px`);
  };
  useEffect(() => {
    setHeight();
    window.addEventListener(`resize`, setHeight);
    return () => {
      window.removeEventListener(`resize`, setHeight);
    };
  }, []);

  return (
    <>
      <CommonMeta title={process.env.NEXT_PUBLIC_SITE_TITLE!} />
      <HeaderContainer />
      <main className={`t-main`}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
