import { useState, useEffect, DependencyList } from "react"
import { ImagesType } from "@/@types/types";


type Size = {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
};

export const useViewPhotoSize = (imageRef: ImagesType, headerHeight: number, footerHeight: number) => {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
  });

  function getSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementHeight = windowHeight - (headerHeight + footerHeight);
    const elementWidth = windowWidth * 0.9

    const isVerticalEl = elementHeight > elementWidth;
    const isVerticalImg = imageRef.height > imageRef.width;

    let width: number;
    let height: number;
    let minWidth: number;
    let minHeight: number;
    let maxWidth: number;
    let maxHeight: number;
    const minLongSide = 350;
    const maxLongSide = Math.min(1000, Math.max(imageRef.width, imageRef.height));
    if (isVerticalEl) {
      if (isVerticalImg) {
        const ratio = imageRef.width / imageRef.height;
        width = elementWidth * ratio;
        height = elementWidth;
        minWidth = minLongSide * ratio;
        minHeight = minLongSide;
        maxWidth = maxLongSide * ratio;
        maxHeight = maxLongSide;
      } else {
        const ratio = imageRef.height / imageRef.width;
        width = elementWidth;
        height = elementWidth * ratio;
        minWidth = minLongSide;
        minHeight = minLongSide * ratio;
        maxWidth = maxLongSide;
        maxHeight = maxLongSide * ratio;
      }
    } else {
      if (isVerticalImg) {
        const ratio = imageRef.width / imageRef.height;
        width = elementHeight * ratio;
        height = elementHeight;
        minWidth = minLongSide * ratio;
        minHeight = minLongSide;
        maxWidth = maxLongSide * ratio;
        maxHeight = maxLongSide;
      } else {
        const ratio = imageRef.height / imageRef.width;
        width = elementHeight;
        height = elementHeight * ratio;
        minWidth = minLongSide;
        minHeight = minLongSide * ratio;
        maxWidth = maxLongSide;
        maxHeight = maxLongSide * ratio;
      }
    }
    setSize({
      width: Math.floor(width),
      height: Math.floor(height),
      minWidth: Math.floor(minWidth),
      minHeight: Math.floor(minHeight),
      maxWidth: Math.floor(maxWidth),
      maxHeight: Math.floor(maxHeight)
    })
  }

  useEffect(() => {
    getSize()
    window.addEventListener(`resize`, getSize)
    return () => {
      window.removeEventListener(`resize`, getSize)
    }
  }, [])
  return size
}