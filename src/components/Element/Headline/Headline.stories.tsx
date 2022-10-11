import { Headline, HeadlineAnime, HeadlineType } from "./";
import { Story, Meta } from "@storybook/react";
import { motion } from "framer-motion";

export default {
  title: "Element/Headline",
  component: Headline,
  HeadlineAnime,
} as Meta<typeof Headline>;

const variants = {
  initial: { opacity: 0, x: 30 },
  in: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const TestView = () => {
  return <div className="w-full h-[100vh] bg-gray-400 text-4xl">↓スクロール</div>;
};

const Template: Story<typeof Headline> = (args: any) => {
  return (
    <>
      <Headline {...args} />
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  children: "てすとタイトル",
} as HeadlineType;

//! HeadlineAnime
const AnimationTemplate: Story<typeof HeadlineAnime> = (args: any) => {
  return (
    <>
      {/* <TestView /> */}
      <div className="w-full h-[100vh] pt-[150px]">
        <HeadlineAnime {...args} />
      </div>
    </>
  );
};
export const Animation = AnimationTemplate.bind({});
Animation.args = {
  children: "アニメーション",
};
