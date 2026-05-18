'use client'

import Link from 'next/link'
import { Search, Moon, Sun } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  
  const toggleTheme = () => {
    const root = document.documentElement
    const newDark = !isDark
    if (newDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    setIsDark(newDark)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="hidden sm:inline">Free Tools</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              All Tools
            </Link>
            <Link href="/category/developer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Developer
            </Link>
            <Link href="/category/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Calculators
            </Link>
            <Link href="/category/document" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documents
            </Link>
          </nav>

          {/* Search & CTA */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                className="pl-10 w-48 h-10 text-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
