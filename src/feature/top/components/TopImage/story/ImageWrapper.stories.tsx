import { ImageWrapper, ImageWrapperType } from "../TopImage";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img1 from "@/test_image/img1.jpg";
import img2 from "@/test_image/img2.jpg";
import img3 from "@/test_image/img3.jpg";

export default {
  title: "top/component/TopImage/component/ImageWrapper",
  component: ImageWrapper,
} as Meta<typeof ImageWrapper>;

const imageData: any = {
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

const Template: Story<typeof ImageWrapper> = (args: any) => {
  return (
    <div style={{ backgroundColor: "#cdcdcd", height: "100vh", padding: "25px" }}>
      imageが表示されればOK
      <div style={{ position: "relative", width: "250px", height: "350px" }}>
        <ImageWrapper {...args} />
      </div>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  imageData,
  tapOn: action("tapOn"),
  tapOff: action("tapOff"),
  imageLoaded: (id) => {},
  imageIndex: 0,
  currentImageIndex: 0,
} as ImageWrapperType;
