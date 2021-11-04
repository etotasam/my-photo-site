import React, { memo, useState, useEffect } from "react";
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
  const { photo_label, num } = route.query;

  useEffect(() => {
    if (!num) return;
    if (Number(num) > imagesLength || Number(num) < 1 || isNaN(Number(num))) {
      route.push(`/photo/${photo_label}?num=1`);
      return;
    }
    const index = Number(num) - 1;
    setViewImageIndex(index);
  }, [num]);

  useEffect(() => {
    if (num) return;
    setViewImageIndex(0);
  }, [photo_label]);

  const sortImagesByIdInDesc = images.sort((a, b) => {
    const idA = a.id.split(`_`)[1];
    const idB = b.id.split(`_`)[1];
    if (Number(idA) > Number(idB)) return -1;
    if (Number(idA) < Number(idB)) return 1;
    return 0;
  });

  // imageのpre-loading
  useEffect(() => {
    images.map((el) => {
      const img = new Image();
      img.src = el.url;
    });
  }, []);

  const locationTitle =
    typeof photo_label === "string" && photo_label.toUpperCase();

  return (
    <>
      <Head>
        <title>
          {locationTitle
            ? `${process.env.NEXT_PUBLIC_SITE_TITLE} ${locationTitle}`
            : process.env.NEXT_PUBLIC_SITE_TITLE}
        </title>
      </Head>
      <div className={`t-main-height flex justify-center items-center`}>
        {sortImagesByIdInDesc.map(
          (imageRef, index) =>
            viewImageIndex === index && (
              <ViewPhoto
                key={imageRef.id}
                imageRef={imageRef}
                length={imagesLength}
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
