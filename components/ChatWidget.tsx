'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Fuse from 'fuse.js'
import type { FuseResult } from 'fuse.js'
import type { KnowledgeBaseEntry } from '@/lib/knowledge-base'
import { MessageCircle, X, Send, Bot, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const STORAGE_KEY = 'chat-widget-history'
const FEATURED_LIMIT = 3

interface Message {
  role: 'user' | 'bot'
  content: string
  buttons?: { label: string; url: string }[]
}

let fusePromise: Promise<Fuse<any>> | null = null

function getFuse(): Promise<Fuse<any>> {
  if (!fusePromise) {
    fusePromise = import('@/lib/knowledge-base').then(({ getKnowledgeBase }) => {
      return new Fuse(getKnowledgeBase(), {
        keys: [
          { name: 'name', weight: 3 },
          { name: 'title', weight: 3 },
          { name: 'description', weight: 1 },
          { name: 'keywords', weight: 2 },
          { name: 'faq.question', weight: 3 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      })
    })
  }
  return fusePromise
}

function getHardcodedIntent(input: string): Message | null {
  const lower = input.toLowerCase().trim()

  if (/^what tools|^show tools|^list tools|^all tools|^tools$/.test(lower)) {
    return {
      role: 'bot',
      content: 'We have **38+ free online tools** across these categories:\n\n• **Developer Tools** — JSON formatter, JWT decoder, regex tester, code minifier, diff checker, slug generator, and more\n• **Calculators** — BMI, loan, mortgage, discount, tip, percentage, age, unit converter\n• **Document & Media** — QR code generator, markdown editor, image compressor, word counter\n• **Utilities** — Password generator, timer, dice roller, coin flipper, text to speech\n\nBrowse all tools or explore by category!',
      buttons: [
        { label: 'Browse All Tools →', url: '/tools' },
        { label: 'Developer', url: '/category/developer' },
        { label: 'Calculators', url: '/category/calculator' },
      ],
    }
  }

  if (/^is this free|^free tool|^pricing|^cost|^sign.?up|^pay/.test(lower)) {
    return {
      role: 'bot',
      content: 'Yes — **every tool on this site is completely free** with no signup, no account, and no payment required. Just open any tool and start using it instantly. No ads interrupting your work, either.',
      buttons: [
        { label: 'Browse All Tools →', url: '/tools' },
      ],
    }
  }

  if (/^contact|^support|^report|^bug|^issue|^help$/.test(lower)) {
    return {
      role: 'bot',
      content: 'Need help? You can reach us through our contact page. We typically respond within 24 hours.',
      buttons: [
        { label: 'Contact Us →', url: '/contact' },
      ],
    }
  }

  return null
}

async function formatBotResponse(
  input: string,
  results: FuseResult<KnowledgeBaseEntry>[]
): Promise<Message> {
  const best = results[0]
  const second = results[1]

  const threshold = 0.35
  const similarThreshold = 0.12

  if (!best || best.score! > 0.6) {
    const { getFeaturedTools } = await import('@/lib/knowledge-base')
    const featured: KnowledgeBaseEntry[] = getFeaturedTools().slice(0, FEATURED_LIMIT)
    return {
      role: 'bot',
      content: "I couldn't find an exact match for that. Here's what might help:",
      buttons: [
        ...featured.map((f) => ({
          label: f.name || f.title || '',
          url: f.url,
        })),
        { label: 'Browse All Tools →', url: '/tools' },
        { label: 'Contact Us', url: '/contact' },
      ],
    }
  }

  if (best.score! <= threshold && (!second || Math.abs(best.score! - second.score!) > similarThreshold)) {
    const entry = best.item

    if (entry.type === 'tool') {
      if (entry.faq && entry.faq.length > 0) {
        for (const qa of entry.faq) {
          const faqFuse = new Fuse([qa], {
            keys: ['question'],
            threshold: 0.3,
            includeScore: true,
          })
          const faqResults = faqFuse.search(input)
          if (faqResults.length > 0 && faqResults[0].score! <= 0.35) {
            return {
              role: 'bot',
              content: faqResults[0].item.answer,
              buttons: [{ label: `Try it: ${entry.name} →`, url: entry.url }],
            }
          }
        }
      }

      return {
        role: 'bot',
        content: `**${entry.name}** can help with that — ${entry.description}`,
        buttons: [{ label: `Open ${entry.name} →`, url: entry.url }],
      }
    }

    if (entry.type === 'blog') {
      return {
        role: 'bot',
        content: `We actually have an article on this: **${entry.title}** — ${entry.description}`,
        buttons: [{ label: 'Read it →', url: entry.url }],
      }
    }

    return {
      role: 'bot',
      content: `**${entry.name || entry.title}** — ${entry.description}`,
      buttons: [{ label: 'Open →', url: entry.url }],
    }
  }

  const maxButtons = 3
  const topEntries = results.slice(0, maxButtons)
  return {
    role: 'bot',
    content: 'Here are a few things that might help:',
    buttons: topEntries.map((r) => ({
      label: r.item.name || r.item.title || '',
      url: r.item.url,
    })),
  }
}

async function searchAndRespond(input: string): Promise<Message> {
  const hardcoded = getHardcodedIntent(input)
  if (hardcoded) return hardcoded

  const fuse = await getFuse()
  const results = fuse.search(input)
  return formatBotResponse(input, results)
}

const QUICK_REPLIES = [
  { label: 'Find a tool', query: 'what tools do you have' },
  { label: 'Is this free?', query: 'is this free' },
  { label: 'Convert pixels to inches', query: 'pixels to inches' },
  { label: 'Report an issue', query: 'report a bug' },
]

function loadHistory(): Message[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Message[]
  } catch { /* ignore */ }
  return []
}

function saveHistory(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  } catch { /* ignore */ }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [mounted, setMounted] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const history = loadHistory()
    setMessages(history)
  }, [])

  useEffect(() => {
    saveHistory(messages)
  }, [messages])

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [open, messages])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMsg: Message = { role: 'user', content: trimmed }
      void searchAndRespond(trimmed).then((botMsg) => {
        setMessages((prev) => [...prev, userMsg, botMsg])
      })
      setInput('')
    },
    []
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  const toggleOpen = () => {
    const next = !open
    setOpen(next)
    if (!next) return
    if (messages.length === 0 && mounted) {
      setMessages([
        {
          role: 'bot',
          content:
            "Hi! I can help you find the right tool, answer questions about this site, or point you to relevant blog posts. Try asking something like \"find a tool\" or ask about a specific conversion.",
          buttons: QUICK_REPLIES.map((qr) => ({
            label: qr.label,
            url: '',
          })),
        },
      ])
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* FAB */}
      <button
        onClick={toggleOpen}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        className={cn(
          'fixed bottom-4 right-4 z-[9999] flex items-center justify-center rounded-full shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          open
            ? 'bg-muted-foreground/20 hover:bg-muted-foreground/30 scale-75'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 scale-100'
        )}
        style={{ width: open ? 36 : 56, height: open ? 36 : 56 }}
      >
        {open ? <X className="size-4" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Chat assistant"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          'fixed z-[9998] flex flex-col bg-background border border-border shadow-xl transition-all duration-300 min-h-0',
          'sm:bottom-20 sm:right-4 sm:left-auto sm:top-auto sm:w-[380px] sm:h-[540px] sm:rounded-xl sm:max-h-[calc(100vh-6rem)]',
          'bottom-0 left-0 right-0 mx-2 mb-2 h-[65vh] max-h-[calc(100vh-4rem)] rounded-t-xl sm:rounded-xl',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none sm:scale-95 sm:origin-bottom-right'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0 bg-card rounded-t-xl">
          <div className="flex items-center gap-2">
            <Bot className="size-5 text-primary" />
            <span className="font-semibold text-sm">Ask the Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowClearConfirm(true)}
              aria-label="Clear chat history"
              title="Clear chat"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0 relative">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'flex',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div
                      className={cn(
                        'flex flex-wrap gap-1.5 mt-2',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.buttons.map((btn, j) => (
                        <Button
                          key={j}
                          variant={msg.role === 'user' ? 'secondary' : 'default'}
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            if (btn.url) {
                              window.location.href = btn.url
                            } else {
                              const reply = QUICK_REPLIES.find((qr) => qr.label === btn.label)
                              if (reply) handleSend(reply.query)
                            }
                          }}
                        >
                          {btn.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Clear confirmation overlay */}
          {showClearConfirm && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-b-xl">
              <div className="bg-card border border-border rounded-xl shadow-xl p-5 mx-4 text-center max-w-[250px]">
                <p className="text-sm font-medium mb-3">Clear all messages?</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={() => setShowClearConfirm(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setMessages([])
                      localStorage.removeItem(STORAGE_KEY)
                      setShowClearConfirm(false)
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 shrink-0 bg-card rounded-b-xl">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              aria-label="Type your question"
              className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all"
            />
            <Button
              size="icon"
              onClick={() => handleSend(input)}
              aria-label="Send message"
              disabled={!input.trim()}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
