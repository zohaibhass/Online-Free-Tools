'use client'

import { useState } from 'react'

export function UnitCalculatorTool() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    try {
      const sanitized = expression.replace(/[^0-9+\-*/.()]/g, '')
      const res = eval(sanitized)
      setResult(typeof res === 'number' ? res : null)
    } catch {
      setResult(null)
    }
  }

  const handleButtonClick = (value: string) => {
    setExpression(prev => prev + value)
  }

  const clear = () => {
    setExpression('')
    setResult(null)
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-muted border border-border">
        <div className="text-sm text-muted-foreground">Expression</div>
        <div className="text-2xl font-mono font-bold break-all">{expression || '0'}</div>
      </div>

      {result !== null && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="text-sm text-muted-foreground">Result</div>
          <div className="text-3xl font-bold">{result}</div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map(b => <button key={b} onClick={() => handleButtonClick(b)} className="p-2 bg-muted rounded border border-border hover:bg-muted/80">{b}</button>)}
        {['4', '5', '6', '*'].map(b => <button key={b} onClick={() => handleButtonClick(b)} className="p-2 bg-muted rounded border border-border hover:bg-muted/80">{b}</button>)}
        {['1', '2', '3', '-'].map(b => <button key={b} onClick={() => handleButtonClick(b)} className="p-2 bg-muted rounded border border-border hover:bg-muted/80">{b}</button>)}
        {['0', '.', '=', '+'].map(b => <button key={b} onClick={() => b === '=' ? calculate() : handleButtonClick(b)} className="p-2 bg-muted rounded border border-border hover:bg-muted/80">{b}</button>)}
      </div>

      <button onClick={clear} className="w-full py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold">Clear</button>
    </div>
  )
}
