import { formatTime } from '../utils/results'

export function Timer({ secondsLeft }) {
  const isCritical = secondsLeft <= 60

  return (
    <div className={`timer ${isCritical ? 'timer--critical' : ''}`} role="timer" aria-live="polite">
      <span>⏱</span>
      <strong>{formatTime(secondsLeft)}</strong>
    </div>
  )
}
