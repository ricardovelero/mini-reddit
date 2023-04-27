import React, { useEffect, useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Title } from "../../components/title/Title";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const Header = ({ setSubreddit }) => {
    const [subreddits, setSubreddits] = useState([]);
    const [selected, setSelected] = useState(subreddits[0]);
    const [query, setQuery] = useState("");

    async function getSubreddits() {
        const response = await fetch("https://www.reddit.com/subreddits.json");
        const json = await response.json();
        // console.log(json.data.children.map((subreddit) => subreddit.data));
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

    const handleChange = (selected) => {
        setSelected();
        setSubreddit(selected.display_name);
    };

    return (
        <div className="flex items-center justify-between">
            <Title />
            <div className="ml-7 mb-7">
                <Combobox value={selected} onChange={handleChange}>
                    <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Select Subreddit:
                    </Combobox.Label>
                    <div className="relative mt-1">
                        <Combobox.Input
                            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            displayValue={(subreddit) => subreddit?.title}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}>
                            <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredSubreddits.length === 0 &&
                                query !== "" ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredSubreddits.map((subreddit) => (
                                        <Combobox.Option
                                            key={subreddit.id}
                                            className={({ active }) =>
                                                classNames(
                                                    "relative cursor-default select-none py-2 pl-3 pr-9",
                                                    active
                                                        ? "bg-indigo-600 text-white"
                                                        : "text-gray-900"
                                                )
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
        </div>
    );
};
