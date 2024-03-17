import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDeleteItem, handleUpdateQuestion}) {

  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => {
          return <QuestionItem key={question.id} question={question} handleDeleteItem={handleDeleteItem} handleUpdateQuestion={handleUpdateQuestion}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
