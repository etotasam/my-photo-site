import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
//! component
import { ImageViewer } from "./";
import { LoadingBound } from "@/components/Element/LoadingBound";
//! types
import type { ImagesType } from "@/types";
//! context
import { useModalDispatchContext } from "@/context/modalStateContext";

type Params = {
  className?: string;
  locationImages: ImagesType[];
};
export const ImageViewerContainer = ({ locationImages, className }: Params) => {
  const router = useRouter();
  const { photo_label: queryPhotoLabel, image: queryImage } = router.query;

  //? image transition
  const imageTransition = (clickPosition: "right" | "left") => {
    if (clickPosition === "left") {
      let prev: number | undefined;
      if (queryImage) prev = Number(queryImage) - 1;
      if (!queryImage) prev = locationImages.length;
      if (prev! < 1) return router.push(`/photo/${queryPhotoLabel}?image=${locationImages.length}`);
      router.push(`/photo/${queryPhotoLabel}?image=${prev}`);
    }
    if (clickPosition === "right") {
      let next: number;
      if (queryImage) next = Number(queryImage) + 1;
      if (!queryImage) next = 2;
      if (next! > locationImages.length) return router.push(`/photo/${queryPhotoLabel}?image=1`);
      router.push(`/photo/${queryPhotoLabel}?image=${next!}`);
    }
  };

  const { modalCloseDispatcher } = useModalDispatchContext();

  const closeModal = () => {
    modalCloseDispatcher();
  };

  //? menu modalを閉じる
  useEffect(() => {
    closeModal();
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

  //? image loading check
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  // const imageLoaded = () => {
  //   setIsImageLoading(false);
  // };
  return (
    <>
      <div className="relative t-main-height flex justify-center items-center">
        <AnimatePresence>
          {locationImages.map(
            (imageData, index) =>
              Number(queryImage) === index + 1 && (
                <ImageViewer
                  key={imageData.id}
                  className={className}
                  imageData={imageData}
                  imageClick={imageClick}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  isImageLoading={isImageLoading}
                  imageLoaded={() => setIsImageLoading(false)}
                />
              )
          )}
          {/* {isImageLoading && <LoadingBound />} */}
        </AnimatePresence>
      </div>
    </>
  );
};
