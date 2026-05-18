'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CoinFlipperTool() {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [stats, setStats] = useState({ heads: 0, tails: 0 })

  const flip = () => {
    setIsFlipping(true)
    setTimeout(() => {
      const isHeads = Math.random() > 0.5
      setResult(isHeads ? 'heads' : 'tails')
      setStats(prev => ({
        ...prev,
        [isHeads ? 'heads' : 'tails']: prev[isHeads ? 'heads' : 'tails'] + 1
      }))
      setIsFlipping(false)
    }, 500)
  }

  const reset = () => {
    setResult(null)
    setStats({ heads: 0, tails: 0 })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center text-4xl font-bold transition-transform ${
            isFlipping ? 'animate-spin' : ''
          } ${result === 'heads' ? 'bg-yellow-500 text-white' : result === 'tails' ? 'bg-gray-500 text-white' : 'bg-muted border-2 border-border'}`}
        >
          {result ? (result === 'heads' ? 'H' : 'T') : '?'}
        </div>
      </div>

      {result && <div className="text-center text-2xl font-bold capitalize">{result}!</div>}

      <Button onClick={flip} disabled={isFlipping} className="w-full">
        {isFlipping ? 'Flipping...' : 'Flip Coin'}
      </Button>

      {(stats.heads > 0 || stats.tails > 0) && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted border border-border text-center">
            <div className="text-sm text-muted-foreground">Heads</div>
            <div className="text-3xl font-bold">{stats.heads}</div>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border text-center">
            <div className="text-sm text-muted-foreground">Tails</div>
            <div className="text-3xl font-bold">{stats.tails}</div>
          </div>
        </div>
      )}

      {(stats.heads > 0 || stats.tails > 0) && <Button onClick={reset} variant="outline" className="w-full">Reset Stats</Button>}
    </div>
  )
}
