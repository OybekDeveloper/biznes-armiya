import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CiMenuKebab } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteModal from "./delete-news";
import AddNews from "./add-news";

export default function DropDown({
  editModal,
  delModal,
  id,
  handleDeleteModal,
  handleUpdateModal,
}) {
  const handleDelete = () => {
    handleDeleteModal();
  };

  const handleEdit = () => {
    handleUpdateModal();
  };

  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 bg-background-secondary p-1 rounded-md z-10">
          <CiMenuKebab className="text-text-primary" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom start"
            className="w-52 origin-top-right rounded-xl bg-card mt-[5px] z-[999] shadow-btn_shadow outline-none"
          >
            <MenuItem>
              <button
                onClick={handleDelete}
                className="group text-red-400 flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <FaRegTrashAlt className="size-4 fill-thin " />
                Delete
                <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                  ⌘D
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleEdit}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <MdModeEdit className="size-4 fill-thin" />
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                  ⌘E
                </kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      <DeleteModal id={id} isOpen={delModal} handleClose={handleDeleteModal} />
      <AddNews id={id} isOpen={editModal} handleClose={handleUpdateModal} />
    </div>
  );
}
