import React from "react";
import { render, screen } from "@testing-library/react";
import { Photo } from ".";

const image = {
  documentId: "string",
  width: 200,
  createAt: new Date(),
  height: 200,
  url: "https://picsum.photos/200",
  filename: "",
  id: "1",
};

const props = {
  location: image,
  index: 1,
  hasBreak: false,
};

describe(`Photo Component`, () => {
  it(`hasBreakの値での表示の切り替えの検証`, () => {
    const { queryByTestId, rerender, asFragment } = render(<Photo {...props} />);
    expect(queryByTestId(`breaked`)).toBeNull();
    expect(queryByTestId(`non-break`)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
    props.hasBreak = true;
    rerender(<Photo {...props} />);
    expect(queryByTestId(`breaked`)).toBeInTheDocument();
    expect(queryByTestId(`non-break`)).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
