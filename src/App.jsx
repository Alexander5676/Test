import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Quiz } from './components/Quiz'
import { ResultScreen } from './components/ResultScreen'
import { StartScreen } from './components/StartScreen'
import { questions } from './data/questions'
import { playAnswerSound } from './utils/sound'
import { BEST_RESULT_KEY, PASSING_TIME_SECONDS, THEME_KEY, calculateResult } from './utils/results'
import './styles.css'

const screens = {
  start: 'start',
  quiz: 'quiz',
  results: 'results',
}

function loadJson(key) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme) return savedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [screen, setScreen] = useState(screens.start)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [secondsLeft, setSecondsLeft] = useState(PASSING_TIME_SECONDS)
  const [isTimeExpired, setIsTimeExpired] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)
  const [bestResult, setBestResult] = useState(() => loadJson(BEST_RESULT_KEY))
  const [lastResultWasBest, setLastResultWasBest] = useState(false)

  const result = useMemo(() => calculateResult(questions, answers), [answers])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (screen !== screens.quiz) return undefined

    const intervalId = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [screen])

  const startTest = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setSecondsLeft(PASSING_TIME_SECONDS)
    setIsTimeExpired(false)
    setLastResultWasBest(false)
    setScreen(screens.quiz)
  }

  const finishTest = useCallback((reason = 'manual') => {
    setIsTimeExpired(reason === 'time')
    setScreen(screens.results)
  }, [])

  const selectAnswer = (question, answerIndex) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [question.id]: answerIndex }))
    playAnswerSound(answerIndex === question.correctAnswer)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      finishTest()
      return
    }

    setCurrentQuestionIndex((index) => index + 1)
  }

  const toggleTheme = () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    if (screen !== screens.results) return

    const completedResult = {
      correctCount: result.correctCount,
      errorCount: result.errorCount,
      percent: result.percent,
      grade: result.grade,
      finishedAt: new Date().toISOString(),
    }

    setBestResult((currentBestResult) => {
      if (!currentBestResult || completedResult.percent > currentBestResult.percent) {
        localStorage.setItem(BEST_RESULT_KEY, JSON.stringify(completedResult))
        setLastResultWasBest(true)
        return completedResult
      }

      setLastResultWasBest(false)
      return currentBestResult
    })
  }, [screen])

  return (
    <div className="app-shell">
      <Header theme={theme} onToggleTheme={toggleTheme} bestResult={bestResult} />
      <main>
        <AnimatePresence mode="wait">
          {screen === screens.start && <StartScreen key="start" onStart={startTest} />}
          {screen === screens.quiz && (
            <Quiz
              key="quiz"
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              secondsLeft={secondsLeft}
              onSelectAnswer={selectAnswer}
              onNextQuestion={nextQuestion}
              onFinish={finishTest}
            />
          )}
          {screen === screens.results && (
            <ResultScreen
              key="results"
              result={result}
              answers={answers}
              isTimeExpired={isTimeExpired}
              isBestResult={lastResultWasBest}
              onRestart={startTest}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
