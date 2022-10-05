import React from "react";
import NextImage from "next/image";

import img1 from "../../public/_MG_7346.jpg";

export type Props = {
  image: StaticImageData;
};

export const TestStoryBook = ({ image }: Props) => {
  return (
    <div className="relative w-[300px] h-[450px]">
      <NextImage className={`pointer-events-none`} layout="fill" objectFit="cover" src={image} alt={``} />
    </div>
  );
};
