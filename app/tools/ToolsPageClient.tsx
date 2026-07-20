'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { tools, categories } from '@/lib/tools'
import { ToolCard } from '@/components/ToolCard'
import { AdSenseAd } from '@/components/AdSenseAd'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

export default function ToolsPageClient() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  useEffect(() => {
    const query = searchParams.get('search') ?? ''
    setSearchQuery(query)
  }, [searchParams])

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === null || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const pageCount = Math.max(1, Math.ceil(filteredTools.length / pageSize))
  const paginatedTools = filteredTools.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-[2rem] border border-border/70 bg-card p-8 shadow-2xl shadow-primary/5 mb-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Tools library</p>
            <h1 className="mt-4 text-4xl font-semibold text-foreground">Explore every tool in one place.</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
              Browse, filter, and launch browser-based utilities for development, documents, conversions, and productivity.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-background/90 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{tools.length} tools</p>
              <p className="mt-2">All instantly available in-browser.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background/90 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Categories</p>
              <p className="mt-2">Developer, Document, Calculator, Utility.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] mb-12">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools, workflows, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-transparent border-0 text-base text-foreground focus-visible:ring-0"
              />
            </div>
            <Button type="button" variant="outline" className="min-w-[120px]" onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant={selectedCategory === null ? 'default' : 'outline'} onClick={() => setSelectedCategory(null)}>
              All tools
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
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.32em] text-primary font-semibold">Search tips</p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <p>Try keywords like <span className="font-semibold text-foreground">json, password, image, loan</span>.</p>
            <p>Filter by category to narrow results fast.</p>
            <p>Click any tool card to open the tool instantly.</p>
          </div>
        </div>
      </div>

      <div className="mb-6 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? 's' : ''}
      </div>

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
                category={categories.find(cat => cat.id === tool.category)?.name}
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
          <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground shadow-sm">
            <p className="text-xl font-semibold text-foreground mb-2">No tools found</p>
            <p>Try a different search term or clear the filters to see more tools.</p>
        </div>
      )}

      <div className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <AdSenseAd slot="4444444444" format="auto" />
      </div>
    </div>
  )
}
