'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ToolCard } from '@/components/ToolCard'
import { AdSenseAd } from '@/components/AdSenseAd'
import { tools, categories } from '@/lib/tools'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Search, Sparkles } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination'

const landingCategories = [
    { title: 'JSON Tools', description: 'Validate, format, and transform JSON for APIs and data workflows.', href: '/tools?search=json' },
    { title: 'Image Tools', description: 'Compress, convert, and optimize images for web and mobile.', href: '/tools?search=image' },
    { title: 'Text Tools', description: 'Edit, count, and convert text formats with instant previews.', href: '/tools?search=text' },
    { title: 'Converter Tools', description: 'Convert units, currencies, encodings, and formats in seconds.', href: '/tools?search=convert' },
]

const homeFaqItems = [
    {
        title: 'Are these tools really free to use?',
        content:
            'Yes. Every tool is available to use without signup or payment. We support the site through ads while keeping tool workflows fast and accessible.',
    },
    {
        title: 'Can I use the output in my work?',
        content:
            'Absolutely. The output from these tools is available for your projects, documents, and creative work. Please review the Terms of Service for legal disclaimers.',
    },
    {
        title: 'How do I find the right tool quickly?',
        content:
            'Use the search bar to type tool names, keywords, or formats. You can also browse categories for calculators, text tools, image tools, and more.',
    },
]

