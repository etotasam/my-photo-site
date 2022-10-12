import React from "react";
import dayjs from "dayjs";
import { motion, useAnimation } from "framer-motion";
//! component
import { MyLink } from "@/components/Element/MyLink";
import { Headline, HeadlineAnime } from "@/components/Element/Headline";

export type NewsType = {
  news: {
    title: string;
    date: string;
  }[];
};

// const variants = {
//   initial: { opacity: 0, y: 30 },
//   in: { opacity: 1, y: 0, transition: { duration: 1 } },
// };

export const News = ({ news }: NewsType) => {
  return (
    <>
      <HeadlineAnime>News</HeadlineAnime>
      <Messages news={news} />
    </>
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
  const ulElRef = React.useRef<HTMLUListElement>(null);

  const control = useAnimation();
  const animation = () => {
    const delay = 0.3;
    control.start((i: number) => {
      return { x: [50, 0], opacity: [0, 1], transition: { duration: 1, delay: delay * i } };
    });
  };
  //? intersection observer
  React.useEffect(() => {
    const trigger = [ulElRef.current];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animation();
          observer.unobserve(entry.target); // 終了させる
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    if (trigger[0]) {
      io.observe(trigger[0]);
    }
  }, []);

  return (
    <section className={`mt-5 overflow-hidden`}>
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
    </section>
  );
};
