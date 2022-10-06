import React from "react";
import { motion } from "framer-motion";

export const LoadingBound = (): JSX.Element => {
  // const loading = Array.from("Loading...");
  const loading = Array.from("Loading...");

  const boundVariant = {
    bound: (i: number) => ({
      y: [0, -15],
      transition: {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeOut",
        delay: i * 0.3,
      },
    }),
  };

  const loadingVariant = {
    hidden: { opacity: 0 },
    laoding: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 1,
        yoyo: Infinity,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      className={`absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center z-20`}
    >
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.5 } }}
      >
        <motion.div
          variants={boundVariant}
          custom={0}
          animate={`bound`}
          className="bg-green-500 rounded-lg ml-1 w-2 h-2"
        />
        <motion.div
          variants={boundVariant}
          custom={1}
          animate={`bound`}
          className="bg-green-500 rounded-lg ml-1 w-2 h-2"
        />
        <motion.div
          variants={boundVariant}
          custom={2}
          animate={`bound`}
          className="bg-green-500 rounded-lg ml-1 w-2 h-2"
        />
      </motion.div>
    </motion.div>
  );
};
