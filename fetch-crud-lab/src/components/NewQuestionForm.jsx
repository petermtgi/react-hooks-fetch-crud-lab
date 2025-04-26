import React, { useState } from 'react';

function NewQuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex),
    };
    onAddQuestion(newQuestion);

    // Clear the form
    setPrompt('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
  }

  function handleAnswerChange(index, value) {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  return (
    <section>
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </label>
        {answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
            />
          </label>
        ))}
        <label>
          Correct Answer Index:
          <input
            type="number"
            min="0"
            max="3"
            value={correctIndex}
            onChange={(e) => setCorrectIndex(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default NewQuestionForm;
