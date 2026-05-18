'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

export function RegexTesterTool() {
  const [pattern, setPattern] = useState('')
  const [text, setText] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState('')

  const testRegex = () => {
    setError('')
    setMatches([])
    
    if (!pattern.trim()) {
      setError('Please enter a regex pattern')
      return
    }

    try {
      const regex = new RegExp(pattern, 'g')
      const found = text.match(regex) || []
      setMatches(found)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Regex Pattern</label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="/pattern/g"
          className="w-full px-4 py-2 border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Test Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to test..."
          className="w-full h-48 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {matches.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-2">Matches ({matches.length})</label>
          <div className="p-4 border border-border rounded-lg bg-muted max-h-48 overflow-y-auto">
            {matches.map((match, i) => (
              <div key={i} className="font-mono text-sm py-1 text-foreground">
                {match}
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={testRegex} className="w-full">
        Test Pattern
      </Button>
    </div>
  )
}
