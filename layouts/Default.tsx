import React, { useEffect } from "react";
// import { Header } from "@/components/header/Header";
import { HeaderContainer } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import { ModalStateProvider } from "@/context/modalStateContext";
import { LoadStateProvider } from "@/context/loadStateContext";
import { HeightProvider } from "@/context/heightStateContext";
import { LocationNamesProvider } from "@/context/locationNamesContext";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  // const isModalActive = useSelector((state: StoreState) => state.isModalActive);

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
        {/* {isModalActive && <style>{`body {overflow-y: hidden}`}</style>} */}
      </Head>
      <LocationNamesProvider>
        <HeightProvider>
          <LoadStateProvider>
            <ModalStateProvider>
              <HeaderContainer />
              <main className={`t-main`}>{children}</main>
              <Footer />
            </ModalStateProvider>
          </LoadStateProvider>
        </HeightProvider>
      </LocationNamesProvider>
    </>
  );
};

export default Layout;
