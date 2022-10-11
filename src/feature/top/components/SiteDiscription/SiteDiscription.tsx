import React from "react";
import { motion, useAnimation } from "framer-motion";

export type SiteDiscriptionPropsType = {
  device: "PC" | "SP" | undefined;
};

export const SiteDiscription = ({ device }: SiteDiscriptionPropsType) => {
  const control: any = useAnimation();
  const animation = () => {
    const delay = 0.3;
    if (device === "PC") {
      control.start((i: number) => {
        return {
          y: [80, 0],
          filter: ["blur(15px)", "blur(0px)"],
          opacity: [0, 1],
          transition: { duration: 1, delay: delay * i },
        };
      });
    }

    if (device === "SP") {
      control.start((i: number) => {
        return { x: [80, 0], opacity: [0, 1], transition: { duration: 1, delay: delay * i } };
      });
    }
  };
  const isAnimationLoaded = React.useRef(false);
  React.useEffect(() => {
    if (isAnimationLoaded.current) return;
    if (!device) return;
    animation();
    isAnimationLoaded.current = true;
  }, [device]);
  return (
    <>
      <div className={`md:t-text-vertical font-serif px-2 pt-5 font-thin text-gray-500 overflow-hidden`}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className={`text-xl font-bold mb-5 md:mb-0 md:ml-5`}
        >
          よく写真を撮っていた
        </motion.h1>
        <p className={`t-font-clamp-sm leading-7 md:leading-9 tracking-widest`}>
          <motion.span className={"inline-block"} initial={{ opacity: 0 }} animate={control} custom={0}>
            ただ写真を掲載しているwebサイトです
          </motion.span>
          <br />
          <motion.span className={"inline-block"} initial={{ opacity: 0 }} animate={control} custom={1}>
            血迷って4×5カメラを買った事もあります
          </motion.span>
          <br />
          <motion.span className={"inline-block"} initial={{ opacity: 0 }} animate={control} custom={2}>
            よく旅行に行ったのでその時の写真が多いです
          </motion.span>
          <br />
          <motion.span className={"inline-block"} initial={{ opacity: 0 }} animate={control} custom={3}>
            写真を眺めてると撮りたくなります
          </motion.span>
          <br />
          <motion.span className={"inline-block"} initial={{ opacity: 0 }} animate={control} custom={4}>
            自分の写真を眺めてると特に撮りたくなります
          </motion.span>
          <br />
          <motion.span className={"inline-block"} initial={{ opacity: 0 }} animate={control} custom={5}>
            だから作ったwebサイトです
          </motion.span>
        </p>
      </div>
    </>
  );
};
