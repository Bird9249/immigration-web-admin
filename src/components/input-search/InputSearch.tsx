type InputSearchProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: (value: string) => void;
};

export default ({ placeholder, onSearch, onClear }: InputSearchProps) => {
  return (
    <form
      class="relative"
      onSubmit={(e) => {
        e.preventDefault();

        if (onSearch) {
          const target = e.target as unknown as EventTarget[];
          onSearch((target[0] as HTMLInputElement).value);
        }
      }}
    >
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-3 h-3 text-gray-500 dark:text-gray-400"
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
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        class="block transition w-full p-2 ps-8 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
        onInput={(e) => {
          if (e.target.value === "" && onClear) {
            onClear(e.target.value);
          }
        }}
      />
      <button type="submit" class="hidden">
        <span class="sr-only">Search</span>
      </button>
    </form>
  );
};
