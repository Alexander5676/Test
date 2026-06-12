let audioContext

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) return null
  if (!audioContext) audioContext = new AudioContext()

  return audioContext
}

export function playAnswerSound(isCorrect) {
  const context = getAudioContext()
  if (!context) return

  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = isCorrect ? 'sine' : 'triangle'
  oscillator.frequency.setValueAtTime(isCorrect ? 720 : 180, context.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(isCorrect ? 980 : 90, context.currentTime + 0.16)

  gain.gain.setValueAtTime(0.001, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.22)

  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start()
  oscillator.stop(context.currentTime + 0.24)
}
