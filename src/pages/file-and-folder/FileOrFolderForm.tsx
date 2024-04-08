import { Accessor, createSignal, ParentProps } from "solid-js";
import FolderIcon from "../../components/icons/FolderIcon";
import Modal from "../../components/modal/Modal";
import Tabs from "../../components/tabs/Tabs";
import CreateFile from "./CreateFile";
import CreateFolder from "./CreateFolder";

type Props = {
  folderId: Accessor<{
    parent_id: string;
  }>;
  onSuccess: () => void;
};

export default (props: ParentProps<Props>) => {
  const [openCreate, setOpenCreate] = createSignal<boolean>(false);

  return (
    <>
      <div
        class="flex flex-col gap-2 justify-center items-center min-h-[210px] border dark:border-gray-500 dark:hover:border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
        onClick={() => setOpenCreate(true)}
      >
        <FolderIcon
          iconDirection="plus-line"
          class="size-24 text-primary-600 dark:text-primary-400"
        />
        <span class="text-sm text-gray-500 dark:text-gray-300">
          ເພີ່ມໄຟລ໌ ຫຼື ໂຟນເດີ
        </span>
      </div>

      <Modal
        open={openCreate()}
        size="sm"
        onOpenChange={({ open }) => setOpenCreate(open)}
      >
        <div class="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            ເພີ່ມໄຟລ໌ ຫຼື ໂຟນເດີ
          </h3>
          <button
            onClick={() => {
              setOpenCreate(false);
            }}
            type="button"
            class="transition text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="pb-4 px-4 relative">
          <Tabs
            items={[
              {
                key: "file",
                label: "ໄຟລ໌",
                content: (
                  <CreateFile
                    folderId={props.folderId}
                    onSuccess={() => {
                      setOpenCreate(false);
                      props.onSuccess();
                    }}
                  />
                ),
              },
              {
                key: "folder",
                label: "ໂຟນເດີ",
                content: (
                  <CreateFolder
                    folderId={props.folderId}
                    onSuccess={() => {
                      setOpenCreate(false);
                      props.onSuccess();
                    }}
                  />
                ),
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};
