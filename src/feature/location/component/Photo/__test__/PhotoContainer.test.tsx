import React from "react";
import { render } from "@testing-library/react";
import { PhotoContainer } from "../PhotoContainer";
import { PhotoType } from "../Photo";

const mockPhoto = jest.fn();
jest.mock("./Photo", () => ({
  Photo: (props: PhotoType) => {
    mockPhoto(props);
    return "mockPhoto";
  },
}));

const locationImage = {
  documentId: "string",
  width: 200,
  height: 200,
  createAt: new Date(),
  url: "/test_image/img1.jpg",
  filename: "test_img1",
  id: "test_1",
};

const loadedLocationImage = () => {};

describe(`PhotoContainerのテスト`, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it(`Photoコンポーネントで表示するデータが渡されている`, () => {
    render(
      <PhotoContainer
        locationImage={locationImage}
        loadedLocationImage={loadedLocationImage}
        imageIndex={1}
        isAllImagesloaded={true}
      />
    );
    expect(mockPhoto).toBeCalledWith({
      locationImage,
      loadedLocationImage,
      photoElRef: expect.anything(),
      h2ElRef: expect.anything(),
    });
  });
});
