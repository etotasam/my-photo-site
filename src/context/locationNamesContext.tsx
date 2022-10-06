import React, { useContext, createContext, useReducer } from "react";

const initialState: StateType = {
  locationNames: [],
};

export type StateType = {
  locationNames: string[];
};

const locationNamesStateContext = createContext(initialState);
const locationNamesDispatchContext = createContext({
  setLocationNamesDispatcher: (payload: string[]) => {},
});

export const useLocationNamesStateContext = () => useContext(locationNamesStateContext);
export const useLocationNamesDispatchContext = () => useContext(locationNamesDispatchContext);

export const LocationNamesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setLocationNamesDispatcher = (payload: string[]) => dispatch(setLocationNemes(payload));

  return (
    <locationNamesStateContext.Provider value={state}>
      <locationNamesDispatchContext.Provider value={{ setLocationNamesDispatcher }}>
        {children}
      </locationNamesDispatchContext.Provider>
    </locationNamesStateContext.Provider>
  );
};

type Action = {
  type: string;
  payload?: any;
};

const setLocationNemes = (payload: string[] = []) => {
  return {
    type: `setLocationNames`,
    payload,
  };
};

export const reducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "setLocationNames":
      return { ...state, locationNames: action.payload };
    default:
      throw new Error("action-type input error");
  }
};
