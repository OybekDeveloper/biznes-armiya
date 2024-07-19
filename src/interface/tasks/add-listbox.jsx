import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
  } from "@headlessui/react";
  import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
  import clsx from "clsx";
  import { useEffect, useState } from "react";
  import { FaAngleDown } from "react-icons/fa";
  
  export default function AddListbox({ data, handleChange, index }) {
    const [selected, setSelected] = useState(null); // Initialize with null
  
    useEffect(() => {
      if (index !== null) {
        const event = {
          target: {
            name: "user",
            value: selected?.id,
          },
        };
        handleChange(event, index);
      } else if (index === null) {
        const event = {
          target: {
            name: "status",
            value: selected?.name,
          },
        };
        handleChange(event);
      }
    }, [selected]);
  
    return (
      <div className="z-[100]">
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton
            className={clsx(
              "bg-card relative w-full rounded-lg px-[18px] py-[12px] text-left clamp4 text-thin border-[1.5px] border-border flex justify-between items-center",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            {index !== null ? selected?.first_name : selected?.name}
            <FaAngleDown className="text-[24px]" />
          </ListboxButton>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              anchor="bottom"
              className="rounded-xl shadow-custom border-[1.5px] border-border bg-card p-1 mt-1 focus:outline-none z-[1000]"
            >
              {data.map((person, idx) => (
                <ListboxOption
                  key={idx}
                  value={person}
                  className="bg-card group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-hover-card"
                >
                  <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                  <div className="clamp4">
                    {index !== null ? person?.first_name : person?.name}
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </Listbox>
      </div>
    );
  }
  