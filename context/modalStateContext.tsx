import React, { useContext, createContext, useReducer } from "react";

const initialState = {
  isModalActive: false,
};

export type ModalState = typeof initialState;

const modalStateContext = createContext<ModalState>(initialState);
const modalDispatchContext = createContext({
  modalOpenDispathcer: () => void 0,
  modalCloseDispatcher: () => void 0,
});

export const useModalStateContext = () => useContext(modalStateContext);
export const useModalDispatchContext = () => useContext(modalDispatchContext);

export const ModalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const modalOpenDispathcer = () => dispatch(openModal());
  const modalCloseDispatcher = () => dispatch(closeModal());

  return (
    <modalDispatchContext.Provider value={{ modalOpenDispathcer, modalCloseDispatcher }}>
      <modalStateContext.Provider value={state}>{children}</modalStateContext.Provider>
    </modalDispatchContext.Provider>
  );
};

const openModal = () => {
  return {
    type: "activeModal",
  };
};
const closeModal = () => {
  return {
    type: "inactiveModal",
  };
};

type Action = {
  type: string;
  payload?: any;
};

export const reducer = (state: ModalState, action: Action) => {
  switch (action.type) {
    case "activeModal":
      return { ...state, isModalActive: true };
    case "inactiveModal":
      return { ...state, isModalActive: false };
    default:
      throw new Error("action-type input error");
  }
};
