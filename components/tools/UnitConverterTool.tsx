'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowRightLeft, Copy, RotateCw, Star } from 'lucide-react'

type Category = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'time' | 'energy' | 'pressure' | 'data'

interface Unit {
  label: string
  symbol: string
}

const CATEGORIES: Record<Category, string> = {
  length: 'Length',
  weight: 'Weight / Mass',
  temperature: 'Temperature',
  area: 'Area',
  volume: 'Volume',
  speed: 'Speed',
  time: 'Time',
  energy: 'Energy',
  pressure: 'Pressure',
  data: 'Data / Storage',
}

const UNITS: Record<Category, Record<string, Unit>> = {
  length: {
    m: { label: 'Meter', symbol: 'm' },
    km: { label: 'Kilometer', symbol: 'km' },
    cm: { label: 'Centimeter', symbol: 'cm' },
    mm: { label: 'Millimeter', symbol: 'mm' },
    ft: { label: 'Foot', symbol: 'ft' },
    in: { label: 'Inch', symbol: 'in' },
    mi: { label: 'Mile', symbol: 'mi' },
    yd: { label: 'Yard', symbol: 'yd' },
  },
  weight: {
    kg: { label: 'Kilogram', symbol: 'kg' },
    g: { label: 'Gram', symbol: 'g' },
    mg: { label: 'Milligram', symbol: 'mg' },
    lb: { label: 'Pound', symbol: 'lb' },
    oz: { label: 'Ounce', symbol: 'oz' },
    ton: { label: 'Metric Ton', symbol: 't' },
  },
  temperature: {
    c: { label: 'Celsius', symbol: '°C' },
    f: { label: 'Fahrenheit', symbol: '°F' },
    k: { label: 'Kelvin', symbol: 'K' },
  },
  area: {
    m2: { label: 'Square Meter', symbol: 'm²' },
    km2: { label: 'Square Kilometer', symbol: 'km²' },
    cm2: { label: 'Square Centimeter', symbol: 'cm²' },
    ft2: { label: 'Square Foot', symbol: 'ft²' },
    in2: { label: 'Square Inch', symbol: 'in²' },
    acre: { label: 'Acre', symbol: 'acre' },
    ha: { label: 'Hectare', symbol: 'ha' },
  },
  volume: {
    l: { label: 'Liter', symbol: 'L' },
    ml: { label: 'Milliliter', symbol: 'mL' },
    m3: { label: 'Cubic Meter', symbol: 'm³' },
    gal: { label: 'US Gallon', symbol: 'gal' },
    qt: { label: 'Quart', symbol: 'qt' },
    fl_oz: { label: 'Fluid Ounce', symbol: 'fl oz' },
  },
  speed: {
    kmh: { label: 'Kilometer/Hour', symbol: 'km/h' },
    mph: { label: 'Mile/Hour', symbol: 'mph' },
    ms: { label: 'Meter/Second', symbol: 'm/s' },
    kn: { label: 'Knot', symbol: 'kn' },
  },
  time: {
    s: { label: 'Second', symbol: 's' },
    min: { label: 'Minute', symbol: 'min' },
    hr: { label: 'Hour', symbol: 'hr' },
    day: { label: 'Day', symbol: 'day' },
    week: { label: 'Week', symbol: 'wk' },
    month: { label: 'Month', symbol: 'mo' },
    year: { label: 'Year', symbol: 'yr' },
  },
  energy: {
    j: { label: 'Joule', symbol: 'J' },
    kj: { label: 'Kilojoule', symbol: 'kJ' },
    cal: { label: 'Calorie', symbol: 'cal' },
    kcal: { label: 'Kilocalorie', symbol: 'kcal' },
    kwh: { label: 'Kilowatt-Hour', symbol: 'kWh' },
  },
  pressure: {
    pa: { label: 'Pascal', symbol: 'Pa' },
    kpa: { label: 'Kilopascal', symbol: 'kPa' },
    bar: { label: 'Bar', symbol: 'bar' },
    psi: { label: 'PSI', symbol: 'psi' },
    atm: { label: 'Atmosphere', symbol: 'atm' },
  },
  data: {
    b: { label: 'Byte', symbol: 'B' },
    kb: { label: 'Kilobyte', symbol: 'KB' },
    mb: { label: 'Megabyte', symbol: 'MB' },
    gb: { label: 'Gigabyte', symbol: 'GB' },
    tb: { label: 'Terabyte', symbol: 'TB' },
    bit: { label: 'Bit', symbol: 'bit' },
  },
}

