import React, { memo, useState, useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { ImagesType } from "@/@types/types";
import { useScrollPosition, useWindowResize } from "@/hooks";

type props = {
  locationsImages: ImagesType[];
};

const Location = ({ locationsImages }: props) => {
  const [refTopPotion, setRefTopPotion] = useState<number>(0);
  const [hasBreak, setHasBreak] = useState<boolean>(false);
  const { height } = useWindowResize();
  const scrollPoition = useScrollPosition();
  const breakpoint = height + scrollPoition;
  const breakState = breakpoint > refTopPotion;
  if (breakState && !hasBreak) {
    setHasBreak(true);
  }

  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const refTopPotion = ref.current.getBoundingClientRect().top;
    setRefTopPotion(refTopPotion);
  }, []);

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`t-under-border text-green-600 mt-5 mx-auto`}>Location</h1>
      </div>
      <ul ref={ref} className={`mt-10 mx-auto`}>
        {locationsImages &&
          locationsImages.map((locationImage, index) => (
            <Photo index={index} key={locationImage.id} locationImage={locationImage} hasBreak={hasBreak} />
          ))}
      </ul>
    </>
  );
};

export default memo(Location);
