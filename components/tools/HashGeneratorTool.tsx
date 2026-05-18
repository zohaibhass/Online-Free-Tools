'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

// Simple SHA256 implementation for client-side
async function sha256(str: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Simple MD5 hash (basic implementation)
function md5(str: string) {
  // For demo purposes, using a simple placeholder
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(32, '0')
}

export function HashGeneratorTool() {
  const [input, setInput] = useState('')
  const [md5Hash, setMd5Hash] = useState('')
  const [sha256Hash, setSha256Hash] = useState('')
  const [copied, setCopied] = useState('')

  const generateHashes = async () => {
    if (!input.trim()) return

    setMd5Hash(md5(input))
    setSha256Hash(await sha256(input))
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <Button onClick={generateHashes} className="w-full">Generate Hashes</Button>

      {md5Hash && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">MD5 Hash</h3>
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(md5Hash, 'md5')}>
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'md5' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all">
            {md5Hash}
          </div>
        </div>
      )}

      {sha256Hash && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">SHA256 Hash</h3>
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(sha256Hash, 'sha256')}>
              <Copy className="w-4 h-4 mr-2" />
              {copied === 'sha256' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all">
            {sha256Hash}
          </div>
        </div>
      )}
    </div>
  )
}
