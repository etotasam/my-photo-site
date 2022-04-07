import React from "react";
import Title from "@/pages/news/[title]";
import { render } from "@testing-library/react";

const props = {
  date: "2021-12-21",
  content: "コンテンツ",
  title: "タイトル",
};

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe(`Title`, () => {
  it(`test 1`, () => {
    const { queryByText } = render(<Title {...props} />);
    expect(document.title).toMatch(/タイトル/);
    expect(queryByText("コンテンツ")).toBeInTheDocument();
    expect(queryByText("2021年12月21日")).toBeInTheDocument();
  });
});
