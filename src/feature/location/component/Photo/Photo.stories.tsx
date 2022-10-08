import { Photo, PhotoType } from "./Photo";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img from "@/test_image/img2.jpg";

export default {
  title: "Location/component/photo",
  component: Photo,
} as Meta<typeof Photo>;

const locationImage = {
  id: "test_1",
  url: img,
};

const Template: Story<typeof Location> = (args: any) => {
  return (
    <div style={{ backgroundColor: "#a3a3a3", height: "100vh", padding: "25px" }}>
      <Photo {...args} />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  locationImage: locationImage,
  opacity: false,
} as PhotoType;
