import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { QuestionCard } from './QuestionCard'
import { Timer } from './Timer'

export function Quiz({
  questions,
  currentQuestionIndex,
  answers,
  secondsLeft,
  onSelectAnswer,
  onNextQuestion,
  onFinish,
}) {
  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    if (secondsLeft <= 0) onFinish('time')
  }, [secondsLeft, onFinish])

  return (
    <motion.section className="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="quiz__topline">
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        <Timer secondsLeft={secondsLeft} />
      </div>
      <AnimatePresence mode="wait">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onSelectAnswer={(answerIndex) => onSelectAnswer(currentQuestion, answerIndex)}
          onNext={onNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </AnimatePresence>
    </motion.section>
  )
}
