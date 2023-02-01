import React from "react";
//! components
import { CommonMeta } from "@/components/CommonMeta";
import { AdminContaienr } from "@/feature/admin";
const Admin = () => {
  return (
    <>
      <CommonMeta title={`ログイン認証`} />
      <AdminContaienr />
    </>
  );
};

export default Admin;

export const getStaticProps = async () => {
  return {
    props: {
      layout: `admin`,
    },
  };
};
