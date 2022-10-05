import { TestStoryBook, Props } from "./TestStoryBook";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import img from "../../public/_MG_6327.jpg";
import img2 from "../../test_image/img1.jpg";

export default {
  title: "TestStoryBook",
  component: TestStoryBook,
} as Meta<typeof TestStoryBook>;

const Template: Story<typeof TestStoryBook> = (args: any) => {
  return (
    <div style={{ backgroundColor: "#a3a3a3", height: "100vh", padding: "25px" }}>
      <TestStoryBook {...args} />
    </div>
  );
};
export const DefaultTestStoryBook = Template.bind({});
DefaultTestStoryBook.args = {
  image: img2,
} as Props;
