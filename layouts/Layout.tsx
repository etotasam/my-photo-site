import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index"; //useSelectorのstateの型
import Header from "@/components/header/Header";
import { HeadersContextProvider } from "@/components/header/HeadersContext";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);

  return (
    <>
      <HeadersContextProvider>
        <Header />
      </HeadersContextProvider>
      <main className={`t-def-main`}>{children}</main>
      <footer className={`t-def-footer flex justify-center items-center`}>
        <div className={`test`}>{`©${siteTitle}`}</div>
      </footer>
    </>
  );
};

export default Layout;
