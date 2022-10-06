import React from "react";
//! hooks
import { usePhotoSlide } from "@/hooks/usePhotoSlide";
//! component
import { TopImage, TopImageType } from "./TopImage";
//!type
import { ImagesType } from "@/@types/types";

type KeyVisualContainerType = {
  topImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

export const TopImageContainer = ({ topImages, allImages }: KeyVisualContainerType) => {
  //? 表示するイメージ数をcount
  const imagesLangth = topImages.length;
  //? 読み込んだimageのcount
  const [topImageLoadedCount, setTopImageLoadedCount] = React.useState<number>(0);
  const imageOnloaded = React.useCallback(() => {
    setTopImageLoadedCount((v) => v + 1);
  }, []);

  const [topImageAllLoaded, setTopImageAllLoaded] = React.useState(false);

  const { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff } = usePhotoSlide({ topImages, topImageAllLoaded });

  //? トップ画面のスライド写真の中からひとつをランダムに選択してセット
  React.useEffect(() => {
    const random = Math.trunc(Math.random() * topImages.length);
    setCurrentPhotoIndex(random);
  }, []);

  //? 表示するimageを全部読み込んだかどうかの判定
  const [isTopImageAllLoaded, setIsTopImageAllLoaded] = React.useState(false);
  React.useEffect(() => {
    setIsTopImageAllLoaded(imagesLangth <= topImageLoadedCount);
  }, [topImageLoadedCount]);

  //? 表示するimageを全部読み込んだかどうかをhooks usePhotoSlideの引数にわたす
  React.useEffect(() => {
    setTopImageAllLoaded(isTopImageAllLoaded);
  }, [isTopImageAllLoaded]);

  return (
    <TopImage
      topImages={topImages}
      allImages={allImages}
      currentPhotoIndex={currentPhotoIndex}
      imageOnloaded={imageOnloaded}
      tapOn={tapOn}
      tapOff={tapOff}
      isTopImageAllLoaded={isTopImageAllLoaded}
      setCurrentPhotoIndex={setCurrentPhotoIndex}
    />
  );
};
