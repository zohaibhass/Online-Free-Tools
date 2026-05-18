'use client'

import { useState } from 'react'

export function DiscountCalculatorTool() {
  const [originalPrice, setOriginalPrice] = useState(100)
  const [discountPercent, setDiscountPercent] = useState(20)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)

  const calculate = () => {
    const discount = (originalPrice * discountPercent) / 100
    setDiscountAmount(discount)
    setFinalPrice(originalPrice - discount)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Original Price ($)</label>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(Number(e.target.value))}
          className="w-full p-3 border border-border rounded bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Discount Percentage (%): {discountPercent}%</label>
        <input type="range" min="0" max="100" step="1" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-full" />
      </div>

      <button onClick={calculate} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold">Calculate</button>

      {finalPrice > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted border border-border">
            <div className="text-sm text-muted-foreground">Discount Amount</div>
            <div className="text-2xl font-bold">${discountAmount.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border">
            <div className="text-sm text-muted-foreground">Final Price</div>
            <div className="text-2xl font-bold text-green-600">${finalPrice.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
