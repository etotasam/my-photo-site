import { useEffect, useState } from "react";
import PhotoViewerContainer from "@/components/top-photo-viewer/PhotoViewerContainer";
import SiteDiscription from "@/components/SiteDiscription";
import Location from "@/components/location/Location";
import News from "@/components/News";
import { GetStaticProps } from "next";
import { getFirestore } from "firebase/firestore";
import axios from "axios";
import matter from "gray-matter";
import moment from "moment";
import Loading from "@/components/Loading";
import * as fs from "fs";
import * as path from "path";

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
      <div className={`md:flex md:justify-between relative`}>
        <PhotoViewerContainer
          topImagesByRandom={topImagesByRandom}
          allImages={allImages}
        />
        <section className={`flex md:w-1/3 md:justify-end`}>
          <SiteDiscription />
        </section>
        {!isImgLoaded && <Loading />}
      </div>
      <section className={`mt-5`}>
        <News news={newsTitles} />
      </section>
      <section>
        <Location locations={locations} />
      </section>
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
        const randamIndexNumber =
          Math.floor(Math.random() * (max + 1 - min)) + min;
        randomLocation = allImages[key][randamIndexNumber];
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
    .filter(
      (dirEnt) =>
        !dirEnt.isDirectory() &&
        dirEnt.name.slice(dirEnt.name.lastIndexOf(`.`)).match(/\.mdx?/)
    )
    .map((dirEnt) => {
      const filePath = path.join(dirPath, dirEnt.name);
      return fs.readFileSync(filePath, `utf-8`);
    })
    .map((f) => {
      const { orig, ...post } = matter(f);
      if (post.data.title === undefined || post.data.date === undefined) return;
      return post;
    })
    .filter((el) => el !== undefined)
    .sort((a, b) => {
      const NumA = moment(a.data.date);
      const NumB = moment(b.data.date);
      if (NumA > NumB) return -1;
      if (NumA < NumB) return 1;
      return 0;
    })
    .map((f) => {
      return {
        title: f.data.title,
        date: moment(f.data.date).toJSON(),
      };
    })
    .slice(0, 5);
};

export default Home;
