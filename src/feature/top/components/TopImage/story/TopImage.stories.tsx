import { TopImage, TopImageType } from "../TopImage";
import { Story, Meta } from "@storybook/react";

import img1 from "@/test_image/img1.jpg";
import img2 from "@/test_image/img2.jpg";
import img3 from "@/test_image/img3.jpg";

export default {
  title: "top/component/TopImage",
  component: TopImage,
} as Meta<typeof TopImage>;

const allImages: Record<string, any[]> = {
  japan: [
    { id: "japan_1", url: img1 },
    { id: "japan_2", url: img2 },
    { id: "japan_3", url: img3 },
  ],
  america: [{ id: "america_1", url: img3 }],
};

const Template: Story<typeof TopImage> = (args: any) => {
  return <TopImage {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  currentImageIndex: 1,
  topImages: allImages.japan,
  isTopImagesLoaded: true,
  imageLoaded: () => {},
  tapOn: () => {},
  tapOff: () => {},
  setCurrentImageIndex: () => {},
} as TopImageType;
