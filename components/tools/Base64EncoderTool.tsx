'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Download } from 'lucide-react'

export function Base64EncoderTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleConvert = (value: string) => {
    setInput(value)
    setError('')

    if (!value.trim()) {
      setOutput('')
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(value)
        setOutput(encoded)
      } else {
        const decoded = atob(value)
        setOutput(decoded)
      }
    } catch (err) {
      setError(mode === 'encode' ? 'Error encoding string' : 'Invalid Base64 string')
      setOutput('')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('encode')
            setInput('')
            setOutput('')
            setError('')
          }}
        >
          Encode
        </Button>
        <Button
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => {
            setMode('decode')
            setInput('')
            setOutput('')
            setError('')
          }}
        >
          Decode
        </Button>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            {mode === 'encode' ? 'Text' : 'Base64'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleConvert(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-64 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {mode === 'encode' ? 'Base64' : 'Text'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="w-full h-64 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-muted text-foreground"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={copyToClipboard}
          disabled={!output}
          variant="outline"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          onClick={() => {
            setInput('')
            setOutput('')
            setError('')
          }}
          variant="outline"
        >
          Clear
        </Button>
      </div>

      {/* Info */}
      <div className="p-4 bg-card border border-border rounded-lg space-y-2">
        <p className="font-semibold">About Base64:</p>
        <p className="text-sm text-muted-foreground">
          Base64 is a binary-to-text encoding scheme. It converts binary data into a printable ASCII string format.
        </p>
      </div>
    </div>
  )
}
