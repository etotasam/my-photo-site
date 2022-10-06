import React, { useState, useEffect } from "react"
import { ImagesType } from "@/@types/types";

type PropsType = {
  topImages: ImagesType[]
  topImageAllLoaded: boolean;
}

export const usePhotoSlide = ({ topImages, topImageAllLoaded = false }: PropsType) => {

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | undefined>();

  const nextPhoto = () => {
    if (timeOutId) clearTimeout(timeOutId);
    setCurrentPhotoIndex((state: number) => {
      if (topImages.length - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  };

  const prevPhoto = () => {
    if (timeOutId) clearTimeout(timeOutId);
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
    clearTimeout(timeOutId);
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

  let timeOutId: NodeJS.Timer;
  const ms = 5000;
  const startPhotoSlide = () => {
    timeOutId = setTimeout(() => {
      nextPhoto();
    }, ms);
  };

  useEffect(() => {
    if (!topImageAllLoaded) return
    startPhotoSlide();
    return () => {
      clearTimeout(timeOutId);
    };
  }, [currentPhotoIndex, topImageAllLoaded]);

  return { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff }

}