import React, { memo, createContext } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PhotoPagination from "./PhotoPagination";
import { ImagesType } from "@/assets/type/types";
import NextImage from "next/image"

export const CurrentPhotoIndexContext = createContext(null);

type Params = {
  topImagesByRandom: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

const TopPhotoViewer = ({ topImagesByRandom, allImages }: Params) => {
  const topImagesLength = topImagesByRandom.length;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>();
  const contextValue = {
    currentPhotoIndex,
    setCurrentPhotoIndex,
  };

  const getInitialPhotoIndex = (): void => {
    const min = 0;
    const max = topImagesLength - 1;
    const randamIndex = Math.floor(Math.random() * (max + 1 - min)) + min;
    setCurrentPhotoIndex(randamIndex);
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((state: number) => {
      if (topImagesLength - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((state: number) => {
      if (state <= 0) {
        return (state = topImagesLength - 1);
      }
      return (state = state - 1);
    });
  }

  const router = useRouter();
  const clickImage = (photo: ImagesType) => {
    const chunkId = photo.id.split(`_`);
    const location = chunkId[0];
    const idNumber = chunkId[1];
    const images = allImages[location];
    const imagesSortedInDesc = images.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    });
    const imageIndex = imagesSortedInDesc.findIndex((el) => el.id === photo.id);
    router.push(`/photo/${location}?image=${imageIndex + 1}`);
  }

  const requireDistanceForChangeImage = 150
  let touchStartPositionX: number
  const touchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    touchStartPositionX = event.changedTouches[0].pageX;
    clearTimeout(photoSlideInterval);
  }
  const touchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
    const touchEndPositionX = event.changedTouches[0].pageX;
    const movePositionX = touchStartPositionX - touchEndPositionX;
    if(Math.abs(movePositionX) < requireDistanceForChangeImage) return startPhotoSlideInterval()
    if( movePositionX > 0) {
      nextPhoto()
    }else {
      prevPhoto()
    }
    touchStartPositionX = 0;
  }

  // 写真のスライドをsetIntervalでセット
  let photoSlideInterval: NodeJS.Timer;
  const slideTime = 5000;
  function startPhotoSlideInterval(): void {
    photoSlideInterval = setInterval(nextPhoto, slideTime);
  }

  useEffect(() => {
    startPhotoSlideInterval();
    return () => {
      clearTimeout(photoSlideInterval);
    };
  }, [currentPhotoIndex]);

  useEffect(() => {
    getInitialPhotoIndex();
  }, []);

  return (
    <CurrentPhotoIndexContext.Provider value={contextValue}>
      <div className={`md:w-[60%] max-w-[700px]`}>
        <div className={`relative pt-[100%]`} style={{ touchAction: "none" }}>
          {/* <AnimatePresence> */}
            {topImagesByRandom.map(
              (photo, index) =>
              <NextImage
                onTouchStart={e => touchStart(e)}
                onTouchEnd={e => touchEnd(e)}
                onClick={() => clickImage(photo)}
                className={`duration-1000 ${currentPhotoIndex === index ? `opacity-100 z-10` : `opacity-0 z-0`}`}
                key={index}
                src={photo.url}
                layout="fill"
                objectFit="cover"
                alt={``}
              />
            )}
          {/* </AnimatePresence> */}
        </div>
        <PhotoPagination topImagesByRandom={topImagesByRandom} />
      </div>
    </CurrentPhotoIndexContext.Provider>
  );
};

export default memo(TopPhotoViewer);
