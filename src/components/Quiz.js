import React,{useState, useEffect} from "react";
import Question from "./Question";
import {nanoid} from "nanoid";
import Confetti from "react-confetti"

export default function Quiz(props) {
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [questions, setQuestions] = useState([])
    const [marks, setMarks] = useState()
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [optionArray, setOptionArray] = useState([])

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


    function answerSelector(event) {
        const name = event.target.name
        const value = event.target.value

        event.target.style.backgroundColor = "#4d5bff"
        setSelectedAnswers((prevSelectAnswers)=>{
            let found = false
            if(prevSelectAnswers.length>0){
                for(let i = 0; i < prevSelectAnswers.length; ++i){
                    if(prevSelectAnswers[i].question === name){
                        prevSelectAnswers[i].answer = value
                        found = true
                        break
                    }
                }
                if(!found){
                    return [
                        ...prevSelectAnswers,
                        {
                            question: name,
                            answer: value
                        }
                    ]
                }
                return prevSelectAnswers
            }
            else {
                return [
                    {
                        question: name,
                        answer: value
                    }
                ]
            }
        })
    }

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setOptionArray(data.results.map((question)=>{
                    let option = question.incorrect_answers
                    option.push(question.correct_answer)
                    let set = [...new Set(option)]
                    option = shuffle(set)
                    return option.map((option,index)=>{
                        let buttonId = nanoid()
                        return <button 
                                    num={buttonId} 
                                    key={nanoid()} 
                                    id={index} 
                                    name={question.question} 
                                    value={option} 
                                    dangerouslySetInnerHTML={{__html:  option}} 
                                    onClick={answerSelector}
                                    />
                    })
                }))
            })

    },[])
    
    const QuestionsToDisplay = questions.map((question,index)=>(
        <Question
            question={question.question}
            optionArray={optionArray}
            id={index}
            key={nanoid()}
        /> 
    ))

    function answer() {
        setCheckAnswers((previousCheckAnswers)=>(!previousCheckAnswers))
        setMarks(()=>{
            let marks = 0
            for(let i = 0; i < questions.length; i++){
                for(let j = 0; j < selectedAnswers.length; j++){
                    if(questions[i].question === selectedAnswers[j].question){
                        if(questions[i].correct_answer === selectedAnswers[j].answer){
                            marks += 1
                        }
                    }
                }
            }
            return marks
        })
    }

    return (
        <div className="Quiz">
        {marks === 5 ? <Confetti/> : ''}
            <div className="Quiz--questions">
                {QuestionsToDisplay}
            </div>
            {!checkAnswers && <button onClick={answer}>Check Answers</button>}
            { checkAnswers && <div className="bottom">You got {marks}/5 answers correct. <button onClick={props.handleClick}>Play Again</button></div>}
        </div>
    )
}