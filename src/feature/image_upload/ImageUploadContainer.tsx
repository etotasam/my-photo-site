import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
//! component
import { ImageUpload } from "./ImageUpload";
//! firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
//! context
import { useAuthStateContext, useAuthDispatchContext } from "@/context/authContext";
import { useResultOfLoginExectionDispatchContext } from "@/context/resultOfLoginExecution";
//! api
import { fetchLocationNamesApi } from "@/api/imagesApi";

export const ImageUploadContainer = () => {
  const router = useRouter();
  const auth = getAuth();
  const { isAuth, authUsersEmail } = useAuthStateContext();
  const { logoutDispathcer } = useResultOfLoginExectionDispatchContext();
  const { unauthDispathcer } = useAuthDispatchContext();
  //? no auth の場合はlogin画面へ
  useEffect(() => {
    if (isAuth === false) {
      router.push("/admin");
    }
  }, [isAuth]);

  const [locationNames, setLocationNames] = useState<string[]>();
  useEffect(() => {
    (async () => {
      const locationsName = await fetchLocationNamesApi(true);
      setLocationNames(locationsName);
    })();
  }, []);
  //? logout firebase auth のログアウトと、context auth のauth state を更新
  const logout = async () => {
    try {
      await signOut(auth);
      unauthDispathcer();
      //? modalにlogoutした事を知らせるdispatcher
      logoutDispathcer();
    } catch (error) {
      console.error("@@@logout error@@@", error.message);
    }
  };

  const storage = getStorage();
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>();
  //? image upload 実行
  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || (!newCategory && photoLocation === "undefined")) return console.error("エラーです");
    const storageRef = ref(storage);
    const ext = image.name.split(".").pop();
    const hash = Math.random().toString(36).slice(-8);
    const fullPath = `/images/${newCategory ? newCategory : photoLocation}/${hash}.${ext}`;
    const ImageRef = ref(storageRef, fullPath);
    console.log(ImageRef);
    try {
      await uploadBytes(ImageRef, image);
      setImage(undefined);
    } catch (error) {
      console.error("image upload error", error.message);
    }
  };
  //? 選択したimageのurlを取得(画面に表示させる為)
  useEffect(() => {
    if (!image) return setImageUrl(undefined);
    setImageUrl(URL.createObjectURL(image));
  }, [image]);

  //? input file で、オブジェクトが選択された時
  const fileCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const file = files[0];
    setImage(file);
  };
  //? photo location select
  const [photoLocation, setPhotoLocation] = useState<string>("undefinded");
  //? 新しいphoto location を設定する
  const [newCategory, setNewCategory] = useState<string>("");
  //? select element Ref
  const selectElementRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (newCategory) {
      setPhotoLocation("undefined");
      selectElementRef.current!.disabled = true;
    } else {
      selectElementRef.current!.disabled = false;
    }
  }, [newCategory]);
  return (
    <ImageUpload
      logout={logout}
      isAuth={isAuth}
      authUsersEmail={authUsersEmail}
      upload={upload}
      fileCheck={fileCheck}
      imageUrl={imageUrl}
      locationNames={locationNames}
      photoLocation={photoLocation}
      setPhotoLocation={setPhotoLocation}
      newCategory={newCategory}
      setNewCategory={setNewCategory}
      selectElementRef={selectElementRef}
    />
  );
};
