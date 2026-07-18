import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import { blogPosts, getAllBlogCategories } from '@/lib/blog-posts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read in-depth developer guides, productivity tips, and tool tutorials from Free Online Tools.',
    openGraph: {
        title: 'Blog',
        description: 'Read in-depth developer guides, productivity tips, and tool tutorials from Free Online Tools.',
        url: `${SITE_URL}/blog`,
        type: 'website',
        images: [{
            url: OG_IMAGE,
            width: 1200,
            height: 630,
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog',
        description: 'Read in-depth developer guides, productivity tips, and tool tutorials from Free Online Tools.',
        images: [OG_IMAGE],
    },
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
}

export default function BlogPage() {
    const categories = ['All', ...getAllBlogCategories()]

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <BlogPageClient blogPosts={blogPosts} categories={categories} />
            </main>

            <Footer />
        </div>
    )
}
