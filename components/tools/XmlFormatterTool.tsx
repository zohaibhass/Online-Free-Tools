'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, AlertCircle } from 'lucide-react'

export function XmlFormatterTool() {
  const [xml, setXml] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatXml = () => {
    setError('')
    setFormatted('')

    if (!xml.trim()) {
      setError('Please paste XML content')
      return
    }

    try {
      // Simple XML validation and formatting
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xml, 'application/xml')

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        setError('Invalid XML format')
        return
      }

      // Format with indentation
      const serializer = new XMLSerializer()
      let result = serializer.serializeToString(xmlDoc)

      // Add proper indentation
      result = result.replace(/></g, '>\n<').replace(/^\n/, '')
      const lines = result.split('\n')
      let indent = 0
      const formatted = lines.map(line => {
        if (line.startsWith('</')) {
          indent = Math.max(0, indent - 1)
        }
        const spaces = ' '.repeat(indent * 2)
        if (line.startsWith('<') && !line.startsWith('<?')) {
          if (!line.startsWith('</')) {
            indent++
          }
        }
        return spaces + line
      }).join('\n')

      setFormatted(formatted)
    } catch (err) {
      setError('Failed to format XML')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Paste XML</label>
        <textarea
          value={xml}
          onChange={(e) => setXml(e.target.value)}
          placeholder="<?xml version='1.0'?><root></root>"
          className="w-full h-32 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <Button onClick={formatXml} className="w-full">Format XML</Button>

      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>{error}</div>
        </div>
      )}

      {formatted && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Formatted XML</h3>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-xs max-h-64 overflow-y-auto">
            {formatted}
          </pre>
        </div>
      )}
    </div>
  )
}
