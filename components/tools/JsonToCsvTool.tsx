'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Download } from 'lucide-react'

export function JsonToCsvTool() {
  const [json, setJson] = useState('[\n  {"name": "John", "age": 30},\n  {"name": "Jane", "age": 25}\n]')
  const [csv, setCsv] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    setCsv('')

    try {
      const data = JSON.parse(json)
      if (!Array.isArray(data) || data.length === 0) {
        setError('JSON must be an array with at least one object')
        return
      }

      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(','),
        ...data.map(obj => headers.map(h => {
          const val = obj[h]
          if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
            return `"${val.replace(/"/g, '""')}"`
          }
          return val
        }).join(','))
      ].join('\n')

      setCsv(csvContent)
    } catch (err) {
      setError('Invalid JSON format')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csv)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCsv = () => {
    const link = document.createElement('a')
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
    link.download = 'data.csv'
    link.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">JSON Array</label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="w-full h-40 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <Button onClick={convert} className="w-full">Convert to CSV</Button>

      {error && <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      {csv && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">CSV Output</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button size="sm" variant="ghost" onClick={downloadCsv}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <pre className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-xs max-h-64 overflow-y-auto">
            {csv}
          </pre>
        </div>
      )}
    </div>
  )
}
