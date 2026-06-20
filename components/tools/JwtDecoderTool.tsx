'use client'

import { useState, useMemo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Copy,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
  Trash2,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  ArrowLeftRight,
  Info,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface DecodedJwt {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
  rawParts: [string, string, string]
}

interface DecodeError {
  message: string
  hint?: string
}

type TimeStatus = 'expired' | 'not-yet-valid' | 'valid' | 'unknown'

/* ------------------------------------------------------------------ */
/* Claim metadata                                                     */
/* ------------------------------------------------------------------ */

const CLAIM_INFO: Record<string, string> = {
  iss: 'Issuer — who created and signed this token',
  sub: 'Subject — the identity this token represents',
  aud: 'Audience — who the token is intended for',
  exp: 'Expiration time — token is invalid after this',
  nbf: 'Not before — token is invalid until this time',
  iat: 'Issued at — when the token was created',
  jti: 'JWT ID — unique identifier for this token',
  alg: 'Algorithm used to sign this token',
  typ: 'Token type',
  kid: 'Key ID — identifies which key was used to sign',
  cty: 'Content type of the payload',
}

const TIME_CLAIMS = new Set(['exp', 'nbf', 'iat'])

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function base64UrlDecode(input: string): string {
  let str = input.replace(/-/g, '+').replace(/_/g, '/')
  const pad = str.length % 4
  if (pad === 2) str += '=='
  else if (pad === 3) str += '='
  else if (pad !== 0) throw new Error('Invalid base64url segment length')
  // atob throws on invalid chars, which we want to surface
  const binary = atob(str)
  // Handle UTF-8 properly instead of assuming latin1
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

function base64UrlEncode(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decodeJwtString(token: string): DecodedJwt {
  const trimmed = token.trim()
  const parts = trimmed.split('.')

  if (parts.length !== 3) {
    throw {
      message: `Invalid JWT structure — found ${parts.length} segment${parts.length === 1 ? '' : 's'}, expected 3`,
      hint: 'A JWT looks like header.payload.signature, separated by two dots.',
    } as DecodeError
  }

  const [headerPart, payloadPart, signaturePart] = parts

  let header: Record<string, unknown>
  let payload: Record<string, unknown>

  try {
    header = JSON.parse(base64UrlDecode(headerPart))
  } catch {
    throw {
      message: 'Could not decode the header segment',
      hint: "It isn't valid base64url-encoded JSON.",
    } as DecodeError
  }

  try {
    payload = JSON.parse(base64UrlDecode(payloadPart))
  } catch {
    throw {
      message: 'Could not decode the payload segment',
      hint: "It isn't valid base64url-encoded JSON.",
    } as DecodeError
  }

  return {
    header,
    payload,
    signature: signaturePart,
    rawParts: [headerPart, payloadPart, signaturePart],
  }
}

function formatTimestamp(value: unknown): string | null {
  if (typeof value !== 'number') return null
  const date = new Date(value * 1000)
  if (isNaN(date.getTime())) return null
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  })
}

function relativeTime(value: unknown, now: number): string | null {
  if (typeof value !== 'number') return null
  const diffSeconds = value - now
  const abs = Math.abs(diffSeconds)
  const future = diffSeconds > 0

  let amount: number
  let unit: string
  if (abs < 60) {
    amount = Math.round(abs)
    unit = 'second'
  } else if (abs < 3600) {
    amount = Math.round(abs / 60)
    unit = 'minute'
  } else if (abs < 86400) {
    amount = Math.round(abs / 3600)
    unit = 'hour'
  } else if (abs < 86400 * 30) {
    amount = Math.round(abs / 86400)
    unit = 'day'
  } else {
    amount = Math.round(abs / (86400 * 30))
    unit = 'month'
  }
  const plural = amount === 1 ? '' : 's'
  return future ? `in ${amount} ${unit}${plural}` : `${amount} ${unit}${plural} ago`
}

function getTimeStatus(payload: Record<string, unknown>, now: number): TimeStatus {
  const exp = payload.exp
  const nbf = payload.nbf
  if (typeof exp === 'number' && now >= exp) return 'expired'
  if (typeof nbf === 'number' && now < nbf) return 'not-yet-valid'
  if (typeof exp === 'number' || typeof nbf === 'number') return 'valid'
  return 'unknown'
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const element = document.createElement('a')
  element.href = url
  element.download = filename
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
  URL.revokeObjectURL(url)
}

const SAMPLE_JWT_HEADER = { alg: 'HS256', typ: 'JWT' }
const SAMPLE_JWT_PAYLOAD = {
  sub: 'usr_8f2k1',
  name: 'Amina Raza',
  role: 'admin',
  iat: Math.floor(Date.now() / 1000) - 3600,
  exp: Math.floor(Date.now() / 1000) + 3600 * 2,
}

function buildSampleJwt(): string {
  const header = base64UrlEncode(JSON.stringify(SAMPLE_JWT_HEADER))
  const payload = base64UrlEncode(JSON.stringify(SAMPLE_JWT_PAYLOAD))
  // Not a real signature — this tool doesn't sign tokens.
  const fakeSignature = base64UrlEncode('demo-signature-not-cryptographically-valid')
  return `${header}.${payload}.${fakeSignature}`
}

/* ------------------------------------------------------------------ */
/* Colored token display (header / payload / signature segments)      */
/* ------------------------------------------------------------------ */

function ColoredToken({ rawParts }: { rawParts: [string, string, string] }) {
  return (
    <div className="rounded-lg border border-border bg-[var(--surface-1)] p-3 font-mono text-[12px] leading-relaxed break-all">
      <span className="text-[var(--jwt-header)]">{rawParts[0]}</span>
      <span className="text-muted-foreground/40">.</span>
      <span className="text-[var(--jwt-payload)]">{rawParts[1]}</span>
      <span className="text-muted-foreground/40">.</span>
      <span className="text-[var(--jwt-signature)]">{rawParts[2]}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Claim row                                                          */
/* ------------------------------------------------------------------ */

function ClaimRow({ name, value, now }: { name: string; value: unknown; now: number }) {
  const info = CLAIM_INFO[name]
  const isTimeClaim = TIME_CLAIMS.has(name) && typeof value === 'number'
  const formatted = isTimeClaim ? formatTimestamp(value) : null
  const relative = isTimeClaim ? relativeTime(value, now) : null

  return (
    <div className="group flex flex-col gap-0.5 border-b border-border/40 py-2 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-[13px] font-medium text-[var(--json-key)]">{name}</span>
        {info && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60">
            <Info size={11} />
            {info}
          </span>
        )}
      </div>
      <div className="font-mono text-[13px]">
        {formatted ? (
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="text-foreground">{formatted}</span>
            <span
              className={
                relative?.includes('ago')
                  ? 'text-[11px] text-[var(--error)]'
                  : 'text-[11px] text-[var(--json-string)]'
              }
            >
              ({relative})
            </span>
          </span>
        ) : (
          <span className="text-[var(--json-string)] break-all">
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Segment panel (header / payload with copy + claim breakdown)       */
/* ------------------------------------------------------------------ */

function SegmentPanel({
  title,
  accentVar,
  data,
  now,
  onCopy,
  copiedLabel,
}: {
  title: string
  accentVar: string
  data: Record<string, unknown>
  now: number
  onCopy: () => void
  copiedLabel: string | null
}) {
  const entries = Object.entries(data)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: `var(${accentVar})` }}
          />
          {title}
        </p>
        <Button size="sm" variant="ghost" onClick={onCopy}>
          {copiedLabel === title ? (
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
          ) : (
            <Copy className="mr-1.5 h-3.5 w-3.5" />
          )}
          {copiedLabel === title ? 'Copied' : 'Copy JSON'}
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-[var(--surface-1)] divide-y divide-border/0 px-3">
        {entries.length === 0 ? (
          <p className="py-3 text-sm text-muted-foreground">Empty object</p>
        ) : (
          entries.map(([key, value]) => <ClaimRow key={key} name={key} value={value} now={now} />)
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Status banner                                                      */
/* ------------------------------------------------------------------ */

function StatusBanner({ status, payload, now }: { status: TimeStatus; payload: Record<string, unknown>; now: number }) {
  if (status === 'unknown') {
    return (
      <div className="flex items-start gap-2.5 rounded-lg border border-border bg-[var(--surface-2)] px-3.5 py-2.5 text-sm text-muted-foreground">
        <ShieldQuestion size={16} className="mt-0.5 shrink-0" />
        <span>This token has no <code className="font-mono text-xs">exp</code> or <code className="font-mono text-xs">nbf</code> claim, so its time-based validity can&apos;t be determined.</span>
      </div>
    )
  }

  if (status === 'expired') {
    const rel = relativeTime(payload.exp, now)
    return (
      <div className="flex items-start gap-2.5 rounded-lg border border-[var(--error)]/30 bg-[var(--error)]/10 px-3.5 py-2.5 text-sm text-[var(--error)]">
        <ShieldAlert size={16} className="mt-0.5 shrink-0" />
        <span>This token expired {rel}.</span>
      </div>
    )
  }

  if (status === 'not-yet-valid') {
    const rel = relativeTime(payload.nbf, now)
    return (
      <div className="flex items-start gap-2.5 rounded-lg border border-[var(--json-number)]/30 bg-[var(--json-number)]/10 px-3.5 py-2.5 text-sm text-[var(--json-number)]">
        <Clock size={16} className="mt-0.5 shrink-0" />
        <span>This token isn&apos;t valid yet — becomes active {rel}.</span>
      </div>
    )
  }

  const rel = typeof payload.exp === 'number' ? relativeTime(payload.exp, now) : null
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-[var(--json-string)]/30 bg-[var(--json-string)]/10 px-3.5 py-2.5 text-sm text-[var(--json-string)]">
      <ShieldCheck size={16} className="mt-0.5 shrink-0" />
      <span>This token is currently valid{rel ? ` — expires ${rel}` : ''}.</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export function JwtDecoderTool() {
  const [jwt, setJwt] = useState('')
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null)
  const [error, setError] = useState<DecodeError | null>(null)
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const now = useMemo(() => Math.floor(Date.now() / 1000), [decoded])

  const handleDecode = (value?: string) => {
    const source = value ?? jwt
    setError(null)
    setDecoded(null)

    if (!source.trim()) {
      setError({ message: 'Paste a JWT token to decode it.' })
      return
    }

    try {
      const result = decodeJwtString(source)
      setDecoded(result)
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError(err as DecodeError)
      } else {
        setError({ message: 'Failed to decode this token. Make sure it is a valid JWT.' })
      }
    }
  }

  const handleChange = (value: string) => {
    setJwt(value)
    if (!value.trim()) {
      setError(null)
      setDecoded(null)
      return
    }
    handleDecode(value)
  }

  const handleCopy = (label: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLabel(label)
    setTimeout(() => setCopiedLabel(null), 1600)
  }

  const handleClear = () => {
    setJwt('')
    setError(null)
    setDecoded(null)
  }

  const handleSample = () => {
    const sample = buildSampleJwt()
    setJwt(sample)
    handleDecode(sample)
  }

  const handleDownload = () => {
    if (!decoded) return
    const content = JSON.stringify(
      { header: decoded.header, payload: decoded.payload, signature: decoded.signature },
      null,
      2
    )
    downloadFile(content, 'decoded-jwt.json', 'application/json;charset=utf-8')
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = (e.target?.result as string).trim()
      setJwt(text)
      handleDecode(text)
    }
    reader.readAsText(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const status: TimeStatus = decoded ? getTimeStatus(decoded.payload, now) : 'unknown'

  return (
    <div
      className="flex flex-col gap-5"
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      style={
        {
          '--surface-1': 'hsl(var(--card))',
          '--surface-2': 'color-mix(in srgb, var(--card) 92%, var(--foreground) 8%)',
          '--surface-hover': 'color-mix(in srgb, var(--card) 96%, var(--foreground) 4%)',
          '--json-key': '#6CA6E8',
          '--json-string': '#7EC699',
          '--json-number': '#E8A33D',
          '--error': '#E5484D',
          '--jwt-header': '#F2778A',
          '--jwt-payload': '#B98EFF',
          '--jwt-signature': '#5AC8C8',
        } as React.CSSProperties
      }
    >
      {/* Input */}
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">JWT TOKEN</label>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--jwt-header)]" /> header
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--jwt-payload)]" /> payload
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--jwt-signature)]" /> signature
            </span>
          </div>
        </div>
        <textarea
          value={jwt}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          spellCheck={false}
          className="h-32 w-full resize-none rounded-lg border border-border bg-[var(--surface-1)] p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />

        {isDragging && (
          <div className="absolute inset-0 top-7 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-[var(--surface-1)]/95">
            <div className="flex flex-col items-center gap-2 text-primary">
              <Upload size={24} />
              <span className="text-sm font-medium">Drop your token file</span>
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => handleDecode()} size="sm">
          Decode
        </Button>
        <Button onClick={() => fileInputRef.current?.click()} size="sm" variant="outline">
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Upload file
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.jwt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
        <Button onClick={handleDownload} size="sm" variant="outline" disabled={!decoded}>
          <ArrowLeftRight className="mr-1.5 h-3.5 w-3.5" />
          Export JSON
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <Button onClick={handleSample} size="sm" variant="ghost">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Load sample
          </Button>
          <Button onClick={handleClear} size="sm" variant="ghost">
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">{error.message}</p>
            {error.hint && <p className="mt-0.5 text-sm opacity-80">{error.hint}</p>}
          </div>
        </div>
      )}

      {/* Decoded output */}
      {decoded && (
        <div className="flex flex-col gap-5">
          <StatusBanner status={status} payload={decoded.payload} now={now} />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground">SEGMENTS</label>
            <ColoredToken rawParts={decoded.rawParts} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SegmentPanel
              title="Header"
              accentVar="--jwt-header"
              data={decoded.header}
              now={now}
              onCopy={() => handleCopy('Header', JSON.stringify(decoded.header, null, 2))}
              copiedLabel={copiedLabel}
            />
            <SegmentPanel
              title="Payload"
              accentVar="--jwt-payload"
              data={decoded.payload}
              now={now}
              onCopy={() => handleCopy('Payload', JSON.stringify(decoded.payload, null, 2))}
              copiedLabel={copiedLabel}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-[var(--jwt-signature)]" />
                Signature
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy('Signature', decoded.signature)}
              >
                {copiedLabel === 'Signature' ? (
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                ) : (
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                )}
                {copiedLabel === 'Signature' ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-border bg-[var(--surface-1)] p-4 text-xs font-mono break-all text-[var(--jwt-signature)]">
              {decoded.signature}
            </pre>
            <p className="text-xs text-muted-foreground/70">
              This tool decodes tokens locally in your browser — it doesn&apos;t verify the
              signature against a secret or public key, so a token shown as &quot;valid&quot; above
              only means its timestamps check out, not that it&apos;s cryptographically authentic.
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="rounded-lg border border-border bg-[var(--surface-2)] p-4">
        <p className="mb-2 text-sm font-semibold">Features</p>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
          <span>• Color-coded token segments</span>
          <span>• Standard claim explanations</span>
          <span>• Expiry & not-before status</span>
          <span>• Human-readable timestamps</span>
          <span>• Drag & drop file upload</span>
          <span>• Export decoded JSON</span>
        </div>
      </div>
    </div>
  )
}