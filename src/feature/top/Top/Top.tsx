import React from "react";
//! component
import { TopImageContainer } from "../components/TopImage";
import { SiteDiscription } from "../components/SiteDiscription";
//! type
import { ImagesType } from "@/types";

type TopType = {
  // allImages: Record<string, ImagesType[]>;
  topImages: ImagesType[];
};

export const Top = ({ topImages }: TopType) => {
  return (
    <section className={`md:flex md:justify-between relative`}>
      <TopImageContainer topImages={topImages} />
      <div className={`flex md:justify-end`}>
        <SiteDiscription />
      </div>
    </section>
  );
};
