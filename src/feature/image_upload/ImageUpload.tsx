import React, { useEffect, useRef, useState } from "react";
//! component
import { Button } from "@/components/Element/Button";

type ImageUploadPropsType = {
  logout: () => void;
  isAuth: boolean | undefined;
  authUsersEmail: string | undefined;
  upload: (e: React.FormEvent<HTMLFormElement>) => void;
  fileCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string | undefined;
  locationNames: string[] | undefined;
  photoLocation: string;
  setPhotoLocation: React.Dispatch<React.SetStateAction<string>>;
  newCategory: string;
  setNewCategory: React.Dispatch<React.SetStateAction<string>>;
  selectElementRef: React.RefObject<HTMLSelectElement>;
};

export const ImageUpload = ({
  logout,
  isAuth,
  authUsersEmail,
  upload,
  locationNames,
  photoLocation,
  setPhotoLocation,
  newCategory,
  setNewCategory,
  selectElementRef,
}: ImageUploadPropsType) => {
  // const [image, setImage] = useState<FileList>();
  const dropArea = useRef<HTMLDivElement>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>();
  const drop = (e: DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer) return;
    if (!e.dataTransfer.files || !e.dataTransfer.files.length) return;
    const files = e.dataTransfer.files;
    const fileUrls = Object.values(files).map((file) => {
      return URL.createObjectURL(file);
    });
    setPhotoUrls(fileUrls);
  };
  const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const fileUrls = Object.values(files).map((file) => {
      return URL.createObjectURL(file);
    });
    setPhotoUrls(fileUrls);
  };
  useEffect(() => {
    dropArea.current?.addEventListener("dragover", (e) => e.preventDefault());
    dropArea.current?.addEventListener("drop", drop);
  }, []);
  return (
    <>
      <h2>{authUsersEmail}</h2>
      {isAuth === true && <Button onClick={logout}>Logout</Button>}
      <form onSubmit={upload}>
        <select ref={selectElementRef} value={photoLocation} onChange={(e) => setPhotoLocation(e.target.value)}>
          <option value="undefined">undefined</option>
          {locationNames &&
            locationNames.map((locationName) => (
              <option key={locationName} value={locationName}>
                {locationName}
              </option>
            ))}
        </select>
        <label htmlFor="new-dir">新しいカテゴリ</label>
        <input type="text" id="new-dir" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <div
          ref={dropArea}
          className="relative flex justify-center items-center w-full h-[200px] border-[1px] border-gray-300 rounded-lg bg-gray-100"
        >
          <p className="text-gray-400">ファイルをここにドラッグ&ドロップしてください</p>
          <label
            htmlFor="image-file"
            className="absolute top-[5%] left-[50%] translate-x-[-50%] py-1 px-2 text-sm rounded-sm  bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
          >
            ファイルの選択
            <input id="image-file" className="hidden" type="file" accept="image/*" value={""} onChange={fileSelect} />
          </label>
        </div>
        <div className="relative w-full h-[250px] bg-green-50 flex justify-center items-center text-gray-400 overflow-x-auto">
          {!photoUrls && <span>ここにプレビューされます</span>}
          {photoUrls && (
            <div className="absolute top-0 left-0 h-full flex items-center">
              {photoUrls.map((photoUrl) => (
                <div key={photoUrl} className="w-[200px] h-[200px] p-3">
                  <img className="object-cover w-full h-full" src={photoUrl} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
        <Button>upload</Button>
      </form>
      {/* {photoUrl && (
        <div className="w-[500px] h-[500px]">
          <img className="object-contain w-full h-full" src={photoUrl} alt="" />
        </div>
      )} */}
    </>
  );
};
