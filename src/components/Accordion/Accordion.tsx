import { SubmitHandler, createForm, setValue, valiForm } from "@modular-forms/solid";
import { BannerForm, BannerSchema } from "../../pages/banner-hero/banners/schemas/banner.schemas";
import Textarea from "../forms/textarea/Textarea";
import InputText from "../forms/input-text/InputText";


export default () => {
  const [bannerForm, { Form, Field }] = createForm<BannerForm>({
    validate: valiForm(BannerSchema),
  });
  const handleSubmit: SubmitHandler<BannerForm> = async (values) => {
    console.log("Submit")
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-1">
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
              <span>LAO</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="banners_translate" type="string[]">
                  {(field, props) => (
                    <InputText
                      required
                      label="ຫົວຂໍ້"
                      {...props}
                       value={field.value}
                      error={field.error}
                      placeholder="ປ້ອນຫົວຂໍ້"
                    />
                  )}
                </Field>
                <Field name="banners_translate" type="string[]">
                  {(field, props) => (
                    <Textarea
                      required
                      label="ຄຳອະທິບາຍ"
                      {...props}
                      //  value={field.value}
                      error={field.error}
                      placeholder="ປ້ອນຄຳອະທິບາຍ"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>
          <h2 id="accordion-collapse-heading-2">
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
              <span>English</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
              <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="banners_translate" type="string[]">
                  {(field, props) => (
                    <InputText
                      required
                      label="Title"
                      {...props}
                      //  value={field.value}
                      error={field.error}
                      placeholder="Title"
                    />
                  )}
                </Field>
                <Field name="banners_translate" type="string[]">
                  {(field, props) => (
                    <Textarea
                      required
                      label="Description"
                      {...props}
                      //  value={field.value}
                      error={field.error}
                      placeholder="Description"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>
          <h2 id="accordion-collapse-heading-3">
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
              <span>Chinese</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
            <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
              <div class="grid gap-4 mb-4 sm:mb-8 md:grid-cols-2 md:gap-6">
                <Field name="banners_translate" type="string[]">
                  {(field, props) => (
                    <InputText
                      required
                      label="標題"
                      {...props}
                      //  value={field.value}
                      error={field.error}
                      placeholder="標題"
                    />
                  )}
                </Field>
                <Field name="banners_translate" type="string[]">
                  {(field, props) => (
                    <Textarea
                      required
                      label="描述"
                      {...props}
                      //  value={field.value}
                      error={field.error}
                      placeholder="描述"
                    />
                  )}
                </Field>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}