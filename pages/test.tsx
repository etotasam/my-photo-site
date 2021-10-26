import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import axios from "axios";
// const matter = require("gray-matter");
import matter from "gray-matter";
import Photo from "./photo";
import { json } from "stream/consumers";

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
  console.log(posts);
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
  const postDirectoy = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postDirectoy);

  const posts = filenames
    .map((filename) => {
      const filepath = path.join(postDirectoy, filename);
      const file = fs.statSync(filepath);
      if (file.isDirectory()) return;
      const fileContents = fs.readFileSync(filepath, `utf-8`);
      const { orig, ...prop } = matter(fileContents);
      console.log(prop);
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
