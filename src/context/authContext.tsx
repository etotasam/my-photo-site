import React, { useContext, createContext, useReducer } from "react";

const initialState: AuthStateType = {
  isAuth: undefined,
  authUsersEmail: undefined,
};

export type AuthStateType = {
  isAuth: boolean | undefined;
  authUsersEmail: string | undefined;
};

const authStateContext = createContext<AuthStateType>(initialState);
const authDispatchContext = createContext({
  authDispathcer: (_: string) => {},
  unauthDispathcer: () => {},
});

export const useAuthStateContext = () => useContext(authStateContext);
export const useAuthDispatchContext = () => useContext(authDispatchContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState as any);
  const authDispathcer = (payload: string) => dispatch(auth(payload));
  const unauthDispathcer = () => dispatch(unauth());

  return (
    <authDispatchContext.Provider value={{ authDispathcer, unauthDispathcer }}>
      <authStateContext.Provider value={state}>{children}</authStateContext.Provider>
    </authDispatchContext.Provider>
  );
};

const auth = (payload: string) => {
  return {
    type: "auth",
    payload,
  };
};
const unauth = () => {
  return {
    type: "unauth",
  };
};

type Action = {
  type: string;
  payload?: string;
};

export const reducer = (_: AuthStateType, action: Action) => {
  switch (action.type) {
    case "auth":
      return { isAuth: true, authUsersEmail: action.payload };
    case "unauth":
      return { isAuth: false, authUsersEmail: undefined };
    default:
      throw new Error("auth action-type input error");
  }
};
