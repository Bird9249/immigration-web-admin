import { createSignal } from "solid-js";
import { Meta, StoryObj } from "storybook-solidjs";
import Button from "../button/Button";
import Modal from "./Modal";
import "./Modal.scss";

const meta = {
  title: "Example/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    children: { description: "content" },
    header: { control: "object", description: "header element" },
    footer: { control: "object", description: "footer element" },
    open: { type: "boolean", description: "is modal open" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = createSignal<boolean>(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          Open
        </Button>

        <Modal
          header="Terms of Service"
          footer={
            <>
              <Button>I accept</Button>
              <Button color="secondary">Decline</Button>
            </>
          }
          open={isOpen()}
          onOpenChange={({ open }) => setIsOpen(open)}
        >
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

export const PopUp: Story = {
  render: () => {
    const [isOpen, setIsOpen] = createSignal<boolean>(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          Open
        </Button>

        <Modal
          open={isOpen()}
          onOpenChange={({ open }) => setIsOpen(open)}
          close
          size="sm"
        >
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <Button color="danger">Yes, I'm sure</Button>
            <Button color="secondary"> No, cancel</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const Size: Story = {
  render: () => {
    const [isSmallOpen, setIsSmallOpen] = createSignal<boolean>(false);
    const [isDefaultOpen, setIsDefaultOpen] = createSignal<boolean>(false);
    const [isLargeOpen, setIsLargeOpen] = createSignal<boolean>(false);
    const [isExtraLargeOpen, setIsExtraLargeOpen] =
      createSignal<boolean>(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsSmallOpen((prev) => !prev);
          }}
        >
          Small Modal
        </Button>
        <Button
          onClick={() => {
            setIsDefaultOpen((prev) => !prev);
          }}
        >
          Default Modal
        </Button>
        <Button
          onClick={() => {
            setIsLargeOpen((prev) => !prev);
          }}
        >
          Large Modal
        </Button>
        <Button
          onClick={() => {
            setIsExtraLargeOpen((prev) => !prev);
          }}
        >
          Extra Large Modal
        </Button>

        <Modal
          open={isSmallOpen()}
          onOpenChange={({ open }) => setIsSmallOpen(open)}
          header="Small modal"
          size="sm"
          footer={
            <>
              <Button>I accept</Button>
              <Button color="secondary">Decline</Button>
            </>
          }
        >
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal>
        <Modal
          open={isDefaultOpen()}
          onOpenChange={({ open }) => setIsDefaultOpen(open)}
          header="Default modal"
          size="md"
          footer={
            <>
              <Button>I accept</Button>
              <Button color="secondary">Decline</Button>
            </>
          }
        >
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal>
        <Modal
          open={isLargeOpen()}
          onOpenChange={({ open }) => setIsLargeOpen(open)}
          header="Large modal"
          size="lg"
          footer={
            <>
              <Button>I accept</Button>
              <Button color="secondary">Decline</Button>
            </>
          }
        >
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal>
        <Modal
          open={isExtraLargeOpen()}
          onOpenChange={({ open }) => setIsExtraLargeOpen(open)}
          header="Extra Large modal"
          size="xl"
          footer={
            <>
              <Button>I accept</Button>
              <Button color="secondary">Decline</Button>
            </>
          }
        >
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};
