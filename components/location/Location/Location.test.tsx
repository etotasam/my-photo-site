import React from "react";
import Location from "./Location";
import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";
import { ImagesType } from "@/@types/types";
const image: ImagesType[] = [
  {
    documentId: "",
    width: 200,
    createAt: new Date(),
    height: 200,
    url: "https://picsum.photos/200",
    filename: "",
    id: "test_1",
  },
  {
    documentId: "",
    width: 200,
    createAt: new Date(),
    height: 200,
    url: "https://picsum.photos/200",
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
  it(`propsで受けたデータがlistでrenderingされているか`, () => {
    // const { asFragment, getAllByTestId } = render(<Location locationsImages={image} />);
    // const renderList = getAllByTestId(`h2`).map((el) => el.textContent);
    // const imageList = image.map((el) => {
    //   const name = el.id.split(`_`)[0];
    //   return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    // });
    // expect(renderList).toEqual(imageList);
    // expect(asFragment()).toMatchSnapshot();
  });
});
