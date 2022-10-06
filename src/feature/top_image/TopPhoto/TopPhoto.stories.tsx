import { TopPhoto, TopPhotoType } from "./TopPhoto";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img1 from "../../../test_image/img1.jpg";
import img2 from "../../../test_image/img2.jpg";
import img3 from "../../../test_image/img3.jpg";

export default {
  title: "KeyVisual/TopPhoto",
  component: TopPhoto,
} as Meta<typeof TopPhoto>;

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

const Template: Story<typeof TopPhoto> = (args: any) => {
  return (
    <div style={{ backgroundColor: "#a3a3a3", height: "100vh", padding: "25px" }}>
      <div style={{ position: "relative", width: "250px", height: "350px" }}>
        <TopPhoto {...args} />
      </div>
    </div>
  );
};
export const DefaultTopPhoto = Template.bind({});
DefaultTopPhoto.args = {
  photo,
  // allImages,
  tapOn: action("tapOn"),
  tapOff: action("tapOff"),
  isOnloaded: () => {},
  toLink: "url",
} as TopPhotoType;
