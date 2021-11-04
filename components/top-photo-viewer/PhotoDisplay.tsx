import React, { useContext } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ImagesType } from "@/assets/type/types";
import Image from "next/image";
import { useRouter } from "next/router";
//context component
import { CurrentPhotoIndexContext } from "./PhotoViewerContainer";

type Params = {
  photo: ImagesType;
  imagesLength: number;
  allImages: Record<string, ImagesType[]>;
  index: number;
};

const DisplayingPhoto: React.FC<Params> = ({
  photo,
  imagesLength,
  allImages,
}) => {
  const router = useRouter();
  const { currentPhotoIndex, setCurrentPhotoIndex } = useContext(
    CurrentPhotoIndexContext
  );

  function PhotoSlideToNext(): void {
    // if (!isMounted) return;
    setCurrentPhotoIndex((state: number) => {
      if (imagesLength - 1 <= state) {
        return (state = 0);
      }
      return state + 1;
    });
  }
  function PhotoSlideToPrev(): void {
    setCurrentPhotoIndex((state: number) => {
      if (state <= 0) {
        return (state = imagesLength - 1);
      }
      return (state = state - 1);
    });
  }

  // 写真のスライドをsetIntervalでセット
  let photoSliderInterval: NodeJS.Timer;
  const slideTime = 5000;
  function startPhotoSliderInterval(): void {
    photoSliderInterval = setInterval(PhotoSlideToNext, slideTime);
  }

  /**
   * 表示する写真がセットされたら発火し、mount状態である以上は
   * startPhotoSliderInterval() で写真を入れ替える関数がintervalでセットされる
   */
  let isMounted: boolean;
  useEffect(() => {
    isMounted = true;
    startPhotoSliderInterval();
    return () => {
      isMounted = false;
      clearTimeout(photoSliderInterval);
    };
  }, [currentPhotoIndex]);

  /**
   * 画面tapでの挙動
   * 以下3つの関数で写真のスワイプで写真が変わる
   * onTapStart   tapすると発火
   * onTap        tapして画面から指が離れると発火
   * onTapCancel  要素外で指が離れると発火
   */
  let tapPositionX: number;
  let unTapPositionX: number;
  function onTapStart(event: any, info: any) {
    clearTimeout(photoSliderInterval);
    tapPositionX = info.point.x;
  }

  const necessaryMoveX = 100;
  function onTap(event: any, info: any) {
    unTapPositionX = info.point.x;
    const movedPositionX = unTapPositionX - tapPositionX;

    if (movedPositionX < -necessaryMoveX) {
      PhotoSlideToNext();
      return;
    } else if (necessaryMoveX < movedPositionX) {
      PhotoSlideToPrev();
      return;
    }
    startPhotoSliderInterval();
  }

  function onTapCancel() {
    startPhotoSliderInterval();
  }

  // クリックされた画像のidからindexを抽出してindexでページを表示させる
  function clickImage(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    const chunkId = photo.id.split(`_`);
    const location = chunkId[0];
    const idNumber = chunkId[1];
    const images = allImages[location];
    const imagesSortdInDesc = images.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    });
    const imageIndex = imagesSortdInDesc.findIndex((el) => el.id === photo.id);
    router.push(`/photo/${location}?num=${imageIndex + 1}`);
  }

  return (
    <>
      <motion.div
        onTapStart={onTapStart}
        onTap={onTap}
        onTapCancel={onTapCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`absolute top-0 left-0 w-full cursor-pointer`}
        style={{ touchAction: "none" }}
      >
        <a
          className={`block relative pt-[100%]`}
          onClick={(e) => clickImage(e)}
        >
          <Image
            // className={`pointer-events-none`}
            src={photo.url}
            layout="fill"
            objectFit="cover"
            alt={``}
          />
        </a>
      </motion.div>
    </>
  );
};

export default DisplayingPhoto;
