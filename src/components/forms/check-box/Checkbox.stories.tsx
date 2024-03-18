import { createForm, valiForm } from "@modular-forms/solid";
import { For } from "solid-js";
import { Meta, StoryObj } from "storybook-solidjs";
import { array, minLength, object, string } from "valibot";
import Button from "../../button/Button";
import Checkbox from "./Checkbox";

const meta = {
  title: "Example/Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormSchema = object({
  fruits: array(string(), [minLength(1)]),
});

export const Default: Story = {
  render: () => {
    const [, { Field }] = createForm({ validate: valiForm(FormSchema) });

    return (
      <div class="flex flex-col items-start">
        <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Fruits
        </h3>
        <div class="flex flex-wrap">
          <For
            each={[
              { label: "Bananas", value: "bananas" },
              { label: "Apples", value: "apples" },
              { label: "Grapes", value: "grapes" },
            ]}
          >
            {({ label, value }) => (
              <Field name="fruits" type="string[]">
                {(field, props) => (
                  <Checkbox
                    {...props}
                    value={value}
                    error={field.error}
                    checked={field.value?.includes(value)}
                    label={label}
                  />
                )}
              </Field>
            )}
          </For>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [, { Field }] = createForm({ validate: valiForm(FormSchema) });

    return (
      <div class="flex flex-col items-start">
        <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Fruits
        </h3>
        <div class="flex flex-wrap">
          <For
            each={[
              { label: "Bananas", value: "bananas" },
              { label: "Apples", value: "apples" },
              { label: "Grapes", value: "grapes" },
            ]}
          >
            {({ label, value }) => (
              <Field name="fruits" type="string[]">
                {(field, props) => (
                  <Checkbox
                    {...props}
                    value={value}
                    error={field.error}
                    checked={field.value?.includes(value)}
                    label={label}
                    disabled
                  />
                )}
              </Field>
            )}
          </For>
        </div>
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [, { Field, Form }] = createForm({
      validate: valiForm(FormSchema),
    });

    return (
      <div class="flex flex-col items-start">
        <Form
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <h3 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fruits
          </h3>
          <ul class="flex flex-wrap">
            <For
              each={[
                { label: "Test", value: "test" },
                { label: "Test1", value: "test1" },
                { label: "Test2", value: "test2" },
              ]}
            >
              {({ label, value }) => (
                <Field name="fruits" type="string[]">
                  {(field, props) => (
                    <Checkbox
                      {...props}
                      error={field.error}
                      value={value}
                      checked={field.value?.includes(value)}
                      label={label}
                    />
                  )}
                </Field>
              )}
            </For>
          </ul>
          <Button type="submit" class="mt-2">
            submit
          </Button>
        </Form>
      </div>
    );
  },
};
