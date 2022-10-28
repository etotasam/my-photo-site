import { GetStaticProps } from "next";
import matter from "gray-matter";
import * as fs from "fs";
import * as path from "path";
import dayjs from "dayjs";
//! types
import { CreateAtType, ImagesType } from "@/types";
//! context
import { useLocationNamesDispatchContext } from "@/context/locationNamesContext";
import { useEffect } from "react";
//! components
import { Top } from "@/feature/top";
import { News } from "@/feature/News";
import { Location } from "@/feature/location";
//! api
import { fetchAllImagesApi } from "@/api/imagesApi";

type Params = {
  allImages: Record<string, ImagesType[]>;
  topImages: ImagesType[];
  locationsImages: ImagesType[];
  newsTitles: NewsTitles[];
  locationNames: string[];
};

type NewsTitles = {
  title: string;
  date: string;
};

const Home = ({ allImages, topImages, locationsImages, newsTitles, locationNames }: Params) => {
  const { setLocationNamesDispatcher } = useLocationNamesDispatchContext();

  //? locationの名前をheaderに渡す(context)
  useEffect(() => {
    if (!locationNames) return;
    setLocationNamesDispatcher(locationNames);
  }, [locationNames]);
  return (
    <>
      <Top topImages={topImages} />
      <News news={newsTitles} />
      <Location locationsImages={locationsImages} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allImages = await fetchAllImagesApi();

    //? headerに表示させるlocationsを作成
    const locationNames = Object.keys(allImages)
      .map((key) => {
        if (allImages[key].length) {
          return key;
        }
      })
      .filter((obj): obj is string => obj !== undefined);

    //? トップ画面に表示させる写真を各locationからランダムに1枚ずつセレクト
    // const randomTopImages = Object.values(allImages)
    //   .map((imageInfo) => {
    //     const length = imageInfo.length;
    //     if (!length) return;
    //     const min = 0;
    //     const max = length - 1;
    //     const random = Math.floor(Math.random() * (max + 1 - min)) + min;
    //     return imageInfo[random];
    //   })
    //   .filter((el) => el !== undefined);

    //? 最新の写真をトップ画面に表示させる。その為のarrayを作成
    const recentImagesOnLocation = Object.values(allImages)
      .map((images) => {
        const length = images.length;
        if (!length) return;
        const recentImage = images.sort(
          (first, second) => (first.createAt as CreateAtType)._seconds - (second.createAt as CreateAtType)._seconds
        )[length - 1];
        return recentImage;
      })
      .filter((el) => el !== undefined);

    //? Locationエリアのリンクに表示させる写真を選択(トップ画面のカルーセル？に表示される写真と同じにならない様にする)
    const locationsImages = Object.values(allImages)
      .map((ImageInfo) => {
        const length = ImageInfo.length;
        if (!length) return;
        //? 写真が1枚しかない場合は同じになるしかないので、それを表示させる
        if (length < 2) {
          return ImageInfo[0];
        }
        const min = 0;
        const max = length - 1;
        let isImageSame: boolean;
        let randomLocationImage: ImagesType;
        //? 同じ写真にならない様に do while をつかってるので無限ループにならない様に注意
        do {
          const random = Math.floor(Math.random() * (max + 1 - min)) + min;
          randomLocationImage = ImageInfo[random];
          isImageSame = recentImagesOnLocation.some((el) => el!.id === randomLocationImage.id);
        } while (isImageSame);
        return randomLocationImage;
      })
      .filter((e) => e !== undefined);

    return {
      props: {
        locationNames,
        allImages,
        locationsImages,
        newsTitles: getPostsTitles(),
        topImages: recentImagesOnLocation,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        locationNames: [],
        allImages: [],
        locationsImages: [],
        newsTitles: getPostsTitles(),
        topImages: [],
      },
    };
  }
};

//? posts/内の.mdファイルを取得してdateでsortしてorigのデータは弾くrestructureして
const getPostsTitles = () => {
  const dirPath = path.join(process.cwd(), `src/posts`);
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
      return dayjs(b!.data.date).unix() - dayjs(a!.data.date).unix();
    })
    .map((f) => {
      return {
        title: f!.data.title,
        date: dayjs(f!.data.date).toJSON(),
      };
    })
    .slice(0, 5);
};

export default Home;
