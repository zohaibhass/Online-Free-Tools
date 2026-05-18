'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState('# Hello Markdown\n\nStart typing...')

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = markdown
    const selected = text.substring(start, end)
    const newText = text.substring(0, start) + before + selected + after + text.substring(end)
    setMarkdown(newText)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('# ', '')}>#</Button>
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('## ', '')}> ##</Button>
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('**', '**')}>Bold</Button>
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('*', '*')}>Italic</Button>
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('[', '](url)')}>Link</Button>
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('```\n', '\n```')}>Code</Button>
        <Button size="sm" variant="outline" onClick={() => insertMarkdown('- ', '')}>List</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-64 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preview</label>
          <div className="w-full h-64 p-4 border border-border rounded-lg overflow-auto bg-muted">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {markdown.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-bold">{line.slice(2)}</h1>
                if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold">{line.slice(3)}</h2>
                if (line.startsWith('- ')) return <li key={idx}>{line.slice(2)}</li>
                return <p key={idx}>{line}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
