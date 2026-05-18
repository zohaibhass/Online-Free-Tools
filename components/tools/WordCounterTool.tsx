'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function WordCounterTool() {
  const [text, setText] = useState('')

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Enter your text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text here to count words, characters, and more..."
          className="w-full h-64 p-4 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Words</div>
          <div className="text-3xl font-bold text-primary">{stats.words}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Characters</div>
          <div className="text-3xl font-bold text-primary">{stats.characters}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Without Spaces</div>
          <div className="text-3xl font-bold text-primary">{stats.charactersNoSpaces}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Sentences</div>
          <div className="text-3xl font-bold text-primary">{stats.sentences}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Paragraphs</div>
          <div className="text-3xl font-bold text-primary">{stats.paragraphs}</div>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Reading Time</div>
          <div className="text-3xl font-bold text-primary">{stats.readingTime}m</div>
        </div>
      </div>
    </div>
  )
}
