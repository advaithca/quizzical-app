import React from "react";
import {nanoid} from "nanoid";

export default function Question(props) {
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

    let options = props.incorrects
    options.push(props.answer)
    options = shuffle(options)
    const opts = options.map((option)=>(
        <button key={nanoid()} value={option}>{option}</button>
    ))
    return (
        <div className="Question">
            <div className="question" dangerouslySetInnerHTML={{__html:  props.question}}/>
            <div className="options">
                {opts}
            </div>
            <hr/>
        </div>
    )
}