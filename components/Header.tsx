'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Moon, Sun, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState, type FormEvent } from 'react'
import { useTheme } from 'next-themes'

export function Header() {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchText.trim()
    router.push(query ? `/tools?search=${encodeURIComponent(query)}` : '/tools')
  }

  const isDark = mounted ? resolvedTheme === 'dark' : false

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
            <div className="w-16 h-12 flex items-center justify-center">
              <Image
                src="/logo.webp"
                width={64}
                height={48}
                alt="Free Online Tools Logo"
                priority={true}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="hidden sm:inline">Free Tools</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              All Tools
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
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
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Disclaimer
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden sm:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 w-48 h-10 text-sm"
              />
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Menu</p>
                    <div className="border-b border-border" />
                  </div>
                  <nav className="flex flex-col gap-4">
                    <Link href="/tools" className="text-base font-medium text-foreground hover:text-primary">
                      All Tools
                    </Link>
                    <Link href="/blog" className="text-base font-medium text-foreground hover:text-primary">
                      Blog
                    </Link>
                    <Link href="/category/developer" className="text-base font-medium text-foreground hover:text-primary">
                      Developer
                    </Link>
                    <Link href="/category/calculator" className="text-base font-medium text-foreground hover:text-primary">
                      Calculators
                    </Link>
                    <Link href="/category/document" className="text-base font-medium text-foreground hover:text-primary">
                      Documents
                    </Link>
                    <Link href="/about" className="text-base font-medium text-foreground hover:text-primary">
                      About
                    </Link>
                    <Link href="/faq" className="text-base font-medium text-foreground hover:text-primary">
                      FAQ
                    </Link>
                    <Link href="/disclaimer" className="text-base font-medium text-foreground hover:text-primary">
                      Disclaimer
                    </Link>
                    <Link href="/contact" className="text-base font-medium text-foreground hover:text-primary">
                      Contact
                    </Link>
                  </nav>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {searchOpen && (
            <div className="sm:hidden mt-4 w-full">
              <form onSubmit={handleSearch} className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tools..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="pl-10 w-full h-10 text-sm"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
