import React from "react";
import { useState, useEffect, DependencyList } from "react"
import { ImagesType } from "@/types";


type PhotoSizeType = {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
};

type PropType = {
  imageData: ImagesType,
  headerHeight: number,
  footerHeight: number
}

const initialPhotoSize = {
  width: 0,
  height: 0,
  minWidth: 0,
  minHeight: 0,
  maxWidth: 0,
  maxHeight: 0,
} as const

export const useAdjustSizeForWrapperPhoto = ({ imageData, headerHeight, footerHeight }: PropType) => {
  const [photoSize, setPhotoSize] = useState<PhotoSizeType>({ ...initialPhotoSize });

  function getSize() {
    //? windowサイズの取得
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    //? page表示範囲のサイズ
    const elementHeight = windowHeight - (headerHeight + footerHeight);
    const elementWidth = windowWidth * 0.9

    //? windowがwide型かtall型か
    const isTallEl = elementHeight > elementWidth;
    const isWideEl = elementHeight <= elementWidth;
    //? imageがwideかtallか
    const isTallImg = imageData.height > imageData.width;
    const isWideImg = imageData.height <= imageData.width

    //? 高さの最低値と最大値を設定
    const minLongSide = 350;
    const maxLongSide = Math.min(1000, Math.max(imageData.width, imageData.height));
    if (isTallEl) {
      if (isTallImg) {
        const ratio = imageData.width / imageData.height;
        const size = {
          width: Math.floor(elementWidth * ratio),
          height: elementWidth,
          minWidth: Math.floor(minLongSide * ratio),
          minHeight: minLongSide,
          maxWidth: Math.floor(maxLongSide * ratio),
          maxHeight: maxLongSide,
        }
        setPhotoSize({ ...size })
      }
      if (isWideImg) {
        const ratio = imageData.height / imageData.width;
        const size = {
          width: elementWidth,
          height: Math.floor(elementWidth * ratio),
          minWidth: minLongSide,
          minHeight: Math.floor(minLongSide * ratio),
          maxWidth: maxLongSide,
          maxHeight: Math.floor(maxLongSide * ratio),
        }
        setPhotoSize({ ...size })
      }
    }
    if (isWideEl) {
      if (isTallImg) {
        const ratio = imageData.width / imageData.height;
        const size = {
          width: Math.floor(elementHeight * ratio),
          height: elementHeight,
          minWidth: Math.floor(minLongSide * ratio),
          minHeight: minLongSide,
          maxWidth: Math.floor(maxLongSide * ratio),
          maxHeight: maxLongSide
        }
        setPhotoSize({ ...size })
      }
      if (isWideImg) {
        const ratio = imageData.height / imageData.width;
        const size = {
          width: elementHeight,
          height: Math.floor(elementHeight * ratio),
          minWidth: minLongSide,
          minHeight: Math.floor(minLongSide * ratio),
          maxWidth: maxLongSide,
          maxHeight: Math.floor(maxLongSide * ratio)
        }
        setPhotoSize({ ...size })
      }
    }
  }

  useEffect(() => {
    getSize()
    window.addEventListener(`resize`, getSize)
    return () => {
      window.removeEventListener(`resize`, getSize)
    }
  }, [])
  return { photoSize }
}