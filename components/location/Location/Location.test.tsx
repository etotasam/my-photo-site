import React from "react";
import { Location } from ".";
import { render } from "@testing-library/react";
import { cleanup } from "@testing-library/react-hooks";

const image = [
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
  locations: image,
};

afterEach(() => {
  cleanup();
});

describe(`Location`, () => {
  it(`propsで受けたデータがlistでrenderingされているか`, () => {
    const { asFragment, getAllByTestId } = render(<Location {...props} />);
    const renderList = getAllByTestId(`h2`).map((el) => el.textContent);
    const imageList = image.map((el) => {
      const name = el.id.split(`_`)[0];
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    });
    expect(renderList).toEqual(imageList);
    expect(asFragment()).toMatchSnapshot();
  });
});
