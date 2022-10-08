import React from "react";
import clsx from "clsx";

export type HeadlineType = {
  className?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const Headline = ({ className, children, textColor }: HeadlineType) => {
  return (
    <div className={clsx(`flex justify-center items-center`, textColor || `text-green-600`, className)}>
      <h1 className={clsx(`t-under-border mt-5 mx-auto`)}>{children}</h1>
    </div>
  );
};
