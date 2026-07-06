'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { CronExpressionParser } from 'cron-parser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, RefreshCw, ArrowRightLeft } from 'lucide-react'

const PRESETS = [
  { label: 'Every minute', expr: '* * * * *', quartz: '* * * * * ?' },
  { label: 'Every 5 min', expr: '*/5 * * * *', quartz: '0 */5 * * * ?' },
  { label: 'Every 15 min', expr: '*/15 * * * *', quartz: '0 */15 * * * ?' },
  { label: 'Every 30 min', expr: '*/30 * * * *', quartz: '0 */30 * * * ?' },
  { label: 'Hourly', expr: '0 * * * *', quartz: '0 0 * * * ?' },
  { label: 'Daily at midnight', expr: '0 0 * * *', quartz: '0 0 0 * * ?' },
  { label: 'Daily at 3am', expr: '0 3 * * *', quartz: '0 0 3 * * ?' },
  { label: 'Weekdays only', expr: '0 9 * * 1-5', quartz: '0 0 9 ? * 2-6' },
  { label: 'Weekends only', expr: '0 10 * * 0,6', quartz: '0 0 10 ? * 1,7' },
  { label: 'Weekly (Sun)', expr: '0 0 * * 0', quartz: '0 0 0 ? * 1' },
  { label: 'Monthly (1st)', expr: '0 0 1 * *', quartz: '0 0 0 1 * ?' },
  { label: '@yearly', expr: '0 0 1 1 *', quartz: '0 0 0 1 1 ? *' },
]

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function naturalLanguageToCron(text: string, quartz: boolean): string | null {
  const t = text.trim().toLowerCase()
  if (!t) return null

  let minute = 0
  let hour = 0
  let dayOfMonth = '*'
  let month = '*'
  let dayOfWeek = '*'

  try {
    if (/^\d+\s+minutes?$/.test(t)) {
      const m = parseInt(t.match(/^(\d+)/)![1], 10)
      if (m >= 1 && m <= 59) return quartz ? `0 */${m} * * * ?` : `*/${m} * * * *`
    }
    if (/^\d+\s+seconds?$/.test(t) && quartz) {
      const s = parseInt(t.match(/^(\d+)/)![1], 10)
      if (s >= 1 && s <= 59) return `*/${s} 0 * * * ?`
    }

    if (/^every\s+(\d+)\s+minutes?$/i.test(t)) {
      const m = parseInt(t.match(/^every\s+(\d+)\s+minutes?$/i)![1], 10)
      if (m >= 1 && m <= 59) return quartz ? `0 */${m} * * * ?` : `*/${m} * * * *`
    }
    if (/^every\s+(\d+)\s+seconds?$/i.test(t) && quartz) {
      const s = parseInt(t.match(/^every\s+(\d+)\s+seconds?$/i)![1], 10)
      if (s >= 1 && s <= 59) return `*/${s} 0 * * * ?`
    }

    if (/^every\s+hour$/i.test(t)) {
      return quartz ? '0 0 * * * ?' : '0 * * * *'
    }
    if (/^every\s+(\d+)\s+hours?$/i.test(t)) {
      const h = parseInt(t.match(/^every\s+(\d+)\s+hours?$/i)![1], 10)
      if (h >= 1 && h <= 23) return quartz ? `0 0 */${h} * * ?` : `0 */${h} * * *`
    }

    if (/^(every\s+)?(minute|min)$/i.test(t)) {
      return quartz ? '* * * * * ?' : '* * * * *'
    }

    const dailyAt = t.match(/^(every\s+)?day\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
    if (dailyAt) {
      let h = parseInt(dailyAt[2], 10)
      const m = dailyAt[3] ? parseInt(dailyAt[3], 10) : 0
      const ampm = dailyAt[4]?.toLowerCase()
      if (ampm === 'pm' && h < 12) h += 12
      if (ampm === 'am' && h === 12) h = 0
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        return quartz ? `0 ${m} ${h} * * ?` : `${m} ${h} * * *`
      }
    }

    const dailyEvery = t.match(/^(every\s+)?(\d+)\s+hours?$/i)
    if (dailyEvery) {
      const h = parseInt(dailyEvery[2], 10)
      if (h >= 1 && h <= 23) return quartz ? `0 0 */${h} * * ?` : `0 */${h} * * *`
    }

    const everyXMin = t.match(/^(every\s+)?(\d+)\s+minutes?$/i)
    if (everyXMin) {
      const m = parseInt(everyXMin[2], 10)
      if (m >= 1 && m <= 59) return quartz ? `0 */${m} * * * ?` : `*/${m} * * * *`
    }

    const weekdays = /weekdays|weekdays?\s+only|mon.?fri|mon.?through\s+fri/i.test(t)
    const weekends = /weekends|weekends?\s+only|sat.?sun/i.test(t)

    if (weekdays) dayOfWeek = '1-5'
    if (weekends) dayOfWeek = '0,6'

    const weeklyAt = t.match(/(?:every\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i)
    if (weeklyAt) {
      const dayMap: Record<string, string> = {
        monday: '1', mon: '1', tuesday: '2', tue: '2', wednesday: '3', wed: '3',
        thursday: '4', thu: '4', friday: '5', fri: '5', saturday: '6', sat: '6', sunday: '0', sun: '0'
      }
      dayOfWeek = dayMap[weeklyAt[1].toLowerCase()] || '*'
      let h = parseInt(weeklyAt[2], 10)
      const m = weeklyAt[3] ? parseInt(weeklyAt[3], 10) : 0
      const ampm = weeklyAt[4]?.toLowerCase()
      if (ampm === 'pm' && h < 12) h += 12
      if (ampm === 'am' && h === 12) h = 0
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        minute = m; hour = h
        return quartz ? `0 ${m} ${h} ? * ${dayOfWeek}` : `${m} ${h} * * ${dayOfWeek}`
      }
    }

    const daily = /daily|every\s+day|each\s+day/i.test(t)
    if (daily) {
      return quartz ? '0 0 0 * * ?' : '0 0 * * *'
    }

    const monthly = /monthly|every\s+month|each\s+month/i.test(t)
    if (monthly) {
      return quartz ? '0 0 0 1 * ?' : '0 0 1 * *'
    }

    const yearly = /yearly|every\s+year|each\s+year|annually/i.test(t)
    if (yearly) {
      return quartz ? '0 0 0 1 1 ? *' : '0 0 1 1 *'
    }

    const weeklyMatch = t.match(/(?:every\s+)?week(?:ly)?/i)
    if (weeklyMatch) {
      return quartz ? '0 0 0 * * 1' : '0 0 * * 0'
    }

    const atOnly = t.match(/^at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i)
    if (atOnly) {
      let h = parseInt(atOnly[1], 10)
      const m = atOnly[2] ? parseInt(atOnly[2], 10) : 0
      const ampm = atOnly[3]?.toLowerCase()
      if (ampm === 'pm' && h < 12) h += 12
      if (ampm === 'am' && h === 12) h = 0
      if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
        return quartz ? `0 ${m} ${h} * * ?` : `${m} ${h} * * *`
      }
    }

    const midnight = /midnight|start\s+of\s+day/i.test(t)
    if (midnight) {
      return quartz ? '0 0 0 * * ?' : '0 0 * * *'
    }

    const midday = /noon|midday/i.test(t)
    if (midday) {
      return quartz ? '0 0 12 * * ?' : '0 12 * * *'
    }
  } catch {
    return null
  }

  return null
}

