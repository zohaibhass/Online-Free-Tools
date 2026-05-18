'use client'

import { useState } from 'react'

export function MortgageCalculatorTool() {
  const [homePrice, setHomePrice] = useState(300000)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(360)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  const calculate = () => {
    const principal = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const monthlyPay = monthlyRate === 0 
      ? principal / loanTerm
      : principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    setMonthlyPayment(monthlyPay)
  }

  const loanAmount = homePrice - downPayment
  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1)
  const years = loanTerm / 12

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Home Price: ${homePrice.toLocaleString()}</label>
        <input type="range" min="50000" max="2000000" step="10000" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Down Payment ({downPaymentPercent}%): ${downPayment.toLocaleString()}</label>
        <input type="range" min="0" max={homePrice} step="10000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Interest Rate (%): {interestRate.toFixed(2)}%</label>
        <input type="range" min="2" max="12" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Loan Term ({years.toFixed(0)} years)</label>
        <input type="range" min="60" max="600" step="12" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full" />
      </div>

      <button onClick={calculate} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold">Calculate</button>

      {monthlyPayment > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted border border-border">
            <div className="text-sm text-muted-foreground">Monthly Payment</div>
            <div className="text-2xl font-bold">${monthlyPayment.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border">
            <div className="text-sm text-muted-foreground">Loan Amount</div>
            <div className="text-2xl font-bold">${loanAmount.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}
