import { Header, HeaderType } from "./Header";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

const handleClick = action("テスト");

const Template: Story<typeof Header> = (args: any) => {
  return (
    <>
      <Header {...args} />
    </>
  );
};
export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
  device: "PC",
  locationNames: ["てすと1", "てすと2"],
  photoLabelName: "てすと1",
  toggleModal: action("toggleModalFunc"),
  isModalActive: false,
  toLink: action("toLink"),
  handleClick: (e) => {
    e.preventDefault();
    handleClick(e);
  },
} as HeaderType;
