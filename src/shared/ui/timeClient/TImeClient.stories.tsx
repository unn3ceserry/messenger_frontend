import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TimeClient from "./TimeClient";
import { NextIntlClientProvider } from "next-intl";

const meta = {
  title: "UIComponents/TimeClient",
  component: TimeClient,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  decorators: [
     (Story) => (
      <NextIntlClientProvider locale="en">
        <Story/>
      </NextIntlClientProvider>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TimeClient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    initialTime: String(new Date())
  },
};
