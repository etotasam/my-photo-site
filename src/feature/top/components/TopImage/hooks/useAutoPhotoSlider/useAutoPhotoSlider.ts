import React, { useState, useEffect } from "react"
import { ImagesType } from "@/types";
//! context
import { useCurrentImageIndexDispatchContext, useCurrentImageIndexStateContext } from "@/context/currentImageIndexContext"
import { useModalStateContext } from "@/context/modalStateContext"

type PropsType = {
  topImages: ImagesType[]
  isTopImagesLoaded: boolean;
}

//? image animation interval time
const ms = 5000;
//? imageのタップ操作に必要な距離値
const requiredMoveX = 100;

export const useAutoPhotoSlider = ({ topImages, isTopImagesLoaded = false }: PropsType) => {
  //? 表示するimageのindexのcontext
  const { currentImageIndexDispathcer } = useCurrentImageIndexDispatchContext()
  const { currentImageIndex } = useCurrentImageIndexStateContext()
  //? menu modalのcontext
  const { isModalActive } = useModalStateContext()

  const nextPhoto = () => {
    if (timeOutId.current) clearTimeout(timeOutId.current);
    if (currentImageIndex === undefined) return
    if (topImages.length - 1 <= currentImageIndex) return currentImageIndexDispathcer(0)
    currentImageIndexDispathcer(currentImageIndex + 1)
  };

  const prevPhoto = () => {
    if (timeOutId.current) clearTimeout(timeOutId.current);
    if (currentImageIndex === undefined) return
    if (currentImageIndex <= 0) return currentImageIndexDispathcer(topImages.length - 1)
    currentImageIndexDispathcer(currentImageIndex - 1)
  };


  const touchStartPositionX = React.useRef<number>()
  const tapOn = (event: React.TouchEvent<HTMLImageElement>) => {
    touchStartPositionX.current = event.changedTouches[0].pageX;
    if (timeOutId.current) clearTimeout(timeOutId.current);
  };
  const tapOff = (event: React.TouchEvent<HTMLImageElement>) => {
    const touchEndPositionX = event.changedTouches[0].pageX;
    const movePositionX = touchStartPositionX.current! - touchEndPositionX;
    if (Math.abs(movePositionX) < requiredMoveX) {
      startPhotoSlide();
      return;
    }
    if (movePositionX > 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  };


  const timeOutId = React.useRef<NodeJS.Timer>()

  const startPhotoSlide = () => {
    // if (!isTopImagesLoaded) return
    timeOutId.current = setTimeout(() => {
      nextPhoto();
    }, ms);
  };

  //? windowがactiveかどうか
  const [isWindowActive, setIsWindowActive] = useState(true)
  React.useEffect(() => {
    const setActive = () => {
      setIsWindowActive(true)
    }
    const setInactive = () => {
      setIsWindowActive(false)
    }
    window.addEventListener("focus", setActive)
    window.addEventListener('blur', setInactive);
    return () => {
      window.removeEventListener("focus", setActive)
      window.removeEventListener('blur', setInactive)
    }
  }, [])

  useEffect(() => {
    if (!isTopImagesLoaded) return
    //? 条件でslider animation をストップ
    if (!isWindowActive || isModalActive) {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current)
      }
      return
    }
    startPhotoSlide();
    return () => {
      if (timeOutId.current) clearTimeout(timeOutId.current);
    };
  }, [currentImageIndex, isTopImagesLoaded, isWindowActive, isModalActive]);


  //? currentImageIndex, currentImageIndexDispathcerはテスト用に返してるだけ・・・
  return { currentImageIndex, currentImageIndexDispathcer, tapOn, tapOff }

}