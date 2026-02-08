function QuestionUI({ question, onAnswer }) {
  return (
    <div className="quiz-content">
      <h2 className="question-text">{question.text}</h2>
      <div className="options-list">
        {question.options.map((option) => (
          <button key={option} onClick={() => onAnswer(option)}>
            {option} <span>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default QuestionUI;