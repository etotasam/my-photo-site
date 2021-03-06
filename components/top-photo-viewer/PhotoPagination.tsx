import React from "react";
import { ImagesType } from "@/@types/types";

type Params = {
  topImages: ImagesType[];
  currentPhotoIndex: number | null;
  setCurrentPhotoIndex: (num: number) => void;
};

const PhotoPagination = ({ topImages, currentPhotoIndex, setCurrentPhotoIndex }: Params) => {
  return (
    <>
      <ul className={`w-[10%] md:w-full min-h-[30px] list-none flex flex-col md:flex-row items-center`}>
        {topImages.map((photo, index) => (
          <li
            key={photo.id}
            className={`group flex justify-center items-center w-[10px] h-[10px] cursor-pointer ${
              index !== 0 && `mt-4`
            } md:mt-0 ${index !== 0 && `md:ml-2`}`}
            onClick={() => setCurrentPhotoIndex(index)}
          >
            <span
              className={`block rounded-[50%] duration-500
              ${
                currentPhotoIndex === index
                  ? `bg-green-600 w-2 h-2`
                  : `bg-gray-400 w-1 h-1 group-hover:w-2 group-hover:h-2`
              }`}
            ></span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PhotoPagination;
