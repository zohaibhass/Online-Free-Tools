'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Download, Upload } from 'lucide-react'

export function JsonFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = (value: string) => {
    setInput(value)
    setError('')
    if (!value.trim()) {
      setOutput('')
      return
    }

    try {
      const parsed = JSON.parse(value)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJson = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', 'formatted.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => formatJson(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-96 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium mb-2">Formatted JSON</label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="w-full h-96 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-muted text-foreground"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive">
          <p className="font-medium">Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => formatJson(input)}
          variant="default"
        >
          Format
        </Button>
        <Button
          onClick={minifyJson}
          variant="outline"
        >
          Minify
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          disabled={!output}
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          onClick={downloadJson}
          variant="outline"
          disabled={!output}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
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
        <h3 className="font-semibold">How to use:</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Paste your JSON in the input area</li>
          <li>The output will format automatically</li>
          <li>Use Minify to compress the JSON</li>
          <li>Copy or download the result</li>
        </ul>
      </div>
    </div>
  )
}
