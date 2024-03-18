import { Meta, StoryObj } from "storybook-solidjs";
import PasswordInput from "./PasswordInput";

const meta = {
  title: "Example/Form/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <PasswordInput label="password" required placeholder="enter password" />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <PasswordInput
          label="password"
          required
          placeholder="enter password"
          error="invalid format"
        />
      </div>
    );
  },
};
