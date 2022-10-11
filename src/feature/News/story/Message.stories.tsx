import { Messages } from "../News";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "News/Messages",
  component: Messages,
} as Meta<typeof Messages>;

const Above = () => {
  return <div className="w-full h-[100vh] bg-blue-100">スクロール↓</div>;
};

const Template: Story<typeof Messages> = (args: any) => {
  return (
    <>
      {/* <Above /> */}
      <div style={{ padding: "30px" }}>
        <Messages {...args} />
      </div>
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  news: [
    {
      title: "アニメーション",
      date: "2022/10/05",
    },
    {
      title: "アニメーション2",
      date: "2022/10/05",
    },
  ],
};
