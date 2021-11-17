import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import { ImagesType } from "@/assets/type/types";
import { useHeadersContext, InitialState } from "@/components/header/HeadersContext";

type State = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}

type Params = {
  imageRef: ImagesType;
  length: number;
  element: React.MutableRefObject<any>
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
  const { state: contextState, dispatch }: State = useHeadersContext();

  // check window aspect ratio
  const [imageStyle, setImageStyle] = useState<string>()
  const adjustContainerToImage = (): void => {
    const headerHeight: number = contextState.headerHeight;
    const footerHeight: number = contextState.footerHeight;

    const windowHeight: number = window.innerHeight;

    const containerWidth: number = element.current.clientWidth;
    const containerHeight: number = windowHeight - (headerHeight + footerHeight);
    document.documentElement.style.setProperty(`--img-container-width`, `${containerWidth}px`)
    document.documentElement.style.setProperty(`--img-container-height`, `${containerHeight}px`)

    const imgWidth: number = imageRef.width;
    const imgHeight: number = imageRef.height;
    document.documentElement.style.setProperty(`--img-width`, `${imgWidth}px`)
    document.documentElement.style.setProperty(`--img-width`, `${imgHeight}px`)

    const isWindowHorizontal: boolean = containerWidth > containerHeight;
    const isImageHorizontal: boolean = imgWidth > imgHeight;

    const minImgLongSideNum = 350;
    document.documentElement.style.setProperty(`--min-img-long-side`, `${minImgLongSideNum}px`)

    let maxImgWidth: number;
    let maxImgHeight: number;
    const maxImageLongSideNum = 1050;
    if(isImageHorizontal) {
      const aspectRatio: number = imgHeight / imgWidth;
      const maxHeight: number = maxImageLongSideNum * aspectRatio
      maxImgWidth = Math.min(imgWidth, maxImageLongSideNum)
      maxImgHeight = Math.min(imgHeight, maxHeight)
    }else {
      const aspectRatio: number = imgWidth / imgHeight
      const maxWidth: number = maxImageLongSideNum * aspectRatio;
      maxImgWidth = Math.min(imgWidth, maxWidth)
      maxImgHeight = Math.min(imgHeight, maxImageLongSideNum)
    }
    document.documentElement.style.setProperty(`--max-img-width`, `${maxImgWidth}px`)
    document.documentElement.style.setProperty(`--max-img-height`, `${maxImgHeight}px`)


    // document.documentElement.style.setProperty(`--img-container-height`, `${containerHeight}px`)

    const aspectRatioForHeight = imgHeight / imgWidth;
    const aspectRatioForWidth = imgWidth / imgHeight;
    document.documentElement.style.setProperty(`--img-aspect-ratio-for-height`, `${aspectRatioForHeight}`)
    document.documentElement.style.setProperty(`--img-aspect-ratio-for-width`, `${aspectRatioForWidth}`)

    if(isImageHorizontal) {
      const isContainerWidthLarge = containerWidth > maxImgWidth
      const isContainerHeightLarge = containerHeight > maxImgHeight
      if(isContainerWidthLarge) {
        isContainerHeightLarge ? setImageStyle(`t-img-horizon-container-both-high`) : setImageStyle(`t-img-horizon-container-width_high-height_low`);
      }else {
        isContainerHeightLarge ? setImageStyle(`t-img-horizon-container-width_low-height_high`) : isWindowHorizontal ? setImageStyle(`t-img-horizon-container-width_low-height_high-window_horizon`) : setImageStyle(`t-img-horizon-container-both-low`);
      }

    }else {
      const isContainerWidthLarge = containerWidth > maxImgWidth
      const isContainerHeightLarge = containerHeight > maxImgHeight
      if(isContainerWidthLarge) {
        isContainerHeightLarge ? setImageStyle(`t-img-vertical-container-both-high`) : setImageStyle(`t-img-vertical-container-width_high-height_low`);
      }else {
        isWindowHorizontal ? setImageStyle(`t-img-vertical-container-width_low-window_horizon`) : setImageStyle(`t-img-vertical-container-width_low-window_vertical`)
      }
    }
  }
  useEffect(() => {
    adjustContainerToImage()
    window.addEventListener(`resize`, adjustContainerToImage)
    return () => {
      window.removeEventListener(`resize`, adjustContainerToImage)
    }
  }, [])

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

  // tap reaction
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

  // image loading check
  const [isImageLoading, setImageLoad] = useState(true);
  function photoLoaded() {
    setImageLoad(false);
  }

  // image transtion
  const imageTranstion = (e: any) => {
    const elWidth = e.target.clientWidth;
    const elPosition = Math.floor(e.target.getBoundingClientRect().left);
    const centerPoint = elWidth / 2;
    const clickPoint = e.pageX;
    if((clickPoint - elPosition) > centerPoint) {
      nextPhoto();
    }else {
      prevPhoto();
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onTapStart={onTapStart}
        onTap={onTap}
        transition={{ duration: 0.5 }}
        className={`relative leading-3 bg-green-100 ${imageStyle}`}
        style={{ touchAction: "none" }}
        onClick={(e) => imageTranstion(e)}
      >
        <NextImage
          // onClick={(e) => click(e)}
          className={`cursor-pointer`}
          src={imageRef.url}
          width={imageRef.width}
          height={imageRef.height}
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
