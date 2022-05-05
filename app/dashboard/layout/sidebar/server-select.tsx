import {
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import Select from "~components/popover";

const options = [
  {
    id: "376323430175473664",
    logo: "https://cdn.discordapp.com/icons/376323430175473664/f94473ee49e0b7b217f737b7a8c2005d.jpg",
    name: "Nam và những người bạn",
  },
  {
    id: "376323430175473663",
    name: "lmao",
    logo: "",
  },
];

export const ServerSelect = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Select
      value={selected}
      className="w-full rounded"
      onChange={(value) => setSelected(value)}
      content={(selected) => (
        <div className="flex items-center w-full gap-2 px-6 py-4 bg-white rounded shadow-xl shadow-gray-200">
          {!selected && <span className="font-medium">Select server</span>}
          {selected && (
            <Fragment>
              {selected.logo ? (
                <img
                  src={selected.logo}
                  alt={selected.name}
                  className="block w-6 h-6 rounded-full"
                />
              ) : (
                <QuestionMarkCircleIcon className="w-6 text-gray-300" />
              )}
              <span className="flex-1 font-medium text-left truncate">
                {selected.name}
              </span>
              <ChevronDownIcon className="w-4 ml-auto text-gray-400" />
            </Fragment>
          )}
        </div>
      )}
    >
      <div className="w-full p-1 mt-4 bg-white rounded shadow-xl shadow-gray-200">
        {options.map((option, key) => (
          <Select.Option
            value={option}
            key={key}
            className={(active) =>
              [
                "flex items-center w-full gap-2 px-5 py-3 cursor-pointer hover:bg-gray-100 mb-1",
                active || option.id === selected.id
                  ? "bg-gray-100"
                  : "bg-white",
              ].join(" ")
            }
            tabIndex={0}
          >
            {option.logo ? (
              <img
                src={option.logo}
                alt={option.name}
                className="block w-6 h-6 rounded-full"
              />
            ) : (
              <QuestionMarkCircleIcon className="w-6 text-gray-300" />
            )}
            <span className="flex-1 font-medium text-left truncate">
              {option.name}
            </span>
          </Select.Option>
        ))}
        <div className="mx-4 mb-1 border-b border-gray-100" />
        <div
          className="flex items-center w-full gap-2 px-5 py-3 cursor-pointer hover:bg-gray-100"
          tabIndex={0}
        >
          <PlusCircleIcon className="w-6 text-gray-400" />
          <span className="flex-1 font-medium text-left truncate">
            Add new server
          </span>
        </div>
      </div>
    </Select>
  );
};
