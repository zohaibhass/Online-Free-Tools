'use client'

import { useState } from 'react'

export function PercentageCalculatorTool() {
  const [value, setValue] = useState(100)
  const [percent, setPercent] = useState(20)
  const [result, setResult] = useState(20)
  const [operation, setOperation] = useState<'of' | 'increase' | 'decrease'>('of')

  const calculate = () => {
    let res = 0
    if (operation === 'of') {
      res = (value * percent) / 100
    } else if (operation === 'increase') {
      res = value + (value * percent) / 100
    } else if (operation === 'decrease') {
      res = value - (value * percent) / 100
    }
    setResult(res)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        {(['of', 'increase', 'decrease'] as const).map(op => (
          <button
            key={op}
            onClick={() => setOperation(op)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
              operation === op ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Value</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full p-3 border border-border rounded bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Percentage (%)</label>
        <input
          type="number"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="w-full p-3 border border-border rounded bg-background"
        />
      </div>

      <button onClick={calculate} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold">Calculate</button>

      <div className="p-4 rounded-lg bg-muted border border-border">
        <div className="text-sm text-muted-foreground mb-2">Result</div>
        <div className="text-3xl font-bold">{result.toFixed(2)}</div>
      </div>
    </div>
  )
}
