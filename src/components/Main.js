import React from "react";

export default function Main(props) {
    return (
        <div className="Main">
            <h1>Quizzical</h1>
            <p>5 questions. Can you answer them?</p>
            <button onClick={props.handleClick}>Start Quiz</button>
        </div>
    )
}