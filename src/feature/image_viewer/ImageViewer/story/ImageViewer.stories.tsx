import { ImageViewer, ImageViewerPropsType } from "../ImageViewer";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img1 from "../../../../test_image/huge_img.jpg";
import img2 from "../../../../test_image/huge2_img.jpg";
import img3 from "../../../../test_image/huge_img.jpg";

const locationImages: any = [
  { id: "test_1", url: img1, width: 1000, height: 1500 },
  { id: "test_2", url: img2, width: 1500, height: 1000 },
];

export default {
  title: "ImageViewer",
  component: ImageViewer,
} as Meta<typeof ImageViewer>;

const Template: Story<typeof ImageViewer> = (args: any) => {
  return <ImageViewer {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  locationImages: locationImages,
  imageLoaded: () => {},
  isImageLoaded: true,
  imageIndexByQuery: "1",
  imageClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {},
  tapOn: (e: React.TouchEvent<HTMLImageElement>) => {},
  tapOff: (e: React.TouchEvent<HTMLImageElement>) => {},
  imageLoadedStateWithPara: (state: boolean) => {},
} as ImageViewerPropsType;
