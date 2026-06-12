import { motion } from 'framer-motion'

export function StartScreen({ onStart }) {
  return (
    <motion.section
      className="hero card"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
    >
      <div className="hero__content">
        <p className="pill">20 вопросов · 20 минут · один правильный ответ</p>
        <h2>Проверьте готовность к вступительным испытаниям</h2>
        <p>
          Тест охватывает базовые понятия психологии: психику, личность, темперамент,
          познавательные процессы, эмоции и волю. После прохождения вы увидите оценку и
          разбор ошибок.
        </p>
        <button className="primary-button" type="button" onClick={onStart}>
          Начать тест
        </button>
      </div>
      <div className="hero__visual" aria-hidden="true">
        <div className="orb orb--large" />
        <div className="orb orb--small" />
        <span>🧠</span>
      </div>
    </motion.section>
  )
}
