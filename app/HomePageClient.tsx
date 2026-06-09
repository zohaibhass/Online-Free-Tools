'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ToolCard } from '@/components/ToolCard'
import { AdSenseAd } from '@/components/AdSenseAd'
import { tools, categories } from '@/lib/tools'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, ShieldCheck, Rocket, Eye, Globe } from 'lucide-react'
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
        <div className="min-h-screen bg-linear-to-b from-background to-card/50 flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">30+ Free Tools</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
                            Free Online Tools for Developers, Students & Creators
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
                            Instant browser tools for formatting, converting, calculating, and generating results. No signup, no install, and no distractions.
                        </p>

                        <div className="flex gap-2 max-w-2xl mx-auto flex-col sm:flex-row">
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
                            <Link href="/tools" className="w-full sm:w-auto">
                                <Button size="lg" type="button">
                                    Explore all tools
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
                        {landingCategories.map((category) => (
                            <Link
                                key={category.title}
                                href={category.href}
                                className="rounded-3xl border border-border bg-card p-5 transition hover:shadow-lg"
                            >
                                <h3 className="font-semibold mb-2">{category.title}</h3>
                                <p className="text-sm text-muted-foreground">{category.description}</p>
                            </Link>
                        ))}
                    </div>


                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Popular tools</h2>
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

                    <div className="mb-12">
                        <AdSenseAd slot="1234567890" format="auto" />
                    </div>

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

                            <div className="my-12">
                                <AdSenseAd slot="0987654321" format="auto" />
                            </div>
                        </>
                    )}

                    {(searchQuery || selectedCategory) && (
                        <div className="mb-8">
                            <p className="text-muted-foreground">
                                Found <span className="font-semibold text-foreground">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}

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

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                        <div className="rounded-3xl border border-border bg-card p-6 text-center">
                            <Rocket className="mx-auto mb-3 h-6 w-6 text-primary" />
                            <h3 className="font-semibold mb-2">No signup required</h3>
                            <p className="text-sm text-muted-foreground">Use any tool instantly with no account or subscription.</p>
                        </div>
                        <div className="rounded-3xl border border-border bg-card p-6 text-center">
                            <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-primary" />
                            <h3 className="font-semibold mb-2">Privacy focused</h3>
                            <p className="text-sm text-muted-foreground">Most tools process data locally and do not store personal inputs.</p>
                        </div>
                        <div className="rounded-3xl border border-border bg-card p-6 text-center">
                            <Eye className="mx-auto mb-3 h-6 w-6 text-primary" />
                            <h3 className="font-semibold mb-2">100% free</h3>
                            <p className="text-sm text-muted-foreground">All tools are free to use and accessible in any modern browser.</p>
                        </div>
                        <div className="rounded-3xl border border-border bg-card p-6 text-center">
                            <Globe className="mx-auto mb-3 h-6 w-6 text-primary" />
                            <h3 className="font-semibold mb-2">Works in browser</h3>
                            <p className="text-sm text-muted-foreground">No downloads required — tools run directly in your device’s browser.</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <AdSenseAd slot="1111111111" format="auto" />
                    </div>

                    {/* E-E-A-T Content Section */}
                    <section className="mb-16 space-y-8">
                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-4">Your Complete Online Toolkit for Everyday Tasks</h2>
                            <p className="text-muted-foreground leading-7 mb-4">
                                OnlineFreeTools.online is a thoughtfully curated platform offering <strong>30+ free online tools</strong> designed to help developers, students, content creators, and professionals get their work done faster. Whether you need to format JSON for an API integration, compress an image for your website, decode a JWT token during development, or calculate a mortgage payment - every tool here works directly in your browser with no installation, no signup, and no data stored on our servers.
                            </p>
                            <p className="text-muted-foreground leading-7 mb-4">
                                What sets our collection apart is the attention to <strong>usability, accuracy, and speed</strong>. Each tool is built with modern web technologies (React, Next.js, and Tailwind CSS) to ensure a smooth, responsive experience across all devices - from desktop workstations to mobile phones. The interface is clean, distraction-free, and designed to help you complete your task in seconds.
                            </p>
                            <p className="text-muted-foreground leading-7 mb-4">
                                Our tool categories include <strong>Developer Tools</strong> (JSON formatter, JWT decoder, regex tester, SQL formatter, Base64 encoder, hash generator, code minifier, UUID generator, and more), <strong>Calculator Tools</strong> (BMI calculator, loan calculator, mortgage calculator, discount calculator, tip calculator, percentage calculator, age calculator), <strong>Document Tools</strong> (word counter, markdown editor, text-to-HTML converter, diff checker), and <strong>Utility Tools</strong> (QR code generator, unit converter, password generator, dice roller, coin flipper, Morse code translator, and more).
                            </p>
                            <p className="text-muted-foreground leading-7">
                                Every tool comes with a step-by-step guide and practical examples, making it easy for beginners to get started while still being powerful enough for experienced users. We regularly update our collection based on user feedback and emerging needs. If there is a tool you would like to see, feel free to reach out through our contact page.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-4">Privacy-First, No-Install Approach</h2>
                            <p className="text-muted-foreground leading-7 mb-4">
                                Unlike many online tool websites, we prioritize your privacy. Most of our tools process data entirely in your browser using <strong>client-side JavaScript</strong>, which means your sensitive data - whether it is a JWT token, a JSON payload, or personal text - never leaves your device. We do not store, log, or share any data you enter into the tools.
                            </p>
                            <p className="text-muted-foreground leading-7 mb-4">
                                For tools that require server-side processing (such as QR code generation or text-to-speech), we implement minimal data handling with strict no-logging policies. Our privacy policy explains exactly what data we collect (primarily anonymous analytics via Google Analytics and cookie-based ad personalization via Google AdSense) and how you can control it through your cookie preferences.
                            </p>
                            <p className="text-muted-foreground leading-7">
                                We believe that <strong>powerful tools should be accessible to everyone</strong> without compromising on privacy or requiring complex setups. Whether you are a developer debugging an API, a student calculating a loan payment, or a creator compressing images for a blog post, our tools are here to help - instantly, freely, and privately.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
                            <p className="text-muted-foreground leading-7">
                                This website was built and is maintained by <strong>Zohaib Hassan</strong>, a full-stack web developer from Pakistan with extensive experience in React, Next.js, Node.js, and modern web performance optimization. Zohaib has been developing web applications since 2020 and specializes in creating fast, accessible, and user-friendly digital tools. He is committed to delivering high-quality online utilities that respect user privacy and follow Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines. For inquiries or suggestions, reach out at{' '}
                                <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a>.
                            </p>
                        </div>
                    </section>

                </section>
            </main>

            <Footer />
        </div>
    )
}
