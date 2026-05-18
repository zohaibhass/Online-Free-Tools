'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([''])
  const [format, setFormat] = useState<'v4' | 'uppercase'>('v4')
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState(false)

  function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const generate = () => {
    const newUuids = Array.from({ length: count }).map(() => {
      let uuid = generateUUID()
      if (format === 'uppercase') {
        uuid = uuid.toUpperCase()
      }
      return uuid
    })
    setUuids(newUuids)
  }

  const copyToClipboard = () => {
    const text = uuids.join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Number of UUIDs</label>
          <Input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Format</label>
          <div className="flex gap-2">
            <Button
              variant={format === 'v4' ? 'default' : 'outline'}
              onClick={() => setFormat('v4')}
              className="flex-1"
            >
              Lowercase
            </Button>
            <Button
              variant={format === 'uppercase' ? 'default' : 'outline'}
              onClick={() => setFormat('uppercase')}
              className="flex-1"
            >
              Uppercase
            </Button>
          </div>
        </div>
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium mb-2">Generated UUIDs</label>
        <textarea
          value={uuids.join('\n')}
          readOnly
          className="w-full h-64 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-muted text-foreground"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={generate} className="flex-1 md:flex-initial">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          disabled={!uuids[0]}
          className="flex-1 md:flex-initial"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy All'}
        </Button>
        <Button
          onClick={() => {
            setUuids([''])
            setCount(1)
          }}
          variant="outline"
          className="flex-1 md:flex-initial"
        >
          Clear
        </Button>
      </div>

      {/* Info */}
      <div className="p-4 bg-card border border-border rounded-lg space-y-3">
        <h3 className="font-semibold">About UUIDs:</h3>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>UUID v4 uses random numbers for generation</li>
          <li>Universally unique across systems</li>
          <li>Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</li>
          <li>Perfect for database records and identifiers</li>
        </ul>
      </div>
    </div>
  )
}
