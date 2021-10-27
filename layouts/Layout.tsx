import { useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index"; //useSelectorのstateの型
import Header from "@/components/header/Header";
import { HeadersContextProvider } from "@/components/header/HeadersContext";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<ChildElement> = ({ children }) => {
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);

  // globals.cssの var(--vh を取得する為の関数
  function setHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
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
      <HeadersContextProvider>
        <Header />
      </HeadersContextProvider>
      <main className={`t-main-height`}>{children}</main>
      <footer className={`t-footer-height flex justify-center items-center`}>
        <div>{`©${siteTitle}`}</div>
      </footer>
    </>
  );
};

export default Layout;
