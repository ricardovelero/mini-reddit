import React, { useEffect, useState } from "react";

export const Reddits = ({ subreddit }) => {
    const [posts, setPosts] = useState([]);

    async function getSubredditPosts(subreddit) {
        const response = await fetch(
            `https://www.reddit.com/r/${subreddit}.json`
        );
        const json = await response.json();
        return json;
    }

    useEffect(() => {
        getSubredditPosts(subreddit).then((data) =>
            setPosts(data.data.children)
        );
    }, [subreddit]);

    return (
        <div className="bg-white px-4 pt-2 pb-12 sm:px-6 lg:px-8 rounded-lg ring-1 ring-slate-900/10">
            <h2 className="mt-6 text-xl leading-8 text-gray-700">
                Latest Posts for{" "}
                <span className="text-yellow-500">{subreddit}</span> subreddit:
            </h2>
            <ul className="divide-y divide-gray-100">
                {posts.map((post) => (
                    <li
                        key={post.data.id}
                        className="relative flex justify-between py-5">
                        <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                            {/* <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src={post.data.thumbnail}
                            alt="Subreddit thumbnail"
                        /> */}
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a
                                        href={`https://www.reddit.com${post.data.permalink}`}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {post.data.title}
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    {post.data.author}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
