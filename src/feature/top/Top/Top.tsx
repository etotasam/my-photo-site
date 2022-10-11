import React from "react";
//! component
import { TopImageContainer } from "../components/TopImage";
import { SiteDiscription } from "../components/SiteDiscription";
//! type
import { ImagesType } from "@/types";
//! hooks
import { useDeviceCheck } from "@/hooks";

type TopType = {
  // allImages: Record<string, ImagesType[]>;
  topImages: ImagesType[];
};

export const Top = ({ topImages }: TopType) => {
  const { device } = useDeviceCheck();
  return (
    <section className={`md:flex md:justify-between relative overflow-x-hidden`}>
      <TopImageContainer topImages={topImages} />
      <div className={`flex md:justify-end`}>
        <SiteDiscription device={device} />
      </div>
    </section>
  );
};
