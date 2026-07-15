import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const WORK_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60  // 5 minutes in seconds

export const usePomodoroStore = defineStore('pomodoro', () => {
  const timeLeft = ref(WORK_TIME)
  const isRunning = ref(false)
  const isBreakMode = ref(false)
  let timerId = null

  const currentModeTime = computed(() => {
    return isBreakMode.value ? BREAK_TIME : WORK_TIME
  })

  const progress = computed(() => {
    return ((currentModeTime.value - timeLeft.value) / currentModeTime.value) * 100
  })

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const playBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      const audioCtx = new AudioContextClass()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15) // E5

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6)

      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.6)

      setTimeout(() => {
        audioCtx.close()
      }, 1000)
    } catch (err) {
      console.warn('Audio Context not allowed or supported yet:', err)
    }
  }

  const harvestedCount = ref(parseInt(localStorage.getItem('pomodoro_harvested_count') || '0', 10))

  const startTimer = () => {
    if (isRunning.value) return
    isRunning.value = true
    timerId = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        playBeep()
        switchMode()
      }
    }, 1000)
  }

  const pauseTimer = () => {
    isRunning.value = false
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
  }

  const resetTimer = () => {
    pauseTimer()
    timeLeft.value = isBreakMode.value ? BREAK_TIME : WORK_TIME
  }

  const switchMode = () => {
    if (!isBreakMode.value && timeLeft.value === 0) {
      harvestedCount.value++
      localStorage.setItem('pomodoro_harvested_count', harvestedCount.value.toString())
    }
    pauseTimer()
    isBreakMode.value = !isBreakMode.value
    timeLeft.value = isBreakMode.value ? BREAK_TIME : WORK_TIME
    startTimer()
  }

  const stopStoreTimer = () => {
    pauseTimer()
  }

  return {
    timeLeft,
    isRunning,
    isBreakMode,
    progress,
    formattedTime,
    harvestedCount,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    stopStoreTimer,
    WORK_TIME,
    BREAK_TIME,
    currentModeTime
  }
})
