import React from "react"
import { ImagesType } from "@/@types/types";

type PropsType = {
  topImages: ImagesType[]
}

export const usePhotoSlide = ({ topImages }: PropsType) => {

  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState<number | null>(null);

  const nextPhoto = () => {
    clearTimeout(timeOutId);
    startPhotoSlide();
    setCurrentPhotoIndex((state: number) => {
      if (topImages.length - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  };

  const prevPhoto = () => {
    clearTimeout(timeOutId);
    startPhotoSlide();
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

  React.useEffect(() => {
    startPhotoSlide();
    return () => {
      clearTimeout(timeOutId);
    };
  }, [currentPhotoIndex]);

  return { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff }

}