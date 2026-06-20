'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function UrlEncoderTool() {
  const [input, setInput] = useState('')
  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [copied, setCopied] = useState('')

  const handleEncode = () => {
    setEncoded(encodeURIComponent(input))
    setDecoded('')
  }

  const handleDecode = () => {
    try {
      setDecoded(decodeURIComponent(input))
      setEncoded('')
    } catch {
      setDecoded('Invalid URL encoding')
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode or encode string to decode..."
          className="w-full h-32 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleEncode} className="flex-1">Encode</Button>
        <Button onClick={handleDecode} variant="outline" className="flex-1">Decode</Button>
      </div>

      {encoded && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Encoded Result</p>
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(encoded, 'encoded')}>
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'encoded' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all">
            {encoded}
          </div>
        </div>
      )}

      {decoded && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Decoded Result</p>
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(decoded, 'decoded')}>
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'decoded' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all">
            {decoded}
          </div>
        </div>
      )}
    </div>
  )
}
