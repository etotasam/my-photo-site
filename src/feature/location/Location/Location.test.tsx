import React from "react";
import { Location } from "./Location";
import { render, screen } from "@testing-library/react";

import { cleanup } from "@testing-library/react-hooks";
// import { PhotoContainer } from "../Photo";
import { ImagesType } from "@/@types/types";

jest.mock("../Photo", () => ({
  PhotoContainer: () => {
    return <div>PhotoContainerコンポーネント</div>;
  },
}));
// const PhotoContainerMock =

const images = {
  img1: "/test_image/img1.jpg",
  img2: "/test_image/img2.jpg",
};

const image: ImagesType[] = [
  {
    documentId: "",
    createAt: new Date(),
    width: 200,
    height: 200,
    url: images.img1,
    filename: "",
    id: "test_1",
  },
  {
    documentId: "",
    width: 200,
    createAt: new Date(),
    height: 200,
    url: images.img2,
    filename: "",
    id: "test_2",
  },
];

const props = {
  locationsImages: image,
};

afterEach(() => {
  cleanup();
});

describe(`Location`, () => {
  it(`渡されたobjの数分表示される`, () => {
    const { asFragment } = render(<Location {...props} />);
    // screen.debug();
    expect(asFragment()).toMatchSnapshot();
  });
});
