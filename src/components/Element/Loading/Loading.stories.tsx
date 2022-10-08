import { Loading } from "./Loading";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Element/Loading",
  component: Loading,
} as Meta<typeof Loading>;

const Template: Story<typeof Loading> = () => {
  return <Loading />;
};
export const Default = Template.bind({});
