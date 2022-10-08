import { LoadingBound } from "./LoadingBound";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Element/LoadingBound",
  component: LoadingBound,
} as Meta<typeof LoadingBound>;

const Template: Story<typeof LoadingBound> = () => {
  return <LoadingBound />;
};
export const Default = Template.bind({});
// Default.args = {};
