import { MyLink, MyLinkType } from "./MyLink";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Element/MyLink",
  component: MyLink,
} as Meta<typeof MyLink>;

const Template: Story<typeof MyLink> = (args: any) => {
  return <MyLink {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  children: "てすとLink",
  href: "url",
  onClick: action("クリック"),
} as MyLinkType;
