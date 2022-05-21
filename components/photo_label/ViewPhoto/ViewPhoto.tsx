import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import type { ImagesType } from "@/@types/types";
import { useModalDispatchContext } from "@/context/modalStateContext";
import { useHeihgtStateContext } from "@/context/heightStateContext";
import { useLoadDispatchContext } from "@/context/loadStateContext";
import { useViewPhotoSize } from "@/hooks";
//! component
import { Loading } from "@/components/Loading";
import { LoadingBound } from "@/components/LoadingBound";

type Params = {
  imageRef: ImagesType;
  imagesLength: number;
};

export const ViewPhoto = ({ imageRef, imagesLength: lastImage }: Params) => {
  const router = useRouter();
  const { photo_label, image } = router.query;
  const { headerHeight, footerHeight } = useHeihgtStateContext();
  const size = useViewPhotoSize(imageRef, headerHeight, footerHeight);

  function prevPhoto() {
    let prev: number | undefined;
    if (image) prev = Number(image) - 1;
    if (!image) prev = lastImage;
    if (prev! < 1) return router.push(`/photo/${photo_label}?image=${lastImage}`);
    router.push(`/photo/${photo_label}?image=${prev}`);
  }

  // photo transition
  function nextPhoto() {
    let next: number;
    if (image) next = Number(image) + 1;
    if (!image) next = 2;
    if (next! > lastImage) return router.push(`/photo/${photo_label}?image=1`);
    router.push(`/photo/${photo_label}?image=${next!}`);
  }

  // image loading check
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  function closeLoadingModal() {
    setIsImageLoading(false);
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

  return (
    <>
      <motion.div
        data-testid={`imageWrap`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onTouchStart={tapOn}
        onTouchEnd={tapOff}
        transition={{ duration: 0.5 }}
        className={`relative leading-3`}
        style={{ ...size }}
        onClick={(e) => imageTranstion(e)}
      >
        <NextImage
          className={`cursor-pointer`}
          src={imageRef.url}
          alt={``}
          priority={true}
          layout={`fill`}
          objectFit={`contain`}
          onLoad={closeLoadingModal}
        />
      </motion.div>
      <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
    </>
  );
};
