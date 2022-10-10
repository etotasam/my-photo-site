//! topのスライド写真をすべて読み込み済みかのstate
import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  isTopImagesLoaded: false,
};

export type StateType = {
  isTopImagesLoaded: false;
};

type Action = {
  type: string;
  payload?: any;
};

const topImagesLoadStateContext = createContext(initialState);
const topImagesLoadDispatchContext = createContext({
  topImagesLoadDispatcher: () => {},
});

export const useTopImagesLoadStateContext = () => useContext(topImagesLoadStateContext);
export const useTopImagesLoadDispatchContext = () => useContext(topImagesLoadDispatchContext);

export const TopImagesLoadStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const topImagesLoadDispatcher = () => dispatch(allLoaded());

  return (
    <topImagesLoadDispatchContext.Provider value={{ topImagesLoadDispatcher }}>
      <topImagesLoadStateContext.Provider value={state}>{children}</topImagesLoadStateContext.Provider>
    </topImagesLoadDispatchContext.Provider>
  );
};

const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "allLoaded":
      return { ...state, isTopImagesLoaded: true };
    default:
      throw new Error("action-type input error");
  }
};

const allLoaded = () => {
  return {
    type: "allLoaded",
  };
};
