export const PASSING_TIME_SECONDS = 20 * 60
export const BEST_RESULT_KEY = 'psychology-test-best-result'
export const THEME_KEY = 'psychology-test-theme'

export function calculateResult(questions, answers) {
  const mistakes = questions.filter((question) => answers[question.id] !== question.correctAnswer)
  const correctCount = questions.length - mistakes.length
  const errorCount = mistakes.length
  const percent = Math.round((correctCount / questions.length) * 100)

  return {
    correctCount,
    errorCount,
    percent,
    grade: getGrade(percent),
    mistakes,
  }
}

export function getGrade(percent) {
  if (percent >= 90) return 'Отлично'
  if (percent >= 75) return 'Хорошо'
  if (percent >= 50) return 'Удовлетворительно'
  return 'Неудовлетворительно'
}

export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
