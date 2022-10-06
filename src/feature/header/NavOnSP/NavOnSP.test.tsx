import React from "react";
import { NavOnSP } from ".";
import { render, screen, cleanup } from "@testing-library/react";
import { useModalStateContext, useModalDispatchContext, ModalStateProvider } from "../../../context/modalStateContext";
import * as modalContext from "../../../context/modalStateContext";
import { act, renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

let useModalStateSpy: jest.SpyInstance<unknown>;
let useModalDispatchSpy: jest.SpyInstance<unknown>;
let modalOpenDispatchSpy: () => void;
let modalCloseDispatchSpy: () => void;
beforeEach(() => {
  useModalStateSpy = jest.spyOn(modalContext, `useModalStateContext`);
  useModalStateSpy.mockImplementation(() => ({ isModalActive: false }));

  useModalDispatchSpy = jest.spyOn(modalContext, `useModalDispatchContext`);
  modalOpenDispatchSpy = jest.fn();
  modalCloseDispatchSpy = jest.fn();
  useModalDispatchSpy.mockImplementation(() => ({
    modalOpenDispathcer: modalOpenDispatchSpy,
    modalCloseDispatcher: modalCloseDispatchSpy,
  }));
});

afterEach(() => {
  useModalStateSpy.mockClear();
  useModalDispatchSpy.mockClear();
});

describe(`HeaderNavOnMobile`, () => {
  it(`isModalActive の値によって実行される関数が切り替わる`, async () => {
    // const { asFragment, rerender } = render(<ModalStateProvider>{/* <NavOnSP /> */}</ModalStateProvider>);
    // expect(screen.queryByTestId(`humburger`)).toBeInTheDocument();
    // userEvent.click(screen.getByTestId(`humburger`));
    // expect(modalOpenDispatchSpy).toBeCalledTimes(1);
    // expect(asFragment()).toMatchSnapshot();
    // useModalStateSpy.mockImplementation(() => ({ isModalActive: true }));
    // rerender(<ModalStateProvider>{/* <NavOnSP /> */}</ModalStateProvider>);
    // userEvent.click(await screen.findByTestId(`humburger`));
    // expect(modalCloseDispatchSpy).toBeCalledTimes(1);
    // expect(asFragment()).toMatchSnapshot();
  });
});
