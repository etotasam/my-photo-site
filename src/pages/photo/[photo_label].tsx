import React, { memo, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { ImageViewerContainer } from "@/feature/image_viewer/ImageViewer";
//! api
import { fetchImagesByLocationApi, fetchLocationNamesApi } from "@/api/imagesApi";
//! context
import { useLocationNamesDispatchContext } from "@/context/locationNamesContext";
import { ImageLoadStateProvider } from "@/feature/image_viewer/ImageViewer/context/imageLoadedStateContext";
//! types
import { ImagesType } from "@/types";

type PropsType = { locationImages: ImagesType[]; locationNames: string[] };

const PhotoLabel = ({ locationImages, locationNames }: PropsType) => {
  const route = useRouter();
  const imagesLength = locationImages.length;
  const { photo_label, image: imageIndexByQuery } = route.query;

  //? Nav,Modalに表示させるlocation名をcontextにセット
  const { setLocationNamesDispatcher } = useLocationNamesDispatchContext();
  useEffect(() => {
    if (!locationNames.length) return;
    setLocationNamesDispatcher(locationNames);
  }, [locationNames]);

  useEffect(() => {
    if (!imageIndexByQuery) return;
    if (Number(imageIndexByQuery) > imagesLength || Number(imageIndexByQuery) < 1 || isNaN(Number(imageIndexByQuery))) {
      route.push(`/photo/${photo_label}?image=1`);
      return;
    }
  }, [imageIndexByQuery]);

  //? imageのpre-loading
  useEffect(() => {
    const imagesPreload = () => {
      locationImages.map((el) => {
        const img = new Image();
        img.src = el.url as string;
      });
    };
    imagesPreload();
  }, []);

  const locationTitle = typeof photo_label === "string" && photo_label.toUpperCase();

  return (
    <>
      <Head>
        <title>
          {locationTitle
            ? `${process.env.NEXT_PUBLIC_SITE_TITLE} ${locationTitle}`
            : process.env.NEXT_PUBLIC_SITE_TITLE}
        </title>
      </Head>
      <ImageLoadStateProvider>
        <ImageViewerContainer locationImages={locationImages} />
      </ImageLoadStateProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locationNames = await fetchLocationNamesApi();
  const params = locationNames.map((locName) => {
    return { params: { photo_label: locName } };
  });
  return {
    paths: [...params],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { photo_label },
}: {
  params: { photo_label: string };
}) => {
  const locationImages = await fetchImagesByLocationApi(photo_label as string);

  //? Navに表示する為のlocation名を取得する(フォルダが存在しても写真が入ってないモノは除外する)
  const locationNames = await fetchLocationNamesApi();
  return {
    props: {
      locationImages,
      locationNames,
    },
  };
};

export default memo(PhotoLabel);
