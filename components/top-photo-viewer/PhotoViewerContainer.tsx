import React, { memo } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import PhotoPagination from "./PhotoPagination";
import { ImagesType } from "@/@types/types";
import NextImage from "next/image";
import { Loading } from "@/components/Loading";
import { AnimatePresence } from "framer-motion";

// hooks
import { usePhotoSlide } from "@/hooks/usePhotoSlide";

type Params = {
  randomTopImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

const TopPhotoViewer = ({ randomTopImages, allImages }: Params) => {
  const { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff } = usePhotoSlide({ topImages: randomTopImages });

  //? トップ画面のスライド写真をランダムに選択
  React.useEffect(() => {
    const random = Math.trunc(Math.random() * randomTopImages.length);
    setCurrentPhotoIndex(random);
  }, []);

  const router = useRouter();
  const clickImage = React.useCallback((photo: ImagesType) => {
    const locationName = photo.id.split(`_`)[0];
    const locationsImages = allImages[locationName];
    const imagesSortedInDescById = locationsImages.sort((a, b) => {
      if (Number(a.id.split(`_`).pop()) > Number(b.id.split(`_`).pop())) return -1;
      if (Number(a.id.split(`_`).pop()) < Number(b.id.split(`_`).pop())) return 1;
      return 0;
    });
    const imageIndex = imagesSortedInDescById.findIndex((el) => el.id === photo.id);
    router.push(`/photo/${locationName}?image=${imageIndex + 1}`);
  }, []);

  const imagesLangth = randomTopImages.length;
  const [imageLoaded, setImageLoaded] = useState(0);
  const imageOnLoad = () => {
    if (imagesLangth <= imageLoaded) return;
    setImageLoaded((v) => v + 1);
  };

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
