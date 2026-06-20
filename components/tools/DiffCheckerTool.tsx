'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function DiffCheckerTool() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [showDiff, setShowDiff] = useState(false)

  const compare = () => {
    setShowDiff(true)
  }

  const getLineDifferences = () => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    return { lines1, lines2 }
  }

  const { lines1, lines2 } = getLineDifferences()
  const maxLines = Math.max(lines1.length, lines2.length)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Text 1</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter first text..."
            className="w-full h-40 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Text 2</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter second text..."
            className="w-full h-40 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
      </div>

      <Button onClick={compare} className="w-full">Compare</Button>

      {showDiff && (
        <div>
          <p className="text-sm font-semibold mb-4">Difference Highlighting</p>
          <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Text 1</div>
              {lines1.map((line, idx) => (
                <div
                  key={idx}
                  className={`font-mono text-xs p-2 ${
                    lines2[idx] !== line ? 'bg-red-500/20' : 'bg-muted'
                  } border border-border/50`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-2">Text 2</div>
              {lines2.map((line, idx) => (
                <div
                  key={idx}
                  className={`font-mono text-xs p-2 ${
                    lines1[idx] !== line ? 'bg-green-500/20' : 'bg-muted'
                  } border border-border/50`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
