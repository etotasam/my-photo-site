import React, { useEffect } from "react";
import Head from "next/head";
//! component
import { HeaderContainer } from "@/components/header/Header";
import Footer from "@/components/Footer";

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
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_TITLE}</title>
      </Head>
      <HeaderContainer />
      <main className={`t-main`}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
