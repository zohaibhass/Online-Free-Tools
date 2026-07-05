'use client'

import { useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Copy, Check, List, Type } from 'lucide-react'

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'for', 'on', 'with',
  'at', 'by', 'is', 'it', 'as', 'be', 'but', 'from', 'not', 'so', 'that',
  'this', 'was', 'are', 'were', 'has', 'have', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can',
  'need', 'dare', 'ought', 'used',
])

const ACCENT_MAP: Record<string, string> = {
  'æ': 'ae', 'Æ': 'ae',
  'œ': 'oe', 'Œ': 'oe',
  'ß': 'ss',
  'ð': 'd', 'Ð': 'd',
  'þ': 'th', 'Þ': 'th',
  'ł': 'l', 'Ł': 'l',
  'đ': 'd', 'Đ': 'd',
  'ħ': 'h', 'Ħ': 'h',
  'ı': 'i', 'İ': 'i',
  'ĳ': 'ij', 'Ĳ': 'ij',
  'ſ': 's',
}

function transliterate(text: string): string {
  let result = text.normalize('NFD')
  for (const [char, replacement] of Object.entries(ACCENT_MAP)) {
    result = result.replace(new RegExp(char, 'g'), replacement)
  }
  result = result.replace(/[\u0300-\u036f]/g, '')
  return result
}

function slugifySingle(text: string, separator: '-' | '_', removeStopWords: boolean, maxLength: number): string {
  if (!text.trim()) return ''

  let slug = text.toLowerCase().trim()

  slug = transliterate(slug)

  if (removeStopWords) {
    slug = slug.split(/\s+/).filter(word => !STOP_WORDS.has(word)).join(' ')
  }

  slug = slug.replace(/[^a-z0-9]+/g, ' ').trim()

  slug = slug.replace(/\s+/g, separator)

  if (slug.length > maxLength) {
    const truncated = slug.slice(0, maxLength)
    const lastSep = truncated.lastIndexOf(separator)
    if (lastSep > 0) {
      slug = truncated.slice(0, lastSep)
    } else if (maxLength > 0) {
      slug = truncated.replace(new RegExp(`${separator}+$`), '')
    }
  }

  slug = slug.replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')

  return slug
}

function deDuplicate(slugs: string[]): { slug: string; deduplicated: boolean }[] {
  const counts = new Map<string, number>()
  return slugs.map(s => {
    if (!s) return { slug: s, deduplicated: false }
    const count = counts.get(s) ?? 0
    counts.set(s, count + 1)
    if (count > 0) {
      return { slug: `${s}-${count + 1}`, deduplicated: true }
    }
    return { slug: s, deduplicated: false }
  })
}

