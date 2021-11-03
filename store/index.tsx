import { createStore } from "redux";

export type StoreState = ReturnType<typeof reducer>;
type Action = { type: string };

const initialSatate = {
  isModalActive: false,
  breakpoint: 768,
};

const reducer = (state = initialSatate, action: Partial<Action>) => {
  switch (action.type) {
    case `active`:
      return {
        ...initialSatate,
        isModalActive: true,
      };
    case `inactive`:
      return {
        ...initialSatate,
        isModalActive: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
