// import React from "react";

type NoSSR_Element = {
  children: JSX.Element | JSX.Element[];
};
const NoSSR = ({ children }: NoSSR_Element) => {
  return <>{children}</>;
};

export default NoSSR;
