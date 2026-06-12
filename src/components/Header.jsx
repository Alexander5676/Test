import { motion } from 'framer-motion'

export function Header({ theme, onToggleTheme, bestResult }) {
  return (
    <header className="app-header">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="brand">
        <span className="brand__icon" aria-hidden="true">Ψ</span>
        <div>
          <p className="eyebrow">Подготовка к поступлению</p>
          <h1>Тест по психологии</h1>
        </div>
      </motion.div>

      <div className="header-actions">
        <div className="best-result" title="Лучший результат сохраняется в браузере">
          <span>Лучший результат</span>
          <strong>{bestResult ? `${bestResult.percent}% · ${bestResult.correctCount}/20` : '—'}</strong>
        </div>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="Переключить тему">
          {theme === 'dark' ? '☀️ Светлая' : '🌙 Тёмная'}
        </button>
      </div>
    </header>
  )
}
