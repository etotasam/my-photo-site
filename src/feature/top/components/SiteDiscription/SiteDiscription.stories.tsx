import { SiteDiscription } from "./SiteDiscription";
import { Story, Meta } from "@storybook/react";

export default {
  title: "top/SiteDiscription",
  component: SiteDiscription,
} as Meta<typeof SiteDiscription>;

const Template: Story<typeof SiteDiscription> = (args: any) => {
  return (
    <>
      <div>windowの幅で文字表示が変わる</div>
      <div className={"bg-gray-200 flex justify-center items-center"}>
        <SiteDiscription {...args} />
      </div>
    </>
  );
};
export const Default = Template.bind({});
Default.args = {};
