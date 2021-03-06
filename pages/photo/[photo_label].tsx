import React, { memo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ViewPhoto } from "@/components/photo_label/ViewPhoto";
import { GetStaticProps, GetStaticPaths } from "next";
import { ImagesType } from "@/@types/types";
import { fetchLocationsApi, fetchImagesByLocationApi, fetchAllImagesApi } from "@/api/imagesApi";

const PhotoLabel = ({ images }: { images: ImagesType[] }) => {
  const route = useRouter();
  const [viewImageIndex, setViewImageIndex] = useState<number>();
  const imagesLength = images.length;
  const { photo_label, image } = route.query;

  useEffect(() => {
    if (!image) return;
    if (Number(image) > imagesLength || Number(image) < 1 || isNaN(Number(image))) {
      route.push(`/photo/${photo_label}?image=1`);
      return;
    }
    const index = Number(image) - 1;
    setViewImageIndex(index);
  }, [image]);

  useEffect(() => {
    if (image) return;
    setViewImageIndex(0);
  }, [photo_label]);

  const sortImagesByIdInDesc: ImagesType[] = images.sort((a, b) => {
    return Number(b.id.split(`_`).pop()) - Number(a.id.split(`_`).pop());
  });

  //? imageのpre-loading
  const imagesPreload = () => {
    images.map((el) => {
      const img = new Image();
      img.src = el.url;
    });
  };

  useEffect(() => {
    imagesPreload();
  }, []);

  const locationTitle = typeof photo_label === "string" && photo_label.toUpperCase();

  const element = useRef(null);
  return (
    <>
      <Head>
        <title>
          {locationTitle
            ? `${process.env.NEXT_PUBLIC_SITE_TITLE} ${locationTitle}`
            : process.env.NEXT_PUBLIC_SITE_TITLE}
        </title>
      </Head>
      <div ref={element} className={`t-main-height flex justify-center items-center`}>
        {sortImagesByIdInDesc.map(
          (imageRef, index) =>
            viewImageIndex === index && <ViewPhoto key={imageRef.id} imageRef={imageRef} imagesLength={imagesLength} />
        )}
      </div>
    </>
  );
};

type ParamsType = {
  params: {
    photo_label: string;
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const images = await fetchAllImagesApi();
  const params = Object.keys(images)
    .map((key) => {
      if (images[key].length) {
        return { params: { photo_label: key } };
      }
    })
    .filter((obj): obj is ParamsType => obj !== undefined);
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
  const images = await fetchImagesByLocationApi(photo_label as string);

  return {
    props: {
      images,
    },
  };
};

export default memo(PhotoLabel);
