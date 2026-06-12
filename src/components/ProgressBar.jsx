export function ProgressBar({ current, total }) {
  const progress = Math.round((current / total) * 100)

  return (
    <div className="progress" aria-label={`Вопрос ${current} из ${total}`}>
      <div className="progress__meta">
        <span>Вопрос {current} из {total}</span>
        <strong>{progress}%</strong>
      </div>
      <div className="progress__track">
        <div className="progress__bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
