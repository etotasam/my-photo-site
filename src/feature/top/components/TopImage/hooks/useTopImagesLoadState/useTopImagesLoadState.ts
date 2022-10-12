import React from 'react'
import { ImagesType } from "@/types";
//! context
import { useTopImagesLoadDispatchContext, useTopImagesLoadStateContext } from "@/context/topImagesLoadStateContext"


type PropsType = {
  topImages: ImagesType[]
}

export const useTopImagesLoadState = ({ topImages }: PropsType) => {
  const { topImagesLoadDispatcher } = useTopImagesLoadDispatchContext()
  const { isTopImagesLoaded } = useTopImagesLoadStateContext()
  const [initialStateObj, setInitialStateObj] = React.useState<Record<string, boolean>>()
  //? imageLoadStateに初期値をセット
  React.useEffect(() => {
    if (isTopImagesLoaded) return
    const initialState = topImages.reduce((prev: Record<string, boolean>, curr: ImagesType) => {
      const key = curr.id.split("_")[0];
      return { ...prev, [key]: false };
    }, {});
    setInitialStateObj(initialState)
  }, []);

  //? 読み込んだimageはimageLoadStateの値をtrueにする
  const imageOnloaded = (id: string) => {
    if (isTopImagesLoaded) return
    const key = id.split("_")[0];
    setInitialStateObj((v) => {
      return { ...v, [key]: true }
    })
  };

  //? すべてのimageを読み込んだかをチェック
  React.useEffect(() => {
    if (isTopImagesLoaded) return
    if (initialStateObj === undefined) return
    if (!Object.values(initialStateObj).includes(false)) return topImagesLoadDispatcher()
  }, [initialStateObj])

  //? テスト用にisTopImagesLoadedを返してる・・・
  return { isTopImagesLoaded, imageOnloaded }
}
