import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
]

export default function SelectListBox() {
  const [selected, setSelected] = useState(people[1])

  return (
    <div className="h-full z-[999]">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            'relative block w-full rounded-lg bg-card py-1.5 pr-8 pl-3 text-left clamp4 text-thin border-[1px] border-border',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        >
          {selected.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ListboxOptions
            anchor="bottom"
            className="w-[200px] rounded-xl shadow-custom border-[1px] border-border bg-card p-1 mt-1 focus:outline-none z-[1000]"
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
  )
}
