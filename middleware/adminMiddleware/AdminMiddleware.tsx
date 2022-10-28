import React, { useEffect } from "react";
//! firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
//! context
import { useAuthDispatchContext } from "@/context/authContext";

type ChildElement = {
  children: JSX.Element | JSX.Element[];
};

export const AdminMiddleware: React.FC<ChildElement> = ({ children }) => {
  const { authDispathcer, unauthDispathcer } = useAuthDispatchContext();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authDispathcer(user.email as string);
      } else {
        unauthDispathcer();
      }
    });
  }, []);
  return <>{children}</>;
};
