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
      {data.date && <p>{moment(data.date).format(`YYYY年M月D日`)}</p>}
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
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
  console.log(data);
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
    .filter((dirEnt) => !dirEnt.isDirectory())
    .map((dirEnt) => {
      const filePath = path.join(postsDirPath, dirEnt.name);
      return fs.readFileSync(filePath);
    })
    .map((f) => {
      const { orig, ...post } = matter(f);
      return post;
    });
};

export default Title;
