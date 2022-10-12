import { NavOnPC, NavOnPCType } from "./NavOnPC";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Header/component/PC",
  component: NavOnPC,
} as Meta<typeof NavOnPC>;

const toLink = action("toLink");
const Template: Story<typeof NavOnPC> = (args: any) => {
  return (
    <div style={{ height: "100vh", padding: "25px" }}>
      <NavOnPC {...args} />
    </div>
  );
};
export const PC = Template.bind({});
PC.args = {
  locationNames: ["test1", "test2", "test3"],
  toLink: (location, e) => {
    e.preventDefault();
    toLink(location, e);
  },
  imagesLocationNamesOnRouterQuery: "test1",
} as NavOnPCType;
