'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function QrCodeGeneratorTool() {
  const [text, setText] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  const generateQR = () => {
    if (!text.trim()) {
      setQrUrl('')
      return
    }

    // Using qr-server API for QR code generation
    const encodedText = encodeURIComponent(text)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`
    setQrUrl(url)
  }

  const downloadQR = () => {
    if (!qrUrl) return
    
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = 'qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Text or URL</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL to generate QR code..."
          className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      <Button onClick={generateQR} className="w-full h-12">
        Generate QR Code
      </Button>

      {qrUrl && (
        <div className="space-y-4">
          <div className="flex justify-center p-4 bg-white rounded-lg border border-border">
            <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
          </div>

          <Button onClick={downloadQR} variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </div>
      )}

      <div className="p-4 bg-card border border-border rounded-lg space-y-2">
        <h3 className="font-semibold">Tips:</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Supports URLs, text, phone numbers, and emails</li>
          <li>QR codes can be scanned by any smartphone camera</li>
          <li>Download and use the QR code immediately</li>
        </ul>
      </div>
    </div>
  )
}
