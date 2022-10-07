import { BulletNav, BulletNavType } from "./BulletNav";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "top/TopImage/BulletNav",
  component: BulletNav,
} as Meta<typeof BulletNav>;

type ArgType = {
  topImages: any;
  currentPhotoIndex: 0 | 1 | 2;
  setCurrentPhotoIndex: (n: number) => {};
};

const topImages = [{ id: "1" }, { id: "2" }, { id: "3" }];

const Template: Story<typeof BulletNav> = (args: any) => {
  return <BulletNav {...args} />;
};
export const DefaultBulletNav = Template.bind({});
DefaultBulletNav.args = {
  topImages,
  currentPhotoIndex: 0,
  setCurrentPhotoIndex: action("setCurrentPhotoIndex"),
} as ArgType;
