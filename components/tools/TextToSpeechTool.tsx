'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

export function TextToSpeechTool() {
  const [text, setText] = useState('Hello! This is a text-to-speech converter.')
  const [voice, setVoice] = useState(0)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = () => {
    if (!text.trim()) return

    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const voices = speechSynthesis.getVoices()
    
    utterance.voice = voices[voice] || voices[0]
    utterance.rate = rate
    utterance.pitch = pitch

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
    setIsPlaying(true)

    utterance.onend = () => setIsPlaying(false)
  }

  const stop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
  }

  const voices = speechSynthesis.getVoices()

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Text to Speak</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Voice</label>
        <select
          value={voice}
          onChange={(e) => setVoice(Number(e.target.value))}
          className="w-full p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {voices.map((v, idx) => (
            <option key={idx} value={idx}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Speed: {rate.toFixed(1)}x</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Pitch: {pitch.toFixed(1)}</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={speak} className="flex-1 gap-2">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Speak'}
        </Button>
        <Button onClick={stop} variant="outline" className="flex-1 gap-2">
          <RotateCcw className="w-4 h-4" />
          Stop
        </Button>
      </div>
    </div>
  )
}
