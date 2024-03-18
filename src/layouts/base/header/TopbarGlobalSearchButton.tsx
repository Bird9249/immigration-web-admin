import SearchIcon from "../../../components/icons/SearchIcon";

export default function () {
  return (
    <button
      type="button"
      data-drawer-toggle="drawer-navigation"
      aria-controls="drawer-navigation"
      class="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition"
    >
      <span class="sr-only">Toggle search</span>
      <SearchIcon class="w-6 h-6" />
    </button>
  );
}
