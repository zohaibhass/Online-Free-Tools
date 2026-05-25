'use client'
import { useState, useCallback } from 'react'

type Operation = 'of' | 'increase' | 'decrease' | 'difference' | 'reverse' | 'ratio'

interface HistoryEntry {
  operation: Operation
  inputs: Record<string, number>
  result: number
  formula: string
  timestamp: Date
}

const OPERATION_CONFIG: Record<Operation, { label: string; description: string; inputs: string[] }> = {
  of: {
    label: 'X% of Y',
    description: 'Find a percentage of a number',
    inputs: ['percent', 'value'],
  },
  increase: {
    label: 'Increase by %',
    description: 'Increase a number by a percentage',
    inputs: ['value', 'percent'],
  },
  decrease: {
    label: 'Decrease by %',
    description: 'Decrease a number by a percentage',
    inputs: ['value', 'percent'],
  },
  difference: {
    label: '% Difference',
    description: 'Percentage difference between two numbers',
    inputs: ['valueA', 'valueB'],
  },
  reverse: {
    label: 'Reverse %',
    description: 'Find original value before % change',
    inputs: ['result', 'percent'],
  },
  ratio: {
    label: 'X is Y% of?',
    description: 'Find the whole when you know the part',
    inputs: ['part', 'percent'],
  },
}

function compute(
  operation: Operation,
  inputs: Record<string, number>
): { result: number; formula: string; breakdown: string[] } {
  switch (operation) {
    case 'of': {
      const r = (inputs.percent * inputs.value) / 100
      return {
        result: r,
        formula: `${inputs.percent}% × ${inputs.value} ÷ 100`,
        breakdown: [
          `${inputs.percent} ÷ 100 = ${(inputs.percent / 100).toFixed(4)}`,
          `${(inputs.percent / 100).toFixed(4)} × ${inputs.value} = ${r.toFixed(4)}`,
        ],
      }
    }
    case 'increase': {
      const inc = (inputs.value * inputs.percent) / 100
      const r = inputs.value + inc
      return {
        result: r,
        formula: `${inputs.value} + (${inputs.value} × ${inputs.percent}%)`,
        breakdown: [
          `${inputs.value} × ${inputs.percent}% = ${inc.toFixed(4)}`,
          `${inputs.value} + ${inc.toFixed(4)} = ${r.toFixed(4)}`,
        ],
      }
    }
    case 'decrease': {
      const dec = (inputs.value * inputs.percent) / 100
      const r = inputs.value - dec
      return {
        result: r,
        formula: `${inputs.value} − (${inputs.value} × ${inputs.percent}%)`,
        breakdown: [
          `${inputs.value} × ${inputs.percent}% = ${dec.toFixed(4)}`,
          `${inputs.value} − ${dec.toFixed(4)} = ${r.toFixed(4)}`,
        ],
      }
    }
    case 'difference': {
      if (inputs.valueA === 0) return { result: 0, formula: 'Cannot divide by zero', breakdown: [] }
      const r = Math.abs(((inputs.valueB - inputs.valueA) / Math.abs(inputs.valueA)) * 100)
      return {
        result: r,
        formula: `|${inputs.valueB} − ${inputs.valueA}| ÷ |${inputs.valueA}| × 100`,
        breakdown: [
          `${inputs.valueB} − ${inputs.valueA} = ${inputs.valueB - inputs.valueA}`,
          `|${inputs.valueB - inputs.valueA}| ÷ ${Math.abs(inputs.valueA)} = ${(Math.abs(inputs.valueB - inputs.valueA) / Math.abs(inputs.valueA)).toFixed(4)}`,
          `× 100 = ${r.toFixed(4)}%`,
        ],
      }
    }
    case 'reverse': {
      if (inputs.percent === -100)
        return { result: 0, formula: 'Cannot divide by zero', breakdown: [] }
      const r = (inputs.result * 100) / (100 + inputs.percent)
      return {
        result: r,
        formula: `${inputs.result} × 100 ÷ (100 + ${inputs.percent})`,
        breakdown: [
          `100 + ${inputs.percent} = ${100 + inputs.percent}`,
          `${inputs.result} × 100 = ${inputs.result * 100}`,
          `${inputs.result * 100} ÷ ${100 + inputs.percent} = ${r.toFixed(4)}`,
        ],
      }
    }
    case 'ratio': {
      if (inputs.percent === 0)
        return { result: 0, formula: 'Cannot divide by zero', breakdown: [] }
      const r = (inputs.part * 100) / inputs.percent
      return {
        result: r,
        formula: `${inputs.part} × 100 ÷ ${inputs.percent}`,
        breakdown: [
          `${inputs.part} ÷ ${inputs.percent}% = ${(inputs.part / inputs.percent).toFixed(4)}`,
          `× 100 = ${r.toFixed(4)}`,
        ],
      }
    }
  }
}

