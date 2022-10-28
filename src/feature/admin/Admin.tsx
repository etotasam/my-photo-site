import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
//! component
import { LoadingBound } from "@/components/Element/LoadingBound";
import { Button } from "@/components/Element/Button";

export type AdminPropsType = {
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  inputEmail: string;
  setInputEmail: React.Dispatch<React.SetStateAction<string>>;
  inputPassword: string;
  setInputPassword: React.Dispatch<React.SetStateAction<string>>;
  isAuth: boolean | undefined;
};

export const Admin = ({
  login,
  inputEmail,
  setInputEmail,
  inputPassword,
  setInputPassword,
  isAuth,
}: AdminPropsType) => {
  return (
    <>
      <section className="absolute top-0 left-0 w-[100vw] min-h-[100vh] flex justify-center items-center">
        <div className="w-[30vw] min-w-[300px] max-w-[500px] h-[50vh] min-h-[300px] max-h-[500px] border border-gray-500 flex justify-center items-center">
          <form onSubmit={login} className="w-[75%] max-w-[300px] h-[75%] flex flex-col items-center">
            <h1>ログイン</h1>
            <div className="flex flex-col w-full">
              <input
                placeholder="email"
                type="email"
                id="email"
                className="px-1 w-full mt-3"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />

              <input
                placeholder="password"
                type="password"
                id="password"
                className="px-1 w-full mt-3"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />

              <Button className="w-full">Login</Button>
            </div>
          </form>
        </div>
        <AnimatePresence>
          {(isAuth === undefined || isAuth === true) && <LoadingBound noInitialAnimate={true} />}
        </AnimatePresence>
      </section>
    </>
  );
};
