import React from "react"
import spinner from "./5.gif";

export default () => {
    return (
        <div>
            <img src={spinner} alt="Loading..."
            style={{ width: '200px', margin: "auto", display: "block"}} />
        </div>
    );
};