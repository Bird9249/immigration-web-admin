import { RouteSectionProps } from "@solidjs/router";
import logo from "../../assets/logo.webp";

export default (props: RouteSectionProps) => {
  return (
    <section class="bg-gray-50 dark:bg-gray-900 h-screen">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-16 h-16 mr-2 mb-2 object-contain"
            src={logo}
            alt="logo"
          />
          <span>ກົມກວດຄົນເຂົ້າເມືອງ ແຫ່ງ ສປປ ລາວ</span>
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">{props.children}</div>
        </div>
      </div>
    </section>
  );
};
