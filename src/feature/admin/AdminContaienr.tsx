import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
//! firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//! component
import { Admin } from "./Admin";
//! context
import { useAuthDispatchContext, useAuthStateContext } from "@/context/authContext";
import { useResultOfLoginExectionDispatchContext } from "@/context/resultOfLoginExecution";

export const AdminContaienr = () => {
  const router = useRouter();
  const { authDispathcer } = useAuthDispatchContext();
  const {
    loginSuccessDispathcer,
    loginFailedDispathcer,
    // authStateMessageModalCloseDispatcher,
    // authMessageResetDispatcher,
  } = useResultOfLoginExectionDispatchContext();
  const { isAuth } = useAuthStateContext();
  //? firebase authentication での認証確認
  const auth = getAuth();

  //? ログイン状態でページ遷移
  useEffect(() => {
    if (isAuth === true) {
      router.push(`/admin/register_image`);
    }
  }, [isAuth]);

  //? login
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputEmail || !inputPassword) return;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      const user = userCredential.user;
      authDispathcer(user.email as string);
      loginSuccessDispathcer();
    } catch (error) {
      loginFailedDispathcer();
      // console.error(error.message);
    }
  };

  //? input email value
  const [inputEmail, setInputEmail] = useState<string>("");
  //? input password value
  const [inputPassword, setInputPassword] = useState<string>("");

  return (
    <Admin
      login={login}
      inputEmail={inputEmail}
      setInputEmail={setInputEmail}
      inputPassword={inputPassword}
      setInputPassword={setInputPassword}
      isAuth={isAuth}
    />
  );
};
