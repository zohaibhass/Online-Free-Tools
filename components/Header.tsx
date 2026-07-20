'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Moon, Sun, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState, type FormEvent } from 'react'
import { useTheme } from 'next-themes'
import { Logo } from '@/components/Logo'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 transition-all duration-300 hover:opacity-90">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/tools" className={`${pathname === '/tools' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>All Tools</Link>
            <Link href="/blog" className={`${pathname === '/blog' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>Blog</Link>
            <Link href="/category/developer" className={`${pathname === '/category/developer' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>Developer</Link>
            <Link href="/category/calculator" className={`${pathname === '/category/calculator' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>Calculators</Link>
            <Link href="/category/document" className={`${pathname === '/category/document' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>Documents</Link>
            <Link href="/about" className={`${pathname === '/about' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>About</Link>
            <Link href="/faq" className={`${pathname === '/faq' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>FAQ</Link>
            <Link href="/contact" className={`${pathname === '/contact' ? 'text-primary' : 'hover:text-foreground'} transition-colors`}>Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden xl:flex items-center gap-2 rounded-full border border-border bg-card px-3 shadow-sm transition hover:border-primary/40">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border-0 bg-transparent px-0 py-3 text-sm outline-none focus-visible:ring-0"
              />
            </form>
            <Button variant="ghost" size="icon" className="inline-flex xl:hidden" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search tools">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs rounded-3xl p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold tracking-[0.3em] uppercase text-muted-foreground">Navigation</p>
                    <div className="h-px bg-border" />
                  </div>
                  <nav className="flex flex-col gap-4 text-base font-medium text-foreground">
                    <Link href="/tools" className={`${pathname === '/tools' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>All Tools</Link>
                    <Link href="/blog" className={`${pathname === '/blog' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>Blog</Link>
                    <Link href="/category/developer" className={`${pathname === '/category/developer' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>Developer</Link>
                    <Link href="/category/calculator" className={`${pathname === '/category/calculator' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>Calculators</Link>
                    <Link href="/category/document" className={`${pathname === '/category/document' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>Documents</Link>
                    <Link href="/about" className={`${pathname === '/about' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>About</Link>
                    <Link href="/faq" className={`${pathname === '/faq' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>FAQ</Link>
                    <Link href="/contact" className={`${pathname === '/contact' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>Contact</Link>
                  </nav>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {searchOpen && (
          <div className="xl:hidden py-3">
            <form onSubmit={handleSearch} className="relative rounded-full border border-border bg-card px-3 py-2 shadow-sm">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-12 h-12 pr-4 text-sm border-0 bg-transparent outline-none focus-visible:ring-0"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
