import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index"; //useSelectorのstateの型
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import { HeadersContextProvider } from "@/components/header/HeadersContext";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);

  const setHeight = (): void => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--window-vh", `${vh}px`);
  }
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
        {isModalActive && <style>{`body {overflow-y: hidden}`}</style>}
      </Head>
      <HeadersContextProvider>
        <Header />
        <main className={`t-main`}>{children}</main>
        <Footer />
      </HeadersContextProvider>
    </>
  );
};

export default Layout;
