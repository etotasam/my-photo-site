import * as path from "path";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import matter from "gray-matter";
import marked from "marked";
import moment from "moment";

interface Props {
  content: string;
  data: DataType;
}

interface DataType {
  title: string;
  date: string;
}

const Title = ({ data, content }: Props) => {
  return (
    <div className={`font-serif`}>
      <p className={`text-gray-400 pt-5`}>{data.date}</p>
      <div
        className={`py-5`}
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsAll().map((post) => {
    return { params: { title: post.data.title } };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { title } }) => {
  const { content, data } = getPostsAll().find((p) => p.data.title === title);
  return {
    props: {
      data,
      content,
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
      return post;
    })
    .filter((el) => el !== undefined);
};

export default Title;
