import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  isImageLoading: true,
};

export type StateType = typeof initialState;

const imageLoadStateContext = createContext<StateType>(initialState);
const imageLoadDispatcher = createContext({
  imageLoadingDispatcher: () => {},
  imageLoadedDispatcher: () => {},
});

export const useImageLoadStateContext = () => useContext(imageLoadStateContext);
export const useImageLoadDispatchContext = () => useContext(imageLoadDispatcher);

export const ImageLoadStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const imageLoadingDispatcher = () => dispatch(imageLoading());
  const imageLoadedDispatcher = () => dispatch(imageLoaded());

  return (
    <imageLoadDispatcher.Provider value={{ imageLoadingDispatcher, imageLoadedDispatcher }}>
      <imageLoadStateContext.Provider value={state}>{children}</imageLoadStateContext.Provider>
    </imageLoadDispatcher.Provider>
  );
};

const imageLoading = () => {
  return {
    type: "imageLoading",
  };
};
const imageLoaded = () => {
  return {
    type: "imageLoaded",
  };
};

type Action = {
  type: string;
  // payload?: boolean;
};

export const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "imageLoading":
      return { ...state, isImageLoading: true };
    case "imageLoaded":
      return { ...state, isImageLoading: false };
    default:
      throw new Error("imageLoadedStateContext: action-type input error");
  }
};
