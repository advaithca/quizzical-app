import './App.css';
import Main from './components/Main';
import React, {useState, useEffect} from 'react';
import Quiz from './components/Quiz'

function App() {
  const [showQuiz, setShowQuiz] = useState(false)

  function toggleQuiz() {
    setShowQuiz(prevShowQuiz=>!prevShowQuiz)
  }

  return (
    <div className="App">
      {!showQuiz && <Main handleClick={toggleQuiz}/>}
      {showQuiz && <Quiz handleClick={toggleQuiz}/>}
    </div>
  );
}

export default App;
