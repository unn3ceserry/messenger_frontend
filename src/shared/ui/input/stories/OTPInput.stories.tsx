import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Button from "../../button/Button";
import { expect } from "storybook/test";
import OTPInput from "../OtpInput";

const meta = {
  title: "UIComponents/OTPInput",
  component: OTPInput,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center w-full gap-3 max-w-100">
        <Story />
        <Button label="Submit" className="w-full" />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CodeInput: Story = {
  play: async ({ canvas, userEvent }) => {
    const otpInputs = canvas.getAllByRole("textbox");
    const inputText = "NESTX";

    for (let i = 0; i < inputText.length; i++) {
      await userEvent.type(otpInputs[i], inputText[i]);
      await new Promise(r => setTimeout(r, 100));
    }

    const entered = otpInputs.map(input => (input as HTMLInputElement).value).join("");
    expect(entered).toBe("NESTX");

    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);
  },
  args: {
    placeholder: "A1B2C3",
    numInputs: 6,
    value: "",
    onChange: (v: string) => console.log("OTP changed:", v),
  },
};
