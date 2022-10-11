import { News, NewsType } from "../News";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "News",
  component: News,
} as Meta<typeof News>;

const Template: Story<typeof News> = (args: any) => {
  return (
    <div style={{ padding: "30px" }}>
      <News {...args} />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  news: [
    {
      title: "てすとタイトル1",
      date: "2022/10/05",
    },
    {
      title: "てすとタイトル2",
      date: "2022/10/05",
    },
  ],
} as NewsType;
