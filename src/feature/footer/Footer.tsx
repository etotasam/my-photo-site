import { useRef, useEffect } from "react";
// import { useHeihgtDispatchContext } from "@/context/heightStateContext";
import { useHeihgtDispatchContext } from "@/context/heightStateContext";

export const Footer = () => {
  const { setFooterHeightDispatcher } = useHeihgtDispatchContext();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const height: number = ref.current.clientHeight;
    setFooterHeightDispatcher(height);
  }, [ref]);
  return (
    <footer ref={ref} className={`t-footer-height text-gray-600 font-light flex justify-center items-center`}>
      <div>{`©${process.env.NEXT_PUBLIC_SITE_TITLE}`}</div>
    </footer>
  );
};
