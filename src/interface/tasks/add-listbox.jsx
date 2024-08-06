import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { photoUrl } from "../../images";
export default function AddListbox({
  data,
  handleChange,
  index,
  newUsers,
  updateItem,
}) {
  const [selected, setSelected] = useState(index === null ? data[0] : null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (index === null) {
      setSelected(data[0] || null);
    } else if (updateItem && index !== null) {
      const selectedItems = data.find((person) =>
        updateItem.user.some((user) => user.id === person.id)
      );
      setSelected(selectedItems || null);
    }
  }, [newUsers, data, updateItem, index]);

  useEffect(() => {
    if (index !== null) {
      const event = {
        target: {
          name: "user",
          value: selected?.id || "",
        },
      };
      handleChange(event, index);
    } else if (index === null) {
      const event = {
        target: {
          name: "status",
          value: selected?.name || "",
        },
      };
      handleChange(event);
    }
  }, [selected]);

  const filteredPeople = query === ""
    ? data
    : data.filter((person) =>
      index !== null
        ? person?.email.toLowerCase().includes(query.toLowerCase())
        : person?.name.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div className="z-[100]">
      <Combobox
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-lg border-[1.5px] border-border bg-card py-[12px] pr-8 pl-3"
            displayValue={(person) =>
              index !== null ? person?.email : person?.name
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          className="z-[1000] w-[var(--input-width)] rounded-xl border border-border mt-2 shadow-btn_shadow bg-card p-1"
        >
          {filteredPeople?.map((person) => (
            <ComboboxOption
              key={person?.id}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none"
            >
              <div
                className={`${
                  index === null
                    ? person?.name === "Asked"
                      ? "bg-yellow-500 text-white py-2 px-4"
                      : person?.name === "Expected"
                      ? "bg-blue-500 text-white py-2 px-4"
                      : "bg-green-500 text-white py-2 px-4"
                    : "p-2"
                } rounded-md flex justify-start items-center gap-2`}
              >
                {index !== null && (
                  <img
                    src={person?.profile_photo || photoUrl}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                {index !== null ? person?.email : person?.name}
              </div>
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
