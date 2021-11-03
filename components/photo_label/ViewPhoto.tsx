import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import { ImageType } from "@/pages/index";

type Params = {
  imageRef: ImageType;
  length: number;
};

const ViewPhoto: React.FC<Params> = ({ imageRef, length }) => {
  const router = useRouter();
  const [isVerticalPhoto, setIsPhotoVertical] = useState<boolean>();
  const { photo_label, num } = router.query;
  const [isImageLoading, setImageLoad] = useState(true);

  function photoLoaded() {
    setImageLoad(false);
  }

  function prevPhoto() {
    let prev: number;
    if (num) prev = Number(num) - 1;
    if (!num) prev = length;
    if (prev < 1) return router.push(`/photo/${photo_label}?num=${length}`);
    router.push(`/photo/${photo_label}?num=${prev}`);
  }

  function nextPhoto() {
    let next: number;
    if (num) next = Number(num) + 1;
    if (!num) next = 2;
    if (next > length) return router.push(`/photo/${photo_label}?num=1`);
    router.push(`/photo/${photo_label}?num=${next}`);
  }

  useEffect(() => {
    if (!imageRef) return;
    setIsPhotoVertical(imageRef.width < imageRef.height);
  }, [imageRef]);

  let tapPositionX: number;
  let unTapPositionX: number;
  function onTapStart(event: any, info: any) {
    tapPositionX = info.point.x;
  }

  const necessaryMoveX = 100;
  function onTap(event: any, info: any) {
    unTapPositionX = info.point.x;
    const movedPositionX = unTapPositionX - tapPositionX;

    if (movedPositionX < -necessaryMoveX) {
      nextPhoto();
      return;
    } else if (necessaryMoveX < movedPositionX) {
      prevPhoto();
      return;
    }
  }
  // ${isVerticalPhoto ? `w-3/4 max-w-[450px]` : `max-w-[800px]`}
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onTapStart={onTapStart}
        onTap={onTap}
        transition={{ duration: 0.5 }}
        className={`relative leading-3 ${
          isVerticalPhoto ? `w-3/4 t-img-vertical` : `t-img-horizon`
        }`}
        style={{ touchAction: "none" }}
      >
        <span
          className={`absolute top-0 left-0 h-full w-1/2 cursor-pointer z-10`}
          onClick={prevPhoto}
        ></span>
        <span
          className={`absolute top-0 right-0 h-full w-1/2 cursor-pointer z-10`}
          onClick={nextPhoto}
        ></span>
        <NextImage
          src={imageRef.url}
          alt={``}
          priority={true}
          layout={`fill`}
          objectFit={`contain`}
          onLoad={photoLoaded}
        />
        <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default ViewPhoto;
