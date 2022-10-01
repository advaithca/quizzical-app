import React,{useState, useEffect} from "react";
import Question from "./Question";
import {nanoid} from "nanoid";

export default function Quiz(props) {
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [questions, setQuestions] = useState([])
    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    },[])

    const QuestionsToDisplay = questions.map((question)=>(
        <Question
            question={question.question}
            answer={question.correct_answer}
            incorrects={question.incorrect_answers}
            key={nanoid()}
            id={nanoid()}
        /> 
    ))

    function answer() {
        setCheckAnswers((previousCheckAnswers)=>(!previousCheckAnswers))
    }
    return (
        <div className="Quiz">
            <div className="Quiz--questions">
                {QuestionsToDisplay}
            </div>
            {!checkAnswers && <button onClick={answer}>Check Answers</button>}
            { checkAnswers && <div className="bottom">You got {2}/5 answers correct. <button onClick={props.handleClick}>Play Again</button></div>}
        </div>
    )
}