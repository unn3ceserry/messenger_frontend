import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CheckboxLanguage from "../CheckboxLanguage";
import { fn } from "storybook/test";
import { useState } from "react";

const meta = {
  title: "UIComponents/CheckboxLanguage",
  component: CheckboxLanguage,
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center w-full gap-3">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof CheckboxLanguage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    content: "English",
    contentEn: "English",
    isActive: true,
  },
  render: (args) => {
    const [active, setActive] = useState<boolean>(true);

    return (
      <>
        <CheckboxLanguage
          {...args}
          isActive={active}
          onClick={() => setActive((prev) => !prev)}
        />
      </>
    );
  },
};
