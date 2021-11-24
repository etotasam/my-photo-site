import React, { useContext, createContext, useReducer } from "react";

const HeadersStateContext = createContext(null);

export const useHeadersContext = () => {
  return useContext(HeadersStateContext);
};

const initialState = {
  isModalActive: false,
  isLoading: false,
  headerHeight: 1,
  footerHeight: 1,
}

export type InitialState = typeof initialState;

type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "activeModal":
      return { ...state, isModalActive: (state.isModalActive = true) };
    case "inactiveModal":
      return { ...state, isModalActive: (state.isModalActive = false) };

    case "loading":
      return {...state, isLoading: (state.isLoading = true)}
    case "loaded":
      return {...state, isLoading: (state.isLoading = false)}

    case "setHeaderHeight":
      return {...state, headerHeight: (state.headerHeight = action.payload)}
    case "setFooterHeight":
      return {...state, footerHeight: (state.footerHeight = action.payload)}
    default:
      throw new Error("action-type input error");
  }
}

export const HeadersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const valueState = { state, dispatch };

  return (
    <HeadersStateContext.Provider value={valueState}>
      {children}
    </HeadersStateContext.Provider>
  );
};
