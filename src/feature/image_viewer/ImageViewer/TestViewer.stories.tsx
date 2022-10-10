import { TestViewer, TestViewerType } from "./TestViewer";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img from "../../../test_image/huge_img.jpg";

export default {
  title: "TestView",
  component: TestViewer,
} as Meta<typeof TestViewer>;

const Template: Story<typeof TestViewer> = (args: any) => {
  return <TestViewer {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  imageData: { id: "test_1", url: img, width: 1000, height: 1500 },
  isImageLoading: false,
  imageClick: action("click"),
} as TestViewerType;

export const center_center = Template.bind({});
center_center.args = {
  imageData: { id: "test_1", url: img, width: 1000, height: 1500 },
  isImageLoading: false,
  imageClick: action("click"),
  className: "min-h-[100vh] flex justify-center items-center",
} as TestViewerType;
