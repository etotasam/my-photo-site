import PhotoViewerContainer from "@/components/top-photo-viewer/PhotoViewerContainer";
import SiteDiscription from "@/components/SiteDiscription";
import Location from "@/components/location/Location/Location";
import { News } from "@/components/News";
import { GetStaticProps } from "next";
import { getFirestore } from "firebase/firestore";
import matter from "gray-matter";
import moment from "moment";
import * as fs from "fs";
import * as path from "path";
import { ImagesType } from "@/@types/types";
import { fetchAllImagesApi } from "@/api/imagesApi";

type Params = {
  allImages: Record<string, ImagesType[]>;
  randomTopImages: ImagesType[];
  locations: ImagesType[];
  newsTitles: NewsTitles[];
};

type NewsTitles = {
  title: string;
  date: string;
};

const Home = ({ allImages, randomTopImages, locations, newsTitles }: Params) => {
  return (
    <>
      <div className={`md:flex md:justify-between relative`}>
        <PhotoViewerContainer randomTopImages={randomTopImages} allImages={allImages} />
        <section className={`flex md:justify-end`}>
          <SiteDiscription />
        </section>
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
// const db = getFirestore();

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allImages = await fetchAllImagesApi();

    //? トップ画面に表示させる写真を各locationからランダムに1枚ずつセレクト
    const randomTopImages = Object.values(allImages)
      .map((imageInfo) => {
        const length = imageInfo.length;
        if (!length) return;
        const min = 0;
        const max = length - 1;
        const random = Math.floor(Math.random() * (max + 1 - min)) + min;
        return imageInfo[random];
      })
      .filter((el) => el !== undefined);

    //? Locationエリアのリンクに表示させる写真を選択(トップ画面のカルーセル？に表示される写真と同じにならない様にする)
    const locations = Object.values(allImages)
      .map((ImageInfo) => {
        const length = ImageInfo.length;
        if (!length) return;
        const min = 0;
        const max = length - 1;
        let isImageSame: boolean;
        let randomLocation: ImagesType;
        do {
          const random = Math.floor(Math.random() * (max + 1 - min)) + min;
          randomLocation = ImageInfo[random];
          isImageSame = randomTopImages.some((el) => el!.id === randomLocation.id);
        } while (isImageSame);
        return randomLocation;
      })
      .filter((e) => e !== undefined);

    return {
      props: {
        allImages,
        locations,
        newsTitles: getPostsTitles(),
        randomTopImages,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        allImages: [],
        locations: [],
        newsTitles: getPostsTitles(),
        randomTopImages: [],
      },
    };
  }
};

//? posts/内の.mdファイルを取得してdateでsortしてorigのデータは弾くrestructureして
const getPostsTitles = () => {
  const dirPath = path.join(process.cwd(), `posts`);
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((dirEnt) => !dirEnt.isDirectory() && dirEnt.name.slice(dirEnt.name.lastIndexOf(`.`)).match(/\.mdx?/))
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
      const NumA = moment(a!.data.date);
      const NumB = moment(b!.data.date);
      if (NumA > NumB) return -1;
      if (NumA < NumB) return 1;
      return 0;
    })
    .map((f) => {
      return {
        title: f!.data.title,
        date: moment(f!.data.date).toJSON(),
      };
    })
    .slice(0, 5);
};

export default Home;
