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
import { ImExit } from "react-icons/im";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function DropDown({ handleLogOut }) {
  const { userData } = useSelector((state) => state.event);

  const navigate = useNavigate();
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 bg-card shadow-btn_shadow py-[12px] px-[12px] rounded-[14px] z-10">
          <img
            className="cursor-pointer w-[24px] h-[24px] object-cover rounded-full"
            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            alt=""
          />
          <h1 className="text-text_primary font-bold">{userData.first_name}</h1>
          <ChevronDownIcon className="size-7 text-thin" />
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
            className="w-52 origin-top-right rounded-xl shadow-custom bg-card mt-[5px] z-[999]"
          >
            <MenuItem>
              <NavLink
                to={"/profile"}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <PencilIcon className="size-4 fill-thin" />
                My Profile
                <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                  ⌘P
                </kbd>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleLogOut}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <ImExit className="size-4 fill-thin" />
                Exit
                <kbd className="ml-auto hidden font-sans text-xs text-thin group-data-[focus]:inline">
                  ⌘E
                </kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
