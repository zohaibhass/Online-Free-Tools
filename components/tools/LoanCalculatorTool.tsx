'use client'

import { useState } from 'react'

export function LoanCalculatorTool() {
  const [principal, setPrincipal] = useState(200000)
  const [rate, setRate] = useState(5)
  const [months, setMonths] = useState(360)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  const calculate = () => {
    const monthlyRate = rate / 100 / 12
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / months)
      setTotalInterest(0)
      return
    }
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    setMonthlyPayment(payment)
    setTotalInterest(payment * months - principal)
  }

  const years = months / 12

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Loan Amount: ${principal.toLocaleString()}</label>
        <input
          type="range"
          min="10000"
          max="1000000"
          step="10000"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full mt-2 p-2 border border-border rounded bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Interest Rate (%): {rate.toFixed(2)}%</label>
        <input
          type="range"
          min="0"
          max="15"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Loan Term: {years.toFixed(1)} years ({months} months)</label>
        <input
          type="range"
          min="12"
          max="600"
          step="1"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <button onClick={calculate} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold">Calculate</button>

      {monthlyPayment > 0 && (
        <div className="space-y-4 p-4 rounded-lg bg-muted border border-border">
          <div>
            <div className="text-sm text-muted-foreground">Monthly Payment</div>
            <div className="text-3xl font-bold">${monthlyPayment.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Interest</div>
              <div className="text-xl font-semibold">${totalInterest.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Paid</div>
              <div className="text-xl font-semibold">${(principal + totalInterest).toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
