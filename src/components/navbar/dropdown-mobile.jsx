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
import { NavLink } from "react-router-dom";
import { photoUrl } from "../../images";

export default function DropDownMobile() {
  const { userData } = useSelector((state) => state.event);

  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 backdrop-blur-[10px] bg-card py-[12px] px-[12px] rounded-[14px]">
          <img
            className="w-[30px] h-[30px] object-cover rounded-full"
            src={
              userData?.profile_photo?.includes(".")
                ? userData.profile_photo
                : photoUrl
            }
            alt=""
          />
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
            className="w-52 origin-top-right rounded-xl shadow-custom bg-card mt-[10px]"
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
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
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
