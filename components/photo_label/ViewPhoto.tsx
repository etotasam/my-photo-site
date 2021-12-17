import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import type { ImagesType } from "@/@types/types";
import { useModalStateContext, useModalDispatchContext } from "@/context/modalStateContext";
import { useHeihgtStateContext } from "@/context/heightStateContext";
import { useLoadDispatchContext } from "@/context/loadStateContext";

type Params = {
  imageRef: ImagesType;
  length: number;
  element: React.MutableRefObject<any>;
};

const ViewPhoto = ({ imageRef, length, element }: Params) => {
  const router = useRouter();
  const { photo_label, image } = router.query;

  function prevPhoto() {
    let prev: number;
    if (image) prev = Number(image) - 1;
    if (!image) prev = length;
    if (prev < 1) return router.push(`/photo/${photo_label}?image=${length}`);
    router.push(`/photo/${photo_label}?image=${prev}`);
  }

  // get values headerHeight and footerHeight by useContext
  const { modalCloseDispatcher } = useModalDispatchContext();
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const { loadedDispatcher } = useLoadDispatchContext();

  const imageSize = () => {
    const windowWidth = window.innerWidth * 0.9;
    const windowHeight = window.innerHeight;
    const elementHeight = windowHeight - (headerHeight + footerHeight);

    const isVerticalEl = elementHeight > windowWidth;
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
        width = windowWidth * ratio;
        height = windowWidth;
        minWidth = minLongSide * ratio;
        minHeight = minLongSide;
        maxWidth = maxLongSide * ratio;
        maxHeight = maxLongSide;
      } else {
        const ratio = imageRef.height / imageRef.width;
        width = windowWidth;
        height = windowWidth * ratio;
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
    return { width, height, minWidth, minHeight, maxWidth, maxHeight };
  };

  type Size = {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
  };

  const [size, setSize] = useState<Size>({
    width: void 0,
    height: void 0,
    minWidth: void 0,
    minHeight: void 0,
    maxWidth: void 0,
    maxHeight: void 0,
  });
  useEffect(() => {
    toCloseModals();
    const getSize = () => {
      setSize(imageSize());
    };
    getSize();
    window.addEventListener(`resize`, getSize);
    return () => window.removeEventListener(`resize`, getSize);
  }, []);

  const toCloseModals = () => {
    modalCloseDispatcher();
    loadedDispatcher();
  };

  // photo transition
  function nextPhoto() {
    let next: number;
    if (image) next = Number(image) + 1;
    if (!image) next = 2;
    if (next > length) return router.push(`/photo/${photo_label}?image=1`);
    router.push(`/photo/${photo_label}?image=${next}`);
  }

  // check image aspect ratio
  const [isVerticalPhoto, setIsPhotoVertical] = useState<boolean>();
  useEffect(() => {
    if (!imageRef) return;
    setIsPhotoVertical(imageRef.width < imageRef.height);
  }, [imageRef]);

  // image loading check
  const [isImageLoading, setImageLoad] = useState(true);
  function photoLoaded() {
    setImageLoad(false);
  }

  // image transtion
  const imageTranstion = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.target as HTMLElement;
    const elWidth = el.clientWidth;
    const elLeftPosition = Math.floor(el.getBoundingClientRect().left);
    const centerPoint = elWidth / 2;
    const clickPoint = e.pageX;
    if (clickPoint - elLeftPosition > centerPoint) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  };

  let tapOnPositon: number;
  const tapOn = (e: React.TouchEvent<HTMLImageElement>) => {
    tapOnPositon = e.changedTouches[0].pageX;
  };

  const requireNum = 100;
  const tapOff = (e: React.TouchEvent<HTMLImageElement>) => {
    const tapOffPosition = e.changedTouches[0].pageX;
    const movedNum = tapOffPosition - tapOnPositon;
    if (Math.abs(movedNum) < requireNum) return;
    if (movedNum > 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  };

  // wait image loading
  useEffect(() => {
    const img = new Image();
    img.src = imageRef.url;
    img.onload = () => {
      photoLoaded();
    };
  }, []);

  if (isImageLoading) return <Loading />;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onTouchStart={tapOn}
        onTouchEnd={tapOff}
        transition={{ duration: 0.5 }}
        className={`relative leading-3`}
        style={{
          width: size.width,
          height: size.height,
          minWidth: size.minWidth,
          minHeight: size.minHeight,
          maxWidth: size.maxWidth,
          maxHeight: size.maxHeight,
        }}
        onClick={(e) => imageTranstion(e)}
      >
        <NextImage
          className={`cursor-pointer`}
          src={imageRef.url}
          width={imageRef.width}
          height={imageRef.height}
          alt={``}
          priority={true}
          layout={`fill`}
          objectFit={`contain`}
        />
      </motion.div>
    </>
  );
};

export default ViewPhoto;
