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
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Tools</h1>
        <p className="text-lg text-muted-foreground">Browse our complete collection of {tools.length} free online tools</p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 max-w-md mb-8">
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
        <Button
          type="button"
          variant="outline"
          onClick={() => setSearchQuery('')}
        >
          Clear
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
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

      {/* Ad Section */}
      <div className="mb-12">
        <AdSenseAd slot="3333333333" format="auto" />
      </div>

      {/* Results Info */}
      <div className="mb-8">
        <p className="text-muted-foreground">
          Found <span className="font-semibold text-foreground">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? 's' : ''}
        </p>
      </div>

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
        <AdSenseAd slot="4444444444" format="auto" />
      </div>
    </div>
  )
}
