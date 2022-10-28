import React from "react";
import Head from "next/head";
//! component
import { ImageUploadContainer } from "@/feature/image_upload";
const register_image = () => {
  return (
    <>
      <Head>
        <title>写真の登録画面</title>
      </Head>
      <ImageUploadContainer />
    </>
  );
};

export default register_image;

export const getStaticProps = async () => {
  return {
    props: {
      layout: `admin`,
    },
  };
};
