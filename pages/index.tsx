import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import TopPhotoViewer from "@/components/top-photo-viewer/TopPhotoViewer";
import SiteDiscription from "@/components/SiteDiscription";
import Location from "@/components/photo-category/Location";
import News from "@/components/News";
import { StoreState } from "@/store/index";
import { GetStaticProps } from "next";
import { getFirestore } from "firebase/firestore";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import moment from "moment";
import Loading from "@/components/Loading";

type Params = {
  allImages: Record<string, ImageType[]>;
  topImagesByRandom: ImageType[];
  locations: ImageType[];
  newsTitles: NewsTitles[];
};

type NewsTitles = {
  title: string;
  date: string;
};

const Home = ({
  allImages,
  topImagesByRandom,
  locations,
  newsTitles,
}: Params) => {
  const isModalActive = useSelector((state: StoreState) => state.isModalActive);
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  // imageのpre loading;
  let imagesState = {};
  useEffect(() => {
    topImagesByRandom.forEach((el) => {
      const label = el.id.split(`_`)[0];
      imagesState[label] = false;
      const img = new Image();
      img.onload = () => {
        imagesState[label] = true;
        const state = Object.keys(imagesState).reduce(
          (acc: boolean, next: string) => {
            return true === imagesState[next];
          },
          true
        );
        setIsImgLoaded(state);
      };
      img.src = el.url;
    });
  }, []);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        {isModalActive && <style>{`body {overflow-y: hidden}`}</style>}
      </Head>
      <div className={`md:flex md:justify-between`}>
        <TopPhotoViewer
          topImagesByRandom={topImagesByRandom}
          allImages={allImages}
        />
        <section className={`md:w-1/3 flex md:justify-end`}>
          <SiteDiscription />
        </section>
      </div>
      <div className={`mt-5`}>
        <News news={newsTitles} />
      </div>
      <div>
        <Location locations={locations} />
      </div>
      {!isImgLoaded && (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
};

// firestore
const db = getFirestore();

export type ImageType = {
  documentId: string;
  id: string;
  url: string;
  filename: string;
  width: number;
  height: number;
};

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl = process.env.API_URL;
  try {
    const allImagesData = await axios.get(`${apiUrl}/all_images`);
    const allImages: Record<string, ImageType[]> = allImagesData.data;

    const topImagesByRandom = Object.keys(allImages)
      .map((key) => {
        const length = allImages[key].length;
        const min = 0;
        const max = length - 1;
        const randam = Math.floor(Math.random() * (max + 1 - min)) + min;
        return allImages[key][randam];
      })
      .filter((e) => e !== undefined);

    const locations = Object.keys(allImages).map((key) => {
      const length = allImages[key].length;
      const min = 0;
      const max = length - 1;
      let isSame: boolean;
      let randomLocation: ImageType;
      do {
        const randam = Math.floor(Math.random() * (max + 1 - min)) + min;
        randomLocation = allImages[key][randam];
        isSame = topImagesByRandom.some((e) => e.id === randomLocation.id);
      } while (isSame);
      return randomLocation;
    });

    return {
      props: {
        allImages,
        locations,
        newsTitles: getPostsTitles(),
        topImagesByRandom,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

//posts/内の.mdファイルを取得してdateでsortしてorigのデータは弾くrestructureして
const getPostsTitles = () => {
  const dirPath = path.join(process.cwd(), `posts`);
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((dirEnt) => !dirEnt.isDirectory())
    .map((dirEnt) => {
      const filePath = path.join(dirPath, dirEnt.name);
      return fs.readFileSync(filePath);
    })
    .map((f) => {
      const { orig, ...post } = matter(f);
      return post;
    })
    .sort((a, b) => {
      const NumA = Number(moment(a.data.date).format(`YYYYMMDD`));
      const NumB = Number(moment(b.data.date).format(`YYYYMMDD`));
      if (NumA > NumB) return -1;
      if (NumA < NumB) return 1;
      return 0;
    })
    .map((f) => {
      return { title: f.data.title, date: f.data.date };
    })
    .slice(0, 5);
};

export default Home;
