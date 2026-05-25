'use client'
import { useState, useCallback, useMemo } from 'react'

interface BMICategory {
  name: string
  range: string
  color: string
  description: string
}

const BMI_CATEGORIES: BMICategory[] = [
  { name: 'Underweight', range: '< 18.5', color: 'bg-blue-500', description: 'May need to gain weight' },
  { name: 'Normal weight', range: '18.5 – 24.9', color: 'bg-green-500', description: 'Healthy range' },
  { name: 'Overweight', range: '25.0 – 29.9', color: 'bg-yellow-500', description: 'Consider losing weight' },
  { name: 'Obese', range: '≥ 30.0', color: 'bg-red-500', description: 'High health risk' },
]

type UnitSystem = 'metric' | 'imperial'

export function BmiCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric')
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(70)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [weightLbs, setWeightLbs] = useState(154)

  const [bmi, setBmi] = useState<number>(0)
  const [category, setCategory] = useState<BMICategory | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const heightInCm = unitSystem === 'metric'
    ? heightCm
    : (heightFt * 30.48) + (heightIn * 2.54)

  const weightInKg = unitSystem === 'metric'
    ? weightKg
    : weightLbs / 2.20462

  const calculateBMI = useCallback(() => {
    if (heightInCm <= 0) return

    const bmiValue = weightInKg / ((heightInCm / 100) ** 2)
    setBmi(bmiValue)

    let cat: BMICategory
    if (bmiValue < 18.5) cat = BMI_CATEGORIES[0]
    else if (bmiValue < 25) cat = BMI_CATEGORIES[1]
    else if (bmiValue < 30) cat = BMI_CATEGORIES[2]
    else cat = BMI_CATEGORIES[3]

    setCategory(cat)
  }, [heightInCm, weightInKg])

  const idealWeightRange = useMemo(() => {
    const minIdeal = 18.5 * (heightInCm / 100) ** 2
    const maxIdeal = 24.9 * (heightInCm / 100) ** 2
    return {
      min: Math.round(minIdeal),
      max: Math.round(maxIdeal)
    }
  }, [heightInCm])

  const handleCalculate = () => {
    calculateBMI()
    setShowDetails(false)
  }

  return (
    <div className="space-y-6">
      {/* Unit System Toggle */}
      <div>
        <label className="block text-sm font-medium mb-2">Unit System</label>
        <div className="flex gap-2">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`flex-1 py-2 rounded-lg border font-medium transition-all ${unitSystem === 'metric'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
              }`}
          >
            Metric (cm/kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`flex-1 py-2 rounded-lg border font-medium transition-all ${unitSystem === 'imperial'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
              }`}
          >
            Imperial (ft/in/lbs)
          </button>
        </div>
      </div>

      {/* Height Input */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-sm font-medium">Height</label>
          <span className="text-sm text-muted-foreground">
            {unitSystem === 'metric'
              ? `${heightCm} cm`
              : `${heightFt}'${heightIn}"`}
          </span>
        </div>

        {unitSystem === 'metric' ? (
          <input
            type="range"
            min="100"
            max="250"
            step="1"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Feet</label>
              <input
                type="range"
                min="4"
                max="7"
                value={heightFt}
                onChange={(e) => setHeightFt(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="text-center text-sm mt-1">{heightFt} ft</div>
            </div>
              <div>
              <label className="text-xs text-muted-foreground">Inches</label>
              <input
                type="range"
                min="0"
                max="11"
                value={heightIn}
                onChange={(e) => setHeightIn(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="text-center text-sm mt-1">{heightIn} in</div>
            </div>
          </div>
        )}
      </div>

      {/* Weight Input */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="text-sm font-medium">Weight</label>
          <span className="text-sm text-muted-foreground">
            {unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
          </span>
        </div>

        {unitSystem === 'metric' ? (
          <input
            type="range"
            min="30"
            max="200"
            step="1"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        ) : (
          <input
            type="range"
            min="66"
            max="440"
            step="1"
            value={weightLbs}
            onChange={(e) => setWeightLbs(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        )}
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Calculate BMI
      </button>

      {/* Results */}
      {bmi > 0 && category && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-muted p-6 text-center">
            <div className="text-sm text-muted-foreground mb-1">Your BMI</div>
            <div className="text-6xl font-bold tabular-nums mb-2">{bmi.toFixed(1)}</div>
            <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold text-sm ${category.color}`}>
              {category.name}
            </div>
          </div>

          {/* Category Info */}
          <div className="p-4 rounded-xl border border-border bg-background">
            <p className="font-medium mb-1">Category Range: {category.range}</p>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>

          {/* Healthy Weight Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-border bg-muted">
              <p className="text-xs text-muted-foreground">Healthy Weight Range</p>
              <p className="text-lg font-semibold mt-1">
                {idealWeightRange.min} – {idealWeightRange.max} kg
              </p>
              {unitSystem === 'imperial' && (
                <p className="text-xs text-muted-foreground mt-1">
                  ({Math.round(idealWeightRange.min * 2.20462)} – {Math.round(idealWeightRange.max * 2.20462)} lbs)
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted">
              <p className="text-xs text-muted-foreground">BMI Classification</p>
              <p className="text-lg font-semibold mt-1 capitalize">{category.name}</p>
            </div>
          </div>

          {/* Detailed Insights */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mx-auto"
          >
            {showDetails ? 'Hide' : 'Show'} Detailed Health Insights
            <span>{showDetails ? '▲' : '▼'}</span>
          </button>

          {showDetails && (
            <div className="text-sm space-y-4 p-5 bg-muted rounded-2xl border border-border">
              <div>
                <strong>BMI Meaning:</strong> Body Mass Index is a measure of body fat based on height and weight.
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs">
                {BMI_CATEGORIES.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                    <span>{cat.name} — {cat.range}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t text-xs text-muted-foreground">
                Note: BMI is a screening tool, not a diagnostic tool. Consult a healthcare professional for personalized advice.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}