import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";

type Props = {
  siteTitle: string;
};

const Footer = () => {
  // const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  return (
    <footer className={`t-footer-height flex justify-center items-center`}>
      <div>{`©${process.env.NEXT_PUBLIC_SITE_TITLE}`}</div>
    </footer>
  );
};

export default Footer;
