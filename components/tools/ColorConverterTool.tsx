'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

export function ColorConverterTool() {
  const [hex, setHex] = useState('#FF5733')
  const [rgb, setRgb] = useState('255, 87, 51')
  const [copied, setCopied] = useState('')

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setHex(val)
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      setRgb(hexToRgb(val) || '')
    }
  }

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setRgb(val)
    const parts = val.split(',').map(p => parseInt(p.trim()))
    if (parts.length === 3 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255)) {
      setHex(rgbToHex(parts[0], parts[1], parts[2]))
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">HEX Color</label>
          <input
            type="text"
            value={hex}
            onChange={handleHexChange}
            placeholder="#FF5733"
            className="w-full p-3 border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Color Preview</label>
          <div
            className="w-full h-10 rounded-lg border-2 border-border"
            style={{ backgroundColor: hex }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">RGB Color</label>
        <input
          type="text"
          value={rgb}
          onChange={handleRgbChange}
          placeholder="255, 87, 51"
          className="w-full p-3 border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <div className="p-4 rounded-lg bg-muted border border-border">
        <div className="text-sm text-muted-foreground mb-2">Color Formats</div>
        <div className="space-y-2 text-sm font-mono">
          <div>HSL: hsl(11, 100%, 67%)</div>
          <div>Color Name: Tomato (approx)</div>
        </div>
      </div>
    </div>
  )
}
