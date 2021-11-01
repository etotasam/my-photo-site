import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Props {
  posts: {
    content: string;
    data: {
      title: string;
    };
    isEnpty: boolean;
  }[];
}

const Test = ({ posts }: Props) => {
  return (
    <div className={`bg-red-200 p-5`}>
      <pre>{JSON.stringify(posts[0], null, 2)}</pre>
      <h1>Test page</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className={`rounded bg-blue-400 p-3 mt-5`}>
            {Object.keys(post.data).length ? (
              <h3>ファイル名:{post.data.title}</h3>
            ) : (
              <h3>タイトルあり</h3>
            )}
            <p>コンテンツ:{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postDirPath = path.join(process.cwd(), "posts");
  const filenames = fs
    .readdirSync(postDirPath, { withFileTypes: true })
    .filter((file) =>
      file.name.slice(file.name.lastIndexOf(`.`)).match(/\.mdx?/)
    );

  const posts = filenames
    .map((filename) => {
      const filepath = path.join(postDirPath, filename.name);
      const file = fs.statSync(filepath);
      if (file.isDirectory()) return;
      const fileContents = fs.readFileSync(filepath, `utf-8`);
      const { orig, ...prop } = matter(fileContents);
      return prop;
    })
    .filter((el) => el !== undefined);

  return {
    props: {
      posts,
    },
  };
};

export default Test;
