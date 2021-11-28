import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../Loading";
import type { ImagesType } from "@/assets/type/types";
import { useHeadersContext } from "@/components/header/HeadersContext";
import type { InitialState } from "@/components/header/HeadersContext";

type State = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
};

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
  const { state: contextState, dispatch }: State = useHeadersContext();

  // check window aspect ratio
  const [imageStyle, setImageStyle] = useState<string>();
  const adjustContainerToImage = (): void => {
    const headerHeight = contextState.headerHeight;
    const footerHeight = contextState.footerHeight;
    const windowHeight = window.innerHeight;

    const containerWidth: number = element.current.clientWidth;
    document.documentElement.style.setProperty(`--img-container-width`, `${containerWidth}px`);
    const containerHeight: number = windowHeight - (headerHeight + footerHeight);

    const isWindowHorizontal: boolean = containerWidth > containerHeight;

    // imageRefの縦位置、横位置のチェックと、各width heightの設定
    const imgWidth = imageRef.width;
    const imgHeight = imageRef.height;
    document.documentElement.style.setProperty(`--img-width`, `${imgWidth}px`);
    document.documentElement.style.setProperty(`--img-width`, `${imgHeight}px`);
    const isImageHorizontal = imgWidth > imgHeight;
    let maxImgWidth: number;
    let maxImgHeight: number;
    const maxImageLongSideNum = 850;
    const minImageLongSideNum = 350;
    document.documentElement.style.setProperty(`--min-img-long-side`, `${minImageLongSideNum}px`);
    if (isImageHorizontal) {
      const aspectRatio = imgHeight / imgWidth;
      const maxHeight = maxImageLongSideNum * aspectRatio;
      maxImgWidth = Math.min(imgWidth, maxImageLongSideNum);
      maxImgHeight = Math.min(imgHeight, maxHeight);
    } else {
      const aspectRatio = imgWidth / imgHeight;
      const maxWidth = maxImageLongSideNum * aspectRatio;
      maxImgWidth = Math.min(imgWidth, maxWidth);
      maxImgHeight = Math.min(imgHeight, maxImageLongSideNum);
    }
    document.documentElement.style.setProperty(`--max-img-width`, `${maxImgWidth}px`);
    document.documentElement.style.setProperty(`--max-img-height`, `${maxImgHeight}px`);

    const aspectRatioForHeight = imgHeight / imgWidth;
    const aspectRatioForWidth = imgWidth / imgHeight;
    document.documentElement.style.setProperty(`--img-aspect-ratio-for-height`, `${aspectRatioForHeight}`);
    document.documentElement.style.setProperty(`--img-aspect-ratio-for-width`, `${aspectRatioForWidth}`);

    const isContainerWidthLarge = containerWidth > maxImgWidth;
    const isContainerHeightLarge = containerHeight > maxImgHeight;

    const setCssClass = () => {
      if (isImageHorizontal) {
        if (isContainerWidthLarge && isContainerHeightLarge) return `t-img_conrainer_horizon-both-high`;
        if (isContainerWidthLarge && !isContainerHeightLarge) return `t-img_container_horizon-width_high-height_low`;
        if (!isContainerWidthLarge && isContainerHeightLarge) return `t-img_container_horizon-width_low-height_high`;
        if (!isContainerWidthLarge && !isContainerHeightLarge) return isWindowHorizontal ? `t-img_container_horizon-both_low-window_horizon` : `t-img_container_horizon-both_low-window_vertical`;
      } else {
        if (isContainerWidthLarge && isContainerHeightLarge) return `t-img_container_vertical-both_high`;
        if (isContainerWidthLarge && !isContainerHeightLarge) return `t-img_container_vertical-width_high-height_low`;
        if (!isContainerWidthLarge && isWindowHorizontal) return `t-img_container_vertical-width_low-window_horizon`;
        if (!isContainerWidthLarge && !isWindowHorizontal) return `t-img_container_vertical-width_low-window_vertical`;
      }
    };
    setImageStyle(setCssClass());
  };

  const toCloseModals = () => {
    dispatch({ type: `inactiveModal` });
    dispatch({ type: `loaded` });
  };

  useEffect(() => {
    toCloseModals();
    adjustContainerToImage();
    window.addEventListener(`resize`, adjustContainerToImage);
    return () => {
      window.removeEventListener(`resize`, adjustContainerToImage);
    };
  }, []);

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
  function onTapStart(event: any, info: any) {
    tapPositionX = info.point.x;
  }

  const requiredMoveX = 100;
  function onTap(event: any, info: any) {
    const unTapPositionX = info.point.x;
    const movedPositionX = unTapPositionX - tapPositionX;
    if (Math.abs(movedPositionX) < requiredMoveX) return;
    if (movedPositionX < 0) {
      nextPhoto();
      return;
    } else {
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onTapStart={onTapStart}
        onTap={onTap}
        transition={{ duration: 0.5 }}
        className={`relative leading-3 ${imageStyle}`}
        style={{ touchAction: "none" }}
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
          onLoad={photoLoaded}
        />
        <AnimatePresence>{isImageLoading && <Loading />}</AnimatePresence>
      </motion.div>
    </>
  );
};

export default ViewPhoto;
