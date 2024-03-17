import React from "react";

function QuestionItem({ question, handleDeleteItem, handleUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then(res => {
      if(res.ok){
        return (res.json())
      }else{
        return console.error("Something went wrong with your DELETE")
      }
    })
    .then(() => handleDeleteItem(question))
  }

  const handleUpdateCorrectIndex = (e) => {
    const newIndex = parseInt(e.target.value)
    
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": newIndex
      })
    })
    .then(res => {
      if(res.ok){
        return (res.json())
      }else{
        return console.error("Something went wrong with your PATCH...")
      }
    })
    .then(updatedQuestion => handleUpdateQuestion(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateCorrectIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
