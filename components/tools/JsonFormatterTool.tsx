'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Copy,
  Download,
  Upload,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Trash2,
  FileJson,
  Braces,
  Table as TableIcon,
  ArrowDownAZ,
  WrapText,
  Binary,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type ViewMode = 'text' | 'tree' | 'table'

interface JsonError {
  message: string
  line: number
  column: number
}

interface Stats {
  bytes: number
  characters: number
  keys: number
  depth: number
  arrays: number
  objects: number
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

// Parse a JSON.parse SyntaxError message into a line/column position by
// replaying the parse against the original text.
function locateJsonError(text: string, err: unknown): JsonError {
  const message = err instanceof Error ? err.message : 'Invalid JSON'
  const posMatch = message.match(/position (\d+)/)
  let line = 1
  let column = 1

  if (posMatch) {
    const pos = parseInt(posMatch[1], 10)
    const upToPos = text.slice(0, pos)
    const lines = upToPos.split('\n')
    line = lines.length
    column = lines[lines.length - 1].length + 1
  } else {
    // Fallback: try line/column directly from message (some engines report this)
    const lineMatch = message.match(/line (\d+)/)
    const colMatch = message.match(/column (\d+)/)
    if (lineMatch) line = parseInt(lineMatch[1], 10)
    if (colMatch) column = parseInt(colMatch[1], 10)
  }

  return { message, line, column }
}

function computeStats(value: unknown, text: string): Stats {
  let keys = 0
  let objects = 0
  let arrays = 0
  let maxDepth = 0

  const walk = (node: unknown, depth: number) => {
    maxDepth = Math.max(maxDepth, depth)
    if (Array.isArray(node)) {
      arrays++
      node.forEach((item) => walk(item, depth + 1))
    } else if (node !== null && typeof node === 'object') {
      objects++
      const entries = Object.entries(node as Record<string, unknown>)
      keys += entries.length
      entries.forEach(([, v]) => walk(v, depth + 1))
    }
  }

  walk(value, 0)

  return {
    bytes: new TextEncoder().encode(text).length,
    characters: text.length,
    keys,
    depth: maxDepth,
    arrays,
    objects,
  }
}

function sortObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObjectKeys)
  }
  if (value !== null && typeof value === 'object') {
    const sorted: Record<string, unknown> = {}
    Object.keys(value as Record<string, unknown>)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sorted[key] = sortObjectKeys((value as Record<string, unknown>)[key])
      })
    return sorted
  }
  return value
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

const SAMPLE_JSON = JSON.stringify(
  {
    id: 'usr_8f2k1',
    name: 'Amina Raza',
    active: true,
    roles: ['admin', 'editor'],
    profile: {
      age: 29,
      city: 'Islamabad',
      verified: true,
      rating: 4.87,
    },
    tags: null,
    lastLogin: '2026-06-12T09:30:00Z',
  },
  null,
  2
)

/* ------------------------------------------------------------------ */
/* Tree view                                                          */
/* ------------------------------------------------------------------ */

type JsonNodeType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array'

function getType(value: unknown): JsonNodeType {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value as JsonNodeType
}

function valueColorClass(type: JsonNodeType): string {
  switch (type) {
    case 'string':
      return 'text-[var(--json-string)]'
    case 'number':
      return 'text-[var(--json-number)]'
    case 'boolean':
    case 'null':
      return 'text-[var(--json-keyword)]'
    default:
      return 'text-foreground'
  }
}

function renderPrimitive(value: unknown, type: JsonNodeType) {
  if (type === 'string') return `"${value as string}"`
  if (type === 'null') return 'null'
  return String(value)
}

interface TreeNodeProps {
  keyLabel: string | null
  value: unknown
  depth: number
  defaultCollapsed: boolean
  searchTerm: string
  path: string
}

function matchesSearch(keyLabel: string | null, value: unknown, term: string): boolean {
  if (!term) return true
  const lower = term.toLowerCase()
  if (keyLabel && keyLabel.toLowerCase().includes(lower)) return true
  const type = getType(value)
  if (type !== 'object' && type !== 'array') {
    return String(value).toLowerCase().includes(lower)
  }
  if (type === 'array') {
    return (value as unknown[]).some((v) => matchesSearch(null, v, term))
  }
  return Object.entries(value as Record<string, unknown>).some(([k, v]) =>
    matchesSearch(k, v, term)
  )
}

