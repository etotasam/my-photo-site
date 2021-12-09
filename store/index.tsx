import { createStore } from "redux";

export type StoreState = ReturnType<typeof reducer>;
type Action = { type: string };

const initialSatate = {
  breakpointWidth: 768,
};

const reducer = (state = initialSatate) => {
  return state;
};

const store = createStore(reducer);

export default store;
