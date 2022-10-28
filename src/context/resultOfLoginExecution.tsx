import React, { useContext, createContext, useReducer, useRef } from "react";

const initialState: resultOfLoginExecutionType = {
  authState: undefined,
};

export type resultOfLoginExecutionType = {
  // isLoginSuccess: boolean | undefined;
  authState: "loginSuccess" | "loginFailed" | "logout" | undefined;
};

const resultOfLoginExecutionStateContext = createContext<resultOfLoginExecutionType>(initialState);
const resultOfLoginExecutionDispatchContext = createContext({
  loginSuccessDispathcer: () => {},
  loginFailedDispathcer: () => {},
  logoutDispathcer: () => {},
  loginStateResetDispathcer: () => {},
});

export const useResultOfLoginExectionStateContext = () => useContext(resultOfLoginExecutionStateContext);
export const useResultOfLoginExectionDispatchContext = () => useContext(resultOfLoginExecutionDispatchContext);

export const ResultOfLoginExecutionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState) as any;
  const loginSuccessDispathcer = () => dispatch(loginSuccess());
  const loginFailedDispathcer = () => dispatch(loginFailed());
  const logoutDispathcer = () => dispatch(logout());
  const loginStateResetDispathcer = () => dispatch(reset());

  return (
    <resultOfLoginExecutionDispatchContext.Provider
      value={{
        loginSuccessDispathcer,
        loginFailedDispathcer,
        logoutDispathcer,
        loginStateResetDispathcer,
      }}
    >
      <resultOfLoginExecutionStateContext.Provider value={state}>
        {children}
      </resultOfLoginExecutionStateContext.Provider>
    </resultOfLoginExecutionDispatchContext.Provider>
  );
};

const loginSuccess = () => {
  return {
    type: "login_success",
  };
};
const loginFailed = () => {
  return {
    type: "login_failed",
  };
};
const logout = () => {
  return {
    type: "logout",
  };
};
const reset = () => {
  return {
    type: "reset",
  };
};
type Action = {
  type: string;
  // payload?: string;
};

export const reducer = (state: resultOfLoginExecutionType, action: Action) => {
  switch (action.type) {
    case "login_success":
      return { authState: "loginSuccess" };
    case "login_failed":
      return { authState: "loginFailed" };
    case "logout":
      return { authState: "logout" };
    case "reset":
      return { authState: undefined };
    default:
      throw new Error("auth action-type input error");
  }
};
