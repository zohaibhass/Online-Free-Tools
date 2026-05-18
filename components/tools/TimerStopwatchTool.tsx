'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

export function TimerStopwatchTool() {
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('stopwatch')
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [timerDuration, setTimerDuration] = useState(60)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (running) {
      interval = setInterval(() => {
        setTime(t => {
          if (mode === 'timer' && t <= 0) {
            setRunning(false)
            return 0
          }
          return mode === 'timer' ? t - 1 : t + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [running, mode])

  const startStop = () => setRunning(!running)
  const reset = () => {
    setRunning(false)
    setTime(mode === 'timer' ? timerDuration : 0)
  }

  const startTimer = () => {
    setMode('timer')
    setTime(timerDuration)
    setRunning(true)
  }

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button variant={mode === 'stopwatch' ? 'default' : 'outline'} onClick={() => { setMode('stopwatch'); setRunning(false); setTime(0) }}>Stopwatch</Button>
        <Button variant={mode === 'timer' ? 'default' : 'outline'} onClick={() => setMode('timer')}>Timer</Button>
      </div>

      {mode === 'timer' && !running && (
        <div>
          <label className="block text-sm font-medium mb-2">Seconds: {timerDuration}</label>
          <input type="range" min="1" max="3600" value={timerDuration} onChange={(e) => setTimerDuration(Number(e.target.value))} className="w-full" />
        </div>
      )}

      <div className="text-6xl font-bold text-center font-mono">
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex gap-3">
        <Button onClick={startStop} className="flex-1 gap-2">
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={reset} variant="outline" className="flex-1 gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {mode === 'timer' && !running && <Button onClick={startTimer} className="w-full">Start Timer</Button>}
    </div>
  )
}
