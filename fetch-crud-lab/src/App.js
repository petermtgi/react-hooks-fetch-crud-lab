import React, { useState, useEffect } from 'react';
import QuestionList from './components/QuestionList';
import NewQuestionForm from './components/NewQuestionForm';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions on mount
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);

  // Add new question
  function addQuestion(newQuestion) {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((addedQuestion) => {
        setQuestions([...questions, addedQuestion]);
      })
      .catch((err) => console.error('Error adding question:', err));
  }

  // Delete question
  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
      })
      .catch((err) => console.error('Error deleting question:', err));
  }

  // Update question correctIndex
  function updateQuestion(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedList = questions.map((q) =>
          q.id === id ? updatedQuestion : q
        );
        setQuestions(updatedList);
      })
      .catch((err) => console.error('Error updating question:', err));
  }

  return (
    <div className="App">
      <h1>Quiz Master Admin Panel</h1>
      <NewQuestionForm onAddQuestion={addQuestion} />
      <QuestionList
        questions={questions}
        onDelete={deleteQuestion}
        onUpdate={updateQuestion}
      />
    </div>
  );
}

export default App;
