import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const people = [
  {
    id: 1,
    name: "Daily",
    key: "DAILY",
  },
  {
    id: 2,
    name: "Monthly",
    key: "MONTHLY",
  },
  {
    id: 3,
    name: "Yearly",
    key: "YEARLY",
  },
];

export default function FilterDate({ onFilterChange }) {
  const [selected, setSelected] = useState(people[1]);

  const handleChange = (selected) => {
    setSelected(selected);
    onFilterChange(selected.key);
  };

  return (
    <div className="h-full z-[1200]">
      <Listbox value={selected} onChange={handleChange}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-card py-1.5 pr-8 pl-3 text-left clamp4 text-thin border-[1px] border-border",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl shadow-custom border-[1px] border-border bg-card p-1 mt-1 focus:outline-none z-[1100]"
          >
            {people.map((person) => (
              <ListboxOption
                key={person.name}
                value={person}
                className="bg-card group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-hover-card"
              >
                <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                <div className="clamp4">{person.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
