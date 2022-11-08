import { Header, HeaderType } from "./Header";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

const handleClick = action("テスト");

const locationNames = ["egypt", "turkey"];

const Template: Story<typeof Header> = (args: any) => {
  return (
    <>
      <Header {...args} />
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  device: "PC",
  locationNames,
  imagesLocationNamesOnRouterQuery: locationNames[0],
  toggleModal: action("toggleModalFunc"),
  isModalActive: false,
  toLink: action("toLink"),
  handleClick: (e) => {
    e.preventDefault();
    handleClick(e);
  },
} as HeaderType;
