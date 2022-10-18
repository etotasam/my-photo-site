import { Image, ImageType } from "../ImageViewer";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img from "../../../../test_image/huge_img.jpg";

const imageData: any = { id: "test_1", url: img, width: 1000, height: 1500 };

export default {
  title: "Image",
  component: Image,
} as Meta<typeof Image>;

const Template: Story<typeof Image> = (args: any) => {
  return <Image {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  imageData,
  imageClick: action("click"),
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => {},
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => {},
  imageLoadedStateWithPara: () => {},
} as ImageType;

export const center_center = Template.bind({});
center_center.args = {
  imageData,
  imageClick: action("click"),
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => {},
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => {},
  imageLoadedStateWithPara: () => {},
} as ImageType;
