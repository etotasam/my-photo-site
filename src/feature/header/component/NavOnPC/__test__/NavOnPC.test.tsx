import { render, screen } from "@testing-library/react";
import { NavOnPC, NavOnPCType } from "../";
import { cleanup } from "@testing-library/react-hooks";

const props: NavOnPCType = {
  locationNames: ["egypt", "france", "trukey"],
  toLink: (location: string, e: React.MouseEvent<HTMLAnchorElement>) => {},
  imagesLocationNamesOnRouterQuery: "egypt",
};

afterEach(() => {
  cleanup();
});

test("activeなlocationNameは色が変わっている", () => {
  render(<NavOnPC {...props} />);
  expect(screen.getByText("Egypt")).toHaveAttribute("class", "inline-block cursor-pointer text-green-600");
});
test("inactiveなlocationNameは色がdefault", () => {
  render(<NavOnPC {...props} />);
  expect(screen.getByText("France")).toHaveAttribute("class", "inline-block cursor-pointer");
});
