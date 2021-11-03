import * as path from "path";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import matter from "gray-matter";
import marked from "marked";
import moment from "moment";
import Head from "next/head";

interface Props {
  date: string;
  content: string;
  title: string;
}

const Title = ({ date, content, title }: Props) => {
  return (
    <>
      <Head>
        <title>{`News ${title}`}</title>
      </Head>
      <div className={`font-serif`}>
        <p className={`text-gray-400 pt-5`}>
          {moment(date).format(`YYYY年M月D日`)}
        </p>
        <div
          className={`py-5`}
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsAll().map((post) => {
    return { params: { title: post.title } };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  const posts = getPostsAll().find((p) => p.title === title);
  return {
    props: {
      date: posts.date,
      content: posts.content,
      title,
    },
  };
};

const getPostsAll = () => {
  const postsDirPath = path.join(process.cwd(), `posts`);
  return fs
    .readdirSync(postsDirPath, { withFileTypes: true })
    .filter(
      (dirEnt) =>
        !dirEnt.isDirectory() &&
        dirEnt.name.slice(dirEnt.name.lastIndexOf(`.`)).match(/\.mdx?/)
    )
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
        date: moment(post.data.date).toJSON(),
      };
    })
    .filter((el) => el !== undefined);
};

export default Title;
