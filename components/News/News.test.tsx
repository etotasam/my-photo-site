import { render } from "@testing-library/react";
import { News } from ".";

const props: Props = {
  news: [
    {
      title: "タイトル1",
      date: "2021-12-19",
    },
    {
      title: "タイトル2",
      date: "2021-12-19",
    },
    {
      title: "タイトル3",
      date: "2021-12-19",
    },
  ],
};
type Props = {
  news: {
    title: string;
    date: string;
  }[];
};

describe(`News`, () => {
  it(`propsで受けたnews一覧がリストで表示されているか`, () => {
    const { getAllByRole } = render(<News {...props} />);
    const renderLists = getAllByRole(`listitem`).map((list) => list.textContent);
    const PropsLists = props.news.map((el) => `${el.date.replaceAll(`-`, `/`)}${el.title}`);
    expect(renderLists).toEqual(PropsLists);
  });
});