function formatResult(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '—'
  if (Math.abs(n) >= 1_000_000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
  if (Number.isInteger(n)) return n.toLocaleString()
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

function getInputLabel(key: string, operation: Operation): string {
  const map: Record<string, string> = {
    percent: 'Percentage (%)',
    value: operation === 'of' ? 'Of this number' : 'Starting value',
    valueA: 'From value',
    valueB: 'To value',
    result: 'Result value (after change)',
    part: 'The part (X)',
  }
  return map[key] ?? key
}

function getInputPlaceholder(key: string): string {
  const map: Record<string, string> = {
    percent: 'e.g. 25',
    value: 'e.g. 200',
    valueA: 'e.g. 80',
    valueB: 'e.g. 100',
    result: 'e.g. 125',
    part: 'e.g. 15',
  }
  return map[key] ?? '0'
}

export function PercentageCalculatorTool() {
  const [operation, setOperation] = useState<Operation>('of')
  const [inputs, setInputs] = useState<Record<string, string>>({ percent: '', value: '' })
  const [computed, setComputed] = useState<{
    result: number
    formula: string
    breakdown: string[]
  } | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [copied, setCopied] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const config = OPERATION_CONFIG[operation]

  const handleOperationChange = (op: Operation) => {
    setOperation(op)
    setComputed(null)
    setErrors({})
    setInputs({})
  }

  const validate = useCallback((): boolean => {
    const errs: Record<string, string> = {}
    config.inputs.forEach(key => {
      const v = parseFloat(inputs[key] ?? '')
      if (inputs[key] === '' || inputs[key] === undefined || isNaN(v)) {
        errs[key] = 'Required'
      }
    })
    if (operation === 'difference' && parseFloat(inputs.valueA) === 0) {
      errs.valueA = 'Cannot be zero'
    }
    if (operation === 'reverse' && parseFloat(inputs.percent) === -100) {
      errs.percent = 'Cannot be −100'
    }
    if (operation === 'ratio' && parseFloat(inputs.percent) === 0) {
      errs.percent = 'Cannot be zero'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [inputs, operation, config.inputs])

  const calculate = useCallback(() => {
    if (!validate()) return
    const numericInputs: Record<string, number> = {}
    config.inputs.forEach(key => { numericInputs[key] = parseFloat(inputs[key]) })
    const res = compute(operation, numericInputs)
    setComputed(res)
    setShowBreakdown(false)
    setHistory(prev => [
      {
        operation,
        inputs: numericInputs,
        result: res.result,
        formula: res.formula,
        timestamp: new Date(),
      },
      ...prev.slice(0, 9),
    ])
  }, [validate, config.inputs, inputs, operation])

  const handleCopy = () => {
    if (computed) {
      navigator.clipboard.writeText(formatResult(computed.result))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const isPercentResult = operation === 'difference'
  const resultUnit = isPercentResult ? '%' : ''

  return (
    <div className="space-y-5">

      {/* Operation Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(OPERATION_CONFIG) as Operation[]).map(op => (
          <button
            key={op}
            onClick={() => handleOperationChange(op)}
            className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all border ${operation === op
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-muted border-border hover:bg-muted/80 text-foreground'
            }`}
          >
            {OPERATION_CONFIG[op].label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">{config.description}</p>

      {/* Inputs */}
      <div className="space-y-4">
        {config.inputs.map(key => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1.5">
              {getInputLabel(key, operation)}
              {errors[key] && (
                <span className="ml-2 text-xs text-red-500 font-normal">{errors[key]}</span>
              )}
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={inputs[key] ?? ''}
                placeholder={getInputPlaceholder(key)}
                onChange={e => {
                  setInputs(prev => ({ ...prev, [key]: e.target.value }))
                  // Clear result when inputs change so stale result is not shown
                  setComputed(null)
                  // Clear field error on change
                  setErrors(prev => { const next = { ...prev }; delete next[key]; return next })
                }}
                onKeyDown={e => e.key === 'Enter' && calculate()}
                className={`w-full p-3 border rounded-lg bg-background text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors[key] ? 'border-red-400' : 'border-border'
                  }`}
              />
              {key === 'percent' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                  %
                </span>
              )}
            </div>

            {/* Percentage slider for percent inputs */}
            {key === 'percent' && (
              <div className="mt-2 space-y-1">
                <input
                  type="range"
                  min={operation === 'reverse' ? -99 : 0}
                  max={200}
                  step={1}
                  value={parseFloat(inputs.percent) || 0}
                  onChange={e => {
                    setInputs(prev => ({ ...prev, percent: e.target.value }))
                    setComputed(null)
                  }}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{operation === 'reverse' ? '−99%' : '0%'}</span>
                  <span>100%</span>
                  <span>200%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculate}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
      >
        Calculate
      </button>

      {/* Result Card — only shown after explicit calculate */}
      {computed && isFinite(computed.result) && (
        <div className="rounded-xl border border-border bg-muted overflow-hidden">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Result</p>
                <p className="text-4xl font-bold text-foreground tabular-nums leading-none">
                  {formatResult(computed.result)}
                  {resultUnit && <span className="text-2xl ml-1 font-medium text-muted-foreground">{resultUnit}</span>}
                </p>
              </div>
              <button
                onClick={handleCopy}
                title="Copy result"
                className="mt-1 px-3 py-1.5 text-xs rounded-md border border-border bg-background hover:bg-muted transition-colors font-medium"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Formula bar */}
          <div className="border-t border-border px-4 py-2.5 flex items-center justify-between gap-2">
            <code className="text-xs text-muted-foreground font-mono truncate">{computed.formula}</code>
            <button
              onClick={() => setShowBreakdown(v => !v)}
              className="text-xs text-primary underline-offset-2 hover:underline shrink-0"
            >
              {showBreakdown ? 'Hide' : 'Show'} steps
            </button>
          </div>

          {/* Step-by-step breakdown */}
          {showBreakdown && computed.breakdown.length > 0 && (
            <div className="border-t border-border px-4 py-3 space-y-1.5">
              {computed.breakdown.map((step, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-muted-foreground shrink-0 font-mono">{i + 1}.</span>
                  <code className="text-foreground font-mono">{step}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Presets */}
      {(operation === 'of' || operation === 'increase' || operation === 'decrease') && (
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Quick percentages</p>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 15, 20, 25, 33, 50, 75].map(p => (
              <button
                key={p}
                onClick={() => {
                  setInputs(prev => ({ ...prev, percent: String(p) }))
                  setComputed(null)
                }}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${parseFloat(inputs.percent) === p
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border bg-background hover:bg-muted'
                  }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div>
          <button
            onClick={() => setShowHistory(v => !v)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-base">{showHistory ? '▾' : '▸'}</span>
            History ({history.length})
          </button>
          {showHistory && (
            <div className="mt-2 space-y-2">
              {history.map((entry, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setOperation(entry.operation)
                    const strInputs: Record<string, string> = {}
                    Object.entries(entry.inputs).forEach(([k, v]) => { strInputs[k] = String(v) })
                    setInputs(strInputs)
                    // Restore the result for this history entry immediately
                    const res = compute(entry.operation, entry.inputs)
                    setComputed(res)
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {OPERATION_CONFIG[entry.operation].label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <code className="text-xs text-muted-foreground font-mono truncate mr-2">{entry.formula}</code>
                    <span className="text-sm font-semibold text-foreground shrink-0">
                      = {formatResult(entry.result)}
                    </span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setHistory([])}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear history
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}