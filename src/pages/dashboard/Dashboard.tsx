<<<<<<< HEAD
=======
import { createSignal } from "solid-js";
import Button from "../../components/button/Button";
import { FileAndFolder } from "../file-and-folder/FileAndFolder";
>>>>>>> a294dd5a6a68bbd140463c45dd04b202ea26b4c5

export default () => {
  const [open, setOpen] = createSignal<boolean>(false);

  return (
    <div class="flex flex-col justify-center items-center min-h-[80vh]">
      <h1 class="text-gray-900 text-xl dark:text-white">ຍີນດີຕອນຮັບ</h1>
      <Button
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        File
      </Button>

      <FileAndFolder
        open={[open, setOpen]}
        onOpenChange={(value) => {
          setOpen(value);
        }}
        onSelect={(url) => {
          console.log(url);
          setOpen(false);
        }}
      />
    </div>
  );
};
