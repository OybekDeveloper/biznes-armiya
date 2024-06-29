import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

export default function DropDown() {
  return (
    <div className="">
      <Menu >
        <MenuButton className="inline-flex items-center gap-2 bg-white py-[12px] px-[12px] rounded-[14px]">
          <img className="w-[24px] h-[24px] object-cover rounded-full" src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" alt="" />
          <h1 className="text-text_primary font-bold">user name</h1>
          <ChevronDownIcon className="size-7 text-black" />
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
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl shadow-custom bg-white mt-[10px]"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                  ⌘E
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <Square2StackIcon className="size-4 fill-white/30" />
                Duplicate
                <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                  ⌘D
                </kbd>
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                Archive
                <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                  ⌘A
                </kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <TrashIcon className="size-4 fill-white/30" />
                Delete
                <kbd className="ml-auto hidden font-sans text-xs text-black group-data-[focus]:inline">
                  ⌘D
                </kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
