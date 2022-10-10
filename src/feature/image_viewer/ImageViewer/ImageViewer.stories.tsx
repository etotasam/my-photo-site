import { ImageViewer, ImageViewerType } from "./ImageViewer";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img from "../../../test_image/huge_img.jpg";

const imageData: any = { id: "test_1", url: img, width: 1000, height: 1500 };

export default {
  title: "ImageViewer",
  component: ImageViewer,
} as Meta<typeof ImageViewer>;

const Template: Story<typeof ImageViewer> = (args: any) => {
  return <ImageViewer {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  imageData,
  isImageLoading: false,
  imageClick: action("click"),
  imageLoaded: () => {},
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => {},
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => {},
} as ImageViewerType;

export const center_center = Template.bind({});
center_center.args = {
  imageData,
  isImageLoading: false,
  imageClick: action("click"),
  className: "min-h-[100vh] flex justify-center items-center",
  imageLoaded: () => {},
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => {},
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => {},
} as ImageViewerType;
