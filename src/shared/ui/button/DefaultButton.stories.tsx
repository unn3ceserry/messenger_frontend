import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";
import Button from "./DefaultButton";
import { NextIntlClientProvider } from "next-intl";

const meta = {
  title: "UIComponents/DefaultButton",
  component: Button,
  parameters: {
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
   decorators: [
    (Story) => (
     <NextIntlClientProvider locale="en">
       <div className="flex flex-col items-center justify-center w-full gap-3">
        <Story />
        <Button text="Submit" className="w-full" />
      </div>
     </NextIntlClientProvider>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Sign In",
  },
};
