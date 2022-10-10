import React from "react";
//! hooks
import { useAutoPhotoSlider } from "./hooks/useAutoPhotoSlider";
import { useTopImagesLoadState } from "./hooks/useTopImagesLoadState";
//! component
import { TopImage } from "./TopImage";
//!type
import { ImagesType } from "@/types";
//!context
import {
  useCurrentImageIndexDispatchContext,
  useCurrentImageIndexStateContext,
} from "@/context/currentImageIndexContext";
import { useTopImagesLoadStateContext } from "@/context/topImagesLoadStateContext";

type TopImageContainerType = {
  topImages: ImagesType[];
};

export const TopImageContainer = ({ topImages }: TopImageContainerType) => {
  const { currentImageIndexDispathcer } = useCurrentImageIndexDispatchContext();
  const { isTopImagesLoaded } = useTopImagesLoadStateContext();
  const { currentImageIndex } = useCurrentImageIndexStateContext();

  //? トップ画面のスライド写真の中からひとつをランダムに選択してセット
  React.useEffect(() => {
    if (currentImageIndex === undefined) {
      const random = Math.trunc(Math.random() * topImages.length);
      currentImageIndexDispathcer(random);
    }
  }, [currentImageIndex]);

  //? 表示するimageのすべての読み込みが完了しているかを取得
  const { imageOnloaded } = useTopImagesLoadState({ topImages });
  //? 表示するimageのindexを取得
  const { tapOn, tapOff } = useAutoPhotoSlider({
    topImages,
    isTopImagesLoaded,
  });

  return (
    <TopImage
      topImages={topImages}
      currentImageIndex={currentImageIndex}
      imageLoaded={(id) => imageOnloaded(id)}
      tapOn={tapOn}
      tapOff={tapOff}
      isTopImagesLoaded={isTopImagesLoaded}
      setCurrentImageIndex={(payload) => currentImageIndexDispathcer(payload)}
    />
  );
};
