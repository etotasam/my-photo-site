import { Location, LocationType } from "./Location";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img1 from "../../../test_image/img1.jpg";
import img2 from "../../../test_image/img2.jpg";
import img3 from "../../../test_image/img3.jpg";
import img4 from "../../../test_image/img4.jpg";
import img5 from "../../../test_image/img5.jpg";

export default {
  title: "Location",
  component: Location,
} as Meta<typeof Location>;

const locationsImages = [
  { id: "egypt_1", url: img1 },
  { id: "france_2", url: img2 },
  { id: "landscape_3", url: img3 },
  { id: "turky_4", url: img4 },
  { id: "america_5", url: img5 },
];

const AboveComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "#fbdddd",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>↓↓スクロール↓↓</h1>
    </div>
  );
};

const Template: Story<typeof Location> = (args: any) => {
  return (
    <>
      <AboveComponent />
      <div style={{ height: "100vh", padding: "25px" }}>
        <Location {...args} />
      </div>
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  locationsImages: locationsImages,
} as LocationType;
