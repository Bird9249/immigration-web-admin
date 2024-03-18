import { Meta, StoryObj } from "storybook-solidjs";
import BellIcon from "../icons/BellIcon";
import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["primary", "secondary", "danger"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    isLoading: { type: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Primary" },
};

export const Secondary: Story = {
  args: { children: "Secondary", color: "secondary" },
};

export const Danger: Story = {
  args: { children: "Danger", color: "danger" },
};

export const WithIcon: Story = {
  args: { children: "Icon", prefixIcon: BellIcon },
};

export const Loading: Story = {
  args: { isLoading: true },
};
