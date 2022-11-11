import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
//! component
import { MyLink } from "@/components/Element/MyLink";
//! context
import {
  useResultOfLoginExectionStateContext,
  useResultOfLoginExectionDispatchContext,
} from "@/context/resultOfLoginExecution";

type PropsType = {
  children: JSX.Element | JSX.Element[];
};

const Admin: React.FC<PropsType> = ({ children }) => {
  // const { isAuth } = useAuthStateContext();
  const { authState } = useResultOfLoginExectionStateContext();
  const { loginStateResetDispathcer } =
    useResultOfLoginExectionDispatchContext();

  const setTimeOutId = useRef<NodeJS.Timer>();
  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeOutId.current = setTimeout(() => {
        resolve();
      }, ms);
    });
  };
  const [loginStateMessage, setLoginStateMessage] =
    useState<string | undefined>();
  const [isLoginStateMessageModalVisible, setIsLoginStateMessageModalVisible] =
    useState<boolean>(false);

  const authStateModalControl = async ({
    message,
  }: {
    message: string | undefined;
  }) => {
    openModal(message);
    await wait(5000);
    closeModal();
  };

  //? open modal
  const openModal = (message: string | undefined) => {
    setIsLoginStateMessageModalVisible(true);
    setLoginStateMessage(message);
  };
  //? close modal
  const closeModal = async () => {
    setIsLoginStateMessageModalVisible(false);
    await wait(1000);
    setLoginStateMessage(undefined);
    loginStateResetDispathcer();
  };

  useEffect(() => {
    if (authState === undefined) return;
    if (setTimeOutId.current) clearTimeout(setTimeOutId.current);
    switch (authState) {
      case "loginSuccess":
        (async () => {
          await authStateModalControl({ message: "ログインしました" });
        })();
        break;
      case "loginFailed":
        (async () => {
          await authStateModalControl({ message: "ログインに失敗しました" });
        })();
        break;
      case "logout":
        (async () => {
          await authStateModalControl({ message: "ログアウトしました" });
        })();
        break;
    }
    return () => {
      if (setTimeOutId.current) clearTimeout(setTimeOutId.current);
    };
  }, [authState]);
  return (
    <>
      <header
        className={`t-header-height bg-white fixed flex justify-center top-0 left-0 w-full z-50 duration-300`}
      >
        <div>
          <MyLink
            href={`/`}
            className={`n-title-font text-green-600 text-xl tracking-wider font-extralight`}
          >
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </MyLink>
        </div>
      </header>
      <main className={`t-main`}>
        {children}
        <AnimatePresence>
          {isLoginStateMessageModalVisible && (
            <AuthMessageModal
              authMessage={loginStateMessage}
              authState={authState}
              closeModal={closeModal}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Admin;

//? ログイン状態のお知らせモーダル
type AuthMessageModalPropsType = {
  authMessage: string | undefined;
  authState: "loginSuccess" | "loginFailed" | "logout" | undefined;
  closeModal: () => void;
};

const AuthMessageModal = ({
  authMessage,
  authState,
  closeModal,
}: AuthMessageModalPropsType) => {
  return (
    <motion.div
      onClick={closeModal}
      initial={{ y: 0, x: "-50%" }}
      animate={{ y: 85, x: "-50%" }}
      exit={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "fixed top-[-50px] left-[50%] translate-x-[-50%] w-[70vw] sm:w-[30vw] h-[50px] text-white flex justify-center items-center rounded-lg z-[999]",
        authState === "loginSuccess" && "bg-green-400",
        authState === "loginFailed" && "bg-red-400",
        authState === "logout" && "bg-gray-500"
      )}
    >
      <span className="select-none">{authMessage}</span>
    </motion.div>
  );
};
