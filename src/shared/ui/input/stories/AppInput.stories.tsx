import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AppInput from "../AppInput";
import Button from "../../button/Button";
import { expect } from "storybook/test";

const meta = {
  title: "UIComponents/AppInput",
  component: AppInput,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <Story />
        <Button label="Submit" className="w-full" />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const emailInput = canvas.getByPlaceholderText("input your email");
    const inputText = "test@gmail.com";
    for (let char of inputText) {
      await userEvent.type(emailInput, char);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    expect(emailInput).toHaveValue("test@gmail.com");
    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);
  },
  args: {
    icon: (
      <svg
        xmlns="www.w3.org"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="feather feather-mail"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    placeholder: "input your email",
    type: "email",
  },
};

export const PasswordInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const passwordInput = canvas.getByPlaceholderText("input your password");
    const inputText = "mypassword";
    for (let char of inputText) {
      await userEvent.type(passwordInput, char);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    expect(passwordInput).toHaveValue("mypassword");
    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);
  },
  args: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
      >
        <path d="M12 17a2 2 0 0 0 2-2v-2h-4v2a2 2 0 0 0 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
      </svg>
    ),
    placeholder: "input your password",
    type: "password",
  },
};

export const UsernameInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const passwordInput = canvas.getByPlaceholderText("input your username");
    const inputText = "nestxx";
    for (let char of inputText) {
      await userEvent.type(passwordInput, char);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    expect(passwordInput).toHaveValue("nestxx");
    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);
  },
  args: {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    placeholder: "input your username",
    type: "text",
  },
};
