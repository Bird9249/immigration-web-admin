import { Meta, StoryObj } from "storybook-solidjs";
import Table from "./Table";

const meta = {
  title: "Example/Table/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;
