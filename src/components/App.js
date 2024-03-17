import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const url = 'http://localhost:4000/questions'

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  
console.log(questions)

  useEffect(() => {
    fetch(url)
    .then(res => {
      if (res.ok){
        return res.json()
      }else{
        return console.error("Something went wrong...")
      }
    })
    .then(questionData => {
      setQuestions(questionData)
    })
  }, [])

  const addNewQuestion = (newQuestionData) => {
    setQuestions([...questions, newQuestionData])
  }

  const handleDeleteItem = (deletedQuestion) => {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }
  
  const handleUpdateQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      }else{
        return question;
      }
    })
    setQuestions(updatedQuestions)
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} addNewQuestion={addNewQuestion}/> : <QuestionList questions={questions} handleDeleteItem={handleDeleteItem} handleUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