const CONVERSION_FACTORS: Record<Category, Record<string, number>> = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, ft: 3.28084, in: 39.3701, mi: 0.000621371, yd: 1.09361 },
  weight: { kg: 1, g: 1000, mg: 1_000_000, lb: 2.20462, oz: 35.274, ton: 0.001 },
  temperature: { c: 1, f: 1, k: 1 }, // Handled specially
  area: { m2: 1, km2: 0.000001, cm2: 10000, ft2: 10.7639, in2: 1550.003, acre: 0.000247105, ha: 0.0001 },
  volume: { l: 1, ml: 1000, m3: 0.001, gal: 0.264172, qt: 1.05669, fl_oz: 33.814 },
  speed: { kmh: 1, mph: 0.621371, ms: 0.277778, kn: 0.539957 },
  time: { s: 1, min: 1 / 60, hr: 1 / 3600, day: 1 / 86400, week: 1 / 604800, month: 1 / 2592000, year: 1 / 31536000 },
  energy: { j: 1, kj: 0.001, cal: 0.239006, kcal: 0.000239006, kwh: 0.000000277778 },
  pressure: { pa: 1, kpa: 0.001, bar: 0.00001, psi: 0.000145038, atm: 0.00000986923 },
  data: { b: 1, kb: 0.001, mb: 0.000001, gb: 0.000000001, tb: 0.000000000001, bit: 8 },
}

export function UnitConverterTool() {
  const [category, setCategory] = useState<Category>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [value, setValue] = useState('1')
  const [result, setResult] = useState('0.001')
  const [isFavorite, setIsFavorite] = useState(false)

  // Real-time conversion
  const convertedValue = useMemo(() => {
    if (!value || isNaN(parseFloat(value))) return ''

    const num = parseFloat(value)
    let converted: number

    if (category === 'temperature') {
      // Special handling for temperature
      let celsius: number
      if (fromUnit === 'c') celsius = num
      else if (fromUnit === 'f') celsius = (num - 32) * 5 / 9
      else celsius = num - 273.15 // kelvin

      if (toUnit === 'c') converted = celsius
      else if (toUnit === 'f') converted = (celsius * 9 / 5) + 32
      else converted = celsius + 273.15
    } else {
      // Linear conversion using base unit
      const fromFactor = CONVERSION_FACTORS[category][fromUnit]
      const toFactor = CONVERSION_FACTORS[category][toUnit]
      converted = (num / fromFactor) * toFactor
    }

    return converted.toFixed(6).replace(/\.?0+$/, '')
  }, [value, fromUnit, toUnit, category])

  // Update result in real-time
  useEffect(() => {
    setResult(convertedValue)
  }, [convertedValue])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      // You could add a toast here
      alert('Copied to clipboard!')
    }
  }

  const currentUnits = UNITS[category]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Unit Converter</h1>
        <p className="text-muted-foreground">Fast, accurate, and beautiful conversions</p>
      </div>

      {/* Category Selection */}
      <Card className="p-6">
        <label className="block text-sm font-medium mb-3">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setCategory(key as Category)
                setFromUnit(Object.keys(UNITS[key as Category])[0])
                setToUnit(Object.keys(UNITS[key as Category])[1] || Object.keys(UNITS[key as Category])[0])
              }}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${category === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        {/* From */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
            >
              {Object.keys(currentUnits).map((u) => (
                <option key={u} value={u}>
                  {currentUnits[u].label} ({currentUnits[u].symbol})
                </option>
              ))}
            </select>
          </div>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="text-3xl h-16 font-light"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2">
          <Button
            variant="outline"
            size="icon"
            onClick={swapUnits}
            className="rounded-full h-10 w-10 bg-background border-2"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* To */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
            >
              {Object.keys(currentUnits).map((u) => (
                <option key={u} value={u}>
                  {currentUnits[u].label} ({currentUnits[u].symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Input
              type="text"
              value={result}
              readOnly
              className="text-3xl h-16 font-light bg-muted/50"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Info */}
      <div className="text-center text-sm text-muted-foreground">
        Real-time conversion • Precise calculations • All in your browser
      </div>
    </div>
  )
}