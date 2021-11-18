import {useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import { useHeadersContext, InitialState } from "@/components/header/HeadersContext";

type Props = {
  siteTitle: string;
};

type State = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}


const Footer = () => {
  // const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const element = useRef(null)
  const { state: contextState, dispatch }: State = useHeadersContext();
  useEffect(() => {
    const height: number = element.current.clientHeight
    dispatch({type: `setFooterHeight`, payload: height})
  }, [element])
  return (
    <footer ref={element} className={`t-footer-height flex justify-center items-center`}>
      <div>{`©${process.env.NEXT_PUBLIC_SITE_TITLE}`}</div>
    </footer>
  );
};

export default Footer;
