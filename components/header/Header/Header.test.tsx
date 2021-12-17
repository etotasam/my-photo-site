import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Header } from "./Header";
import { useRouter } from "next/router";

jest.mock(`next/router`, () => ({
  useRouter() {
    return {
      query: {},
    };
  },
}));

describe(`Header`, () => {
  it(`windowのwidthのサイズで表示されるコンポーネントが変わる`, () => {
    const { asFragment, rerender } = render(<Header />);
    act(() => resizeWidth(769));
    rerender(<Header />);
    expect(screen.queryByTestId(`pc`)).toBeInTheDocument();
    expect(screen.queryByTestId(`humburger`)).toBeNull();
    expect(asFragment()).toMatchSnapshot();
    act(() => resizeWidth(767));
    rerender(<Header />);
    expect(screen.queryByTestId(`humburger`)).toBeInTheDocument();
    expect(screen.queryByTestId(`pc`)).toBeNull();
  });
});

const resizeWidth = (num: number) => {
  window.innerWidth = num;
  window.dispatchEvent(new Event("resize"));
};
