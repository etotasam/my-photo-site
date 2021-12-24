import React, { memo, useState, useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { ImagesType } from "@/@types/types";
import { useScrollPosition, useWindowResize } from "@/hooks";

type props = {
  locations: ImagesType[];
};

const Location = ({ locations }: props) => {
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
        {locations &&
          locations.map((location, index) => (
            <Photo index={index} key={location.id} location={location} hasBreak={hasBreak} />
          ))}
      </ul>
    </>
  );
};

export default memo(Location);
