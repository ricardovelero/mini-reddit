import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers/headerComponent/Header";
import { Reddits } from "./containers/redditsComponent/Reddits";

function App() {
    const [subreddit, setSubreddit] = useState("");

    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            <Reddits />
        </div>
    );
}

export default App;