export function SlugGeneratorTool() {
  const [input, setInput] = useState('')
  const [bulkInput, setBulkInput] = useState('')
  const [mode, setMode] = useState<'single' | 'bulk'>('single')
  const [separator, setSeparator] = useState<'-' | '_'>('-')
  const [removeStopWords, setRemoveStopWords] = useState(false)
  const [maxLength, setMaxLength] = useState(60)
  const [copied, setCopied] = useState(false)
  const [copiedAll, setCopiedAll] = useState(false)

  const slug = useMemo(() => {
    if (mode === 'single') {
      return slugifySingle(input, separator, removeStopWords, maxLength)
    }
    return ''
  }, [input, mode, separator, removeStopWords, maxLength])

  const bulkResults = useMemo(() => {
    if (mode !== 'bulk') return []
    const lines = bulkInput.split('\n').filter(l => l.trim())
    const rawSlugs = lines.map(line => slugifySingle(line, separator, removeStopWords, maxLength))
    const deduped = deDuplicate(rawSlugs)
    return lines.map((line, i) => ({
      input: line,
      slug: deduped[i]?.slug ?? '',
      deduplicated: deduped[i]?.deduplicated ?? false,
    }))
  }, [bulkInput, mode, separator, removeStopWords, maxLength])

  const charCount = mode === 'single' ? slug.length : 0
  const isOverLimit = charCount > maxLength
  const isNearLimit = charCount >= maxLength * 0.8 && !isOverLimit

  const copySlug = useCallback(() => {
    if (!slug) return
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }, [slug])

  const copyAllSlugs = useCallback(() => {
    const text = bulkResults.map(r => r.slug).filter(Boolean).join('\n')
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 1800)
  }, [bulkResults])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant={mode === 'single' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('single')}
          aria-pressed={mode === 'single'}
        >
          <Type className="h-4 w-4 mr-1.5" />
          Single
        </Button>
        <Button
          variant={mode === 'bulk' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('bulk')}
          aria-pressed={mode === 'bulk'}
        >
          <List className="h-4 w-4 mr-1.5" />
          Bulk Mode
        </Button>
      </div>

      {mode === 'single' ? (
        <div>
          <Label htmlFor="slug-input" className="block text-sm font-medium mb-2">
            Text to convert
          </Label>
          <Input
            id="slug-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter a title, phrase, or text to generate a URL slug..."
            className="w-full"
          />
        </div>
      ) : (
        <div>
          <Label htmlFor="slug-bulk-input" className="block text-sm font-medium mb-2">
            One title per line
          </Label>
          <Textarea
            id="slug-bulk-input"
            value={bulkInput}
            onChange={e => setBulkInput(e.target.value)}
            placeholder="How to bake bread&#10;Best pizza recipe&#10;Café Münchën opening hours"
            className="w-full min-h-[160px] font-mono text-sm"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-card border border-border rounded-lg">
        <div>
          <Label className="text-sm font-medium mb-1.5 block">
            Separator
          </Label>
          <div className="flex gap-2">
            <Button
              variant={separator === '-' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSeparator('-')}
              aria-pressed={separator === '-'}
            >
              hyphen (-)
            </Button>
            <Button
              variant={separator === '_' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSeparator('_')}
              aria-pressed={separator === '_'}
            >
              underscore (_)
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="stop-words"
            checked={removeStopWords}
            onCheckedChange={setRemoveStopWords}
          />
          <Label htmlFor="stop-words" className="text-sm">
            Remove stop words
          </Label>
        </div>

        <div>
          <Label htmlFor="max-length" className="text-sm font-medium mb-1.5 block">
            Max length
          </Label>
          <Input
            id="max-length"
            type="number"
            min={1}
            max={200}
            value={maxLength}
            onChange={e => setMaxLength(Math.max(1, parseInt(e.target.value) || 60))}
            className="w-24"
          />
        </div>
      </div>

      {mode === 'single' && input.trim() && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Generated Slug
            </Label>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium tabular-nums ${
                  isOverLimit ? 'text-red-500' : isNearLimit ? 'text-amber-500' : 'text-green-500'
                }`}
              >
                {slug.length}/{maxLength}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={copySlug}
                disabled={!slug}
                aria-label="Copy slug"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-600 mr-1.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted border border-border font-mono text-sm break-all">
            {slug || (
              <span className="text-muted-foreground">
                {removeStopWords ? 'All words were stop words' : 'Enter text to generate a slug'}
              </span>
            )}
          </div>

          {slug && (
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-sm font-mono text-blue-700 dark:text-blue-300 break-all">
              yourdomain.com/blog/{slug}
            </div>
          )}

          <div
            role="status"
            aria-live="polite"
            className="sr-only"
          >
            {slug ? `Generated slug: ${slug}` : 'No slug generated yet'}
          </div>
        </div>
      )}

      {mode === 'bulk' && bulkResults.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Results ({bulkResults.length} slug{bulkResults.length !== 1 ? 's' : ''})
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={copyAllSlugs}
              disabled={!bulkResults.some(r => r.slug)}
              aria-label="Copy all slugs"
            >
              {copiedAll ? (
                <Check className="h-3.5 w-3.5 text-green-600 mr-1.5" />
              ) : (
                <Copy className="h-3.5 w-3.5 mr-1.5" />
              )}
              {copiedAll ? 'Copied' : 'Copy All'}
            </Button>
          </div>

          <div className="border border-border rounded-lg divide-y divide-border">
            {bulkResults.map((result, i) => (
              <div key={i} className="flex items-start gap-3 p-3">
                <span className="text-xs text-muted-foreground font-mono w-6 pt-0.5 shrink-0">
                  {i + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground truncate mb-0.5">
                    {result.input}
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono break-all">
                      {result.slug || (
                        <span className="text-muted-foreground italic">empty</span>
                      )}
                    </code>
                    {result.deduplicated && (
                      <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold shrink-0">
                        de-duplicated
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    navigator.clipboard.writeText(result.slug)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1800)
                  }}
                  aria-label={`Copy slug ${i + 1}`}
                >
                  {copied && !copiedAll ? (
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
