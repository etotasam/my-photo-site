import React from "react";
import { CommonMeta } from "@/components/CommonMeta";
//! component
import { ImageUploadContainer } from "@/feature/image_upload";
const RegisterImage = () => {
  return (
    <>
      <CommonMeta title={`写真の登録画面`} />
      <ImageUploadContainer />
    </>
  );
};

export default RegisterImage;

export const getStaticProps = async () => {
  return {
    props: {
      layout: `admin`,
    },
  };
};
