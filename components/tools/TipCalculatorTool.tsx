'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function TipCalculatorTool() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercent, setTipPercent] = useState('18')
  const [people, setPeople] = useState('1')

  const bill = parseFloat(billAmount) || 0
  const tip = bill * (parseFloat(tipPercent) / 100)
  const total = bill + tip
  const perPerson = people !== '1' ? total / parseFloat(people) : total

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Bill Amount ($)</label>
          <Input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of People</label>
          <Input
            type="number"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            placeholder="1"
            min="1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tip Percentage: {tipPercent}%</label>
        <div className="flex gap-2">
          {[10, 15, 18, 20, 25].map(percent => (
            <button
              key={percent}
              onClick={() => setTipPercent(percent.toString())}
              className={`flex-1 py-2 rounded-lg border transition-colors ${
                tipPercent === percent.toString()
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-accent'
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
          className="w-full mt-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Tip Amount</div>
          <div className="text-2xl font-bold text-primary">${tip.toFixed(2)}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total Bill</div>
          <div className="text-2xl font-bold text-primary">${total.toFixed(2)}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Per Person</div>
          <div className="text-2xl font-bold text-primary">${perPerson.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