function TreeNode({ keyLabel, value, depth, defaultCollapsed, searchTerm, path }: TreeNodeProps) {
  const type = getType(value)
  const isContainer = type === 'object' || type === 'array'
  const [collapsed, setCollapsed] = useState(defaultCollapsed && depth > 0)

  useEffect(() => {
    if (searchTerm) setCollapsed(false)
  }, [searchTerm])

  if (searchTerm && !matchesSearch(keyLabel, value, searchTerm)) {
    return null
  }

  const entries: [string, unknown][] = isContainer
    ? type === 'array'
      ? (value as unknown[]).map((v, i) => [String(i), v])
      : Object.entries(value as Record<string, unknown>)
    : []

  const count = entries.length
  const bracketOpen = type === 'array' ? '[' : '{'
  const bracketClose = type === 'array' ? ']' : '}'

  return (
    <div className="font-mono text-[13px] leading-[1.65]">
      <div
        className="group flex items-start gap-1 rounded px-1 -mx-1 hover:bg-[var(--surface-hover)]"
        style={{ paddingLeft: depth * 16 }}
      >
        {isContainer ? (
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="mt-[3px] shrink-0 text-muted-foreground/70 hover:text-foreground transition-colors"
            aria-label={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </button>
        ) : (
          <span className="w-[14px] shrink-0" />
        )}

        <div className="flex-1 break-all">
          {keyLabel !== null && (
            <span className="text-[var(--json-key)]">
              {keyLabel}
              <span className="text-muted-foreground/50">: </span>
            </span>
          )}

          {isContainer ? (
            <>
              <span className="text-muted-foreground/60">{bracketOpen}</span>
              {collapsed && (
                <button
                  onClick={() => setCollapsed(false)}
                  className="mx-1 rounded bg-[var(--surface-2)] px-1.5 py-0 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  {count} {type === 'array' ? 'items' : 'keys'}
                </button>
              )}
              {collapsed && <span className="text-muted-foreground/60">{bracketClose}</span>}
            </>
          ) : (
            <span className={valueColorClass(type)}>{renderPrimitive(value, type)}</span>
          )}
        </div>
      </div>

      {isContainer && !collapsed && (
        <>
          {entries.map(([k, v]) => (
            <TreeNode
              key={path + '.' + k}
              keyLabel={type === 'array' ? null : k}
              value={v}
              depth={depth + 1}
              defaultCollapsed={defaultCollapsed}
              searchTerm={searchTerm}
              path={path + '.' + k}
            />
          ))}
          <div
            className="text-muted-foreground/60"
            style={{ paddingLeft: depth * 16 + 14 }}
          >
            {bracketClose}
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Table view (renders an array of flat-ish objects as a grid)        */
/* ------------------------------------------------------------------ */

function TableView({ value }: { value: unknown }) {
  const rows = Array.isArray(value) ? value : [value]
  const isRowsOfObjects = rows.every((r) => r !== null && typeof r === 'object' && !Array.isArray(r))

  if (!isRowsOfObjects) {
    return (
      <div className="h-full p-6 text-sm text-muted-foreground">
        Table view works best for an array of objects. Switch to Tree or Text view for this shape.
      </div>
    )
  }

  const columns: string[] = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row as Record<string, unknown>).forEach((k) => set.add(k))
      return set
    }, new Set<string>())
  )

  return (
    <div className="h-full min-w-0 overflow-auto">
      <table className="w-full border-collapse text-[13px] font-mono">
        <thead>
          <tr className="sticky top-0 bg-[var(--surface-2)]">
            <th className="border-b border-r border-border/60 px-3 py-2 text-left text-muted-foreground font-medium w-10">
              #
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="border-b border-r border-border/60 px-3 py-2 text-left text-[var(--json-key)] font-medium whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--surface-hover)]">
              <td className="border-b border-r border-border/40 px-3 py-1.5 text-muted-foreground/70">
                {i}
              </td>
              {columns.map((col) => {
                const cell = (row as Record<string, unknown>)[col]
                const type = getType(cell)
                const isContainer = type === 'object' || type === 'array'
                return (
                  <td
                    key={col}
                    className="border-b border-r border-border/40 px-3 py-1.5 whitespace-nowrap"
                  >
                    {cell === undefined ? (
                      <span className="text-muted-foreground/40">—</span>
                    ) : isContainer ? (
                      <span className="text-muted-foreground italic">
                        {type === 'array' ? `Array(${(cell as unknown[]).length})` : 'Object'}
                      </span>
                    ) : (
                      <span className={valueColorClass(type)}>
                        {renderPrimitive(cell, type)}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Line-numbered textarea with error gutter                           */
/* ------------------------------------------------------------------ */

function CodeArea({
  value,
  onChange,
  readOnly,
  placeholder,
  errorLine,
}: {
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  placeholder: string
  errorLine?: number
}) {
  const lineCount = value ? value.split('\n').length : 1
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const syncScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  return (
    <div className="relative flex h-full overflow-hidden rounded-lg border border-border bg-[var(--surface-1)]">
      <div
        ref={lineNumbersRef}
        className="select-none overflow-hidden bg-[var(--surface-2)] px-3 py-3 text-right font-mono text-[13px] leading-[1.65] text-muted-foreground/50"
        style={{ minWidth: 44 }}
      >
        {Array.from({ length: lineCount }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            className={n === errorLine ? 'text-[var(--error)] font-semibold' : ''}
          >
            {n}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onScroll={syncScroll}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent px-3 py-3 font-mono text-[13px] leading-[1.65] text-foreground outline-none placeholder:text-muted-foreground/40"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export function JsonFormatterTool() {
  const [input, setInput] = useState('')
  const [error, setError] = useState<JsonError | null>(null)
  const [parsed, setParsed] = useState<unknown>(undefined)
  const [viewMode, setViewMode] = useState<ViewMode>('text')
  const [search, setSearch] = useState('')
  const [collapseDefault, setCollapseDefault] = useState(false)
  const [indent, setIndent] = useState<2 | 4 | 0>(2)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseInput = useCallback((value: string) => {
    setInput(value)
    if (!value.trim()) {
      setError(null)
      setParsed(undefined)
      return
    }
    try {
      const result = JSON.parse(value)
      setParsed(result)
      setError(null)
    } catch (err) {
      setError(locateJsonError(value, err))
      setParsed(undefined)
    }
  }, [])

  const output = useMemo(() => {
    if (parsed === undefined) return ''
    try {
      return indent === 0
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, indent)
    } catch {
      return ''
    }
  }, [parsed, indent])

  const stats = useMemo(() => {
    if (parsed === undefined) return null
    return computeStats(parsed, output)
  }, [parsed, output])

  const isValid = !error && input.trim().length > 0

  /* ---------------- actions ---------------- */

  const handleSort = () => {
    if (parsed === undefined) return
    setParsed(sortObjectKeys(parsed))
  }

  const handleEscape = () => {
    setInput((prev) => JSON.stringify(prev))
  }

  const handleUnescape = () => {
    try {
      const unescaped = JSON.parse(input)
      if (typeof unescaped === 'string') {
        parseInput(unescaped)
      }
    } catch {
      setError({ message: 'Input is not an escaped JSON string', line: 1, column: 1 })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output || input)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const handleDownload = () => {
    downloadFile(output || input, 'formatted.json', 'application/json;charset=utf-8')
  }

  const handleClear = () => {
    setInput('')
    setError(null)
    setParsed(undefined)
    setSearch('')
  }

  const handleSample = () => {
    parseInput(SAMPLE_JSON)
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      parseInput(text)
    }
    reader.readAsText(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div
      className="flex flex-col gap-4"
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      style={{
        '--surface-1': 'hsl(var(--card))',
        '--surface-2': 'color-mix(in srgb, var(--card) 92%, var(--foreground) 8%)',
        '--surface-hover': 'color-mix(in srgb, var(--card) 96%, var(--foreground) 4%)',
        '--json-key': '#6CA6E8',
        '--json-string': '#7EC699',
        '--json-number': '#E8A33D',
        '--json-keyword': '#B98EFF',
        '--error': '#E5484D',
      } as React.CSSProperties}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-[var(--surface-2)] px-3 py-2">
        <div className="flex items-center gap-1">
          {(
            [
              { id: 'text', label: 'Text', icon: FileJson },
              { id: 'tree', label: 'Tree', icon: Braces },
              { id: 'table', label: 'Table', icon: TableIcon },
            ] as { id: ViewMode; label: string; icon: typeof FileJson }[]
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id)}
              disabled={id !== 'text' && !isValid}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${viewMode === id
                ? 'bg-[var(--surface-1)] text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isValid ? (
            <span className="flex items-center gap-1.5 rounded-md bg-[var(--json-string)]/10 px-2.5 py-1 text-xs font-medium text-[var(--json-string)]">
              <Check size={12} />
              Valid JSON
            </span>
          ) : error ? (
            <span className="flex items-center gap-1.5 rounded-md bg-[var(--error)]/10 px-2.5 py-1 text-xs font-medium text-[var(--error)]">
              <X size={12} />
              Line {error.line}, Col {error.column}
            </span>
          ) : null}
        </div>
      </div>

      {/* Search + view options (tree/table only) */}
      {viewMode !== 'text' && isValid && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search keys and values..."
              className="w-full rounded-md border border-border bg-[var(--surface-1)] py-1.5 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          {viewMode === 'tree' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCollapseDefault((c) => !c)}
            >
              {collapseDefault ? 'Expand all' : 'Collapse all'}
            </Button>
          )}
        </div>
      )}

      {/* Main panel */}
      <div
        className="relative grid min-w-0 gap-4"
        style={{ gridTemplateColumns: viewMode === 'text' ? '1fr 1fr' : 'minmax(0, 1fr)' }}
      >
        {viewMode === 'text' && (
          <>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">INPUT</label>
                <span className="text-xs text-muted-foreground/60">
                  {input.length.toLocaleString()} chars
                </span>
              </div>
              <div className="h-[420px]">
                <CodeArea
                  value={input}
                  onChange={parseInput}
                  placeholder="Paste your JSON here, or drop a .json file..."
                  errorLine={error?.line}
                />
              </div>
              {error && (
                <div className="flex items-start gap-2 rounded-md border border-[var(--error)]/30 bg-[var(--error)]/10 px-3 py-2 text-sm text-[var(--error)]">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <span>
                    {error.message} — line {error.line}, column {error.column}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">OUTPUT</label>
                {stats && (
                  <span className="text-xs text-muted-foreground/60">
                    {(stats.bytes / 1024).toFixed(stats.bytes > 1024 ? 1 : 0)}
                    {stats.bytes > 1024 ? ' KB' : ' B'}
                  </span>
                )}
              </div>
              <div className="h-[420px]">
                <CodeArea value={output} readOnly placeholder="Formatted output will appear here..." />
              </div>
            </div>
          </>
        )}

        {viewMode === 'tree' && isValid && (
          <div className="h-[480px] min-w-0 overflow-auto rounded-lg border border-border bg-[var(--surface-1)] p-4">
            <TreeNode
              keyLabel={null}
              value={parsed}
              depth={0}
              defaultCollapsed={collapseDefault}
              searchTerm={search}
              path="root"
            />
          </div>
        )}

        {viewMode === 'table' && isValid && (
          <div className="h-[480px] min-w-0 overflow-hidden rounded-lg border border-border bg-[var(--surface-1)]">
            <TableView value={parsed} />
          </div>
        )}

        {isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-[var(--surface-1)]/95">
            <div className="flex flex-col items-center gap-2 text-primary">
              <Upload size={28} />
              <span className="font-medium">Drop your JSON file</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {stats && (
        <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-[var(--surface-2)] px-4 py-2.5 text-xs">
          <StatItem label="Size" value={`${(stats.bytes / 1024).toFixed(stats.bytes > 1024 ? 2 : 0)} ${stats.bytes > 1024 ? 'KB' : 'B'}`} />
          <StatItem label="Characters" value={stats.characters.toLocaleString()} />
          <StatItem label="Keys" value={stats.keys.toLocaleString()} />
          <StatItem label="Objects" value={stats.objects.toLocaleString()} />
          <StatItem label="Arrays" value={stats.arrays.toLocaleString()} />
          <StatItem label="Max depth" value={String(stats.depth)} />
        </div>
      )}

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <Button onClick={() => parseInput(input)} size="sm">
          Format
        </Button>
        <Button onClick={handleSort} size="sm" variant="outline" disabled={!isValid}>
          <ArrowDownAZ className="mr-1.5 h-3.5 w-3.5" />
          Sort keys
        </Button>

        <div className="mx-1 h-5 w-px bg-border" />

        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value) as 2 | 4 | 0)}
          disabled={!isValid}
          className="h-8 rounded-md border border-border bg-background px-2 text-sm text-foreground disabled:opacity-40"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={0}>Minified</option>
        </select>

        <div className="mx-1 h-5 w-px bg-border" />

        <Button onClick={handleEscape} size="sm" variant="outline">
          <WrapText className="mr-1.5 h-3.5 w-3.5" />
          Escape
        </Button>
        <Button onClick={handleUnescape} size="sm" variant="outline">
          <Binary className="mr-1.5 h-3.5 w-3.5" />
          Unescape
        </Button>

        <div className="mx-1 h-5 w-px bg-border" />

        <Button onClick={handleCopy} size="sm" variant="outline" disabled={!output && !input}>
          {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
        <Button onClick={handleDownload} size="sm" variant="outline" disabled={!output && !input}>
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Download
        </Button>
        <Button onClick={() => fileInputRef.current?.click()} size="sm" variant="outline">
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Upload file
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />

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

      {/* Info */}
      <div className="rounded-lg border border-border bg-[var(--surface-2)] p-4">
        <h3 className="mb-2 text-sm font-semibold">Features</h3>
        <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
          <span>• Format & minify</span>
          <span>• Tree view with collapse</span>
          <span>• Table view for arrays</span>
          <span>• Search keys & values</span>
          <span>• Error line/column locator</span>
          <span>• Sort keys alphabetically</span>
          <span>• Escape / unescape strings</span>
          <span>• Drag & drop file upload</span>
          <span>• Live size & key stats</span>
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground/60">{label}</span>
      <span className="font-mono font-medium text-foreground">{value}</span>
    </div>
  )
}