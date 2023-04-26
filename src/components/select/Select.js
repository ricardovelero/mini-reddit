import React, { useEffect, useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const Select = () => {
    const [subreddits, setSubreddits] = useState([]);
    const [selected, setSelected] = useState(subreddits[0]);
    const [query, setQuery] = useState("");

    async function getSubreddits() {
        const response = await fetch("https://www.reddit.com/subreddits.json");
        const json = await response.json();
        console.log(json);
        return json.data.children.map((subreddit) => subreddit.data);
    }

    useEffect(() => {
        getSubreddits().then((data) => setSubreddits(data));
    }, []);

    const filteredSubreddits =
        query === ""
            ? subreddits
            : subreddits.filter((subreddit) =>
                  subreddit.title
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="ml-7 mb-7 z-10">
            <Combobox value={selected} onChange={setSelected}>
                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Select Subreddit:
                </Combobox.Label>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(subreddit) => subreddit.title}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}>
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredSubreddits.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredSubreddits.map((subreddit) => (
                                    <Combobox.Option
                                        key={subreddit.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={subreddit}>
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <img
                                                        src={
                                                            subreddit.icon_img ||
                                                            `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                                                        }
                                                        alt=""
                                                        className="h-6 w-6 flex-shrink-0 rounded-full"
                                                        style={{
                                                            border: `3px solid ${subreddit.primary_color}`,
                                                        }}
                                                    />
                                                    <span
                                                        className={classNames(
                                                            "ml-3 truncate",
                                                            selected &&
                                                                "font-semibold"
                                                        )}>
                                                        {subreddit.title}
                                                    </span>
                                                </div>
                                                {selected && (
                                                    <span
                                                        className={`absolute inset-y-0 right-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-indigo-600"
                                                        }`}>
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};
