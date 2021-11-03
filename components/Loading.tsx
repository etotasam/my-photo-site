import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingModal = (): JSX.Element => {
  const loading = Array.from("Loading...");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className={`absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center z-20`}
    >
      <div>
        {loading.map((el, index) => (
          <motion.p
            key={index}
            custom={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              },
            }}
            className={`inline text-green-600 text-md tracking-widest font-extralight`}
          >
            {el}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingModal;
