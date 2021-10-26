import React, { useContext } from "react";
import { CurrentPhotoIndexContext } from "./TopPhotoViewer";
import { ImageType } from "@/pages/index";

type Params = {
  topImagesByRandom: ImageType[];
};

const PhotoPagination = ({ topImagesByRandom }: Params) => {
  const { currentPhotoIndex, setCurrentPhotoIndex } = useContext(
    CurrentPhotoIndexContext
  );
  return (
    <>
      <ul className={`flex list-none mt-1 p-1`}>
        {topImagesByRandom.map((photo, index) => (
          <li
            key={photo.id}
            className={`rounded-[50%] border border-gray-400 w-2 h-2 mr-2 cursor-pointer duration-1000 ${
              currentPhotoIndex === index && `bg-gray-400`
            }`}
            onClick={() => setCurrentPhotoIndex(index)}
          ></li>
        ))}
      </ul>
    </>
  );
};

export default PhotoPagination;
