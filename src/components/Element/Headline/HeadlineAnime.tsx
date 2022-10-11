import React from "react";
import { motion } from "framer-motion";

export type PtopsType = {
  children: React.ReactNode;
};

const variants = {
  initial: { opacity: 0, x: 30 },
  in: { opacity: 1, x: 0, transition: { duration: 1 } },
};

export const HeadlineAnime = ({ children }: PtopsType) => {
  return (
    <div className={`flex justify-center items-center pb-2 text-green-600 overflow-hidden`}>
      <motion.h1
        variants={variants}
        initial="initial"
        whileInView="in"
        viewport={{ once: true, amount: 0 }}
        className={`t-under-border mt-5 mx-auto`}
      >
        {children}
      </motion.h1>
    </div>
  );
};
