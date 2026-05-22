'use client'

import { useState, useCallback } from 'react'

// ── Color math helpers ────────────────────────────────────────────────────────

function clamp(v: number, mn = 0, mx = 255) { return Math.max(mn, Math.min(mx, v)) }
function toHex2(n: number) { return Math.round(n).toString(16).padStart(2, '0') }
function rgbToHex(r: number, g: number, b: number) { return '#' + toHex2(r) + toHex2(g) + toHex2(b) }

function hexToRgbObj(hex: string): { r: number; g: number; b: number } | null {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  if (hex.length !== 6) return null
  return { r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16) }
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (mx + mn) / 2
  if (mx !== mn) {
    const d = mx - mn
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
    switch (mx) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      default: h = ((r - g) / d + 4) / 6
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v] }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q
  return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1 / 3) * 255)]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn
  let h = 0
  const s = mx === 0 ? 0 : d / mx, v = mx
  if (d !== 0) {
    switch (mx) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      default: h = ((r - g) / d + 4) / 6
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)]
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100]
  r /= 255; g /= 255; b /= 255
  const k = 1 - Math.max(r, g, b)
  return [
    Math.round((1 - r - k) / (1 - k) * 100),
    Math.round((1 - g - k) / (1 - k) * 100),
    Math.round((1 - b - k) / (1 - k) * 100),
    Math.round(k * 100)
  ]
}

function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  let rr = r / 255, gg = g / 255, bb = b / 255
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92
  let x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) / 0.95047
  let y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) / 1.00000
  let z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) / 1.08883
  const f = (t: number) => t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116
  x = f(x); y = f(y); z = f(z)
  return [Math.round((116 * y - 16) * 10) / 10, Math.round(500 * (x - y) * 10) / 10, Math.round(200 * (y - z) * 10) / 10]
}

function getLuminance(r: number, g: number, b: number) {
  return [r, g, b].reduce((acc, v, i) => {
    v /= 255
    v = v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    return acc + v * [0.2126, 0.7152, 0.0722][i]
  }, 0)
}

function contrastRatio(l1: number, l2: number) {
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (light + 0.05) / (dark + 0.05)
}

function hueShift(h: number, deg: number) { return ((h + deg) % 360 + 360) % 360 }
function hslToHex(h: number, s: number, l: number) { const [r, g, b] = hslToRgb(h, s, l); return rgbToHex(r, g, b) }

// ── Types ─────────────────────────────────────────────────────────────────────

interface Color { r: number; g: number; b: number; a: number }

type Tab = 'convert' | 'sliders' | 'harmony' | 'contrast'

const PRESETS = ['#FF5733', '#E74C3C', '#8E44AD', '#2980B9', '#27AE60', '#F39C12', '#1ABC9C', '#2C3E50', '#ECF0F1', '#E67E22', '#16A085', '#D35400']

// ── Sub-components ────────────────────────────────────────────────────────────

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value).catch(() => { })
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div
      onClick={copy}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-accent cursor-pointer group transition-colors"
    >
      <span className="text-xs text-muted-foreground min-w-[72px]">{label}</span>
      <span className="font-mono text-sm flex-1 truncate">{value}</span>
      <span className={`text-xs px-2 py-0.5 rounded border transition-colors ${copied ? 'text-green-600 border-green-400' : 'text-muted-foreground border-border opacity-0 group-hover:opacity-100'}`}>
        {copied ? '✓' : 'copy'}
      </span>
    </div>
  )
}

function Swatch({ hex, onClick }: { hex: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={hex}
      className="w-8 h-8 rounded-md border border-border hover:scale-110 transition-transform"
      style={{ background: hex }}
    />
  )
}

