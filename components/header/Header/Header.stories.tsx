import { Header, HeaderType } from "./Header";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;
// const Caution = () => {
//   return <p style={{ marginTop: "50px" }}>controlsのisModalActiveのtrue/falseでアニメーションを確認</p>;
// };

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
  toggleModal: () => {},
  isModalActive: false,
  // headerRef: (<div>test</div>) as unknown,
} as HeaderType;
