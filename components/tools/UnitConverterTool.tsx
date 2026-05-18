'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const conversions: Record<string, Record<string, number>> = {
  length: {
    'm-km': 0.001,
    'km-m': 1000,
    'm-ft': 3.28084,
    'ft-m': 0.3048,
    'km-mi': 0.621371,
    'mi-km': 1.60934,
  },
  weight: {
    'kg-lb': 2.20462,
    'lb-kg': 0.453592,
    'kg-g': 1000,
    'g-kg': 0.001,
    'lb-oz': 16,
    'oz-lb': 0.0625,
  },
  temperature: {
    'c-f': (c: number) => (c * 9/5) + 32,
    'f-c': (f: number) => (f - 32) * 5/9,
  },
}

export function UnitConverterTool() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const [conversion, setConversion] = useState('m-km')

  const convert = () => {
    if (!value) {
      setResult('')
      return
    }

    const num = parseFloat(value)
    if (isNaN(num)) {
      setResult('Invalid input')
      return
    }

    const factor = conversions[category][conversion]
    const converted = typeof factor === 'function' ? factor(num) : num * factor
    setResult(converted.toFixed(6).replace(/\.?0+$/, ''))
  }

  const getCategoryConversions = () => {
    return Object.keys(conversions[category])
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setConversion(Object.keys(conversions[e.target.value])[0])
              setResult('')
            }}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Conversion Type</label>
          <select
            value={conversion}
            onChange={(e) => setConversion(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {getCategoryConversions().map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Value</label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Result</label>
          <Input
            type="text"
            value={result}
            readOnly
            placeholder="Result will appear here"
          />
        </div>
      </div>

      <Button onClick={convert} className="w-full h-12">
        Convert
      </Button>
    </div>
  )
}
