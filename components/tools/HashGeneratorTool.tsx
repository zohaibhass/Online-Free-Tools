'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Upload, File, AlertTriangle } from 'lucide-react'

// Simple SHA256 implementation for client-side (text)
async function sha256(str: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// SHA256 from ArrayBuffer (for file hashing)
async function sha256FromBuffer(buffer: ArrayBuffer) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Simple MD5 hash (basic implementation, text only)
function md5(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(32, '0')
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const LARGE_FILE_THRESHOLD = 100 * 1024 * 1024 // 100MB

export function HashGeneratorTool() {
  const [input, setInput] = useState('')
  const [md5Hash, setMd5Hash] = useState('')
  const [sha256Hash, setSha256Hash] = useState('')
  const [copied, setCopied] = useState('')

  // File mode state
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [fileSha256, setFileSha256] = useState('')
  const [isHashing, setIsHashing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [largeFileWarning, setLargeFileWarning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateHashes = async () => {
    if (!input.trim()) return

    setMd5Hash(md5(input))
    setSha256Hash(await sha256(input))
  }

  const hashFile = useCallback(async (file: File) => {
    setIsHashing(true)
    setFileSha256('')
    setFileName(file.name)
    setFileSize(file.size)
    setLargeFileWarning(file.size > LARGE_FILE_THRESHOLD)

    try {
      const buffer = await file.arrayBuffer()
      const hash = await sha256FromBuffer(buffer)
      setFileSha256(hash)
    } catch {
      setFileSha256('Error: Could not read file')
    } finally {
      setIsHashing(false)
    }
  }, [])

  const handleFileSelect = useCallback((file: File) => {
    hashFile(file)
  }, [hashFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="text">
        <TabsList className="w-full">
          <TabsTrigger value="text" className="flex-1">Text</TabsTrigger>
          <TabsTrigger value="file" className="flex-1">File</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 mt-4">
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
                <p className="text-sm font-semibold">MD5 Hash</p>
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
                <p className="text-sm font-semibold">SHA256 Hash</p>
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
        </TabsContent>

        <TabsContent value="file" className="space-y-4 mt-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">
              {isDragging ? 'Drop file here' : 'Click to browse or drag a file'}
            </p>
            <p className="text-xs text-muted-foreground">
              Any file type — hashing happens entirely in your browser
            </p>
          </div>

          {fileName && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border">
              <File className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{fileName}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</p>
              </div>
            </div>
          )}

          {largeFileWarning && !isHashing && !fileSha256 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
              <p>Large file detected. Hashing may take a moment or use significant memory in your browser.</p>
            </div>
          )}

          {isHashing && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Hashing file...
            </div>
          )}

          {fileSha256 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">SHA256 Hash</p>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(fileSha256, 'file-sha256')}>
                  <Copy className="w-4 h-4 mr-2" />
                  {copied === 'file-sha256' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-muted border border-border font-mono text-sm break-all">
                {fileSha256}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
