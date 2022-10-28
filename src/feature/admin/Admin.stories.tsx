import { Admin, AdminPropsType } from "./Admin";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Admin",
  component: Admin,
} as Meta<typeof Admin>;

const login = action("click login");

const Template: Story<typeof Admin> = (args: any) => {
  return (
    <>
      <Admin {...args} />
    </>
  );
};
export const Default = Template.bind({});
Default.args = {
  login: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  },
  inputEmail: "email@test.com",
  inputPassword: "password",
  isAuth: false,
} as AdminPropsType;
