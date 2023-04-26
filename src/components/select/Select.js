import React, { useEffect, useState } from "react";

export const Select = () => {
    const [subreddits, setSubreddits] = useState([]);

    async function getSubreddits() {
        const response = await fetch("https://www.reddit.com/subreddits.json");
        const json = await response.json();
        return json.data.children.map((subreddit) => subreddit.data);
    }

    useEffect(() => {
        getSubreddits().then((data) => setSubreddits(data));
    }, []);
    return (
        <div className="ml-7 mb-7">
            <p>A select comp</p>
        </div>
    );
};
