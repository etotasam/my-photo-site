import React from "react";
import dayjs from "dayjs";
//! component
import { MyLink } from "@/components/Element/MyLink";
import { Headline } from "@/components/Element/Headline";

export type NewsType = {
  news: {
    title: string;
    date: string;
  }[];
};

export const News = ({ news }: NewsType) => {
  return (
    <>
      <Headline>News</Headline>
      <ul className={`mt-5`}>
        {news &&
          news.map((f, index) => (
            <li key={index} className={`flex flex-col font-thin text-sm mb-2 last-of-type:mb-0`}>
              <time className={`text-xs`}>{dayjs(f.date).format(`YYYY/M/D`)}</time>
              <div className={`pl-3 t-news_title-base hover:t-news_title pointer-events-none`}>
                <MyLink href={`/news/${f.title}`} className={`pointer-events-auto text-gray-600 font-light`}>
                  {f.title}
                </MyLink>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
