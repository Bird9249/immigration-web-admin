import { Meta, StoryObj } from "storybook-solidjs";
import Pagination from "./Pagination";
import "./Pagination.scss";

const meta = {
  title: "Example/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Pagination
        count={5000}
        pageSize={10}
        onPageChange={(details) => {
          console.log(details);
        }}
      />
    );
  },
};
