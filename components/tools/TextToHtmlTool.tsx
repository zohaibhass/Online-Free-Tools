'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function TextToHtmlTool() {
  const [text, setText] = useState('Hello World\n\nThis is a paragraph.')
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    let result = text
      .split('\n\n')
      .map(para => {
        const trimmed = para.trim()
        if (trimmed.startsWith('#')) {
          const level = trimmed.match(/^#+/)?.[0].length || 1
          const content = trimmed.slice(level).trim()
          return `<h${level}>${content}</h${level}>`
        }
        return `<p>${trimmed}</p>`
      })
      .join('\n')

    setHtml(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
${result}
</body>
</html>`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Plain Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text (use # for headings, empty line for paragraph break)"
          className="w-full h-40 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <Button onClick={convert} className="w-full">Convert to HTML</Button>

      {html && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">HTML Output</p>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-xs max-h-64 overflow-y-auto">
            {html}
          </pre>
        </div>
      )}
    </div>
  )
}
