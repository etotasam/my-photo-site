import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ImagesType } from "@/@types/types";

type Props = {
  locationImage: ImagesType;
  index: number;
  loadedLocationImage: () => void;
  // hasBreak: boolean;
};

export const Photo = ({ locationImage, loadedLocationImage, index }: Props) => {
  const label = locationImage.id.split(`_`)[0];

  //? photo表示部分のアニメーション
  const photoElRef = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
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
          transition: `opacity 1s ${(index + 1) * 5}00ms`,
          animation: `vertical-slide 1s`,
          animationDelay: `${(index + 1) * 5}00ms`,
        });
        observer.unobserve(entries[0].target);
      }
    };
    const io = new IntersectionObserver(callback, options);
    io.observe(target);
  }, [photoElRef]);

  //? h2文字列のアニメーション
  const h2ElRef = React.useRef<HTMLHeadingElement>(null);
  React.useEffect(() => {
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
          transition: `1s ${index * 5}00ms`,
          animation: `slide-string 1s`,
          animationDelay: `${index * 5}00ms`,
        });

        observer.unobserve(entries[0].target);
      }
    };

    const io = new IntersectionObserver(callback, options);
    io.observe(breakPoint);
  }, [h2ElRef, photoElRef]);

  //? 写真にhoverした時のアニメーション(jsで実装)
  const hover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign((e.target as HTMLDivElement).style, {
      transform: "scale(1.1)",
      transition: ".5s",
    });
  };
  const unHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign((e.target as HTMLDivElement).style, {
      transform: "scale(1)",
      transition: ".5s",
    });
  };

  // const [imagesLoaded ,setImagesLoaded] = useState(0)
  // const loadedImage = () => {
  //   if(locationImage < imagesLoaded) return
  //   setImagesLoaded((v) => v + 1)
  // };

  return (
    <>
      {/* {hasBreak ? ( */}
      <li data-testid={`breaked`} key={locationImage.id} className={`w-1/2 md:w-1/5 mb-5 inline-block`}>
        <Link href={`/photo/${label}?image=1`} passHref>
          <a
            ref={photoElRef}
            onMouseOver={hover}
            onMouseLeave={unHover}
            className={`block cursor-pointer relative w-[90%] pt-[45%] mx-auto opacity-0`}
          >
            {/* <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [null, -2, 0],
                transition: { duration: 1, delay: index / 3 },
              }}
              whileHover={{
                scale: [null, 1.04, 1.03],
                transition: { duration: 0.5 },
              }}
              className={`block cursor-pointer relative w-[90%] pt-[45%] mx-auto`}
            > */}
            <NextImage
              className={`pointer-events-none`}
              layout="fill"
              objectFit="cover"
              src={locationImage.url}
              alt={``}
              onLoad={loadedLocationImage}
            />
            {/* </motion.a> */}
          </a>
        </Link>
        {/* <motion.h2
          data-testid={`h2`}
          animate={{ opacity: [0, 1], x: [-5, 0] }}
          transition={{ duration: 0.5, delay: index / 2 }}
          className={`font-extralight`}
        > */}
        <h2 ref={h2ElRef} data-testid={`h2`} className={`font-extralight opacity-0`}>{`${label
          .charAt(0)
          .toUpperCase()}${label.slice(1)}`}</h2>
        {/* </motion.h2> */}
      </li>
      {/* ) : (
        <li data-testid={`non-break`} className={`w-1/2 md:w-1/5 mb-5 inline-block`}></li>
      )} */}
    </>
  );
};
