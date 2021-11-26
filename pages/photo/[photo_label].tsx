import React, { memo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ViewPhoto from "@/components/photo_label/ViewPhoto";
import axios from "axios";
import { GetStaticProps, GetStaticPaths } from "next";
import { ImagesType } from "@/assets/type/types";

const PhotoLabel = ({ images }: { images: ImagesType[] }) => {
  const route = useRouter();
  const [viewImageIndex, setViewImageIndex] = useState<number>();
  const imagesLength = images.length;
  const { photo_label, image } = route.query;

  useEffect(() => {
    if (!image) return;
    if (
      Number(image) > imagesLength ||
      Number(image) < 1 ||
      isNaN(Number(image))
    ) {
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
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });

  // imageのpre-loading
  const imagesPreload = () => {
    images.map((el) => {
      const img = new Image();
      img.src = el.url;
    });
  };

  useEffect(() => {
    imagesPreload();
  }, []);

  const locationTitle =
    typeof photo_label === "string" && photo_label.toUpperCase();

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
      <div
        ref={element}
        className={`t-main-height flex justify-center items-center`}
      >
        {sortImagesByIdInDesc.map(
          (imageRef, index) =>
            viewImageIndex === index && (
              <ViewPhoto
                key={imageRef.id}
                imageRef={imageRef}
                length={imagesLength}
                element={element}
              />
            )
        )}
      </div>
    </>
  );
};

const apiUrl = process.env.API_URL;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: locations }: { data: string[] } = await axios.get(
    `${apiUrl}/locations`
  );

  const params = locations.map((doc) => {
    return { params: { photo_label: doc } };
  });
  return {
    paths: [...params],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { photo_label },
}) => {
  const { data: images }: { data: ImagesType[] } = await axios.get(
    `${apiUrl}/images/${photo_label}`
  );

  return {
    props: {
      images,
    },
  };
};

export default memo(PhotoLabel);
