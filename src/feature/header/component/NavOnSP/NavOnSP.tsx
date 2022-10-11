import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";

export type NavOnSPType = {
  toggleModal: () => void;
  isModalActive: boolean;
};

const Hamburger = ({ isModalActive, toggleModal }: NavOnSPType) => {
  const controls: any = useAnimation();
  const startAnimate = () => {
    if (isModalActive) {
      controls.start((i: number) => i === 0 && { rotate: 45, y: "9.5px", width: "100%" });
      controls.start((i: number) => i === 1 && { opacity: 0, width: "0%" });
      controls.start((i: number) => i === 2 && { rotate: -45, y: "-9.5px" });
    }
    if (!isModalActive) {
      controls.start((i: number) => i === 0 && { rotate: 0, y: "0px", width: "50%" });
      controls.start((i: number) => i === 1 && { opacity: 1, width: "75%" });
      controls.start((i: number) => i === 2 && { rotate: 0, y: "0px" });
    }
  };

  const initialAnime = () => {
    controls.start((i: number) => i === 2 && { opacity: [0, 0.3, 1], x: [-20, 2, 0], transition: { duration: 1 } });
    controls.start(
      (i: number) => i === 1 && { opacity: [0, 0.3, 1], x: [-20, 4, 0], transition: { duration: 1, delay: 0.3 } }
    );
    controls.start(
      (i: number) => i === 0 && { opacity: [0, 0.3, 1], x: [-20, 6, 0], transition: { duration: 1, delay: 0.6 } }
    );
  };

  useEffect(() => {
    initialAnime();
  }, []);

  useEffect(() => {
    startAnimate();
  }, [isModalActive]);

  return (
    <div data-testid={`humburger`} onClick={toggleModal} className={`relative w-[25px] h-[20px] cursor-pointer`}>
      <motion.span
        className={clsx(`absolute top-0 left-0 inline-block w-1/2 h-[1px]`, isModalActive ? `bg-white` : `bg-gray-700`)}
        custom={0}
        initial={{ opacity: 0, x: -20 }}
        animate={controls}
        transition={{ duration: 0.4 }}
      ></motion.span>
      <motion.span
        className={clsx(
          `absolute top-[45%] left-0 inline-block w-3/4 h-[1px]`,
          isModalActive ? `bg-white` : `bg-gray-700`
        )}
        custom={1}
        initial={{ opacity: 0, x: -20 }}
        animate={controls}
        transition={{ duration: 0.4 }}
      ></motion.span>
      <motion.span
        className={clsx(
          `absolute bottom-0 left-0 inline-block w-full h-[1px]`,
          isModalActive ? `bg-white` : `bg-gray-700`
        )}
        custom={2}
        initial={{ opacity: 0, x: -20 }}
        animate={controls}
        transition={{ duration: 0.4 }}
      ></motion.span>
    </div>
  );
};

export const NavOnSP = ({ isModalActive, toggleModal }: NavOnSPType) => {
  return (
    <>
      <Hamburger isModalActive={isModalActive} toggleModal={toggleModal} />
    </>
  );
};
