import React, { useState } from "react";
import "./App.css";
import { Header } from "./containers/headerComponent/Header";

function App() {
    const [subreddit, setSubreddit] = useState("");

    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
        </div>
    );
}

export default App;
