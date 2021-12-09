import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  isLoading: false,
};

export type LoadState = typeof initialState;

type Action = {
  type: string;
  payload?: any;
};

const loadStateContext = createContext(initialState);
const loadDispatchContext = createContext({
  startLoadDispatcher: () => void 0,
  loadedDispatcher: () => void 0,
});

export const useLoadStateContext = () => useContext(loadStateContext);
export const useLoadDispatchContext = () => useContext(loadDispatchContext);

export const LoadStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const startLoadDispatcher = () => dispatch(loading());
  const loadedDispatcher = () => dispatch(loaded());

  return (
    <loadDispatchContext.Provider value={{ startLoadDispatcher, loadedDispatcher }}>
      <loadStateContext.Provider value={state}>{children}</loadStateContext.Provider>
    </loadDispatchContext.Provider>
  );
};

const reducer = (state: LoadState, action: Action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return { ...state, isLoading: false };
    default:
      throw new Error("action-type input error");
  }
};

const loading = () => {
  return {
    type: "loading",
  };
};
const loaded = () => {
  return {
    type: "loaded",
  };
};
