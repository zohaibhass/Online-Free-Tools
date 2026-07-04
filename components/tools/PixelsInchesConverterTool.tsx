'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeftRight, Copy, Check } from 'lucide-react'

const DPI_PRESETS = [
  { value: 72, label: '72 DPI (Web/Screen)' },
  { value: 96, label: '96 DPI (Windows Screen)' },
  { value: 150, label: '150 DPI (Draft Print)' },
  { value: 300, label: '300 DPI (Print Quality)' },
]

const COMMON_PIXELS = [96, 150, 300, 600, 1080, 1200, 1920]

function toInches(px: number, dpi: number): number {
  return px / dpi
}

function isValidNonNegative(value: string): boolean {
  const n = parseFloat(value)
  return value.trim() !== '' && !isNaN(n) && n >= 0
}

export function PixelsInchesConverterTool() {
  const searchParams = useSearchParams()

  const [pixels, setPixels] = useState('96')
  const [inches, setInches] = useState('1')
  const [dpi, setDpi] = useState(96)
  const [customDpi, setCustomDpi] = useState('96')
  const [showCustomDpi, setShowCustomDpi] = useState(false)
  const [wxhMode, setWxhMode] = useState(false)
  const [wxhPixelsW, setWxhPixelsW] = useState('1920')
  const [wxhPixelsH, setWxhPixelsH] = useState('1080')
  const [wxhInchesW, setWxhInchesW] = useState('20')
  const [wxhInchesH, setWxhInchesH] = useState('11.25')
  const [precision, setPrecision] = useState(3)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)
  const editMode = useRef<'pixels' | 'inches'>('pixels')

  const activeDpi = showCustomDpi ? (parseFloat(customDpi) || 96) : dpi

  // Deep-linking: ?px=1080&dpi=96, ?in=11.25&dpi=300, or ?wxh=true&w=1800&h=600&dpi=96
  // lets blog posts and other pages link directly to a pre-filled conversion.
  useEffect(() => {
    const pxParam = searchParams?.get('px')
    const inParam = searchParams?.get('in')
    const dpiParam = searchParams?.get('dpi')
    const wxhParam = searchParams?.get('wxh')
    const wParam = searchParams?.get('w')
    const hParam = searchParams?.get('h')

    let effectiveDpi = 96

    if (dpiParam) {
      const parsedDpi = parseInt(dpiParam, 10)
      if (!isNaN(parsedDpi) && parsedDpi > 0) {
        effectiveDpi = parsedDpi
        if (DPI_PRESETS.some((p) => p.value === parsedDpi)) {
          setShowCustomDpi(false)
          setDpi(parsedDpi)
        } else {
          setShowCustomDpi(true)
          setCustomDpi(parsedDpi.toString())
        }
      }
    }

    if (wxhParam === 'true') {
      setWxhMode(true)
    }

    if (wParam && isValidNonNegative(wParam)) {
      setWxhPixelsW(wParam)
      setWxhInchesW((parseFloat(wParam) / effectiveDpi).toFixed(3))
    }

    if (hParam && isValidNonNegative(hParam)) {
      setWxhPixelsH(hParam)
      setWxhInchesH((parseFloat(hParam) / effectiveDpi).toFixed(3))
    }

    if (pxParam && isValidNonNegative(pxParam)) {
      editMode.current = 'pixels'
      setPixels(pxParam)
    } else if (inParam && isValidNonNegative(inParam)) {
      editMode.current = 'inches'
      setInches(inParam)
    }
    // Only run on mount / when the query string actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handlePixelsChange = (value: string) => {
    setPixels(value)
    setTouched(true)
    editMode.current = 'pixels'
    if (isValidNonNegative(value)) {
      setInches((parseFloat(value) / activeDpi).toFixed(precision))
    }
  }

  const handleInchesChange = (value: string) => {
    setInches(value)
    setTouched(true)
    editMode.current = 'inches'
    if (isValidNonNegative(value)) {
      setPixels(Math.round(parseFloat(value) * activeDpi).toString())
    }
  }

  useEffect(() => {
    if (editMode.current === 'pixels') {
      if (isValidNonNegative(pixels)) {
        setInches((parseFloat(pixels) / activeDpi).toFixed(precision))
      }
    } else {
      if (isValidNonNegative(inches)) {
        setPixels(Math.round(parseFloat(inches) * activeDpi).toString())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDpi, precision])

  const handleDpiSelect = (value: string) => {
    if (value === 'custom') {
      setShowCustomDpi(true)
      setCustomDpi(activeDpi.toString())
    } else {
      setShowCustomDpi(false)
      setDpi(parseInt(value))
    }
  }

  const swap = () => {
    const tempPx = pixels
    const tempIn = inches
    setPixels(tempIn)
    setInches(tempPx)
    editMode.current = editMode.current === 'pixels' ? 'inches' : 'pixels'
  }

  const copyValue = useCallback((value: string, field: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 1800)
  }, [])

  const loadPixelValue = (px: number) => {
    editMode.current = 'pixels'
    setTouched(true)
    setPixels(px.toString())
    setInches((px / activeDpi).toFixed(precision))
  }

  const handleWxhPixelsW = (value: string) => {
    setWxhPixelsW(value)
    if (isValidNonNegative(value)) {
      setWxhInchesW((parseFloat(value) / activeDpi).toFixed(precision))
    }
  }

  const handleWxhPixelsH = (value: string) => {
    setWxhPixelsH(value)
    if (isValidNonNegative(value)) {
      setWxhInchesH((parseFloat(value) / activeDpi).toFixed(precision))
    }
  }

  const handleWxhInchesW = (value: string) => {
    setWxhInchesW(value)
    if (isValidNonNegative(value)) {
      setWxhPixelsW(Math.round(parseFloat(value) * activeDpi).toString())
    }
  }

  const handleWxhInchesH = (value: string) => {
    setWxhInchesH(value)
    if (isValidNonNegative(value)) {
      setWxhPixelsH(Math.round(parseFloat(value) * activeDpi).toString())
    }
  }

  const pixelsInvalid = touched && pixels.trim() !== '' && !isValidNonNegative(pixels)
  const inchesInvalid = touched && inches.trim() !== '' && !isValidNonNegative(inches)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Label htmlFor="dpi-select" className="text-sm font-medium shrink-0">
          DPI / PPI:
        </Label>
        <select
          id="dpi-select"
          aria-label="DPI or PPI preset"
          value={showCustomDpi ? 'custom' : dpi.toString()}
          onChange={(e) => handleDpiSelect(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {DPI_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
          <option value="custom">Custom</option>
        </select>
        {showCustomDpi && (
          <Input
            type="number"
            value={customDpi}
            onChange={(e) => setCustomDpi(e.target.value)}
            className="w-20 h-9"
            min={1}
            placeholder="DPI"
            aria-label="Custom DPI value"
          />
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          {activeDpi} px/inch
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-start">
        <div className="space-y-2">
          <Label htmlFor="pixels-input" className="text-sm font-medium">
            Pixels (px)
          </Label>
          <div className="relative">
            <Input
              id="pixels-input"
              type="number"
              value={pixels}
              onChange={(e) => handlePixelsChange(e.target.value)}
              placeholder="Enter pixels"
              className="text-2xl h-14 font-mono pr-10"
              min={0}
              step={1}
              aria-invalid={pixelsInvalid}
              aria-describedby={pixelsInvalid ? 'pixels-error' : undefined}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyValue(pixels, 'pixels')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              aria-label="Copy pixels value"
              disabled={!pixels}
            >
              {copiedField === 'pixels' ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
          {pixelsInvalid && (
            <p id="pixels-error" className="text-xs text-destructive">
              Enter a valid number, 0 or greater.
            </p>
          )}
        </div>

        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={swap}
            className="rounded-full h-10 w-10 border-2"
            aria-label="Swap pixels and inches values"
            title="Swap values"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inches-input" className="text-sm font-medium">
            Inches (in)
          </Label>
          <div className="relative">
            <Input
              id="inches-input"
              type="number"
              value={inches}
              onChange={(e) => handleInchesChange(e.target.value)}
              placeholder="Enter inches"
              className="text-2xl h-14 font-mono pr-10"
              min={0}
              step={0.001}
              aria-invalid={inchesInvalid}
              aria-describedby={inchesInvalid ? 'inches-error' : undefined}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyValue(inches, 'inches')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              aria-label="Copy inches value"
              disabled={!inches}
            >
              {copiedField === 'inches' ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
          {inchesInvalid && (
            <p id="inches-error" className="text-xs text-destructive">
              Enter a valid number, 0 or greater.
            </p>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground min-h-[1.25rem]" role="status" aria-live="polite">
        {isValidNonNegative(pixels) && editMode.current === 'pixels' ? (
          <span>
            {parseFloat(pixels).toLocaleString()} px at {activeDpi} DPI = {inches} inches
          </span>
        ) : isValidNonNegative(inches) ? (
          <span>
            {inches} inches at {activeDpi} DPI = {Math.round(parseFloat(inches) * activeDpi).toLocaleString()} px
          </span>
        ) : (
          <span>Enter a value above to convert</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="precision-select" className="text-xs text-muted-foreground">
          Precision:
        </Label>
        <select
          id="precision-select"
          aria-label="Decimal precision for inches result"
          value={precision}
          onChange={(e) => setPrecision(parseInt(e.target.value))}
          className="h-7 rounded border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value={0}>0 decimals</option>
          <option value={1}>1 decimal</option>
          <option value={2}>2 decimals</option>
          <option value={3}>3 decimals</option>
          <option value={4}>4 decimals</option>
          <option value={5}>5 decimals</option>
          <option value={6}>6 decimals</option>
        </select>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <Switch
          id="wxh-mode"
          checked={wxhMode}
          onCheckedChange={setWxhMode}
        />
        <Label htmlFor="wxh-mode" className="text-sm font-medium cursor-pointer">
          Width x Height mode
        </Label>
      </div>

      {wxhMode && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="space-y-2">
            <Label htmlFor="wxh-px-w" className="text-xs font-medium">Width (px)</Label>
            <Input
              id="wxh-px-w"
              type="number"
              value={wxhPixelsW}
              onChange={(e) => handleWxhPixelsW(e.target.value)}
              className="font-mono h-10"
              min={0}
              step={1}
            />
            <div className="relative">
              <Label htmlFor="wxh-in-w" className="text-xs text-muted-foreground">Width (inches)</Label>
              <Input
                id="wxh-in-w"
                type="number"
                value={wxhInchesW}
                onChange={(e) => handleWxhInchesW(e.target.value)}
                className="font-mono h-10 pr-10 mt-1"
                min={0}
                step={0.001}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyValue(wxhInchesW, 'wxh-w')}
                className="absolute right-1 bottom-1 h-8 w-8"
                aria-label="Copy width in inches"
              >
                {copiedField === 'wxh-w' ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wxh-px-h" className="text-xs font-medium">Height (px)</Label>
            <Input
              id="wxh-px-h"
              type="number"
              value={wxhPixelsH}
              onChange={(e) => handleWxhPixelsH(e.target.value)}
              className="font-mono h-10"
              min={0}
              step={1}
            />
            <div className="relative">
              <Label htmlFor="wxh-in-h" className="text-xs text-muted-foreground">Height (inches)</Label>
              <Input
                id="wxh-in-h"
                type="number"
                value={wxhInchesH}
                onChange={(e) => handleWxhInchesH(e.target.value)}
                className="font-mono h-10 pr-10 mt-1"
                min={0}
                step={0.001}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyValue(wxhInchesH, 'wxh-h')}
                className="absolute right-1 bottom-1 h-8 w-8"
                aria-label="Copy height in inches"
              >
                {copiedField === 'wxh-h' ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold mb-1">Common Conversions Reference</h3>
        <p className="text-xs text-muted-foreground mb-3">Click a row to load that pixel value above.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Pixels</th>
                <th className="text-right py-2 px-4 font-medium text-muted-foreground">At 96 DPI</th>
                <th className="text-right py-2 pl-4 font-medium text-muted-foreground">At 300 DPI</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_PIXELS.map((px) => (
                <tr
                  key={px}
                  className="border-b border-border/50 cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => loadPixelValue(px)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Load ${px} pixels into the converter`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      loadPixelValue(px)
                    }
                  }}
                >
                  <td className="py-2 pr-4 font-mono">{px}px</td>
                  <td className="text-right py-2 px-4 font-mono text-muted-foreground">
                    {toInches(px, 96).toFixed(3)} in
                  </td>
                  <td className="text-right py-2 pl-4 font-mono text-muted-foreground">
                    {toInches(px, 300).toFixed(3)} in
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}