function cronToHuman(expr: string, quartz: boolean): string {
  if (!expr || expr.trim() === '') return ''
  const parts = expr.trim().split(/\s+/)
  const expected = quartz ? 6 : 5
  if (parts.length < expected) return ''

  let sec = '0', min, hr, dom, mon, dow, yr
  if (quartz) {
    ;[sec, min, hr, dom, mon, dow, yr] = parts
  } else {
    ;[min, hr, dom, mon, dow] = parts
  }

  const isEvery = (v: string) => v === '*' || v === '?'
  const partsDesc: string[] = []

  if (quartz && !isEvery(sec)) {
    if (sec.startsWith('*/')) partsDesc.push(`every ${sec.slice(2)} seconds`)
    else if (sec.includes(',')) partsDesc.push(`at seconds ${sec}`)
    else partsDesc.push(`at second ${sec}`)
  }

  if (isEvery(min) && isEvery(hr) && isEvery(dom) && isEvery(mon) && isEvery(dow)) {
    return quartz ? 'Every second' : 'Every minute'
  }

  if (min.startsWith('*/') && isEvery(hr) && isEvery(dom) && isEvery(mon) && isEvery(dow)) {
    return `Every ${min.slice(2)} minutes`
  }
  if (hr.startsWith('*/') && isEvery(min) && isEvery(dom) && isEvery(mon) && isEvery(dow)) {
    return `Every ${hr.slice(2)} hours`
  }

  if (!isEvery(min)) {
    if (min.includes(',')) partsDesc.push(`at minute ${min}`)
    else if (!min.startsWith('*/')) partsDesc.push(`at minute ${min}`)
  }

  if (!isEvery(hr)) {
    if (hr.includes(',')) partsDesc.push(`past hour ${hr}`)
    else if (!hr.startsWith('*/')) partsDesc.push(`past hour ${hr}`)
  }

  if (!isEvery(hr) || !isEvery(min)) {
    const h = parseInt(hr, 10)
    const m = parseInt(min, 10)
    if (!isNaN(h) && !isNaN(m) && !hr.includes(',') && !min.includes(',') && !hr.startsWith('*/') && !min.startsWith('*/')) {
      const period = h >= 12 ? 'PM' : 'AM'
      const h12 = h % 12 || 12
      partsDesc.push(`At ${h12}:${m.toString().padStart(2, '0')} ${period}`)
    }
  }

  if (!isEvery(dom)) {
    if (dom.startsWith('*/')) partsDesc.push(`every ${dom.slice(2)} days`)
    else if (dom.includes(',')) partsDesc.push(`on days ${dom}`)
    else partsDesc.push(`on day ${dom}`)
  }

  if (!isEvery(mon)) {
    const mNum = parseInt(mon, 10)
    if (!isNaN(mNum) && mNum >= 1 && mNum <= 12) partsDesc.push(`in ${MONTH_NAMES[mNum - 1]}`)
    else if (mon.includes(',')) partsDesc.push(`in months ${mon}`)
    else partsDesc.push(`in month ${mon}`)
  }

  if (!isEvery(dow)) {
    const cleanDOW = dow.replace(/,/g, ', ')
    if (/^\d$/.test(dow)) {
      const d = parseInt(dow, 10)
      const idx = quartz ? (d >= 1 && d <= 7 ? d - 1 : d) : d
      partsDesc.push(`on ${DAY_NAMES[idx] || dow}`)
    } else if (/^\d-\d$/.test(dow)) {
      const [s, e] = dow.split('-').map(Number)
      const sn = quartz ? (s >= 1 && s <= 7 ? DAY_NAMES[s - 1] : DAY_NAMES[s]) : DAY_NAMES[s]
      const en = quartz ? (e >= 1 && e <= 7 ? DAY_NAMES[e - 1] : DAY_NAMES[e]) : DAY_NAMES[e]
      partsDesc.push(`on ${sn}-${en}`)
    } else {
      partsDesc.push(`on days ${cleanDOW}`)
    }
  }

  if (yr && !isEvery(yr)) {
    partsDesc.push(`in year ${yr}`)
  }

  if (partsDesc.length === 0) {
    if (quartz) return 'Every second'
    return 'Every minute'
  }

  const result = partsDesc.join(', ')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

function convertQuartzDow(dow: string): string {
  if (dow === '*') return dow
  const convertSingle = (val: string): string => {
    const n = parseInt(val, 10)
    if (isNaN(n)) return val
    if (n >= 1 && n <= 7) return `${n - 1}`
    return val
  }
  if (dow.includes(',')) {
    return dow.split(',').map(convertSingle).join(',')
  }
  if (dow.includes('-')) {
    const [start, end] = dow.split('-')
    return `${convertSingle(start)}-${convertSingle(end)}`
  }
  return convertSingle(dow)
}

function quartzToStandardForCalc(quartzParts: string[]): string {
  const [, min, hour, dom, month] = quartzParts
  const dow = quartzParts.length >= 6 ? quartzParts[5] : '*'
  const normalizedDom = dom === '?' ? '*' : dom
  const normalizedDow = dow === '?' ? '*' : convertQuartzDow(dow)
  return `${min} ${hour} ${normalizedDom} ${month} ${normalizedDow}`
}

function validateCronExpression(expr: string, quartz: boolean): string | null {
  if (!expr || !expr.trim()) return 'Please enter a cron expression'
  const parts = expr.trim().split(/\s+/)
  if (quartz) {
    if (parts.length < 6 || parts.length > 7) {
      return 'Quartz cron requires 6 fields (seconds, minute, hour, day-of-month, month, day-of-week) or 7 including year'
    }
  } else if (parts.length !== 5) {
    return 'Standard cron requires exactly 5 fields (minute, hour, day-of-month, month, day-of-week)'
  }
  try {
    let parseExpr = expr.trim()
    if (quartz) {
      parseExpr = quartzToStandardForCalc(parts)
    }
    CronExpressionParser.parse(parseExpr)
    return null
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('Constraint error')) {
      const fieldMatch = msg.match(/got value (\d+) expected range (\d+)-(\d+)/)
      if (fieldMatch) {
        return `Value ${fieldMatch[1]} is out of range (expected ${fieldMatch[2]}-${fieldMatch[3]})`
      }
    }
    if (msg.includes('Unrecognized')) return `Invalid character in expression: ${msg}`
    return `Invalid cron expression: ${msg}`
  }
}

