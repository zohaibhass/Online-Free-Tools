'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function CodeMinifierTool() {
  const [code, setCode] = useState('')
  const [minified, setMinified] = useState('')
  const [copied, setCopied] = useState(false)
  const [language, setLanguage] = useState<'css' | 'javascript' | 'html'>('javascript')

  const minifyCode = () => {
    let result = code.trim()

    // Remove comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*/g, '')

    // Remove extra whitespace
    result = result.replace(/\s+/g, ' ')

    // Remove spaces around operators
    result = result.replace(/\s*([{}()[\];:,])\s*/g, '$1')

    setMinified(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minified)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const originalSize = code.length
  const minifiedSize = minified.length
  const savings = originalSize > 0 ? Math.round((1 - minifiedSize / originalSize) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {(['javascript', 'css', 'html'] as const).map(lang => (
          <Button
            key={lang}
            variant={language === lang ? 'default' : 'outline'}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </Button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Original Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-40 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
        <div className="text-xs text-muted-foreground mt-2">{originalSize} bytes</div>
      </div>

      <Button onClick={minifyCode} className="w-full">Minify Code</Button>

      {minified && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Minified Code</p>
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all max-h-40 overflow-auto">
            {minified}
          </div>
          <div className="text-xs text-muted-foreground mt-2 flex justify-between">
            <span>{minifiedSize} bytes</span>
            <span className="text-primary font-semibold">{savings}% reduction</span>
          </div>
        </div>
      )}
    </div>
  )
}
