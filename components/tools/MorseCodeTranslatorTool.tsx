'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

const morseMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--'
}

const reverseMorseMap: Record<string, string> = Object.entries(morseMap).reduce((acc, [k, v]) => ({ ...acc, [v]: k }), {})

export function MorseCodeTranslatorTool() {
  const [text, setText] = useState('HELLO')
  const [morse, setMorse] = useState('')
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse')
  const [copied, setCopied] = useState(false)

  const textToMorse = (str: string) => {
    return str
      .toUpperCase()
      .split('')
      .map(c => morseMap[c] || '?')
      .join(' ')
  }

  const morseToText = (str: string) => {
    return str
      .split(' ')
      .map(m => reverseMorseMap[m] || '?')
      .join('')
  }

  const convert = () => {
    if (mode === 'text-to-morse') {
      setMorse(textToMorse(text))
    } else {
      setMorse(morseToText(text))
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(morse)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Button variant={mode === 'text-to-morse' ? 'default' : 'outline'} onClick={() => setMode('text-to-morse')} className="flex-1">Text to Morse</Button>
        <Button variant={mode === 'morse-to-text' ? 'default' : 'outline'} onClick={() => setMode('morse-to-text')} className="flex-1">Morse to Text</Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{mode === 'text-to-morse' ? 'Text' : 'Morse Code'}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <Button onClick={convert} className="w-full">Convert</Button>

      {morse && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Result</p>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all">
            {morse}
          </div>
        </div>
      )}
    </div>
  )
}
