import React from "react";
import { MainModal } from "./MainModal";
import { fireEvent, render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

const nextRouer = jest.spyOn(require("next/router"), `useRouter`);
const push = jest.fn();
const query = { photo_label: "egypt" };
nextRouer.mockImplementation(() => {
  return { push, query };
});

const props = {
  locations: ["jordan", "egypt"],
  error: { message: "エラーです", name: "エラー" },
};

afterEach(() => {
  cleanup();
});

describe(`MainModal`, () => {
  it(`propsで受け取るerrorの有無での表示検証 `, () => {
    const { rerender, queryByText } = render(<MainModal {...props} />);
    expect(queryByText(/データ取得/)).toBeInTheDocument();
    expect(queryByText(/Jordan/)).toBeNull();
    expect(queryByText(/Egypt/)).toBeNull();
    rerender(<MainModal locations={props.locations} />);
    expect(queryByText(/データ取得/)).toBeNull();
    expect(queryByText(/Jordan/)).toBeInTheDocument();
    expect(queryByText(/Egypt/)).toBeInTheDocument();
  });

  it(`router.pushのURLの検証`, async () => {
    const { queryByText } = render(<MainModal locations={props.locations} />);
    expect(queryByText(/Jordan/)).toBeInTheDocument();
    fireEvent.click(queryByText(/Jordan/));
    expect(push).toHaveBeenCalledWith(`/photo/jordan`);
  });
});
