'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function SqlFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const formatSql = () => {
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      let formatted = input
        .replace(/\s+/g, ' ')
        .replace(/\bSELECT\b/gi, '\nSELECT')
        .replace(/\bFROM\b/gi, '\nFROM')
        .replace(/\bWHERE\b/gi, '\nWHERE')
        .replace(/\bJOIN\b/gi, '\nJOIN')
        .replace(/\bLEFT\b/gi, '\nLEFT')
        .replace(/\bRIGHT\b/gi, '\nRIGHT')
        .replace(/\bINNER\b/gi, '\nINNER')
        .replace(/\bON\b/gi, '\nON')
        .replace(/\bAND\b/gi, '\nAND')
        .replace(/\bOR\b/gi, '\nOR')
        .replace(/\bORDER BY\b/gi, '\nORDER BY')
        .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
        .trim()

      setOutput(formatted)
    } catch (err) {
      setOutput('Error formatting SQL')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SQL query..."
            className="w-full h-64 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Formatted SQL</label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted query will appear here..."
            className="w-full h-64 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-muted text-foreground"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={formatSql}>Format SQL</Button>
        <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button onClick={() => { setInput(''); setOutput('') }} variant="outline">
          Clear
        </Button>
      </div>
    </div>
  )
}
