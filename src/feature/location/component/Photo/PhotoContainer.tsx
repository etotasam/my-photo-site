import React from "react";
import { Photo } from "./Photo";
import { ImagesType } from "@/types";

type PhotoContainerType = {
  locationImage: ImagesType;
  imageIndex: number;
  isAllImagesloaded: boolean;
  loadedLocationImage: () => void;
};

export const PhotoContainer = (props: PhotoContainerType) => {
  //? Photo props
  const { locationImage, loadedLocationImage } = props;
  //? photoContainer props
  const { isAllImagesloaded, imageIndex } = props;

  //? image表示部分のアニメーション
  const photoElRef = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
    if (!isAllImagesloaded) return;
    if (!photoElRef.current) return;
    const target = photoElRef.current;
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) {
        photoElRef.current?.classList.remove("opacity-0");
        Object.assign(photoElRef.current!.style, {
          opacity: "1",
          transition: `opacity 1s ${(imageIndex + 1) * 5}00ms`,
          animationDelay: `${(imageIndex + 1) * 5}00ms`,
        });
        observer.unobserve(entries[0].target);
      }
    };
    const io = new IntersectionObserver(callback, options);
    io.observe(target);
  }, [photoElRef, isAllImagesloaded]);

  //? h2文字列のアニメーション
  const h2ElRef = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => {
    if (!isAllImagesloaded) return;
    if (!h2ElRef.current || !photoElRef.current) return;
    const animationTarget = h2ElRef.current;
    const breakPoint = photoElRef.current;
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) {
        animationTarget.classList.remove("opacity-0");
        Object.assign(animationTarget.style, {
          opacity: "1",
          transition: `1s ${imageIndex * 5}00ms`,
          animation: `slide-string 1s`,
          animationDelay: `${imageIndex * 5}00ms`,
        });

        observer.unobserve(entries[0].target);
      }
    };

    const io = new IntersectionObserver(callback, options);
    io.observe(breakPoint);
  }, [h2ElRef, photoElRef, isAllImagesloaded]);

  return (
    <Photo
      locationImage={locationImage}
      loadedLocationImage={loadedLocationImage}
      photoElRef={photoElRef}
      h2ElRef={h2ElRef}
    />
  );
};
