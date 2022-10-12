import React from "react";
import { render, screen } from "@testing-library/react";
import { Photo, PhotoType } from "..";

//? mock
jest.mock("next/link", () => ({
  __esModule: true,
  default: function Link({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <div>
        <p data-testid={"Link"}>{href}</p>
        <div>{children}</div>
      </div>
    );
  },
}));

const img = {
  url: "/test_image/img1.jpg",
  id: "test_img_title_1",
};

const image = {
  documentId: "string",
  width: 200,
  createAt: new Date(),
  height: 200,
  url: img.url,
  filename: "",
  id: img.id,
};

const props = {
  locationImage: image,
  loadedLocationImage: () => {},
} as PhotoType;

describe(`Photo Component`, () => {
  it(`imgが表示され、そのimgのlocationNameが表示される`, () => {
    render(<Photo {...props} />);
    expect(screen.getByRole("img")).toBe;
    expect(screen.getByText("Test")).toBe;
  });
  it(`<Link>のhrefが正しいurlになる`, () => {
    render(<Photo {...props} />);
    const LinkText = screen.getByTestId("Link").textContent;
    expect(LinkText).toEqual(`/photo/${img.id.split("_")[0]}?image=1`);
  });
});
