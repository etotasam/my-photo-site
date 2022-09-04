import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import BulletNav from "./BulletNav";
import { ImagesType } from "@/@types/types";
import NextImage from "next/image";
import { Loading } from "@/components/Loading";
import { AnimatePresence, motion } from "framer-motion";

// hooks
import { usePhotoSlide } from "@/hooks/usePhotoSlide";

type Params = {
  topImages: ImagesType[];
  allImages: Record<string, ImagesType[]>;
};

const PhotoSliderContainer = ({ topImages, allImages }: Params) => {
  const { currentPhotoIndex, setCurrentPhotoIndex, tapOn, tapOff } = usePhotoSlide({ topImages });

  //? トップ画面のスライド写真をランダムに選択
  React.useEffect(() => {
    const random = Math.trunc(Math.random() * topImages.length);
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

  //? topImageのpreLoadingとその判定
  const imagesLangth = topImages.length;
  const [imagePreLoaded, setImagePreLoaded] = useState<boolean[]>([]);
  useEffect(() => {
    let image;
    const preLoad = topImages.reduce((prev: boolean[], curr: ImagesType): boolean[] => {
      image = new Image();
      image.src = curr.url;
      return [...prev, true];
    }, []);
    setImagePreLoaded(preLoad);
  }, [topImages]);

  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        <AnimatePresence>
          {topImages.map(
            (photo, index) =>
              currentPhotoIndex === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`cursor-pointer`}
                  transition={{ duration: 1 }}
                >
                  <NextImage
                    onTouchStart={tapOn}
                    onTouchEnd={tapOff}
                    onClick={() => clickImage(photo)}
                    // onLoad={imageOnLoad}
                    src={photo.url}
                    layout="fill"
                    objectFit="cover"
                    alt={``}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(imagesLangth > imagePreLoaded.length || currentPhotoIndex === null) && <Loading />}
        </AnimatePresence>
      </div>
      <BulletNav
        topImages={topImages}
        currentPhotoIndex={currentPhotoIndex}
        setCurrentPhotoIndex={(num: number) => setCurrentPhotoIndex(num)}
      />
    </div>
  );
};

export default memo(PhotoSliderContainer);
