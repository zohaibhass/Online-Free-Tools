'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Globe, Mail, Sparkles, Package, Image as ImageIcon, Camera, Zap, Check, X, Download, Clock } from 'lucide-react'

type OutputFormat = 'jpeg' | 'png' | 'webp'
type ViewMode = 'split' | 'original' | 'compressed'

interface CompressedResult {
  dataUrl: string
  width: number
  height: number
  size: number
}

interface ImageEntry {
  id: string
  name: string
  originalSize: number
  src: string
  width: number
  height: number
  compressed: CompressedResult | null
}

interface Preset {
  label: string
  quality: number
  icon: React.ReactNode
  desc: string
}

const OUTPUT_FORMATS: OutputFormat[] = ['jpeg', 'png', 'webp']

const PRESETS: Preset[] = [
  { label: 'Web', quality: 75, icon: <Globe className="w-5 h-5" />, desc: 'Balanced for web' },
  { label: 'Email', quality: 55, icon: <Mail className="w-5 h-5" />, desc: 'Smaller file size' },
  { label: 'Max', quality: 95, icon: <Sparkles className="w-5 h-5" />, desc: 'Near lossless' },
  { label: 'Tiny', quality: 35, icon: <Package className="w-5 h-5" />, desc: 'Smallest size' },
]

const FEATURE_PILLS = ['Batch compress', 'JPEG · PNG · WebP', 'Resize & crop', 'Strip EXIF', 'Side-by-side preview', '100% browser-side']

const HOW_IT_WORKS = [
  { step: '1', title: 'Upload', body: 'Drop one or many images — JPG, PNG, WebP and more.' },
  { step: '2', title: 'Configure', body: 'Pick quality, format, resize dimensions or use a preset.' },
  { step: '3', title: 'Download', body: 'Compare before & after, then download individually or all at once.' },
]

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function getReduction(orig: number, comp: number): number {
  if (!orig || !comp) return 0
  return Math.round(((orig - comp) / orig) * 100)
}

