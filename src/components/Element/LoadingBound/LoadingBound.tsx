import React from "react";
import { motion } from "framer-motion";

export const LoadingBound = ({ noInitialAnimate = false }: { noInitialAnimate?: boolean }): JSX.Element => {
  const boundVariant = {
    bound: (i: number) => ({
      y: [0, -15],
      transition: {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeOut",
        delay: i * 0.25,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: noInitialAnimate ? 1 : 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={`absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center`}
    >
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: noInitialAnimate ? 1 : 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
      >
        <motion.span
          variants={boundVariant}
          custom={0}
          animate={`bound`}
          className="block bg-green-500 rounded-lg ml-1 w-2 h-2"
        />
        <motion.span
          variants={boundVariant}
          custom={1}
          animate={`bound`}
          className="block bg-green-500 rounded-lg ml-1 w-2 h-2"
        />
        <motion.span
          variants={boundVariant}
          custom={2}
          animate={`bound`}
          className="block bg-green-500 rounded-lg ml-1 w-2 h-2"
        />
      </motion.div>
    </motion.div>
  );
};
