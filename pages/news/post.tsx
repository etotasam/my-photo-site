import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import Loading from "@/components/Loading";

const db = getFirestore();
const collectionNews = collection(db, "news");

type typeNews = {
  news: string;
  timestamp: { seconds: number; nanoseconds: number };
};

export const getStaticProps: GetStaticProps = async () => {
  // `getStaticProps` はサーバー側で実行されます
  const newsData = [];
  const res = await getDocs(
    query(collectionNews, orderBy("timestamp", "desc"))
  );
  res.docs.map((doc) => {
    newsData.push(doc.data());
  });
  const json = JSON.stringify(newsData);
  return {
    props: {
      newsData: json,
      layout: "plain",
    },
  };
};

const Post: React.FC = ({
  newsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("post");
  const router = useRouter();
  const auth = getAuth();
  const [newNews, setNewNews] = useState<string>("");
  const [testData, setTestData] = useState<typeNews[]>(JSON.parse(newsData));

  async function newsPost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      const news = await addDoc(collectionNews, {
        news: newNews,
        timestamp: serverTimestamp(),
      });
      console.log(news.id);
      setNewNews("");
    } catch (err) {
      throw new Error(err);
    }
  }

  function Logout() {
    signOut(auth)
      .then(() => router.push(`/login`))
      .catch((err) => console.log(err));
  }

  const [isAuthUser, setIsAuthUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthUser(true);
      } else {
        router.push(`/login`);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      {isAuthUser ? (
        <div>
          <h1>Post</h1>
          <button
            onClick={Logout}
            className={`bg-red-600 text-white py-1 px-3`}
          >
            ログアウト
          </button>
          <form>
            <input
              type="text"
              value={newNews}
              id={`news`}
              onChange={(e) => setNewNews(e.target.value)}
            />
            <button
              className={`bg-green-400 text-white py-1 px-3`}
              onClick={(e) => newsPost(e)}
            >
              テスト
            </button>
          </form>
          <div>
            <ul>
              {testData &&
                testData.map((el, index) => <li key={index}>{el.news}</li>)}
            </ul>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Post;
