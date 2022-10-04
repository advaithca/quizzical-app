import React from "react";

export default function Question(props) {
    let optionsToDisplay = []
    for (let i = 0; i < props.optionArray.length; i++){
        if(i === props.id){
            optionsToDisplay.push(props.optionArray[i])
        }
    }
    return (
        <div className="Question">
            <div className="question" dangerouslySetInnerHTML={{__html:  props.question}}/>
            <div className="options" >
                {optionsToDisplay}
            </div>
            <hr/>
        </div>
    )
}