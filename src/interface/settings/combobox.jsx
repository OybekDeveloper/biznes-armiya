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

export default function AddListbox({ data, handleChange, status }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (selected) {
      const event = {
        target: {
          name: status,
          value: status === "user" ? selected?.id : selected?.id,
        },
      };
      handleChange(event);
    }
  }, [selected]);

  const filteredData =
    query === ""
      ? data
      : data.filter((item) =>
          status === "user"
            ? item?.email?.toLowerCase()?.includes(query.toLowerCase())
            : item?.role?.toLowerCase()?.includes(query.toLowerCase())
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
            className={clsx(
              "w-full rounded-lg border-[1.5px] border-border bg-card py-[12px] pr-8 pl-3",
              "focus:outline-none focus:border-primary"
            )}
            displayValue={(item) =>
              status === "user" ? item?.email : item?.role
            }
            onChange={(event) => {
              setQuery(event?.target?.value ? event.target.value : "");
            }}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4" />
          </ComboboxButton>
        </div>
          <ComboboxOptions
            anchor="bottom"
            className={clsx(
              "z-[1000] w-[var(--input-width)] rounded-xl border border-border mt-2 shadow-btn_shadow bg-card p-1",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 overflow-auto"
            )}
          >
            {filteredData.map((item) => (
              <ComboboxOption
                key={item?.id}
                value={item}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <div
                  className={`rounded-md flex justify-start items-center gap-2 ${
                    status === "user" ? "p-2" : "py-2 px-4"
                  } text-text-primary`}
                >
                  {status === "user" && (
                    <img
                      src={item?.profile_photo ? item?.profile_photo : photoUrl}
                      alt="logo"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  {status === "user" ? item?.email : item?.role}
                </div>
                <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              </ComboboxOption>
            ))}
          </ComboboxOptions>
      </Combobox>
    </div>
  );
}
