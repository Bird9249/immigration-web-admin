import { Meta, StoryObj } from "storybook-solidjs";
import CloseIcon from "../../icons/CloseIcon";
import SearchIcon from "../../icons/SearchIcon";
import InputText from "./InputText";

const meta = {
  title: "Example/Form/InputText",
  component: InputText,
  tags: ["autodocs"],
} satisfies Meta<typeof InputText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <InputText label="text" required placeholder="input text" />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <InputText
          label="text"
          required
          placeholder="input text"
          error="some thing want wrong"
        />
      </div>
    );
  },
};

export const Icon: Story = {
  render: () => {
    return (
      <div class="flex justify-center">
        <InputText
          label="text"
          required
          placeholder="input text"
          subfixIcon={
            <CloseIcon class="w-4 h-4 text-gray-500 dark:text-gray-400" />
          }
          prefixIcon={
            <SearchIcon class="w-4 h-4 text-gray-500 dark:text-gray-400" />
          }
        />
      </div>
    );
  },
};
