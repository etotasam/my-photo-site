import { TopImage, TopImageType } from "./TopImage";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img1 from "@/test_image/img1.jpg";
import img2 from "@/test_image/img2.jpg";
import img3 from "@/test_image/img3.jpg";

export default {
  title: "TopImage/key",
  component: TopImage,
} as Meta<typeof TopImage>;

const photo = {
  id: "test_1",
  url: img1,
};

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
export const DefaultKeyVisual = Template.bind({});
DefaultKeyVisual.args = {
  topImages: allImages.japan,
  allImages,
  currentPhotoIndex: 1,
  isTopImageAllLoaded: true,
  imageOnloaded: () => {},
  tapOn: () => {},
  tapOff: () => {},
  setCurrentPhotoIndex: () => {},
} as TopImageType;
