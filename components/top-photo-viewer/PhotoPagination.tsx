import React, { useContext } from "react";
import { CurrentPhotoIndexContext } from "./PhotoViewerContainer";
import { ImagesType } from "@/assets/type/types";

type Params = {
  topImagesByRandom: ImagesType[];
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
            className={`rounded-[50%] border border-gray-400 hover:border-green-600 w-2 h-2 mr-2 cursor-pointer duration-1000 ${
              currentPhotoIndex === index && `border-green-600 bg-green-600`
            }`}
            onClick={() => setCurrentPhotoIndex(index)}
          ></li>
        ))}
      </ul>
    </>
  );
};

export default PhotoPagination;
