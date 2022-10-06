import React from "react";
import { ViewPhoto } from "./ViewPhoto";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";
import renderer from "react-test-renderer";

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

const imageTranstionMock = jest.fn().mockReturnValue("get imageTransiton");

const props = {
  imageRef: image,
  imageTranstion: imageTranstionMock,
  tapOn: jest.fn().mockReturnValue("gat tapOn"),
  tapOff: jest.fn().mockReturnValue("gat tapOff"),
  isImageLoading: false,
  closeLoadingModal: jest.fn().mockReturnValue(true),
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
    const { asFragment } = render(<ViewPhoto {...props} />);
    act(() => resizeWidth(1800, 1200));
    expect(asFragment()).toMatchSnapshot();
    act(() => resizeWidth(700, 1000));
    expect(asFragment()).toMatchSnapshot();
  });
  it(`画像クリックでonClick指定の関数が呼ばれる`, () => {
    render(<ViewPhoto {...props} />);
    const imageEl = screen.getByTestId(`imageWrap`);
    fireEvent.click(imageEl);
    expect(imageTranstionMock).toBeCalledTimes(1);
  });
});

const resizeWidth = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};
