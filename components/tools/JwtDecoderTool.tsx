'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, AlertCircle, CheckCircle } from 'lucide-react'

export function JwtDecoderTool() {
  const [jwt, setJwt] = useState('')
  const [decoded, setDecoded] = useState<any>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const decodeJWT = () => {
    setError('')
    setDecoded(null)

    if (!jwt.trim()) {
      setError('Please paste a JWT token')
      return
    }

    try {
      const parts = jwt.trim().split('.')
      if (parts.length !== 3) {
        setError('Invalid JWT format. Must have 3 parts separated by dots.')
        return
      }

      const decode = (str: string) => {
        const output = str.replace(/-/g, '+').replace(/_/g, '/')
        switch (output.length % 4) {
          case 0:
            break
          case 2:
          case 3:
            return JSON.parse(atob(output))
          default:
            throw new Error('Invalid base64url')
        }
        return JSON.parse(atob(output))
      }

      const header = decode(parts[0])
      const payload = decode(parts[1])

      setDecoded({
        header,
        payload,
        signature: parts[2],
      })
    } catch (err) {
      setError('Failed to decode JWT. Make sure it is a valid token.')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Paste JWT Token</label>
        <textarea
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full h-32 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        />
      </div>

      <Button onClick={decodeJWT} className="w-full">
        Decode JWT
      </Button>

      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Header</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(JSON.stringify(decoded.header))}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-xs">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Payload</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(JSON.stringify(decoded.payload))}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-xs">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Signature */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Signature</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(decoded.signature)}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-xs break-all">
              {decoded.signature}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
