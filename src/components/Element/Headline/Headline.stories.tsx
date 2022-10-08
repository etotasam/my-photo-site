import { Headline, HeadlineType } from "./Headline";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Element/Headline",
  component: Headline,
} as Meta<typeof Headline>;

const Template: Story<typeof Headline> = (args: any) => {
  return <Headline {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  children: "てすとタイトル",
} as HeadlineType;
