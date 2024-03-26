import { createForm, valiForm } from "@modular-forms/solid";
import { object, string, tuple } from "valibot";
import Button from "../../components/button/Button";
import DateRangePicker from "../../components/forms/date-range-picker/DateRangePicker";
import Toggle from "../../components/forms/toggle/Toggle";

const schema = object({
  date_range: tuple([string(), string()]),
});

export default () => {
  const [form, { Field, Form }] = createForm({ validate: valiForm(schema) });

  return (
    <div class="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 class="text-gray-900 text-xl dark:text-white">Welcome</h1>
      <Form
        onSubmit={(values) => {
          console.log(values);
        }}
        class="w-full"
      >
        <Field name="date_range" type="string[]">
          {(field) => (
            <DateRangePicker
              error={field.error}
              label={["start", "end"]}
              placeholder={["enter start date", "enter end date"]}
              name={field.name}
              form={form}
              value={field.value}
              formClass="grid md:grid-cols-2 gap-4"
            />
          )}
        </Field>

        <Button type="submit" class="mt-3">
          submit
        </Button>
      </Form>

    </div>
  );
};
