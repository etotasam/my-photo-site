import React from "react";
import { ViewPhoto } from ".";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

type ImagesType = {
  documentId: string;
  width: number;
  createAt: Date;
  height: number;
  url: string;
  filename: string;
  id: string;
};

const image = {
  documentId: "",
  width: 0,
  createAt: new Date(),
  height: 0,
  url: "https://picsum.photos/seed/picsum/200/300",
  filename: "",
  id: "1",
};

const props = {
  imageRef: image,
  imagesLength: 1,
};

const nextRouer = jest.spyOn(require("next/router"), `useRouter`);
const query = { photo_label: "jordan", image: "1" };
nextRouer.mockImplementation(() => ({
  query,
}));

afterEach(() => cleanup());

describe(`ViewPhoto`, () => {
  it(`縦長イメージの表示サイズの検証`, async () => {
    image.width = 1200;
    image.height = 800;
    const { asFragment } = render(<ViewPhoto {...props} />);
    act(() => resizeWidth(1800, 1200));
    expect(asFragment()).toMatchSnapshot();
    act(() => resizeWidth(700, 1000));
    expect(asFragment()).toMatchSnapshot();
  });
  it(`横長イメージの表示サイズの検証`, () => {
    image.width = 800;
    image.height = 1200;
    const { asFragment, getByTestId } = render(<ViewPhoto {...props} />);
    act(() => resizeWidth(1800, 1200));
    expect(asFragment()).toMatchSnapshot();
    act(() => resizeWidth(700, 1000));
    expect(asFragment()).toMatchSnapshot();
  });
});

const resizeWidth = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};
