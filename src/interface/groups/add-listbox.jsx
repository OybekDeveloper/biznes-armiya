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
  
  export default function AddListbox({ data, handleChange, index, newUsers }) {
    const [selected, setSelected] = useState(null); // Initialize with null
    const [query, setQuery] = useState("");
  
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
    if (newUsers) {
      console.log(newUsers);
    }
    const filteredPeople =
      query === ""
        ? data
        : data.filter((person) => {
            if (index !== null) {
              return person?.email.toLowerCase().includes(query.toLowerCase());
            } else if (index === null) {
              return person?.name.toLowerCase().includes(query.toLowerCase());
            }
          });
  
    return (
      <div className="z-[100]">
        <Combobox   
          value={selected}
          onChange={(value) => setSelected(value)}
          onClose={() => setQuery("")}
        >
          <div className="relative">
            <ComboboxInput
              className={clsx(
                "rounded-lg border-[1.5px] border-border bg-card py-[12px] pr-8 pl-3",
                "focus:outline-none focus:border-primary"
              )}
              displayValue={(person) => {
                if (index !== null) {
                  return person?.email;
                } else if (index === null) {
                  return person?.name;
                }
              }}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className="size-4" />
            </ComboboxButton>
          </div>
  
          <ComboboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "z-[1000] w-[var(--input-width)]  rounded-xl border border-border mt-2 shadow-btn_shadow bg-card p-1  empty:invisible",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filteredPeople.map((person) => {
              if (newUsers) {
                if (newUsers.find((c) => c.user === person.id)) return null;
              }
              return (
                <ComboboxOption
                  key={person?.id}
                  value={person}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <div
                    className={`${
                      index === null
                        ? person?.name === "Asked"
                          ? "bg-yellow-500 text-white py-2 px-4"
                          : person?.name === "Expected py-2 px-4"
                          ? "bg-blue-500 text-white py-2 px-4"
                          : "bg-green-500 text-white py-2 px-4"
                        : "p-2"
                    } rounded-md flex justify-start items-center gap-2`}
                  >
                    {index !== null && (
                      <img
                        src={
                          person?.profile_photo ? person?.profile_photo : photoUrl
                        }
                        alt="logo"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    {index !== null ? person?.email : person?.name}
                  </div>
                  <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                </ComboboxOption>
              );
            })}
          </ComboboxOptions>
        </Combobox>
      </div>
    );
  }
  