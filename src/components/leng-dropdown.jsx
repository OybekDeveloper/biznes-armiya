import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from "@headlessui/react";
  import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
  import clsx from "clsx";
  import { useState, useEffect } from "react";
  import { useTranslation } from "react-i18next";
  
  const languages = [
    { id: "uz", name: "Uzb" },
    { id: "en", name: "Eng" },
    { id: "ru", name: "Rus" },
  ];
  
  export default function LengDropdown() {
    const { i18n } = useTranslation();
    const [selected, setSelected] = useState(languages[1]);
  
    // UseEffect to load saved language from localStorage on initial render
    useEffect(() => {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        const selectedLanguage = languages.find(
          (lang) => lang.id === savedLanguage
        );
        if (selectedLanguage) {
          setSelected(selectedLanguage);
          i18n.changeLanguage(savedLanguage);
        }
      }
    }, [i18n]);
  
    // Change language function
    const changeLanguage = (language) => {
      setSelected(language);
      i18n.changeLanguage(language.id);
      localStorage.setItem("language", language.id); // Save selected language
    };
  
    return (
      <div className="">
        <Listbox value={selected} onChange={changeLanguage}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-card py-1.5 pr-8 pl-3 text-left text-sm/6 text-text-primary",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 shadow-btn_shadow"
            )}
          >
            {selected.name}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-text-primary"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "z-[999] shadow-btn_shadow w-[var(--button-width)] rounded-md mt-1 border border-white bg-card p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {languages.map((language) => (
              <ListboxOption
                key={language.id}
                value={language}
                className="group flex cursor-default items-center gap-2 rounded-lg  select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-text-primary group-data-[selected]:visible" />
                <div className="text-sm/6 text-text-primary">{language.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    );
  }
  