import React from "react";
import Head from "next/head";
//! components
import { AdminContaienr } from "@/feature/admin";
const admin = () => {
  return (
    <>
      <Head>
        <title>ログイン認証</title>
      </Head>
      <AdminContaienr />
    </>
  );
};

export default admin;

export const getStaticProps = async () => {
  return {
    props: {
      layout: `admin`,
    },
  };
};
