import React, { useState } from "react";

/**
 * Props:
 *   questions: [
 *     { id, topicId, questionText, options, correctAnswer }
 *   ]
 */
export default function Quiz({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // We'll store the user's answers in an array of objects:
  // e.g., { questionId: 'q1', selectedOption: 'LR', isCorrect: true }
  const [answers, setAnswers] = useState([]);

  const question = questions[currentIndex];

  function handleAnswer(option) {
    // Evaluate correctness
    const isCorrect = option === question.correctAnswer;

    // Add to our array of answers
    const newAnswer = {
      questionId: question.id,
      questionText: question.questionText,
      correctAnswer: question.correctAnswer,
      selectedOption: option,
      isCorrect: isCorrect,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    // If we're at the last question, show final results
    if (currentIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      // Otherwise, go to the next question
      setCurrentIndex((prev) => prev + 1);
    }
  }

  if (!question) return null; // safety check

  // If user has finished
  if (showResult) {
    // We'll compute how many correct
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const totalCount = answers.length;

    return (
      <div className="quiz-container">
        <h2>Quiz Complete!</h2>
        <p>
          Your Score: {correctCount} / {totalCount}
        </p>

        <h3>Review Your Answers:</h3>
        <ul>
          {answers.map((ans, index) => (
            <li
              key={ans.questionId}
              style={{
                marginBottom: "0.75rem",
                borderLeft: ans.isCorrect ? "4px solid green" : "4px solid red",
                paddingLeft: "0.5rem",
              }}
            >
              <strong>Q{index + 1}:</strong> {ans.questionText}
              <br />
              <em>Your Answer:</em> {ans.selectedOption}{" "}
              {!ans.isCorrect && (
                <span>
                  (<em>Correct: {ans.correctAnswer}</em>)
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Otherwise, we are mid-quiz
  return (
    <div className="quiz-container">
      <h2>Quick Quiz</h2>
      <p>{question.questionText}</p>
      <ul>
        {question.options.map((opt) => (
          <li key={opt} onClick={() => handleAnswer(opt)}>
            {opt}
          </li>
        ))}
      </ul>
      <p>
        Progress: {currentIndex + 1} / {questions.length}
      </p>
    </div>
  );
}
