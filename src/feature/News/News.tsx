import React from "react";
import Link from "next/link";
import dayjs from "dayjs";

export type NewsType = {
  news: {
    title: string;
    date: string;
  }[];
};

export const News = ({ news }: NewsType) => {
  return (
    <>
      <div className={`flex justify-center`}>
        <h1 className={`t-under-border text-green-600 inline-block`}>News</h1>
      </div>
      <ul className={`mt-5`}>
        {news &&
          news.map((f, index) => (
            <li key={index} className={`flex flex-col font-thin text-sm mb-2 last-of-type:mb-0`}>
              <time className={`text-xs`}>{dayjs(f.date).format(`YYYY/M/D`)}</time>
              <div className={`pl-3 t-news_title-base hover:t-news_title pointer-events-none`}>
                <Link href={`/news/${f.title}`}>
                  <a className={`pointer-events-auto text-gray-600 font-light`}>{f.title}</a>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
