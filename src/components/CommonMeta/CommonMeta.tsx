import React from "react";
import Head from "next/head";

type PropsType = {
  title: string;
  description?: string;
};

const descriptionStatement = `自分が旅した写真を載せてるだけのサイトです。モロッコ、フランス、トルコ、エジプト、ヨルダン。`;

export const CommonMeta = ({
  title,
  description = descriptionStatement,
}: PropsType) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
