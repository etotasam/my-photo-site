import { BulletNav } from "../TopImage";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "top/component/TopImage/component/BulletNav",
  component: BulletNav,
} as Meta<typeof BulletNav>;

type ArgType = {
  topImages: any;
  currentImageIndex: number;
  setCurrentPhotoIndex: (n: number) => {};
};

const topImages = [{ id: "1" }, { id: "2" }, { id: "3" }];

const Template: Story<typeof BulletNav> = (args: any) => {
  return (
    <div className="flex justify-center items-center w-[100vw] min-h-[100vh]">
      <div>
        <BulletNav {...args} />
      </div>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  topImages,
  currentImageIndex: 0,
  setCurrentPhotoIndex: action("setCurrentPhotoIndex"),
} as ArgType;
