import { useRef, useEffect } from "react";
import { useHeihgtDispatchContext } from "@/context/heightStateContext";

const Footer = () => {
  const { setFooterHeightDispatcher } = useHeihgtDispatchContext();
  const element = useRef(null);
  useEffect(() => {
    const height: number = element.current.clientHeight;
    setFooterHeightDispatcher(height);
  }, [element]);
  return (
    <footer ref={element} className={`t-footer-height flex justify-center items-center`}>
      <div>{`©${process.env.NEXT_PUBLIC_SITE_TITLE}`}</div>
    </footer>
  );
};

export default Footer;
