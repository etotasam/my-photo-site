import React from "react";
import dayjs from "dayjs";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
//! component
import { MyLink } from "@/components/Element/MyLink";
import { HeadlineAnime } from "@/components/Element/Headline";

export type NewsType = {
  news: {
    title: string;
    date: string;
  }[];
};

export const News = ({ news }: NewsType) => {
  return (
    <section className="overflow-hidden">
      <HeadlineAnime>News</HeadlineAnime>
      <Messages news={news} />
    </section>
  );
};

//! parts
type MessagesPropsType = {
  news: {
    title: string;
    date: string;
  }[];
};
export const Messages = ({ news }: MessagesPropsType) => {
  //? アニメーション
  const control = useAnimation();
  const animation = () => {
    const delay = 0.3;
    control.start((i: number) => {
      return { x: [50, 0], opacity: [0, 1], transition: { duration: 1, delay: delay * i } };
    });
  };

  //? react-intersection-observer
  const { ref: ulElRef, inView } = useInView({
    rootMargin: "0px",
    triggerOnce: true,
  });
  React.useEffect(() => {
    if (!inView) return;
    animation();
  }, [inView]);

  return (
    // <section className={`mt-5 overflow-hidden`}>
    <ul ref={ulElRef} className={`mt-5`}>
      {news &&
        news.map((f, index) => (
          <li key={index} className={`animate flex flex-col font-thin text-sm mb-2 last-of-type:mb-0`}>
            <time className={`text-xs`}>{dayjs(f.date).format(`YYYY/M/D`)}</time>
            <motion.div
              animate={control}
              custom={index}
              className={`pl-3 t-news_title-base hover:t-news_title pointer-events-none opacity-0`}
            >
              <MyLink href={`/news/${f.title}`} className={`pointer-events-auto text-gray-600 font-light`}>
                {f.title}
              </MyLink>
            </motion.div>
          </li>
        ))}
    </ul>
    // </section>
  );
};
