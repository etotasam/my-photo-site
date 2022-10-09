import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  currentImageIndex: undefined,
};

export type CurrentImageIndexStateType = {
  currentImageIndex: number | undefined;
};

const currentImageIndexStateContext = createContext<CurrentImageIndexStateType>(initialState);
const currentImageIndexDispatchContext = createContext({
  currentImageIndexDispathcer: (payload: number) => {},
});

export const useCurrentImageIndexStateContext = () => useContext(currentImageIndexStateContext);
export const useCurrentImageIndexDispatchContext = () => useContext(currentImageIndexDispatchContext);

export const CurrentImageIndexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentImageIndexDispathcer = (payload: number) => dispatch(changeImageIndex(payload));

  return (
    <currentImageIndexDispatchContext.Provider value={{ currentImageIndexDispathcer }}>
      <currentImageIndexStateContext.Provider value={state}>{children}</currentImageIndexStateContext.Provider>
    </currentImageIndexDispatchContext.Provider>
  );
};

const changeImageIndex = (payload: number) => {
  return {
    type: "changeImageIndex",
    payload,
  };
};

type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: CurrentImageIndexStateType, action: Action) => {
  switch (action.type) {
    case "changeImageIndex":
      return { currentImageIndex: (state.currentImageIndex = action.payload) };
    default:
      throw new Error("changeImageIndex action-type input error");
  }
};
