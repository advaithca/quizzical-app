import React, { useEffect, useState } from "react";
import {nanoid} from "nanoid";

export default function Question(props) {
    const [optionArray, setOptionArray] = useState([])
    const [selectAnswers, setSelectAnswers] = useState([])
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
    
    useEffect(()=>{
        let option = props.incorrects
        option.push(props.answer)
        let set = [...new Set(option)]
        option = shuffle(set)
        setOptionArray(option.map((option)=>(
            <button key={nanoid()} name={props.id} value={option} dangerouslySetInnerHTML={{__html:  option}} onClick={answerSelector}/>
        )))
    },[])

    function answerSelector(event) {
        const name = event.target.name
        const value = event.target.value
        console.log(name,value)
        setSelectAnswers((prevSelectAnswers)=>(
            [
                ...prevSelectAnswers,
                {
                    [name]:name,
                    [value]:value
                }
            ]
        ))

        console.log(selectAnswers)
      }
      
    return (
        <div className="Question">
            <div className="question" dangerouslySetInnerHTML={{__html:  props.question}}/>
            <div className="options" >
                {optionArray}
            </div>
            <hr/>
        </div>
    )
}