import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BulletNav from "./BulletNav";
import { ImagesType } from "@/@types/types";
import NextImage from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
//! components
import { TopPhoto } from "./TopPhoto";
import { Loading } from "@/components/Loading";
import { LoadingBound } from "@/components/LoadingBound";
//! hooks
import { usePhotoSlide } from "@/hooks/usePhotoSlide";

type Params = {
  topImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

const PhotoSliderContainer = ({ topImages, allImages }: Params) => {
  const [topImageAllLoaded, setTopImageAllLoaded] = useState(false);
  const { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff } = usePhotoSlide({ topImages, topImageAllLoaded });

  //? トップ画面のスライド写真をランダムに選択
  React.useEffect(() => {
    const random = Math.trunc(Math.random() * topImages.length);
    setCurrentPhotoIndex(random);
  }, []);

  //? 表示するイメージ数をcount
  const imagesLangth = topImages.length;

  //? 読み込んだimageのcount
  const [topImageLoadedCount, setTopImageLoadedCount] = useState<number>(0);
  const imageOnloaded = React.useCallback(() => {
    setTopImageLoadedCount((v) => v + 1);
  }, []);

  //? 表示するimageを全部読み込んだかどうかの判定
  const [isTopImageAllLoaded, setIsTopImageAllLoaded] = useState(false);
  useEffect(() => {
    setIsTopImageAllLoaded(imagesLangth <= topImageLoadedCount);
  }, [topImageLoadedCount]);

  //? 表示するimageを全部読み込んだかどうかをhooks usePhotoSlideの引数にわたす
  useEffect(() => {
    setTopImageAllLoaded(isTopImageAllLoaded);
  }, [isTopImageAllLoaded]);

  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        <AnimatePresence>
          {topImages.map(
            (photo, index) =>
              (!isTopImageAllLoaded || currentPhotoIndex === index) && (
                <TopPhoto
                  key={photo.id}
                  photo={photo}
                  allImages={allImages}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  isOnloaded={imageOnloaded}
                />
              )
          )}
        </AnimatePresence>
        <AnimatePresence>{(!isTopImageAllLoaded || currentPhotoIndex === null) && <Loading />}</AnimatePresence>
      </div>
      <BulletNav
        topImages={topImages}
        currentPhotoIndex={currentPhotoIndex}
        setCurrentPhotoIndex={(num: number) => setCurrentPhotoIndex(num)}
      />
    </div>
  );
};

export default memo(PhotoSliderContainer);
