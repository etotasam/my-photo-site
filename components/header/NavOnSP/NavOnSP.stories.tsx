import { NavOnSP, NavOnSPType } from "./NavOnSP";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "NavOnSP",
  component: NavOnSP,
} as Meta<typeof NavOnSP>;

const Template: Story<typeof NavOnSP> = (args: any) => {
  return (
    <div style={{ backgroundColor: "#a3a3a3", height: "100vh", padding: "25px" }}>
      <NavOnSP {...args} />
    </div>
  );
};
export const DefaultHamburger = Template.bind({});
DefaultHamburger.args = {
  toggleModal: action("toggleModalFunc"),
  isModalActive: false,
} as NavOnSPType;
