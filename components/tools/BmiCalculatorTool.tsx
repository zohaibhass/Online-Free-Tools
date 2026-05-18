'use client'

import { useState } from 'react'

export function BmiCalculatorTool() {
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [bmi, setBmi] = useState(0)
  const [category, setCategory] = useState('')

  const calculate = () => {
    const heightInMeters = height / 100
    const bmiValue = weight / (heightInMeters * heightInMeters)
    setBmi(bmiValue)

    if (bmiValue < 18.5) setCategory('Underweight')
    else if (bmiValue < 25) setCategory('Normal weight')
    else if (bmiValue < 30) setCategory('Overweight')
    else setCategory('Obese')
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Height (cm): {height} cm</label>
        <input type="range" min="100" max="250" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Weight (kg): {weight} kg</label>
        <input type="range" min="30" max="200" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full" />
      </div>

      <button onClick={calculate} className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold">Calculate BMI</button>

      {bmi > 0 && (
        <div className="space-y-4 p-4 rounded-lg bg-muted border border-border">
          <div>
            <div className="text-sm text-muted-foreground">BMI Value</div>
            <div className="text-4xl font-bold">{bmi.toFixed(1)}</div>
          </div>
          <div className={`py-2 px-4 rounded-lg text-center font-semibold ${
            category === 'Underweight' ? 'bg-blue-500/20 text-blue-700' :
            category === 'Normal weight' ? 'bg-green-500/20 text-green-700' :
            category === 'Overweight' ? 'bg-yellow-500/20 text-yellow-700' :
            'bg-red-500/20 text-red-700'
          }`}>
            {category}
          </div>
        </div>
      )}
    </div>
  )
}
