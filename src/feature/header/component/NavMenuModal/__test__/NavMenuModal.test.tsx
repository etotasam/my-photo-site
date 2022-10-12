import React from "react";
import { NavMenuModal } from "..";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";
//! context provider
import { ModalStateProvider, useModalDispatchContext } from "@/context/modalStateContext";
import userEvent from "@testing-library/user-event";

const props = {
  locationNames: ["jordan", "egypt", "turkey"],
  imagesLocationNamesOnRouterQuery: "jordan",
};

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
const spyNextRouer = jest.spyOn(require("next/router"), `useRouter`);
const push = jest.fn();
const query = { photo_label: "egypt" };
spyNextRouer.mockImplementation(() => {
  return { push, query };
});

const spyModalDispatch = jest.spyOn(require("@/context/modalStateContext"), "useModalDispatchContext");
const modalCloseDispatcher = jest.fn();
spyModalDispatch.mockImplementation(() => {
  return { modalCloseDispatcher };
});

it("NavModalMenu内のinactiveなlistいずれかを選択した時modalは閉じ、任意のimageへ遷移する", () => {
  render(<NavMenuModal {...props} />);
  userEvent.click(screen.getByText("Egypt"));
  expect(modalCloseDispatcher).toBeCalledTimes(1);
  expect(push).toBeCalledWith("/photo/egypt?image=1");
});
it("NavModalMenu内のactiveなlistを選択した時はmodalも閉じず、画面遷移もしない", () => {
  render(<NavMenuModal {...props} />);
  userEvent.click(screen.getByText("Jordan"));
  expect(modalCloseDispatcher).toBeCalledTimes(0);
  expect(push).toBeCalledTimes(0);
});
