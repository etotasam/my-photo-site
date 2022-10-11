import { TestNews, TestNewsType } from "../TestNews";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "News/TestNews",
  component: TestNews,
} as Meta<typeof TestNews>;

const Template: Story<typeof TestNews> = (args: any) => {
  return (
    <>
      <div className="bg-red-400 w-full h-[100vh]" />
      <div style={{ padding: "30px" }}>
        <TestNews {...args} />
      </div>
    </>
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
} as TestNewsType;
