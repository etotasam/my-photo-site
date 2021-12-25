import React, { memo } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PhotoPagination from "./PhotoPagination";
import { ImagesType } from "@/@types/types";
import NextImage from "next/image";
import { Loading } from "@/components/Loading";
import { AnimatePresence } from "framer-motion";

type Params = {
  randomTopImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

const TopPhotoViewer = ({ randomTopImages, allImages }: Params) => {
  const topImagesLength = randomTopImages.length;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);

  const nextPhoto = () => {
    setCurrentPhotoIndex((state: number) => {
      if (topImagesLength - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((state: number) => {
      if (state <= 0) {
        return (state = topImagesLength - 1);
      }
      return (state = state - 1);
    });
  };

  const router = useRouter();
  const clickImage = (photo: ImagesType) => {
    const location = photo.id.split(`_`)[0];
    const images = allImages[location];
    const imagesSortedInDesc = images.sort((a, b) => {
      if (Number(a.id.split(`_`).pop()) > Number(b.id.split(`_`).pop())) return -1;
      if (Number(a.id.split(`_`).pop()) < Number(b.id.split(`_`).pop())) return 1;
      return 0;
    });
    const imageIndex = imagesSortedInDesc.findIndex((el) => el.id === photo.id);
    router.push(`/photo/${location}?image=${imageIndex + 1}`);
  };

  const requiredMoveX = 100;
  let touchStartPositionX: number;
  const tapOn = (event: React.TouchEvent<HTMLImageElement>) => {
    touchStartPositionX = event.changedTouches[0].pageX;
    clearTimeout(photoSlideInterval);
  };
  const tapOff = (event: React.TouchEvent<HTMLImageElement>) => {
    const touchEndPositionX = event.changedTouches[0].pageX;
    const movePositionX = touchStartPositionX - touchEndPositionX;
    if (Math.abs(movePositionX) < requiredMoveX) return startPhotoSlideInterval();
    if (movePositionX > 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  };

  const imagesLangth = randomTopImages.length;
  const [imageLoaded, setImageLoaded] = useState(0);
  const imageOnLoad = () => {
    if (imagesLangth <= imageLoaded) return;
    setImageLoaded((v) => v + 1);
  };

  // 写真のスライドをsetIntervalでセット
  let photoSlideInterval: NodeJS.Timer;
  const slideTime = 5000;
  function startPhotoSlideInterval(): void {
    photoSlideInterval = setInterval(nextPhoto, slideTime);
  }

  const getInitialPhotoIndex = (): void => {
    const min = 0;
    const max = topImagesLength - 1;
    const randamIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(randamIndex);
  };
  useEffect(() => {
    getInitialPhotoIndex();
    startPhotoSlideInterval();
    return () => {
      clearTimeout(photoSlideInterval);
    };
  }, []);

  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        {randomTopImages.map((photo, index) => (
          <NextImage
            onTouchStart={tapOn}
            onTouchEnd={tapOff}
            onClick={() => clickImage(photo)}
            onLoad={imageOnLoad}
            className={`cursor-pointer duration-1000 ${
              currentPhotoIndex === index ? `opacity-100 z-10` : `opacity-0 z-0`
            }`}
            key={index}
            src={photo.url}
            layout="fill"
            objectFit="cover"
            alt={``}
          />
        ))}
        <AnimatePresence>{(imagesLangth > imageLoaded || currentPhotoIndex === null) && <Loading />}</AnimatePresence>
      </div>
      <PhotoPagination
        randomTopImages={randomTopImages}
        currentPhotoIndex={currentPhotoIndex}
        setCurrentPhotoIndex={(num: number) => setCurrentPhotoIndex(num)}
      />
    </div>
  );
};

export default memo(TopPhotoViewer);
