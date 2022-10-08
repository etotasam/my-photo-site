import React from "react";
//! hooks
import { useAutoPhotoSlider } from "./hooks/useAutoPhotoSlider";
import { useTopImagesLoadState } from "./hooks/useTopImagesLoadState";
//! component
import { TopImage } from "./TopImage";
//!type
import { ImagesType } from "@/types";

type TopImageContainerType = {
  topImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

export const TopImageContainer = ({ topImages, allImages }: TopImageContainerType) => {
  //? トップ画面のスライド写真の中からひとつをランダムに選択してセット
  React.useEffect(() => {
    const random = Math.trunc(Math.random() * topImages.length);
    setCurrentPhotoIndex(random);
  }, []);

  //? 表示するimageのすべての読み込みが完了しているかを取得
  const { isTopImagesLoaded, imageOnloaded } = useTopImagesLoadState({ topImages });
  //? 表示するimageのindexを取得
  const { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff } = useAutoPhotoSlider({
    topImages,
    isTopImagesLoaded,
  });

  return (
    <TopImage
      topImages={topImages}
      allImages={allImages}
      currentPhotoIndex={currentPhotoIndex}
      imageOnloaded={(id) => imageOnloaded(id)}
      tapOn={tapOn}
      tapOff={tapOff}
      isTopImageAllLoaded={isTopImagesLoaded}
      setCurrentPhotoIndex={setCurrentPhotoIndex}
    />
  );
};
