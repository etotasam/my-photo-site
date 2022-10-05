import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HeaderContainer } from "./HeaderContainer";
import { HeaderType } from "./Header";

//? Headerコンポーネント mock
const mockHeader = jest.fn();
jest.mock("./Header", () => ({
  Header: (props: HeaderType) => {
    mockHeader(props);
    return "mockHeader";
  },
}));

//? "next/router" mock
jest.mock("next/router", () => ({
  useRouter: () => {
    return { query: { photo_label: "photo_lavel" } };
  },
}));

// //? "@/hooks" のmock
// const device = "PC";
jest.mock("@/hooks", () => ({
  useDeviceCheck: () => {
    return { device: "PC" };
  },
}));

//? useLocationNamesStateContext
const locationNames = ["locationName_1", "locationName_2", "locationName_3"];
jest.mock("@/context/locationNamesContext", () => ({
  useLocationNamesStateContext: () => {
    return { locationNames };
  },
}));

describe(`HeaderContainerのテスト`, () => {
  it(`Headerコンポーネントで表示するデータがpropsで渡させる`, () => {
    render(<HeaderContainer />);
    expect(mockHeader).toBeCalledWith({
      locationNames,
      device: "PC",
      toLink: expect.any(Function),
      isModalActive: false,
      toggleModal: expect.any(Function),
      handleClick: expect.any(Function),
      headerRef: expect.anything(),
      photoLabelName: "photo_lavel",
    });
    // screen.debug();
  });
});
