'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function ImageCompressorTool() {
  const [image, setImage] = useState<string | null>(null)
  const [quality, setQuality] = useState(80)
  const [compressed, setCompressed] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalSize(file.size)
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const compressImage = () => {
    if (!image) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const compressed = canvas.toDataURL('image/jpeg', quality / 100)
      setCompressed(compressed)
      setCompressedSize(Math.round(compressed.length * 0.75))
    }
    img.src = image
  }

  const download = () => {
    if (!compressed) return
    const link = document.createElement('a')
    link.href = compressed
    link.download = 'compressed-image.jpg'
    link.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>

      {image && (
        <>
          <div>
            <label className="block text-sm font-medium mb-4">Quality: {quality}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <Button onClick={compressImage} className="w-full">Compress Image</Button>
        </>
      )}

      {compressed && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold mb-2">Original</div>
              <img src={image} alt="original" className="w-full h-40 object-cover rounded-lg border border-border" />
              <div className="text-xs text-muted-foreground mt-2">{Math.round(originalSize / 1024)} KB</div>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Compressed</div>
              <img src={compressed} alt="compressed" className="w-full h-40 object-cover rounded-lg border border-border" />
              <div className="text-xs text-muted-foreground mt-2">{Math.round(compressedSize / 1024)} KB</div>
            </div>
          </div>
          <Button onClick={download} className="w-full gap-2">
            <Download className="w-4 h-4" />
            Download Compressed Image
          </Button>
        </div>
      )}
    </div>
  )
}
