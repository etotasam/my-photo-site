import React, { useEffect } from "react";
import { useModalStateContext, useModalDispatchContext, ModalState } from "@/context/modalStateContext";
import { motion, useAnimation } from "framer-motion";

const Humburger = () => {
  const { isModalActive }: ModalState = useModalStateContext();
  const { modalOpenDispathcer, modalCloseDispatcher } = useModalDispatchContext();

  function toggleModal() {
    if (isModalActive) return modalCloseDispatcher();
    modalOpenDispathcer();
  }

  useEffect(() => {
    startAnimate();
  }, [isModalActive]);

  useEffect(() => {
    return () => {};
  });

  const controls = useAnimation();
  const startAnimate = () => {
    if (isModalActive) {
      controls.start((i) => i === 0 && { rotate: 45, y: "9.5px", width: "100%" });
      controls.start((i) => i === 1 && { opacity: 0, width: "0%" });
      controls.start((i) => i === 2 && { rotate: -45, y: "-9.5px" });
    }
    if (!isModalActive) {
      controls.start((i) => i === 0 && { rotate: 0, y: "0px", width: "50%" });
      controls.start((i) => i === 1 && { opacity: 1, width: "75%" });
      controls.start((i) => i === 2 && { rotate: 0, y: "0px" });
    }
  };
  return (
    <>
      <div data-testid={`humburger`} onClick={toggleModal} className={`relative w-[25px] h-[20px] cursor-pointer`}>
        <motion.span
          className={`absolute top-0 left-0 inline-block w-1/2 h-[1px] bg-gray-700`}
          custom={0}
          animate={controls}
          transition={{ duration: 0.4 }}
        ></motion.span>
        <motion.span
          className={`absolute top-[45%] left-0 inline-block w-3/4 h-[1px] bg-gray-700`}
          custom={1}
          animate={controls}
          transition={{ duration: 0.4 }}
        ></motion.span>
        <motion.span
          className={`absolute bottom-0 left-0 inline-block w-full h-[1px] bg-gray-700`}
          custom={2}
          animate={controls}
          transition={{ duration: 0.4 }}
        ></motion.span>
      </div>
    </>
  );
};

export const HeaderNavOnMobile = () => <Humburger />;
