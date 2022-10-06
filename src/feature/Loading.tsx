import React from "react";
import { motion, Variants } from "framer-motion";

export const Loading = (): JSX.Element => {
  const loadingString = Array.from("Loading...");

  const loadingVariant: Variants = {
    hidden: { opacity: 0 },
    loading: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
      },
    }),
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={`absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center z-20`}
    >
      {loadingString.map((el, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="loading"
          variants={loadingVariant}
          className={`text-green-600 text-md tracking-widest font-extralight select-none`}
        >
          {el}
        </motion.span>
      ))}
    </motion.div>
  );
};