export function ImageCompressorTool() {
  const [images, setImages] = useState<ImageEntry[]>([])
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [quality, setQuality] = useState<number>(75)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('jpeg')
  const [maxWidth, setMaxWidth] = useState<number>(0)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true)
  const [stripMeta, setStripMeta] = useState<boolean>(true)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [processing, setProcessing] = useState<boolean>(false)
  const [view, setView] = useState<ViewMode>('split')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const idCounter = useRef<number>(0)

  const active = images[activeIdx] ?? null

  const processImage = useCallback(
    (imgData: ImageEntry, opts: { q?: number; fmt?: OutputFormat; mw?: number; mh?: number } = {}): Promise<CompressedResult> => {
      const q = opts.q ?? quality
      const fmt = opts.fmt ?? outputFormat
      const mw = opts.mw ?? maxWidth
      const mh = opts.mh ?? maxHeight

      return new Promise<CompressedResult>((resolve) => {
        const img = new Image()
        img.onload = () => {
          let w = img.width, h = img.height
          if (mw > 0 || mh > 0) {
            const ratio = Math.min(mw > 0 ? mw / w : Infinity, mh > 0 ? mh / h : Infinity)
            if (ratio < 1) {
              w = maintainAspect ? Math.round(w * ratio) : (mw > 0 ? mw : w)
              h = maintainAspect ? Math.round(h * ratio) : (mh > 0 ? mh : h)
            }
          }
          const canvas = document.createElement('canvas')
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext('2d')!
          fmt === 'png' ? ctx.clearRect(0, 0, w, h) : (ctx.fillStyle = '#ffffff', ctx.fillRect(0, 0, w, h))
          ctx.drawImage(img, 0, 0, w, h)
          const mimeType = fmt === 'png' ? 'image/png' : fmt === 'webp' ? 'image/webp' : 'image/jpeg'
          const dataUrl = canvas.toDataURL(mimeType, fmt === 'png' ? undefined : q / 100)
          resolve({ dataUrl, width: w, height: h, size: Math.round(dataUrl.length * 0.75) })
        }
        img.src = imgData.src
      })
    },
    [quality, outputFormat, maxWidth, maxHeight, maintainAspect],
  )

  const compressAll = useCallback(async () => {
    if (!images.length) return
    setProcessing(true)
    const updated = await Promise.all(images.map(async (img) => ({ ...img, compressed: await processImage(img) })))
    setImages(updated)
    setProcessing(false)
  }, [images, processImage])

  const loadFiles = useCallback((files: FileList | null) => {
    if (!files) return
    Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const src = e.target?.result as string
          const imgEl = new Image()
          imgEl.onload = () => {
            idCounter.current += 1
            setImages((prev) => [...prev, {
              id: String(idCounter.current),
              name: file.name,
              originalSize: file.size,
              src,
              width: imgEl.width,
              height: imgEl.height,
              compressed: null
            }])
          }
          imgEl.src = src
        }
        reader.readAsDataURL(file)
      })
  }, [])

  const fileExt = outputFormat === 'jpeg' ? 'jpg' : outputFormat
  const downloadOne = useCallback((img: ImageEntry) => {
    if (!img.compressed) return
    const link = document.createElement('a')
    link.href = img.compressed.dataUrl
    link.download = img.name.replace(/\.[^.]+$/, '') + `-compressed.${fileExt}`
    link.click()
  }, [fileExt])

  const downloadAll = useCallback(() => images.forEach((img) => downloadOne(img)), [images, downloadOne])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const next = prev.filter((i) => i.id !== id)
      setActiveIdx((ai) => Math.min(ai, Math.max(0, next.length - 1)))
      return next
    })
  }, [])

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = () => setIsDragging(false)
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    loadFiles(e.dataTransfer.files) 
  }

  return (
    <div className="min-h-screen pb-12">   {/* ← Important for full height scrolling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div>
            <p className="text-3xl font-bold mb-2">Image Compressor</p>
            <p className="text-muted-foreground">Compress, resize and convert images — entirely in your browser.</p>
          </div>

          {/* Empty State */}
          {images.length === 0 && (
            <div className="space-y-6">
              {/* ... your existing empty state (unchanged) ... */}
              <div
                className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${isDragging ? 'border-primary bg-accent/50' : 'border-border hover:border-primary'}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="flex justify-center gap-3 mb-6">
                  <ImageIcon className="w-12 h-12 opacity-60" />
                  <Camera className="w-14 h-14 scale-125" />
                  <Zap className="w-12 h-12 opacity-60" />
                </div>
                <p className="text-lg font-semibold mb-2">Drop images here to compress</p>
                <p className="text-muted-foreground mb-6">or <span className="text-foreground underline underline-offset-2">click to browse</span></p>
                <Button size="lg" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
                  Choose Images
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {FEATURE_PILLS.map((pill) => (
                  <div key={pill} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                    <Check className="w-4 h-4" /> {pill}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {HOW_IT_WORKS.map(({ step, title, body }) => (
                  <div key={step} className="bg-secondary rounded-xl p-5">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mb-3">{step}</div>
                    <p className="font-semibold mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => loadFiles(e.target.files)} />

          {/* Add More Images */}
          {images.length > 0 && (
            <div
              className={`border-2 border-dashed rounded-xl p-4 flex items-center gap-3 transition-all ${isDragging ? 'border-primary bg-accent/50' : 'border-border hover:border-primary'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <span className="text-sm text-muted-foreground flex-shrink-0">+ Add more images</span>
              <div className="flex gap-2 overflow-x-auto flex-1 py-1" onClick={(e) => e.stopPropagation()}>
                {images.map((img, i) => (
                  <div key={img.id} className="relative flex-shrink-0">
                    <img
                      src={img.src}
                      alt={img.name}
                      className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all ${i === activeIdx ? 'border-primary' : 'border-transparent'}`}
                      onClick={() => setActiveIdx(i)}
                    />
                    <button
                      aria-label={`Remove ${img.name}`}
                      className="absolute -top-1.5 -right-1.5 bg-background border border-border rounded-full w-5 h-5 flex items-center justify-center hover:border-destructive hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); removeImage(img.id) }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Responsive & Scrollable Area */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Controls - Fixed on large screens, scrollable on mobile */}
              <div className="md:col-span-5 lg:col-span-4 space-y-4 md:sticky md:top-6 md:self-start">
                {/* Presets, Quality, Format, Resize, etc. (same as before) */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Presets</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => setQuality(p.quality)}
                        className={`p-3 rounded-xl transition-all text-center border ${quality === p.quality ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border hover:border-primary'}`}
                      >
                        <div className="mb-1 flex justify-center">{p.icon}</div>
                        <div className="text-sm font-medium">{p.label}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex justify-between items-baseline mb-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quality</p>
                    <span className="text-3xl font-bold">{quality}<span className="text-sm font-normal opacity-60">%</span></span>
                  </div>
                  <input type="range" min={10} max={100} step={1} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Smaller file</span><span>Higher quality</span>
                  </div>
                </div>

                {/* Format, Resize, Strip Meta - unchanged */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Output Format</p>
                  <div className="flex gap-2">
                    {OUTPUT_FORMATS.map((f) => (
                      <button key={f} onClick={() => setOutputFormat(f)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${outputFormat === f ? 'bg-primary text-primary-foreground' : 'bg-secondary border border-border hover:border-primary'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resize (optional)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Max Width</label>
                      <input type="number" placeholder="Original" value={maxWidth || ''} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">Max Height</label>
                      <input type="number" placeholder="Original" value={maxHeight || ''} onChange={(e) => setMaxHeight(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-border bg-secondary text-sm" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="w-4 h-4" />
                    <span className="text-sm">Maintain aspect ratio</span>
                  </label>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-medium">Strip metadata (EXIF)</p>
                      <p className="text-sm text-muted-foreground">Remove private data</p>
                    </div>
                    <input type="checkbox" checked={stripMeta} onChange={(e) => setStripMeta(e.target.checked)} className="w-5 h-5" />
                  </label>
                </div>

                <Button size="lg" className="w-full" onClick={compressAll} disabled={processing}>
                  {processing ? <> <Clock className="w-4 h-4 mr-2 animate-spin" /> Compressing... </> : <> <Zap className="w-4 h-4 mr-2" /> Compress {images.length > 1 ? `All (${images.length})` : ''} </>}
                </Button>

                {images.some((i) => i.compressed) && (
                  <Button variant="outline" size="lg" className="w-full" onClick={downloadAll}>
                    <Download className="w-4 h-4 mr-2" /> Download All
                  </Button>
                )}
              </div>

              {/* Preview Area - Scrollable */}
              <div className="md:col-span-7 lg:col-span-8 space-y-5">
                {/* Image tabs */}
                {images.length > 1 && (
                  <div className="flex flex-wrap gap-2 pb-2">
                    {images.map((img, i) => (
                      <button key={img.id} onClick={() => setActiveIdx(i)} className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${i === activeIdx ? 'bg-primary text-primary-foreground' : 'bg-secondary border border-border hover:border-primary'}`}>
                        {img.name.length > 18 ? img.name.slice(0, 15) + '...' : img.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Preview */}
                {active && (
                  <div className="bg-secondary rounded-2xl overflow-hidden border border-border">
                    <div className="relative min-h-[300px] md:min-h-[420px] flex items-center justify-center p-4 bg-black/5 dark:bg-black/30">
                      {view === 'split' && active.compressed ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl">
                          <div className="relative rounded-xl overflow-hidden border border-border bg-white dark:bg-black">
                            <img src={active.src} alt="Original" className="w-full h-auto max-h-[420px] object-contain" />
                            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded">Original</div>
                          </div>
                          <div className="relative rounded-xl overflow-hidden border border-border bg-white dark:bg-black">
                            <img src={active.compressed.dataUrl} alt="Compressed" className="w-full h-auto max-h-[420px] object-contain" />
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded">Compressed</div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={view === 'compressed' && active.compressed ? active.compressed.dataUrl : active.src}
                          alt="Preview"
                          className="w-full h-auto max-h-[520px] object-contain rounded-xl"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* View Mode Buttons */}
                {active?.compressed && (
                  <div className="flex gap-2 justify-center flex-wrap">
                    {(['split', 'original', 'compressed'] as const).map((v) => (
                      <button key={v} onClick={() => setView(v)} className={`px-6 py-2.5 text-sm rounded-xl transition-all ${view === v ? 'bg-primary text-primary-foreground' : 'bg-secondary border border-border hover:border-primary'}`}>
                        {v === 'split' ? 'Side by Side' : v.charAt(0).toUpperCase() + v.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Stats */}
                {active && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">ORIGINAL</div>
                      <div className="text-xl font-semibold">{formatBytes(active.originalSize)}</div>
                      <div className="text-xs text-muted-foreground mt-1">{active.width} × {active.height}</div>
                    </div>
                    {active.compressed && (
                      <>
                        <div className="bg-secondary rounded-xl p-4 text-center">
                          <div className="text-xs text-muted-foreground mb-1">COMPRESSED</div>
                          <div className="text-xl font-semibold">{formatBytes(active.compressed.size)}</div>
                          <div className="text-xs text-muted-foreground mt-1">{active.compressed.width} × {active.compressed.height}</div>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 text-center">
                          <div className="text-xs text-muted-foreground mb-1">SAVED</div>
                          <div className="text-xl font-semibold text-green-700 dark:text-green-400">{getReduction(active.originalSize, active.compressed.size)}%</div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Batch List - Scrollable */}
                {images.length > 1 && (
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-card z-10">
                      All Images — {images.length} files
                    </div>
                    <div className="max-h-[380px] overflow-y-auto divide-y divide-border">   {/* ← Scrollable area */}
                      {images.map((img, i) => (
                        <div
                          key={img.id}
                          className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${i === activeIdx ? 'bg-secondary' : ''}`}
                          onClick={() => setActiveIdx(i)}
                        >
                          <img src={img.src} alt="" className="w-10 h-10 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{img.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatBytes(img.originalSize)}
                              {img.compressed && (
                                <span className="text-green-600 dark:text-green-400 ml-2">
                                  → {formatBytes(img.compressed.size)} ({getReduction(img.originalSize, img.compressed.size)}% saved)
                                </span>
                              )}
                            </div>
                          </div>
                          {img.compressed && (
                            <Button size="sm" variant="ghost" aria-label={`Download ${img.name}`} onClick={(e) => { e.stopPropagation(); downloadOne(img) }}>
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <button aria-label={`Remove ${img.name}`} onClick={(e) => { e.stopPropagation(); removeImage(img.id) }} className="text-muted-foreground hover:text-destructive p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}