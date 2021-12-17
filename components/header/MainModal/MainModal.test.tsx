import React from "react";
import { MainModal } from "./MainModal";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";

jest.mock(`next/router`, () => ({
  useRouter() {
    return {
      query: {},
    };
  },
}));

const props = {
  locations: ["jordan", "egypt"],
  error: { message: "エラーです", name: "エラー" },
};

describe(`MainModal`, () => {
  it(`propsでの error の受け取りの有無`, () => {
    const { rerender, queryByText } = render(<MainModal {...props} />);
    expect(queryByText(/データ取得/)).toBeInTheDocument();
    expect(queryByText(/Jordan/)).toBeNull();
    expect(queryByText(/Egypt/)).toBeNull();
    rerender(<MainModal locations={props.locations} />);
    expect(queryByText(/データ取得/)).toBeNull();
    expect(queryByText(/Jordan/)).toBeInTheDocument();
    expect(queryByText(/Egypt/)).toBeInTheDocument();
  });
});