function HarmonySwatch({ hex, label, onClick }: { hex: string; label: string; onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={onClick} title={hex} className="w-11 h-11 rounded-lg border border-border hover:scale-110 transition-transform" style={{ background: hex }} />
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function ColorConverterTool() {
  const [color, setColor] = useState<Color>({ r: 255, g: 87, b: 51, a: 100 })
  const [tab, setTab] = useState<Tab>('convert')
  const [recents, setRecents] = useState<string[]>(['#FF5733'])
  const [bgHex, setBgHex] = useState('#ffffff')

  const hex = rgbToHex(color.r, color.g, color.b)
  const [h, s, l] = rgbToHsl(color.r, color.g, color.b)
  const [hv, sv, vv] = rgbToHsv(color.r, color.g, color.b)
  const [c, m, y, k] = rgbToCmyk(color.r, color.g, color.b)
  const [L, A, B] = rgbToLab(color.r, color.g, color.b)
  const alpha = (color.a / 100).toFixed(2)
  const hex8 = hex + Math.round(color.a / 100 * 255).toString(16).padStart(2, '0')
  const previewBg = color.a < 100 ? `rgba(${color.r},${color.g},${color.b},${color.a / 100})` : hex

  const applyHex = useCallback((val: string) => {
    const obj = hexToRgbObj(val)
    if (!obj) return
    setColor(prev => ({ ...obj, a: prev.a }))
    setRecents(prev => [val, ...prev.filter(c => c !== val)].slice(0, 10))
  }, [])

  const bg = hexToRgbObj(bgHex) ?? { r: 255, g: 255, b: 255 }
  const l1 = getLuminance(color.r, color.g, color.b)
  const l2 = getLuminance(bg.r, bg.g, bg.b)
  const ratio = contrastRatio(l1, l2)

  const formats = [
    { label: 'HEX', value: hex },
    { label: 'HEX8', value: hex8 },
    { label: 'RGB', value: `rgb(${color.r}, ${color.g}, ${color.b})` },
    { label: 'RGBA', value: `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})` },
    { label: 'HSL', value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: 'HSLA', value: `hsla(${h}, ${s}%, ${l}%, ${alpha})` },
    { label: 'HSV', value: `hsv(${hv}, ${sv}%, ${vv}%)` },
    { label: 'CMYK', value: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` },
    { label: 'CSS var', value: `--color: ${hex};` },
    { label: 'Tailwind', value: `bg-[${hex}]` },
    { label: 'LAB', value: `lab(${L} ${A} ${B})` },
    { label: 'UIColor', value: `UIColor(red:${(color.r / 255).toFixed(2)}, green:${(color.g / 255).toFixed(2)}, blue:${(color.b / 255).toFixed(2)}, alpha:1)` },
    { label: 'Android', value: `Color.rgb(${color.r}, ${color.g}, ${color.b})` },
  ]

  const harmonyGroups = [
    { label: 'Complementary', colors: [{ hex, label: 'Base' }, { hex: hslToHex(hueShift(h, 180), s, l), label: '+180°' }] },
    { label: 'Triadic', colors: [{ hex, label: 'Base' }, { hex: hslToHex(hueShift(h, 120), s, l), label: '+120°' }, { hex: hslToHex(hueShift(h, 240), s, l), label: '+240°' }] },
    { label: 'Analogous', colors: [{ hex: hslToHex(hueShift(h, -30), s, l), label: '-30°' }, { hex, label: 'Base' }, { hex: hslToHex(hueShift(h, 30), s, l), label: '+30°' }] },
    { label: 'Split complementary', colors: [{ hex, label: 'Base' }, { hex: hslToHex(hueShift(h, 150), s, l), label: '+150°' }, { hex: hslToHex(hueShift(h, 210), s, l), label: '+210°' }] },
    { label: 'Tetradic', colors: [{ hex, label: 'Base' }, { hex: hslToHex(hueShift(h, 90), s, l), label: '+90°' }, { hex: hslToHex(hueShift(h, 180), s, l), label: '+180°' }, { hex: hslToHex(hueShift(h, 270), s, l), label: '+270°' }] },
    {
      label: 'Tints & shades',
      colors: [
        ...([4, 3, 2, 1].map(i => ({ hex: hslToHex(h, s, Math.min(95, l + i * 8)), label: `+${i * 8}%` }))),
        { hex, label: 'Base' },
        ...([1, 2, 3, 4].map(i => ({ hex: hslToHex(h, s, Math.max(5, l - i * 10)), label: `-${i * 10}%` }))),
      ]
    },
  ]

  const tabs: Tab[] = ['convert', 'sliders', 'harmony', 'contrast']

  return (
    <div className="space-y-4 text-sm">
      {/* Color picker + preview */}
      <div className="flex gap-3 items-center">
        <input
          type="color"
          value={hex}
          onChange={e => applyHex(e.target.value)}
          className="w-14 h-12 rounded-lg border border-border cursor-pointer p-0.5 bg-transparent"
        />
        <div className="flex-1 h-12 rounded-lg border border-border transition-all" style={{ background: previewBg }} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md border text-xs capitalize transition-colors ${tab === t ? 'bg-secondary border-border font-medium' : 'border-border/50 text-muted-foreground hover:bg-muted'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Convert tab */}
      {tab === 'convert' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'HEX', value: hex, onChange: (v: string) => applyHex(v) },
              { label: 'RGB', value: `${color.r}, ${color.g}, ${color.b}`, onChange: (v: string) => { const p = v.split(',').map(x => parseInt(x.trim())); if (p.length >= 3 && p.every(x => !isNaN(x))) setColor(prev => ({ r: clamp(p[0]), g: clamp(p[1]), b: clamp(p[2]), a: prev.a })) } },
              { label: 'HSL', value: `${h}, ${s}%, ${l}%`, onChange: (v: string) => { const p = v.match(/(\d+)/g)?.map(Number); if (p && p.length >= 3) { const [r, g, b] = hslToRgb(p[0], p[1], p[2]); setColor(prev => ({ r, g, b, a: prev.a })) } } },
            ].map(({ label, value, onChange }) => (
              <div key={label} className="space-y-1">
                <label className="text-xs text-muted-foreground">{label}</label>
                <input
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {formats.map(f => <CopyRow key={f.label} label={f.label} value={f.value} />)}
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Recent</p>
            <div className="flex flex-wrap gap-1.5">
              {recents.map(c => <Swatch key={c} hex={c} onClick={() => applyHex(c)} />)}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map(c => <Swatch key={c} hex={c} onClick={() => applyHex(c)} />)}
            </div>
          </div>
        </div>
      )}

      {/* Sliders tab */}
      {tab === 'sliders' && (
        <div className="space-y-4">
          {[
            { label: 'R', min: 0, max: 255, value: color.r, onChange: (v: number) => setColor(p => ({ ...p, r: v })) },
            { label: 'G', min: 0, max: 255, value: color.g, onChange: (v: number) => setColor(p => ({ ...p, g: v })) },
            { label: 'B', min: 0, max: 255, value: color.b, onChange: (v: number) => setColor(p => ({ ...p, b: v })) },
          ].map(({ label, min, max, value, onChange }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-4">{label}</span>
              <input type="range" min={min} max={max} step={1} value={value} onChange={e => onChange(+e.target.value)} className="flex-1" />
              <span className="font-mono text-xs w-8 text-right">{value}</span>
            </div>
          ))}

          <p className="text-xs text-muted-foreground pt-2">HSL</p>
          {[
            { label: 'H', min: 0, max: 360, value: h, onChange: (v: number) => { const [r, g, b] = hslToRgb(v, s, l); setColor(p => ({ ...p, r, g, b })) } },
            { label: 'S', min: 0, max: 100, value: s, onChange: (v: number) => { const [r, g, b] = hslToRgb(h, v, l); setColor(p => ({ ...p, r, g, b })) } },
            { label: 'L', min: 0, max: 100, value: l, onChange: (v: number) => { const [r, g, b] = hslToRgb(h, s, v); setColor(p => ({ ...p, r, g, b })) } },
          ].map(({ label, min, max, value, onChange }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-4">{label}</span>
              <input type="range" min={min} max={max} step={1} value={value} onChange={e => onChange(+e.target.value)} className="flex-1" />
              <span className="font-mono text-xs w-8 text-right">{value}</span>
            </div>
          ))}

          <p className="text-xs text-muted-foreground pt-2">Alpha</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-4">A</span>
            <input type="range" min={0} max={100} step={1} value={color.a} onChange={e => setColor(p => ({ ...p, a: +e.target.value }))} className="flex-1" />
            <span className="font-mono text-xs w-8 text-right">{color.a}%</span>
          </div>
        </div>
      )}

      {/* Harmony tab */}
      {tab === 'harmony' && (
        <div className="space-y-4">
          {harmonyGroups.map(group => (
            <div key={group.label}>
              <p className="text-xs text-muted-foreground mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.colors.map(({ hex: ch, label }) => (
                  <HarmonySwatch key={label} hex={ch} label={label} onClick={() => applyHex(ch)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contrast tab */}
      {tab === 'contrast' && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Background color</p>
            <div className="flex gap-3 items-center">
              <input type="color" value={bgHex} onChange={e => setBgHex(e.target.value)} className="w-12 h-10 rounded-lg border border-border cursor-pointer p-0.5 bg-transparent" />
              <input value={bgHex} onChange={e => setBgHex(e.target.value)} className="flex-1 px-3 py-2 border border-border rounded-lg font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background" />
            </div>
          </div>

          <div
            className="h-16 rounded-lg border border-border flex items-center justify-center text-xl font-medium"
            style={{ background: `rgb(${bg.r},${bg.g},${bg.b})`, color: `rgb(${color.r},${color.g},${color.b})` }}
          >
            Sample text
          </div>

          <div className="space-y-1">
            <CopyRow label="Ratio" value={`${ratio.toFixed(2)}:1`} />
            {[
              { label: 'WCAG AA', pass: ratio >= 4.5, note: 'normal text (4.5:1)' },
              { label: 'WCAG AAA', pass: ratio >= 7, note: 'normal text (7:1)' },
              { label: 'AA large', pass: ratio >= 3, note: 'large text (3:1)' },
            ].map(({ label, pass, note }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                <span className="text-xs text-muted-foreground min-w-[72px]">{label}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${pass ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {pass ? 'Pass' : 'Fail'}
                </span>
                <span className="text-xs text-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}