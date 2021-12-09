import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import { useModalStateContext, ModalState } from "@/context/modalStateContext";
import { useHeihgtStateContext } from "@/context/heightStateContext";

type Props = {
  siteTitle: string;
};

type State = {
  state: ModalState;
  dispatch: React.Dispatch<any>;
};

const Footer = () => {
  const { state, dispatch } = useHeihgtStateContext();
  const element = useRef(null);
  useEffect(() => {
    const height: number = element.current.clientHeight;
    dispatch({ type: `setFooterHeight`, payload: height });
  }, [element]);
  return (
    <footer ref={element} className={`t-footer-height flex justify-center items-center`}>
      <div>{`©${process.env.NEXT_PUBLIC_SITE_TITLE}`}</div>
    </footer>
  );
};

export default Footer;
