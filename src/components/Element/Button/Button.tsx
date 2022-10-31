import React from "react";
import clsx from "clsx";

export type ButtonType = {
  color?: string;
} & React.ComponentProps<"button">;

export const Button = ({ children, color, className, onClick }: ButtonType) => {
  return (
    <>
      <button
        onClick={onClick}
        className={clsx(
          color ? color : "bg-green-400 hover:bg-green-600 text-white",
          "duration-300 rounded-lg  px-4 py-1 mt-3",
          className
        )}
      >
        {children}
      </button>
    </>
  );
};