export default function HomePageClient() {
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
        <>
            <section className="relative overflow-hidden rounded-[2rem] mt-6 border border-border/70 bg-card/95 px-4 py-10 shadow-2xl shadow-primary/5 sm:px-6 lg:px-8 lg:py-16 mb-16">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-r from-primary/15 via-accent/10 to-secondary/15 blur-3xl" />
                <div className="relative w-full grid gap-12 xl:grid-cols-[1.35fr_0.9fr] xl:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                            <Sparkles className="h-4 w-4" />
                            <span>30+ browser tools, zero signup</span>
                        </div>

                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Fast, private tools for developers, creators, and professionals.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                                Search, convert, calculate, and generate everything directly in the browser. No account needed — only instant, private utility workflows.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                            <div className="relative rounded-3xl border border-border bg-background p-2 shadow-sm">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search tools, formats, or workflows..."
                                    aria-label="Search tools"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-14 bg-transparent border-0 text-base text-foreground focus-visible:ring-0"
                                />
                            </div>
                            <Link href="/tools" className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                                Browse all tools
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-4">
                            <div className="rounded-3xl border border-border bg-background/90 p-5">
                                <p className="text-sm font-semibold text-foreground">Privacy first</p>
                                <p className="mt-2 text-sm text-muted-foreground">Most tools run locally in your browser.</p>
                            </div>
                            <div className="rounded-3xl border border-border bg-background/90 p-5">
                                <p className="text-sm font-semibold text-foreground">Instant access</p>
                                <p className="mt-2 text-sm text-muted-foreground">Open any tool in under two clicks.</p>
                            </div>
                            <div className="rounded-3xl border border-border bg-background/90 p-5">
                                <p className="text-sm font-semibold text-foreground">Modern design</p>
                                <p className="mt-2 text-sm text-muted-foreground">Premium spacing, gradients, and typography.</p>
                            </div>
                            <div className="rounded-3xl border border-border bg-background/90 p-5">
                                <p className="text-sm font-semibold text-foreground">Trusted workflow</p>
                                <p className="mt-2 text-sm text-muted-foreground">Tools built for developers and teams.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-8 shadow-xl">
                        <div className="h-full rounded-[1.75rem] bg-card p-8 ring-1 ring-white/10 shadow-inner dark:bg-card dark:ring-white/5">
                            <div className="mb-6 rounded-3xl bg-card/80 p-5 shadow-sm dark:bg-card/70">
                                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Live example</p>
                                <h2 className="mt-3 text-2xl font-semibold text-foreground">JSON Formatter</h2>
                                <p className="mt-2 text-sm text-muted-foreground">Clean and validate JSON instantly without leaving the browser.</p>
                            </div>
                            <div className="grid gap-4">
                                <div className="rounded-3xl border border-border bg-card/80 p-4 text-sm text-muted-foreground dark:bg-card/70">
                                    {`{`}<br />
                                    &nbsp;&nbsp;<span className="text-foreground">"name"</span>: <span className="text-sky-700">"OnlineFreeTools"</span>,<br />
                                    &nbsp;&nbsp;<span className="text-foreground">"type"</span>: <span className="text-emerald-700">"utility"</span><br />
                                    {`}`}
                                </div>
                                <div className="rounded-3xl border border-border bg-card/80 p-4 text-sm text-muted-foreground dark:bg-card/70">
                                    <p className="font-semibold text-foreground">Perfect for</p>
                                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                        <li>Building APIs</li>
                                        <li>Checking tokens</li>
                                        <li>Preparing copy and code snippets</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
                {landingCategories.map((category) => (
                    <Link
                        key={category.title}
                        href={category.href}
                        className="group rounded-3xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">{category.title}</div>
                        <p className="text-sm leading-6 text-muted-foreground">{category.description}</p>
                    </Link>
                ))}
            </section>

            <section className="space-y-8 mb-16">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Popular tools</p>
                        <h2 className="mt-3 text-3xl font-semibold text-foreground">Powerful tools used every day.</h2>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {featuredTools.length} highlighted tools selected for reliability and speed.
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {featuredTools.map(tool => (
                        <ToolCard
                            key={tool.id}
                            name={tool.name}
                            description={tool.description}
                            icon={tool.icon}
                            slug={tool.slug}
                            featured={true}
                            category={categories.find(cat => cat.id === tool.category)?.name}
                        />
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">How it works</h2>
                    <ul className="space-y-4 text-muted-foreground">
                        <li className="rounded-2xl border border-border p-4 bg-background/95">
                            <p className="font-semibold text-foreground">Search instantly</p>
                            <p className="mt-2 text-sm">Find the right tool in seconds using intelligent search, category filters, and quick suggestions. Whether you need a developer utility, calculator, document converter, or productivity tool, everything is organized to help you reach the right solution without wasting time browsing through dozens of pages.</p>
                        </li>
                        <li className="rounded-2xl border border-border p-4 bg-background/95">
                            <p className="font-semibold text-foreground">Use without signup</p>
                            <p className="mt-2 text-sm">Start using every tool immediately without creating an account or providing personal information. Simply open a tool, complete your task, and continue your workflow in just a few clicks. We believe productivity should be fast, accessible, and completely hassle-free.</p>
                        </li>
                        <li className="rounded-2xl border border-border p-4 bg-background/95">
                            <p className="font-semibold text-foreground">Keep work private</p>
                            <p className="mt-2 text-sm">Your privacy is one of our highest priorities. Most tools process data directly within your browser whenever possible, so your files and inputs remain on your device instead of being uploaded to external servers. This approach delivers a faster, more secure, and privacy-first experience.</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="rounded-[2rem] border border-border bg-card p-8 shadow-lg mb-16">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_auto] lg:items-center">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Ready to work smarter?</p>
                        <h2 className="text-3xl font-semibold text-foreground">Start a tool and get immediate results.</h2>
                        <p className="max-w-2xl text-muted-foreground leading-7">
                            Jump into the tools you need with one click. Fast access, clear workflows, and smarter results without extra steps.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link href="/tools" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                            Browse tools
                        </Link>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/tools?search=json">Try JSON formatter</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="rounded-[2rem] border border-border bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-8 shadow-lg mb-16">
                <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Frequently asked questions</p>
                        <h2 className="text-3xl font-semibold text-foreground">Need quick answers?</h2>
                        <p className="max-w-2xl text-muted-foreground leading-7">
                            Learn how the tools work, what data is stored, and how to use the site faster.
                        </p>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end">
                        <Link href="/faq" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/70 hover:text-primary">
                            Explore all FAQs
                        </Link>
                    </div>
                </div>
                <Accordion type="single" collapsible defaultValue="faq-1" className="mt-8 space-y-4">
                    {homeFaqItems.map((item, index) => (
                        <AccordionItem key={item.title} value={`faq-${index + 1}`} className="rounded-3xl border border-border bg-card p-1">
                            <AccordionTrigger className="px-6 py-4 text-base font-semibold text-foreground">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 text-muted-foreground">
                                <p>{item.content}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </>
    )
}
