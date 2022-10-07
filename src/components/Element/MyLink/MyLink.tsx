import React from "react";
import Link from "next/link";
import clsx from "clsx";

export type MyLinkType = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export const MyLink = ({ children, href, className, ...props }: MyLinkType) => {
  return (
    <Link href={href} passHref>
      <a className={className} {...props}>
        {children}
      </a>
    </Link>
  );
};
