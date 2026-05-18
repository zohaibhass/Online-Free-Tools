'use client'

import { useState } from 'react'

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState('2000-01-01')
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null)

  const calculate = () => {
    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    setAge({ years, months, days })
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Date of Birth</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full p-3 border border-border rounded bg-background"
        />
      </div>

      <button onClick={calculate} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold">Calculate Age</button>

      {age && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted border border-border text-center">
            <div className="text-3xl font-bold">{age.years}</div>
            <div className="text-sm text-muted-foreground">Years</div>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border text-center">
            <div className="text-3xl font-bold">{age.months}</div>
            <div className="text-sm text-muted-foreground">Months</div>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border text-center">
            <div className="text-3xl font-bold">{age.days}</div>
            <div className="text-sm text-muted-foreground">Days</div>
          </div>
        </div>
      )}
    </div>
  )
}
