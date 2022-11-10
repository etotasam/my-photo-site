import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  headerHeight: 1,
  footerHeight: 1,
};

export type HeightState = typeof initialState;

const heightStateContext = createContext(initialState);
const heightDispatchContext = createContext({
  setHeaderHeightDispatcher: (_: number) => {},
  setFooterHeightDispatcher: (_: number) => {},
});

export const useHeihgtStateContext = () => useContext(heightStateContext);
export const useHeihgtDispatchContext = () => useContext(heightDispatchContext);

export const HeightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setHeaderHeightDispatcher = (payload: number) => dispatch(setHeaderHeight(payload));
  const setFooterHeightDispatcher = (payload: number) => dispatch(setFooterHeight(payload));

  return (
    <heightStateContext.Provider value={state}>
      <heightDispatchContext.Provider value={{ setHeaderHeightDispatcher, setFooterHeightDispatcher }}>
        {children}
      </heightDispatchContext.Provider>
    </heightStateContext.Provider>
  );
};

type Action = {
  type: string;
  payload?: any;
};

const setHeaderHeight = (payload: number = 0) => {
  return {
    type: `setHeaderHeight`,
    payload,
  };
};

const setFooterHeight = (payload: number = 0) => {
  return {
    type: `setFooterHeight`,
    payload,
  };
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
