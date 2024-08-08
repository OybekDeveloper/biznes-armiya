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
import { coinimg, photoUrl } from "../../images";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export default function DropDown({ handleLogOut }) {
  const { userData } = useSelector((state) => state.event);
  console.log(userData);
  const navigate = useNavigate();
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 bg-card shadow-btn_shadow py-[12px] px-[12px] rounded-[14px] z-10">
          <img
            className="cursor-pointer w-[24px] h-[24px] object-cover rounded-full"
            src={
              userData?.profile_photo?.includes(".")
                ? userData.profile_photo
                : photoUrl
            }
            alt={"ddd"}
          />
          <div className="text-text_primary font-bold">
            {!userData.first_name ? (
              <h1>Name...</h1>
            ) : userData?.first_name?.length < 7 ? (
              userData?.first_name
            ) : (
              userData?.first_name?.slice(0.7) + "..."
            )}
          </div>
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
            className="w-52 origin-top-right rounded-xl bg-card mt-[5px] z-[999] shadow-btn_shadow outline-none"
          >
            <div className="px-3 py-1.5 flex justify-between items-start">
              <div className="w-32 cursor-pointer flex justify-between items-center gap-3 py-3 px-3 border-border border-[2px] rounded-[14px]">
                <h1>{userData?.vab ? userData?.vab : 0}</h1>
                <img src={coinimg} alt="" />
              </div>
              <div className="cursor-pointer w-12 h-12 relative flex justify-center items-center">
                <h1 className="absolute clamp4 ">
                  {userData?.reyting ? userData?.reyting : 0}
                </h1>
                <CircularProgressbar
                  maxValue={10}
                  value={userData?.reyting ? userData?.reyting : 0}
                  styles={buildStyles({
                    textColor: "#3F8CFF",
                    pathColor: "#3F8CFF",
                    trailColor: "rgba(0, 0, 0, 0.1)", // Ensure a valid color is provided
                  })}
                />
              </div>
            </div>
            <MenuItem>
              <NavLink
                to={userData?.role?.role_edit ? "/settings/user" : "/profile"}
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
