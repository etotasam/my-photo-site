import React, { memo, useState, useEffect, useRef } from "react";
import Photo from "./Photo";
import { ImagesType } from "@/assets/type/types";

type props = {
  locations: ImagesType[];
};

const Location = ({ locations }: props) => {
  const element = useRef(null);

  const [hasBreak, setHasBreak] = useState(false);

  useEffect(() => {
    if (hasBreak) {
      window.removeEventListener("scroll", checkWhetherReachBreakpoint);
      window.removeEventListener("resize", checkWhetherReachBreakpoint);
      return;
    }
    function checkWhetherReachBreakpoint(): void {
      const scrollPositionY = window.scrollY;
      const windowBottomY = scrollPositionY + window.innerHeight;
      if (element.current === null) return;
      const breakpoint =
        element.current.getBoundingClientRect().top + scrollPositionY;
      if (breakpoint < windowBottomY) {
        setHasBreak(true);
      }
    }

    checkWhetherReachBreakpoint();

    window.addEventListener("scroll", checkWhetherReachBreakpoint);
    window.addEventListener("resize", checkWhetherReachBreakpoint);

    return () => {
      window.removeEventListener("scroll", checkWhetherReachBreakpoint);
      window.removeEventListener("resize", checkWhetherReachBreakpoint);
    };
  }, [hasBreak]);

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`t-under-border text-green-600 mt-5 mx-auto`}>
          Location
        </h1>
      </div>
      <ul ref={element} className={`mt-10 mx-auto`}>
        {locations &&
          locations.map((location, index) => (
            <Photo
              index={index}
              key={location.id}
              location={location}
              hasBreak={hasBreak}
            />
          ))}
      </ul>
    </>
  );
};

export default memo(Location);
