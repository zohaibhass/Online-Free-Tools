'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, RefreshCw } from 'lucide-react'

export function PasswordGeneratorTool() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let chars = ''
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (useNumbers) chars += '0123456789'
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-card border border-border rounded-lg">
        <label className="block text-sm font-medium mb-2">Generated Password</label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={password}
            readOnly
            placeholder="Click Generate to create password"
            className="font-mono text-lg"
          />
          <Button onClick={copyToClipboard} disabled={!password}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
            Symbols (!@#$...)
          </label>
        </div>
      </div>

      <Button onClick={generatePassword} className="w-full h-12 text-base">
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate Password
      </Button>
    </div>
  )
}
