'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function DiceRollerTool() {
  const [numDice, setNumDice] = useState(1)
  const [sides, setSides] = useState(6)
  const [results, setResults] = useState<number[]>([])
  const [total, setTotal] = useState(0)

  const roll = () => {
    const rolls: number[] = []
    for (let i = 0; i < numDice; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1)
    }
    setResults(rolls)
    setTotal(rolls.reduce((a, b) => a + b, 0))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Number of Dice: {numDice}</label>
        <input type="range" min="1" max="20" value={numDice} onChange={(e) => setNumDice(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Number of Sides: {sides}</label>
        <select value={sides} onChange={(e) => setSides(Number(e.target.value))} className="w-full p-2 border border-border rounded bg-background">
          {[4, 6, 8, 10, 12, 20, 100].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <Button onClick={roll} className="w-full">Roll Dice</Button>

      {results.length > 0 && (
        <>
          <div className="grid grid-cols-6 gap-2">
            {results.map((r, idx) => (
              <div key={idx} className="aspect-square flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                {r}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border text-center">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-4xl font-bold">{total}</div>
          </div>
        </>
      )}
    </div>
  )
}
