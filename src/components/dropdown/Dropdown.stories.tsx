import { Meta, StoryObj } from "storybook-solidjs";
import Button from "../button/Button";
import AngleIcon from "../icons/AngleIcon";
import Dropdown from "./Dropdown";
import "./Dropdown.scss";

const meta = {
  title: "Example/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Dropdown
          triggerEl={
            <Button subfixIcon={<AngleIcon iconDirection="down" />}>
              Dropdown button
            </Button>
          }
          menus={[
            [
              {
                onClick() {
                  console.log("Dashboard");
                },
                label: "Dashboard",
              },
              {
                onClick() {
                  console.log("Settings");
                },
                label: "Settings",
              },
              {
                onClick() {
                  console.log("Earnings");
                },
                label: "Earnings",
              },
            ],
            [
              {
                onClick() {
                  console.log("Separated link");
                },
                label: "Separated link",
              },
            ],
          ]}
        ></Dropdown>
      </>
    );
  },
};
