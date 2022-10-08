import React, { useState, useEffect } from "react"
import { ImagesType } from "@/types";

type PropsType = {
  topImages: ImagesType[]
  isTopImagesLoaded: boolean;
}

export const useAutoPhotoSlider = ({ topImages, isTopImagesLoaded = false }: PropsType) => {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | undefined>();

  const nextPhoto = () => {
    if (timeOutId.current) clearTimeout(timeOutId.current);
    setCurrentPhotoIndex((state: number) => {
      if (topImages.length - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  };

  const prevPhoto = () => {
    if (timeOutId.current) clearTimeout(timeOutId.current);
    setCurrentPhotoIndex((state: number) => {
      if (state <= 0) {
        return (state = topImages.length - 1);
      }
      return (state = state - 1);
    });
  };

  const requiredMoveX = 100;
  let touchStartPositionX: number;
  const tapOn = (event: React.TouchEvent<HTMLImageElement>) => {
    touchStartPositionX = event.changedTouches[0].pageX;
    if (timeOutId.current) clearTimeout(timeOutId.current);
  };
  const tapOff = (event: React.TouchEvent<HTMLImageElement>) => {
    const touchEndPositionX = event.changedTouches[0].pageX;
    const movePositionX = touchStartPositionX - touchEndPositionX;
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
  const ms = 5000;
  const startPhotoSlide = () => {
    if (!isTopImagesLoaded) return
    timeOutId.current = setTimeout(() => {
      nextPhoto();
    }, ms);
  };

  //? windowがactiveかチェック
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
    //? windowがアクティブじゃない時はsliderをストップ
    if (!isWindowActive) {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current)
      }
      return
    }
    startPhotoSlide();
    return () => {
      if (timeOutId.current) clearTimeout(timeOutId.current);
    };
  }, [currentPhotoIndex, isTopImagesLoaded, isWindowActive]);


  return { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff }

}