import React, { memo, useState, useEffect, useRef } from "react";
import { Photo } from "../Photo";
import { ImagesType } from "@/@types/types";
import { useScrollPosition, useWindowResize } from "@/hooks";

//! component
import { LoadingBound } from "@/components/LoadingBound";
// import { Loading } from "@/components/Loading";

type propsType = {
  locationsImages: ImagesType[];
};

const Location = ({ locationsImages }: propsType) => {
  // const [hasBreak, setHasBreak] = useState<boolean>(false);

  // const ref = useRef<HTMLUListElement>(null);
  // //? intersection observerでのアニメーション
  // const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       setHasBreak(true);
  //       observer.unobserve(entry.target);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   if (!ref.current) return;
  //   const target = ref.current;
  //   const observer = new IntersectionObserver(callback);
  //   observer.observe(target);
  // }, [ref]);

  const [loaded, setLoaded] = useState(false);
  const [locationImagesLoaded, setLocationImagesLoaded] = useState(0);
  useEffect(() => {
    if (locationImagesLoaded >= locationImagesLoaded) {
      setLoaded(true);
    }
  }, [locationImagesLoaded]);

  return (
    <>
      <div className={`flex justify-center items-center`}>
        <h1 className={`t-under-border text-green-600 mt-5 mx-auto`}>Location</h1>
      </div>
      <ul className={`mt-10 mx-auto relative`}>
        {locationsImages &&
          locationsImages.map((locationImage, index) => (
            <Photo
              imageIndex={index}
              key={locationImage.id}
              locationImage={locationImage}
              loadedLocationImage={() => setLocationImagesLoaded((v) => v + 1)}
              testloaded={loaded}
            />
          ))}
        {!loaded && <LoadingBound />}
      </ul>
    </>
  );
};

export default memo(Location);
