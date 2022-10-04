import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
//! component
import { ViewPhoto } from "./ViewPhoto";

//! types
import type { ImagesType } from "@/@types/types";

//! context
import { useModalDispatchContext } from "@/context/modalStateContext";
import { useHeihgtStateContext } from "@/context/heightStateContext";
import { useLoadDispatchContext } from "@/context/loadStateContext";

type Params = {
  imageRef: ImagesType;
  imagesLength: number;
};
export const ViewPhotoContainer = ({ imageRef, imagesLength: lastImage }: Params) => {
  const router = useRouter();
  const { photo_label, image } = router.query;

  //? photo transition
  const prevPhoto = () => {
    let prev: number | undefined;
    if (image) prev = Number(image) - 1;
    if (!image) prev = lastImage;
    if (prev! < 1) return router.push(`/photo/${photo_label}?image=${lastImage}`);
    router.push(`/photo/${photo_label}?image=${prev}`);
  };

  //? photo transition
  const nextPhoto = () => {
    let next: number;
    if (image) next = Number(image) + 1;
    if (!image) next = 2;
    if (next! > lastImage) return router.push(`/photo/${photo_label}?image=1`);
    router.push(`/photo/${photo_label}?image=${next!}`);
  };

  //? get values headerHeight and footerHeight by useContext
  const { modalCloseDispatcher } = useModalDispatchContext();
  const { loadedDispatcher } = useLoadDispatchContext();

  const closeModal = () => {
    modalCloseDispatcher();
    loadedDispatcher();
  };

  useEffect(() => {
    //? imageLoad();
    closeModal();
  }, []);

  //? image transtion
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

  const tapOnPositon = React.useRef<number>();
  const tapOn = (e: React.TouchEvent<HTMLImageElement>) => {
    tapOnPositon.current = e.changedTouches[0].pageX;
  };

  const requireNum = 100;
  const tapOff = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!tapOnPositon.current) {
      if (process.env.NEXT_PUBLIC_IS_DEV) {
        console.error("tapOnPositon is null");
      }
      return;
    }
    const tapOffPosition = e.changedTouches[0].pageX;
    const movedNum = tapOffPosition - tapOnPositon.current;
    if (Math.abs(movedNum) < requireNum) return;
    if (movedNum > 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  };

  //? image loading check
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const closeLoadingModal = () => {
    setIsImageLoading(false);
  };
  return (
    <ViewPhoto
      imageRef={imageRef}
      imageTranstion={imageTranstion}
      tapOn={tapOn}
      tapOff={tapOff}
      isImageLoading={isImageLoading}
      closeLoadingModal={closeLoadingModal}
    />
  );
};
