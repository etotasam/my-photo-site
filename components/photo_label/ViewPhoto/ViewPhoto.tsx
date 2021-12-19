import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../../Loading";
import type { ImagesType } from "@/@types/types";
import { useModalStateContext, useModalDispatchContext } from "@/context/modalStateContext";
import { useHeihgtStateContext } from "@/context/heightStateContext";
import { useLoadDispatchContext } from "@/context/loadStateContext";
import { useViewPhotoSize } from "@/hooks/useViewPhotoSize";

type Params = {
  imageRef: ImagesType;
  length: number;
};

export const ViewPhoto = ({ imageRef, length }: Params) => {
  const router = useRouter();
  const { photo_label, image } = router.query;
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const size = useViewPhotoSize(imageRef, footerHeight, headerHeight);

  function prevPhoto() {
    let prev: number;
    if (image) prev = Number(image) - 1;
    if (!image) prev = length;
    if (prev < 1) return router.push(`/photo/${photo_label}?image=${length}`);
    router.push(`/photo/${photo_label}?image=${prev}`);
  }

  // photo transition
  function nextPhoto() {
    let next: number;
    if (image) next = Number(image) + 1;
    if (!image) next = 2;
    if (next > length) return router.push(`/photo/${photo_label}?image=1`);
    router.push(`/photo/${photo_label}?image=${next}`);
  }

  // image loading check
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  function closeLoadingModal() {
    setIsImageLoading(false);
  }
  function openLoadingModal() {
    setIsImageLoading(true);
  }
  function imageLoad() {
    openLoadingModal();
    const img = new Image();
    img.src = imageRef.url;
    img.onload = () => {
      closeLoadingModal();
    };
  }
  // get values headerHeight and footerHeight by useContext
  const { modalCloseDispatcher } = useModalDispatchContext();
  const { loadedDispatcher } = useLoadDispatchContext();

  const closeModal = () => {
    modalCloseDispatcher();
    loadedDispatcher();
  };

  useEffect(() => {
    // imageLoad();
    closeModal();
  }, []);

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

  // if (isImageLoading) {
  //   return (
  //     <AnimatePresence>
  //       <Loading />
  //     </AnimatePresence>
  //   );
  // }

  return (
    <AnimatePresence>
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
          onLoad={closeLoadingModal}
        />
      </motion.div>
      {isImageLoading && (
        <AnimatePresence>
          <Loading />
        </AnimatePresence>
      )}
    </AnimatePresence>
  );
};
