import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers/headerComponent/Header";
import { Reddits } from "./containers/redditsComponent/Reddits";

function App() {
    const [subreddit, setSubreddit] = useState("pics");

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <Header subreddit={subreddit} setSubreddit={setSubreddit} />
                <Reddits subreddit={subreddit} />
            </div>
        </div>
    );
}

export default App;
