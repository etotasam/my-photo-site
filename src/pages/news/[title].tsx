import * as path from "path";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import matter from "gray-matter";
import marked from "marked";
import Head from "next/head";
import dayjs from "dayjs";
import { motion } from "framer-motion";
//! api
import { fetchLocationNamesApi } from "@/api/imagesApi";
//! context
import { useLocationNamesDispatchContext } from "@/context/locationNamesContext";
import React from "react";

interface Props {
  date: string;
  content: string;
  title: string;
  locationNames: string[];
}

const Title = ({ date, content, title, locationNames }: Props) => {
  const { setLocationNamesDispatcher } = useLocationNamesDispatchContext();

  React.useEffect(() => {
    setLocationNamesDispatcher(locationNames);
  }, []);
  return (
    <>
      <Head>
        <title>{`News ${title}`}</title>
      </Head>
      <div className={`font-serif`}>
        <time className={`text-gray-400 pt-5`}>{dayjs(date).format(`YYYY年M月D日`)}</time>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          className={`py-5`}
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsAll().map((post) => {
    return { params: { title: post!.title as string } };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { title } }: { params: { title: string } }) => {
  const locationNames = await fetchLocationNamesApi();
  const posts = getPostsAll().find((p) => p!.title === title);
  return {
    props: {
      date: posts!.date,
      content: posts!.content,
      title,
      locationNames,
    },
  };
};

const getPostsAll = () => {
  const postsDirPath = path.join(process.cwd(), `src/posts`);
  return fs
    .readdirSync(postsDirPath, { withFileTypes: true })
    .filter((dirEnt) => !dirEnt.isDirectory() && dirEnt.name.slice(dirEnt.name.lastIndexOf(`.`)).match(/\.mdx?/))
    .map((dirEnt) => {
      const filePath = path.join(postsDirPath, dirEnt.name);
      return fs.readFileSync(filePath);
    })
    .map((file) => {
      const { orig, ...post } = matter(file);
      if (post.data.title === undefined || post.data.date === undefined) return;
      return {
        content: post.content,
        title: post.data.title,
        date: dayjs(post.data.date).toJSON(),
      };
    })
    .filter((el) => el !== undefined);
};

export default Title;
