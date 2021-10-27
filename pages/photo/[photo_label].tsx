import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "@/store/index";
import Head from "next/head";
import ViewPhotoElment from "@/components/photo_label/ViewPhotoElment";
import axios from "axios";
import { ImageType } from "@/pages/index";

type ParamsType = {
  images: ImageType[];
  // photo: ImageType;
};

const PhotoLabel: React.FC<ParamsType> = ({ images }) => {
  const [viewImageIndex, setViewImageIndex] = useState<number>();
  const route = useRouter();
  const { photo_label, num } = route.query;
  const imagesLength = images.length;

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

  const locationTitle =
    typeof photo_label === "string" && photo_label.toUpperCase();
  const siteTitle = useSelector((state: StoreState) => state.siteTitle);

  return (
    <>
      <Head>
        <title>{locationTitle ? `Location ${locationTitle}` : siteTitle}</title>
      </Head>
      <div className={`t-main-height flex justify-center items-center`}>
        {sortImagesByIdInDesc.map(
          (imageRef, index) =>
            viewImageIndex === index && (
              <ViewPhotoElment
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

export const getStaticPaths = async () => {
  const { data } = await axios.get(`${apiUrl}/locations`);
  const locations = data.locations;

  const params = locations.map((doc) => {
    return { params: { photo_label: doc } };
  });
  return {
    paths: [...params],
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { photo_label } }) => {
  const { data } = await axios.get(`${apiUrl}/images/${photo_label}`);

  return {
    props: {
      images: data.images,
    },
  };
};

export default memo(PhotoLabel);
