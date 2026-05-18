'use client'

import { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolCard } from '@/components/ToolCard'
import { AdSenseAd } from '@/components/AdSenseAd'
import { tools, categories } from '@/lib/tools'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Sparkles } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch =
        searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === null || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const featuredTools = tools.filter(tool => tool.featured).slice(0, 6)
  const showFeaturedSection = searchQuery === '' && selectedCategory === null
  const visibleTools = showFeaturedSection
    ? filteredTools.filter(tool => !tool.featured)
    : filteredTools
  const pageCount = Math.max(1, Math.ceil(visibleTools.length / pageSize))
  const paginatedTools = visibleTools.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card/50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">30+ Free Tools</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
              Free Online Tools for Everyone
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
              Access 30+ useful tools for developers, content creators, and productivity enthusiasts. No sign-up required.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg">Search</Button>
            </div>
          </div>

          {/* Top Ad */}
          <div className="mb-12">
            <AdSenseAd slot="1234567890" format="auto" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
            >
              All Tools
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Featured Tools */}
          {!selectedCategory && !searchQuery && (
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8">Featured Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      name={tool.name}
                      description={tool.description}
                      icon={tool.icon}
                      slug={tool.slug}
                      featured={true}
                    />
                  ))}
                </div>
              </div>

              {/* Mid Section Ad */}
              <div className="my-12">
                <AdSenseAd slot="0987654321" format="auto" />
              </div>
            </>
          )}

          {/* Results Count */}
          {(searchQuery || selectedCategory) && (
            <div className="mb-8">
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Tools Grid */}
          {paginatedTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    name={tool.name}
                    description={tool.description}
                    icon={tool.icon}
                    slug={tool.slug}
                    featured={tool.featured}
                  />
                ))}
              </div>

              {pageCount > 1 && (
                <div className="flex justify-center mb-12">
                  <Pagination>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        setCurrentPage(prev => Math.max(prev - 1, 1))
                      }}
                      disabled={currentPage === 1}
                    />
                    <PaginationContent>
                      {Array.from({ length: pageCount }, (_, index) => {
                        const page = index + 1
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(event) => {
                                event.preventDefault()
                                setCurrentPage(page)
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                    </PaginationContent>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        setCurrentPage(prev => Math.min(prev + 1, pageCount))
                      }}
                      disabled={currentPage === pageCount}
                    />
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No tools found matching your search.</p>
            </div>
          )}

          {/* Bottom Ad */}
          <div className="mt-12">
            <AdSenseAd slot="1111111111" format="auto" />
          </div>
        </section>

        {/* Inline Ad Section */}
        <section className="border-t border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Why Use Our Tools?</h2>
              <p className="text-muted-foreground mb-8">Completely free, no ads blocking functionality, no registration required</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-sm text-muted-foreground">Instant results, optimized for speed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold mb-2">Private & Secure</h3>
                <p className="text-sm text-muted-foreground">All processing happens in your browser</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">Works perfectly on any device</p>
              </div>
            </div>

            <AdSenseAd slot="2222222222" format="auto" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
