import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  headerHeight: 1,
  footerHeight: 1,
};

export type HeightState = typeof initialState;

const heightStateContext = createContext(void 0);

export const useHeihgtStateContext = () => useContext(heightStateContext);

export const HeightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const valueState = { state, dispatch };

  return <heightStateContext.Provider value={valueState}>{children}</heightStateContext.Provider>;
};

type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: HeightState, action: Action) => {
  switch (action.type) {
    case "setHeaderHeight":
      return { ...state, headerHeight: (state.headerHeight = action.payload) };
    case "setFooterHeight":
      return { ...state, footerHeight: (state.footerHeight = action.payload) };
    default:
      throw new Error("action-type input error");
  }
};
