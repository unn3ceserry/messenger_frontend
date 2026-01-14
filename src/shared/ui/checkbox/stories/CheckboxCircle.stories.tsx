import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CheckboxCircle from "../CheckboxCircle";
import { fn } from "storybook/test";
import { useState } from "react";

const meta = {
  title: "UIComponents/CheckboxCircle",
  component: CheckboxCircle,
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof CheckboxCircle>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Checkbox: Story = {
  args: {
    content: "Test checkbox circle",
    isActive: true,
  },
  render: (args) => {
    const [active, setActive] = useState<boolean>(true);

    return (
      <CheckboxCircle
        {...args}
        isActive={active}
        onClick={() => setActive((prev) => !prev)}
      />
    );
  },
};
