import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={`t-main-height flex justify-center items-center`}>
      <div className={`text-center`}>
        <h1 className={`text-5xl mb-5`}>404</h1>
        <p className={`mb-2`}>ご指定のページが見つかりませんでした</p>
        <p>お探しのページは削除されたか、URLが変更された可能性があります</p>
        <Link href={`/`}>
          <a
            className={`inline-block text-white bg-green-400 rounded-full py-2 px-10 mt-5`}
          >
            Homeへ
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      layout: `plain`,
    },
  };
};

export default NotFound;
