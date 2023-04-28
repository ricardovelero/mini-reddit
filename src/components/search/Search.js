import React, { useState, useEffect } from "react";

export default function Search({ posts, setPosts }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleOnChange(e) {
        setSearchTerm(e.target.value);
        if (e.target.value !== "") {
            let results = posts.filter((post) =>
                post.data.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setPosts(results);
        }
    }
    useEffect(() => {
        setSearchTerm(searchTerm);
    }, [searchTerm]);

    return (
        <div>
            <label
                htmlFor="search"
                className="block text-sm font-medium leading-6 text-gray-900">
                Search in Posts
            </label>
            <div className="relative mt-2 flex items-center">
                <input
                    value={searchTerm}
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleOnChange}
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5"></div>
            </div>
        </div>
    );
}
