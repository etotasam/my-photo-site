import React from "react";
import { ImagesType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import NextImage from "next/image";
//! component
import { MyLink } from "@/components/Element/MyLink";
// import { BulletNav } from "../BulletNav";
// import { ImageWrapperContainer } from "../ImageWrapper";
import { Loading } from "@/components/Element/Loading";
//! context

export type TopImageType = {
  topImages: ImagesType[];
  isTopImagesLoaded: boolean;
  currentImageIndex: number | undefined;
  imageLoaded: (id: string) => void;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  setCurrentImageIndex: (payload: number) => void;
};

//! main
export const TopImage = ({
  currentImageIndex,
  topImages,
  isTopImagesLoaded,
  imageLoaded,
  tapOn,
  tapOff,
  setCurrentImageIndex,
}: TopImageType) => {
  return (
    <div className={`md:w-[65%] max-w-[700px] flex md:flex-col`}>
      <div className={`relative pt-[90%] w-[90%] md:pt-[95%] md:w-[95%]`}>
        <AnimatePresence>
          {topImages.map(
            (imageData, index) =>
              (currentImageIndex === index || !isTopImagesLoaded) && (
                <ImageWrapper
                  key={imageData.id}
                  imageData={imageData}
                  imageIndex={index}
                  tapOn={tapOn}
                  tapOff={tapOff}
                  imageLoaded={(id) => imageLoaded(id)}
                  currentImageIndex={currentImageIndex}
                />
              )
          )}
        </AnimatePresence>
        <AnimatePresence>{(!isTopImagesLoaded || currentImageIndex === null) && <Loading />}</AnimatePresence>
      </div>
      <BulletNav
        topImages={topImages}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />
    </div>
  );
};

//! ImageWrapper
export type ImageWrapperType = {
  imageData: ImagesType;
  tapOn: (event: React.TouchEvent<HTMLImageElement>) => void;
  tapOff: (event: React.TouchEvent<HTMLImageElement>) => void;
  imageLoaded: (id: string) => void;
  imageIndex: number;
  currentImageIndex: number | undefined;
};

export const ImageWrapper = React.memo(
  ({ imageIndex, imageData, tapOn, tapOff, imageLoaded, currentImageIndex }: ImageWrapperType) => {
    const variables = {
      hide: {
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      },
      show: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    };

    const linkUrl = `/photo/${imageData.id.split("_")[0]}?image=1`;

    return (
      <motion.div initial="hide" animate="show" exit="hide" variants={variables}>
        <MyLink
          href={linkUrl}
          className={clsx("block cursor-pointer duration-500", currentImageIndex !== imageIndex && "opacity-0")}
        >
          <NextImage
            onTouchStart={tapOn}
            onTouchEnd={tapOff}
            onLoad={() => imageLoaded(imageData.id)}
            src={imageData.url}
            layout="fill"
            objectFit="cover"
            alt={``}
          />
        </MyLink>
      </motion.div>
    );
  }
);

//! BulletNav
export type BulletNavType = {
  topImages: ImagesType[];
  currentImageIndex: number | undefined;
  className?: string;
  setCurrentImageIndex: (payload: number) => void;
};

export const BulletNav = ({ topImages, className, currentImageIndex, setCurrentImageIndex }: BulletNavType) => {
  const variants = {
    initial_scale: {
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    scale: {
      scale: 2.2,
      transition: {
        duration: 0.5,
      },
    },
    current_color: {
      backgroundColor: "#0ea865",
    },
    default_color: {
      backgroundColor: "#909090",
    },
  };
  return (
    <>
      <ul
        className={clsx(`w-[10%] md:w-full min-h-[30px] list-none flex flex-col md:flex-row items-center`, className)}
      >
        {topImages.map((photo, index) => (
          <motion.li
            layout
            key={photo.id}
            whileHover="scale"
            animate={currentImageIndex === index ? "scale" : "initial_scale"}
            variants={variants}
            className={clsx(
              `flex justify-center items-center w-[10px] h-[10px] cursor-pointer md:mt-0`,
              index !== 0 && `mt-4 md:ml-2`
            )}
          >
            <motion.span
              variants={variants}
              animate={currentImageIndex === index ? "current_color" : "default_color"}
              className={`block rounded-[50%] w-1 h-1`}
              onClick={() => setCurrentImageIndex(index)}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};
