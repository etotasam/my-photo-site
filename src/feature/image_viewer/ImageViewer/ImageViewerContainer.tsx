import React from "react";
import { useRouter } from "next/router";
//! component
import { ImageViewer } from "./";
//! types
import type { ImagesType } from "@/types";
//! context
import { useModalDispatchContext } from "@/context/modalStateContext";
import { useImageLoadStateContext } from "./context/imageLoadedStateContext";

type Params = {
  className?: string;
  locationImages: ImagesType[];
};

export const ImageViewerContainer = ({ locationImages, className }: Params) => {
  const router = useRouter();
  const { photo_label: photoLabelByQuery, image: imageIndexByQuery } = router.query;

  //? image load state in context (storybookでチェックしたいからpropで渡してる)
  const { isImageLoading } = useImageLoadStateContext();

  //? image transition
  const imageTransition = (clickPosition: "right" | "left") => {
    if (clickPosition === "left") {
      let prev: number | undefined;
      if (imageIndexByQuery) prev = Number(imageIndexByQuery) - 1;
      if (!imageIndexByQuery) prev = locationImages.length;
      if (prev! < 1) return router.push(`/photo/${photoLabelByQuery}?image=${locationImages.length}`);
      router.push(`/photo/${photoLabelByQuery}?image=${prev}`);
    }
    if (clickPosition === "right") {
      let next: number;
      if (imageIndexByQuery) next = Number(imageIndexByQuery) + 1;
      if (!imageIndexByQuery) next = 2;
      if (next! > locationImages.length) return router.push(`/photo/${photoLabelByQuery}?image=1`);
      router.push(`/photo/${photoLabelByQuery}?image=${next!}`);
    }
  };

  const { modalCloseDispatcher } = useModalDispatchContext();
  //? menu modalを閉じる
  React.useEffect(() => {
    modalCloseDispatcher();
  }, []);

  //? image transtion
  const imageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.target as HTMLElement;
    const elWidth = el.clientWidth;
    const elLeftPosition = Math.floor(el.getBoundingClientRect().left);
    const centerPoint = elWidth / 2;
    const clickPoint = e.clientX;
    const clickPosition: "right" | "left" = clickPoint - elLeftPosition > centerPoint ? "right" : "left";
    imageTransition(clickPosition);
  };

  const tapOnPositon = React.useRef<number>();
  const tapOn = (e: React.TouchEvent<HTMLImageElement>) => {
    tapOnPositon.current = e.changedTouches[0].clientX;
  };

  const requireNum = 100;
  const tapOff = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!tapOnPositon.current) {
      if (process.env.NEXT_PUBLIC_IS_DEV) {
        console.error("tapOnPositon is null");
      }
      return;
    }
    const tapOffPosition = e.changedTouches[0].clientX;
    const movedNum = tapOffPosition - tapOnPositon.current;
    if (Math.abs(movedNum) < requireNum) return;
    const swipeDirection = movedNum > 0 ? "left" : "right";
    imageTransition(swipeDirection);
  };

  return (
    <>
      <ImageViewer
        locationImages={locationImages}
        imageIndexByQuery={imageIndexByQuery}
        imageClick={imageClick}
        tapOn={tapOn}
        tapOff={tapOff}
        isImageLoading={isImageLoading}
      />
    </>
  );
};
