import { motion } from 'framer-motion'

const optionLetters = ['A', 'B', 'C', 'D']

export function ResultScreen({ result, answers, isTimeExpired, isBestResult, onRestart }) {
  return (
    <motion.section
      className="results card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
    >
      <div className="results__header">
        <p className="pill">{isTimeExpired ? 'Время истекло' : 'Тест завершён'}</p>
        <h2>{result.grade}</h2>
        <p>
          Вы ответили правильно на {result.correctCount} из {result.correctCount + result.errorCount} вопросов.
          {isBestResult && ' Это новый лучший результат!'}
        </p>
      </div>

      <div className="score-grid">
        <ScoreCard label="Правильных ответов" value={result.correctCount} />
        <ScoreCard label="Ошибок" value={result.errorCount} />
        <ScoreCard label="Успешность" value={`${result.percent}%`} />
        <ScoreCard label="Итоговая оценка" value={result.grade} />
      </div>

      <div className="mistakes">
        <h3>Разбор ошибок</h3>
        {result.mistakes.length === 0 ? (
          <p className="empty-state">Ошибок нет — отличный результат!</p>
        ) : (
          <div className="mistakes__list">
            {result.mistakes.map((question) => {
              const selectedAnswer = answers[question.id]
              return (
                <article className="mistake" key={question.id}>
                  <h4>{question.id}. {question.text}</h4>
                  <p>
                    <span>Ваш ответ: </span>
                    <strong>{selectedAnswer === undefined ? 'Нет ответа' : `${optionLetters[selectedAnswer]}) ${question.options[selectedAnswer]}`}</strong>
                  </p>
                  <p>
                    <span>Правильный ответ: </span>
                    <strong className="correct-answer">
                      {optionLetters[question.correctAnswer]}) {question.options[question.correctAnswer]}
                    </strong>
                  </p>
                </article>
              )
            })}
          </div>
        )}
      </div>

      <button className="primary-button" type="button" onClick={onRestart}>Пройти заново</button>
    </motion.section>
  )
}

function ScoreCard({ label, value }) {
  return (
    <div className="score-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
