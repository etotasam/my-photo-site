import { Button, ButtonType } from "./Button";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Element/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: Story<typeof Button> = (args: any) => {
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <Button {...args} />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  children: "テストボタン",
  onClick: action("click"),
} as ButtonType;

export const Custom = Template.bind({});
Custom.args = {
  children: "Customボタン",
  onClick: action("Customボタンclick"),
  color: "bg-red-500 hover:bg-red-600 text-white",
  className: "w-[70vw]",
} as ButtonType;
