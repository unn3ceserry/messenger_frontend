import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CheckboxDefault from "../CheckboxDefault";
import { fn } from "storybook/test";
import { useState } from "react";

const meta = {
  title: "UIComponents/CheckboxDefault",
  component: CheckboxDefault,
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof CheckboxDefault>;

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
      <CheckboxDefault
        {...args}
        isActive={active}
        onClick={() => setActive((prev) => !prev)}
      />
    );
  },
};
