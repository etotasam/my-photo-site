import React from "react";
import { NavOnPC } from ".";
import { render, screen } from "@testing-library/react";
// import { useRouter } from "next/router";
import { cleanup } from "@testing-library/react-hooks";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        photo_label: "egypt",
      },
    };
  },
}));

afterEach(() => {
  cleanup();
});

describe(`HeaderNavOnPC`, () => {
  it(`test 1`, () => {
    // const props = {
    //   locations: ["egypt", "landscape"],
    // };
    // const { asFragment } = render(<NavOnPC {...props} />);
    // expect(asFragment()).toMatchSnapshot();
  });
});
