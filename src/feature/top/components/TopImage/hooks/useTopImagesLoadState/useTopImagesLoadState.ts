import React from 'react'
import { ImagesType } from "@/types";

type PropsType = {
  topImages: ImagesType[]
}

export const useTopImagesLoadState = ({ topImages }: PropsType) => {
  const [imageLoadState, setImageLoadState] = React.useState<Record<string, boolean>>();
  const [isTopImagesLoaded, setIsTopImagesLoaded] = React.useState(false);
  //? imageLoadStateに初期値をセット
  React.useEffect(() => {
    const initialState = topImages.reduce((prev: Record<string, boolean>, curr: ImagesType) => {
      const key = curr.id.split("_")[0];
      return { ...prev, [key]: false };
    }, {});
    setImageLoadState(initialState);
  }, []);

  //? 読み込んだimageはimageLoadStateの値をtrueにする
  const imageOnloaded = (id: string) => {
    const key = id.split("_")[0];
    setImageLoadState((v) => {
      return { ...v, [key]: true };
    });
  };
  //? すべてのimageを読み込んだかをチェック
  React.useEffect(() => {
    if (!imageLoadState) return;
    const state = !Object.values(imageLoadState).includes(false);
    setIsTopImagesLoaded(state);
  }, [imageLoadState]);


  return { isTopImagesLoaded, imageOnloaded }
}
