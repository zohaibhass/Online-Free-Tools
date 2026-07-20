'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-posts'

interface BlogPageClientProps {
    blogPosts: BlogPost[]
    categories: string[]
}

export default function BlogPageClient({ blogPosts, categories }: BlogPageClientProps) {
    const [activeCategory, setActiveCategory] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6

    const sortedPosts = useMemo(() => {
        return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
    }, [blogPosts])

    const filteredPosts = useMemo(() => {
        return activeCategory === 'All'
            ? sortedPosts
            : sortedPosts.filter((post) => post.category === activeCategory)
    }, [activeCategory, sortedPosts])

    const pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
        setCurrentPage(1)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 space-y-6">
                <div className="max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">Blog</p>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Insights for developers, creators, and teams.</h1>
                </div>
                <div className="max-w-2xl text-lg text-muted-foreground leading-8">
                    Browse our blog for practical guides, clear explanations, and quick tool tutorials designed to help you move faster and ship smarter.
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className="mb-6 text-sm text-muted-foreground">
                Showing {paginatedPosts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {(currentPage - 1) * pageSize + paginatedPosts.length} of {filteredPosts.length} posts
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedPosts.map((post) => (
                    <Card key={post.slug} className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="p-8 flex flex-col h-full gap-6">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                                    <span>{post.category}</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                                    <p className="mt-3 text-base text-muted-foreground leading-8">{post.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                                <div className="space-x-3 flex items-center">
                                    <span>By <strong>Zohaib Hassan</strong></span>
                                    <span>{post.date}</span>
                                    <span className="ml-3 inline-flex items-center gap-2">
                                        <a href="https://github.com/zohaibhass" target="_blank" rel="noopener noreferrer" aria-label="Zohaib on GitHub" className="inline-flex items-center justify-center rounded-full border border-border bg-card p-1">
                                            <Github className="w-4 h-4" />
                                        </a>
                                        <a href="https://www.linkedin.com/in/zohaib-hassan-811310252/" target="_blank" rel="noopener noreferrer" aria-label="Zohaib on LinkedIn" className="inline-flex items-center justify-center rounded-full border border-border bg-card p-1">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </span>
                                </div>
                                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors">
                                    Read article
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {pageCount}
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <Button
                            key={index}
                            variant={currentPage === index + 1 ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === pageCount}
                        onClick={() => setCurrentPage((page) => Math.min(page + 1, pageCount))}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <div className="mt-12 border-t border-border pt-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold">Stay up to date</h2>
                        <p className="text-muted-foreground">Check back often for new posts on tools, developer workflows, and productivity tips.</p>
                    </div>
                    <Link href="/contact" className="text-sm font-semibold text-primary hover:text-foreground transition-colors">
                        Contact us about a feature or topic
                    </Link>
                </div>
            </div>
        </div>
    )
}
