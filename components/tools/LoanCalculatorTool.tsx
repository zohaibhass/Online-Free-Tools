'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Calculator, TrendingUp, PieChart, Download } from 'lucide-react'

export function LoanCalculatorTool() {
  const [principal, setPrincipal] = useState(250000)
  const [annualRate, setAnnualRate] = useState(5.5)
  const [years, setYears] = useState(30)
  const [extraMonthly, setExtraMonthly] = useState(0)

  // Real-time calculation
  const results = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12
    const totalMonths = years * 12

    if (monthlyRate === 0) {
      const payment = principal / totalMonths
      return {
        monthlyPayment: payment,
        totalInterest: 0,
        totalPayment: principal,
        payoffMonths: totalMonths,
        payoffYears: years,
      }
    }

    const x = Math.pow(1 + monthlyRate, totalMonths)
    let monthlyPayment = (principal * monthlyRate * x) / (x - 1)

    // Add extra payment
    const effectivePayment = monthlyPayment + extraMonthly

    // Calculate actual payoff time with extra payments
    let balance = principal
    let totalInterest = 0
    let monthsPaid = 0

    while (balance > 0 && monthsPaid < 1000) {
      const interestThisMonth = balance * monthlyRate
      totalInterest += interestThisMonth
      const principalThisMonth = Math.min(effectivePayment - interestThisMonth, balance)
      balance -= principalThisMonth
      monthsPaid++
    }

    return {
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      totalPayment: principal + totalInterest,
      payoffMonths: monthsPaid,
      payoffYears: (monthsPaid / 12).toFixed(1),
    }
  }, [principal, annualRate, years, extraMonthly])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const savingsWithExtra = extraMonthly > 0
    ? (results.totalPayment - (principal + (results.monthlyPayment * years * 12 - principal)))
    : 0

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <p className="text-4xl font-bold mb-2">Loan Calculator</p>
        <p className="text-muted-foreground">Calculate your mortgage or loan payments instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Controls */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium">Loan Amount</label>
                  <span className="text-2xl font-semibold">{formatCurrency(principal)}</span>
                </div>
                <Slider
                  min={50000}
                  max={2000000}
                  step={1000}
                  value={[principal]}
                  onValueChange={(v) => setPrincipal(v[0])}
                  className="mb-4"
                />
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="text-center text-lg"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium">Annual Interest Rate</label>
                  <span className="text-2xl font-semibold">{annualRate.toFixed(2)}%</span>
                </div>
                <Slider
                  min={0}
                  max={15}
                  step={0.1}
                  value={[annualRate]}
                  onValueChange={(v) => setAnnualRate(v[0])}
                />
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium">Loan Term</label>
                  <span className="text-2xl font-semibold">{years} years</span>
                </div>
                <Slider
                  min={5}
                  max={40}
                  step={1}
                  value={[years]}
                  onValueChange={(v) => setYears(v[0])}
                />
              </div>

              {/* Extra Monthly Payment */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium">Extra Monthly Payment</label>
                  <span className="text-2xl font-semibold">{formatCurrency(extraMonthly)}</span>
                </div>
                <Slider
                  min={0}
                  max={2000}
                  step={50}
                  value={[extraMonthly]}
                  onValueChange={(v) => setExtraMonthly(v[0])}
                />
                <Input
                  type="number"
                  value={extraMonthly}
                  onChange={(e) => setExtraMonthly(Number(e.target.value))}
                  placeholder="0"
                  className="mt-3"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground">Monthly Payment</div>
              <div className="text-5xl font-bold text-primary mt-1">
                {formatCurrency(results.monthlyPayment)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">per month</div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Principal</span>
                <span className="font-medium">{formatCurrency(principal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-medium text-red-600">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-semibold">
                <span>Total Amount Paid</span>
                <span>{formatCurrency(results.totalPayment)}</span>
              </div>
            </div>
          </Card>

          {/* Payoff Summary */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="font-semibold">Payoff Summary</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground">WITHOUT Extra</div>
                <div className="text-2xl font-semibold mt-1">{years} years</div>
              </div>
              <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4">
                <div className="text-xs text-green-600">WITH Extra</div>
                <div className="text-2xl font-semibold mt-1 text-green-700 dark:text-green-400">
                  {results.payoffYears} years
                </div>
                {extraMonthly > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    Save {savingsWithExtra > 0 ? formatCurrency(savingsWithExtra) : '—'}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Breakdown */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5" />
              <p className="font-semibold">Breakdown</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Principal</span>
                </div>
                <span className="font-medium">{formatCurrency(principal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Interest</span>
                </div>
                <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
              </div>
            </div>
          </Card>

          <Button
            className="w-full h-12 text-base"
            onClick={() => {
              const text = `Loan Summary\nPrincipal: ${formatCurrency(principal)}\nMonthly Payment: ${formatCurrency(results.monthlyPayment)}\nTotal Interest: ${formatCurrency(results.totalInterest)}\nTotal Paid: ${formatCurrency(results.totalPayment)}`
              navigator.clipboard.writeText(text)
              alert("Loan summary copied to clipboard!")
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Copy Summary
          </Button>
        </div>
      </div>
    </div>
  )
}