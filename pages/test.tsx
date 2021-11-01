import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import moment from "moment";

interface Props {
  posts: {
    date: string;
    title: string;
  }[];
}

const Test = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className={`bg-red-200 p-5`}>
      <pre>{JSON.stringify(posts[0], null, 2)}</pre>
      <h1>Test page</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className={`bg-green-400 my-5 p-3 rounded`}>
            <p>投稿日時:{moment(post.date).format(`YYYY年M月D日`)}</p>
            <p>記事タイトル:{post.title}</p>
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
    .filter(
      (file) =>
        file.name.slice(file.name.lastIndexOf(`.`)).match(/\.mdx?/) &&
        !file.isDirectory()
    );

  const posts = filenames
    .map((filename) => {
      const filepath = path.join(postDirPath, filename.name);
      const fileContents = fs.readFileSync(filepath, `utf-8`);
      const { orig, ...prop } = matter(fileContents);
      return {
        title: prop.data.title,
        date: moment(prop.data.date).toJSON(),
      };
    })
    .filter((el) => el !== undefined);

  return {
    props: {
      posts,
    },
  };
};

export default Test;
