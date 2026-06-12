import { motion } from 'framer-motion'

const optionLetters = ['A', 'B', 'C', 'D']

export function QuestionCard({ question, selectedAnswer, onSelectAnswer, onNext, isLastQuestion }) {
  return (
    <motion.article
      key={question.id}
      className="question-card card"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <h2>{question.text}</h2>
      <div className="answers" role="radiogroup" aria-label={question.text}>
        {question.options.map((option, index) => (
          <button
            className={`answer ${selectedAnswer === index ? 'answer--selected' : ''}`}
            key={option}
            type="button"
            onClick={() => onSelectAnswer(index)}
            role="radio"
            aria-checked={selectedAnswer === index}
          >
            <span className="answer__letter">{optionLetters[index]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>
      <div className="question-card__footer">
        <p>{selectedAnswer === undefined ? 'Выберите вариант ответа, чтобы продолжить.' : 'Ответ сохранён.'}</p>
        <button className="primary-button" type="button" onClick={onNext} disabled={selectedAnswer === undefined}>
          {isLastQuestion ? 'Завершить тест' : 'Следующий вопрос'}
        </button>
      </div>
    </motion.article>
  )
}
