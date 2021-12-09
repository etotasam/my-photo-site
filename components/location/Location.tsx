import React, { memo, useState, useEffect, useRef } from "react";
import Photo from "./Photo";
import { ImagesType } from "@/@types/types";
import { useWindowResize } from "@/hooks/getWindowHeight";
import { useScrollPosition } from "@/hooks/getScrollPosition";

type props = {
  locations: ImagesType[];
};

const Location = ({ locations }: props) => {
  const element = useRef(void 0);
  const [elTopPotion, setElTopPotion] = useState<number>();
  const [hasBreak, setHasBreak] = useState<boolean>(false);
  const { height } = useWindowResize();
  const scrollPoition = useScrollPosition();
  const breakpoint = height + scrollPoition;
  const breakState = breakpoint > elTopPotion;
  if (breakState && !hasBreak) {
    setHasBreak(true);
  }

  useEffect(() => {
    const elTopPotion = element.current.getBoundingClientRect().top;
    setElTopPotion(elTopPotion);
  }, []);

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`t-under-border text-green-600 mt-5 mx-auto`}>Location</h1>
      </div>
      <ul ref={element} className={`mt-10 mx-auto`}>
        {locations &&
          locations.map((location, index) => (
            <Photo index={index} key={location.id} location={location} hasBreak={hasBreak} />
          ))}
      </ul>
    </>
  );
};

export default memo(Location);