function getNextRuns(expr: string, quartz: boolean, count: number = 5): { runs: string[]; error: string | null } {
  try {
    let parseExpr = expr.trim()
    if (quartz) {
      const parts = parseExpr.split(/\s+/)
      if (parts.length < 6) return { runs: [], error: 'Invalid Quartz expression' }
      parseExpr = quartzToStandardForCalc(parts)
    }
    const interval = CronExpressionParser.parse(parseExpr)
    const runs: string[] = []
    for (let i = 0; i < count; i++) {
      const next = interval.next()
      runs.push(next.toISOString() ?? '')
    }
    return { runs, error: null }
  } catch (e: unknown) {
    return { runs: [], error: e instanceof Error ? e.message : String(e) }
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  })
}

type InputMode = 'build' | 'natural' | 'paste'

export function CronExpressionGeneratorTool() {
  const searchParams = useSearchParams()

  const [mode, setMode] = useState<'standard' | 'quartz'>('standard')
  const [inputMode, setInputMode] = useState<InputMode>('build')
  const [naturalInput, setNaturalInput] = useState('')
  const [pasteInput, setPasteInput] = useState('')
  const [expr, setExpr] = useState('0 0 * * *')
  const [humanReadable, setHumanReadable] = useState('')
  const [nextRuns, setNextRuns] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [bMinute, setBMinute] = useState('0')
  const [bHour, setBHour] = useState('0')
  const [bDayOfMonth, setBDayOfMonth] = useState('*')
  const [bMonth, setBMonth] = useState('*')
  const [bDayOfWeek, setBDayOfWeek] = useState('*')
  const [bSeconds, setBSeconds] = useState('0')
  const [bYear, setBYear] = useState('*')

  const buildFromSelectors = useCallback(() => {
    if (mode === 'standard') {
      return `${bMinute} ${bHour} ${bDayOfMonth} ${bMonth} ${bDayOfWeek}`
    }
    const dom = bDayOfMonth === '*' && bDayOfWeek !== '*' ? '?' : bDayOfMonth === '*' ? '*' : bDayOfMonth
    const dow = bDayOfWeek !== '*' ? bDayOfWeek : '?'
    return `${bSeconds} ${bMinute} ${bHour} ${dom} ${bMonth} ${dow}${bYear && bYear !== '*' ? ` ${bYear}` : ''}`
  }, [mode, bMinute, bHour, bDayOfMonth, bMonth, bDayOfWeek, bSeconds, bYear])

  const updateFromExpr = useCallback((newExpr: string, quartzMode: boolean) => {
    setExpr(newExpr)
    setError(null)
    const err = validateCronExpression(newExpr, quartzMode)
    if (err) {
      setError(err)
      setHumanReadable('')
      setNextRuns([])
      return
    }
    setHumanReadable(cronToHuman(newExpr, quartzMode))
    const { runs, error: runErr } = getNextRuns(newExpr, quartzMode, 5)
    if (runErr) {
      setNextRuns([])
    } else {
      setNextRuns(runs)
    }
  }, [])

  useEffect(() => {
    const qExpr = searchParams.get('expr')
    if (qExpr) {
      const decoded = decodeURIComponent(qExpr)
      const isQuartz = decoded.split(/\s+/).length >= 6
      if (isQuartz) setMode('quartz')
      setPasteInput(decoded)
      updateFromExpr(decoded, isQuartz)
    }
  }, [searchParams, updateFromExpr])

  useEffect(() => {
    const newExpr = buildFromSelectors()
    updateFromExpr(newExpr, mode === 'quartz')
  }, [mode, buildFromSelectors, updateFromExpr])

  const handleModeToggle = useCallback(() => {
    setMode(prev => {
      const next = prev === 'standard' ? 'quartz' : 'standard'
      const newExpr = buildFromSelectors()
      updateFromExpr(newExpr, next === 'quartz')
      return next
    })
  }, [buildFromSelectors, updateFromExpr])

  const handleNaturalParse = useCallback(() => {
    if (!naturalInput.trim()) return
    const result = naturalLanguageToCron(naturalInput, mode === 'quartz')
    if (result) {
      setExpr(result)
      updateFromExpr(result, mode === 'quartz')
    } else {
      setError('Could not parse that natural language phrase. Try something like "every day at 3am" or "every 15 minutes".')
    }
  }, [naturalInput, mode, updateFromExpr])

  const handlePasteTranslate = useCallback(() => {
    if (!pasteInput.trim()) return
    updateFromExpr(pasteInput.trim(), mode === 'quartz')
  }, [pasteInput, mode, updateFromExpr])

  const handlePreset = useCallback((preset: typeof PRESETS[0]) => {
    const qMode = mode === 'quartz'
    const val = qMode ? preset.quartz : preset.expr
    setExpr(val)
    setPasteInput('')
    setNaturalInput('')
    updateFromExpr(val, qMode)
  }, [mode, updateFromExpr])

  const clearAll = useCallback(() => {
    setExpr('0 0 * * *')
    setNaturalInput('')
    setPasteInput('')
    setError(null)
    setHumanReadable('')
    setNextRuns([])
    setBMinute('0')
    setBHour('0')
    setBDayOfMonth('*')
    setBMonth('*')
    setBDayOfWeek('*')
    setBSeconds('0')
    setBYear('*')
  }, [])

  const copyExpr = useCallback(() => {
    navigator.clipboard.writeText(expr)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [expr])

  const handleExprDirectEdit = useCallback((value: string) => {
    setExpr(value)
  }, [])

  const commitDirectEdit = useCallback(() => {
    updateFromExpr(expr, mode === 'quartz')
  }, [expr, mode, updateFromExpr])

  const minOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = []
    for (let i = 0; i < 60; i++) {
      const label = i < 10 ? `0${i}` : `${i}`
      opts.push({ value: `${i}`, label })
    }
    return opts
  }, [])

  const hourOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = []
    for (let i = 0; i < 24; i++) {
      const label = i < 10 ? `0${i}00` : `${i}00`
      opts.push({ value: `${i}`, label: `${i.toString().padStart(2, '0')}:00` })
    }
    return opts
  }, [])

  const domOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [{ value: '*', label: 'Every day' }]
    for (let i = 1; i <= 31; i++) opts.push({ value: `${i}`, label: `${i}` })
    return opts
  }, [])

  const monthOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [{ value: '*', label: 'Every month' }]
    for (let i = 1; i <= 12; i++) opts.push({ value: `${i}`, label: MONTH_NAMES[i - 1] })
    return opts
  }, [])

  const dowOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [{ value: '*', label: 'Every day' }]
    const names = mode === 'quartz'
      ? ['Sun (1)', 'Mon (2)', 'Tue (3)', 'Wed (4)', 'Thu (5)', 'Fri (6)', 'Sat (7)']
      : ['Sun (0)', 'Mon (1)', 'Tue (2)', 'Wed (3)', 'Thu (4)', 'Fri (5)', 'Sat (6)']
    for (let i = 0; i < 7; i++) {
      const val = mode === 'quartz' ? `${i + 1}` : `${i}`
      opts.push({ value: val, label: names[i] })
    }
    return opts
  }, [mode])

  const presetExprs = useMemo(() => PRESETS.map(p => mode === 'quartz' ? p.quartz : p.expr), [mode])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium">Format:</span>
        <div className="flex gap-2">
          <Button
            variant={mode === 'standard' ? 'default' : 'outline'}
            size="sm"
            onClick={handleModeToggle}
            aria-pressed={mode === 'standard'}
          >
            Standard (5-field)
          </Button>
          <Button
            variant={mode === 'quartz' ? 'default' : 'outline'}
            size="sm"
            onClick={handleModeToggle}
            aria-pressed={mode === 'quartz'}
          >
            Quartz (6-7 field)
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border">
        {(['build', 'natural', 'paste'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setInputMode(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${inputMode === tab
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            role="tab"
            aria-selected={inputMode === tab}
          >
            {tab === 'build' ? 'Visual Builder' : tab === 'natural' ? 'Natural Language' : 'Paste & Translate'}
          </button>
        ))}
      </div>

      {inputMode === 'build' && (
        <div className="space-y-4">
          {mode === 'quartz' && (
            <div>
              <Label htmlFor="cron-seconds">Seconds</Label>
              <select
                id="cron-seconds"
                value={bSeconds}
                onChange={e => setBSeconds(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {[{ value: '*', label: 'Every second' }, ...minOptions.map(o => ({ value: o.value, label: o.label === '00' ? '0' : o.label }))].map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <Label htmlFor="cron-minute">Minute</Label>
              <select
                id="cron-minute"
                value={bMinute}
                onChange={e => setBMinute(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {[{ value: '*', label: 'Every minute' }, ...minOptions].map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="cron-hour">Hour</Label>
              <select
                id="cron-hour"
                value={bHour}
                onChange={e => setBHour(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {[{ value: '*', label: 'Every hour' }, ...hourOptions].map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="cron-dom">Day of Month</Label>
              <select
                id="cron-dom"
                value={bDayOfMonth}
                onChange={e => setBDayOfMonth(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {domOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="cron-month">Month</Label>
              <select
                id="cron-month"
                value={bMonth}
                onChange={e => setBMonth(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {monthOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="cron-dow">Day of Week</Label>
              <select
                id="cron-dow"
                value={bDayOfWeek}
                onChange={e => setBDayOfWeek(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {dowOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          {mode === 'quartz' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="cron-year">Year (optional)</Label>
                <select
                  id="cron-year"
                  value={bYear}
                  onChange={e => setBYear(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="*">Every year</option>
                  {Array.from({ length: 30 }, (_, i) => 2026 + i).map(y => (
                    <option key={y} value={`${y}`}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {inputMode === 'natural' && (
        <div className="space-y-3">
          <Label htmlFor="cron-natural">Describe your schedule in plain English</Label>
          <div className="flex gap-2">
            <Input
              id="cron-natural"
              type="text"
              placeholder='e.g. "every day at 3am", "every 15 minutes", "every monday at 9:30am"'
              value={naturalInput}
              onChange={e => setNaturalInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleNaturalParse() }}
            />
            <Button onClick={handleNaturalParse}>
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Parse
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Try: every day at 3am, every 15 minutes, every monday at 9:30am, weekdays only, midnight, hourly, every 5 minutes
          </p>
        </div>
      )}

      {inputMode === 'paste' && (
        <div className="space-y-3">
          <Label htmlFor="cron-paste">Paste a cron expression to translate or validate</Label>
          <div className="flex gap-2">
            <Input
              id="cron-paste"
              type="text"
              placeholder={mode === 'standard' ? 'e.g. 0 3 * * *' : 'e.g. 0 0 3 ? * MON-FRI'}
              value={pasteInput}
              onChange={e => setPasteInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handlePasteTranslate() }}
            />
            <Button onClick={handlePasteTranslate}>
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Translate
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-card border border-border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="cron-expr" className="text-sm font-medium">Generated Cron Expression</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearAll}>
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={copyExpr} disabled={!expr}>
              {copied ? (
                <><Check className="w-3.5 h-3.5 mr-1 text-green-600" />Copied!</>
              ) : (
                <><Copy className="w-3.5 h-3.5 mr-1" />Copy</>
              )}
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            id="cron-expr"
            type="text"
            value={expr}
            onChange={e => handleExprDirectEdit(e.target.value)}
            onBlur={commitDirectEdit}
            onKeyDown={e => { if (e.key === 'Enter') commitDirectEdit() }}
            className="font-mono text-lg"
            aria-describedby={error ? 'cron-error' : undefined}
            aria-invalid={!!error}
          />
        </div>
        {error && (
          <div id="cron-error" role="alert" className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}
      </div>

      {humanReadable && !error && (
        <div className="p-4 bg-card border border-border rounded-lg">
          <p className="text-sm font-medium mb-1">Human-readable description</p>
          <p className="text-base" role="status" aria-live="polite">{humanReadable}</p>
        </div>
      )}

      {nextRuns.length > 0 && !error && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Next 5 run times</p>
          <div className="space-y-1" role="status" aria-live="polite">
            {nextRuns.map((run, i) => (
              <div key={i} className="p-2 bg-card border border-border rounded text-sm font-mono">
                {formatDate(run)}
              </div>
            ))}
          </div>
          {mode === 'quartz' && (
            <p className="text-xs text-muted-foreground">
              Times shown to the minute; the generated Quartz expression preserves your exact seconds value for use in your scheduler.
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={() => handlePreset(preset)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-card border border-border rounded-lg space-y-2">
        <p className="font-semibold">About cron timezones:</p>
        <p className="text-sm text-muted-foreground">
          Cron expressions do not include timezone information. A cron job runs according to the
          local timezone of the system executing it. If your server is in UTC and you are in
          Eastern Time, "0 3 * * *" will run at 3:00 AM server time, not your local time.
          Always verify your server&apos;s timezone before deploying a cron schedule.
        </p>
      </div>
    </div>
  )
}
