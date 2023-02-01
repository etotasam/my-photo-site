import { ImageViewer } from "../ImageViewer";
import type { ImageViewerPropsType } from "../ImageViewer";
import { Story, Meta } from "@storybook/react";
//!context
import { ImageLoadStateProvider } from "../context/imageLoadStateContext";

import img1 from "../../../../test_image/huge_img.jpg";
import img2 from "../../../../test_image/huge2_img.jpg";

const locationImages: any = [
  { id: "test_1", url: img1, width: 1000, height: 1500 },
  { id: "test_2", url: img2, width: 1500, height: 1000 },
];

export default {
  title: "ImageViewer",
  component: ImageViewer,
} as Meta<typeof ImageViewer>;

const Template: Story<typeof ImageViewer> = (args: any) => {
  return (
    <ImageLoadStateProvider>
      <ImageViewer {...args} />
    </ImageLoadStateProvider>
  );
};
export const Default = Template.bind({});
Default.args = {
  locationImages: locationImages,
  imageLoaded: () => {},
  imageIndexByQuery: "1",
  imageClick: (_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {},
  tapOn: (_: React.TouchEvent<HTMLImageElement>) => {},
  tapOff: (_: React.TouchEvent<HTMLImageElement>) => {},
  isImageLoading: false,
} as ImageViewerPropsType;
