'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Mail, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react'

export default function ContactPageClient() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name || !email || !message) {
            setStatus('error')
            return
        }

        try {
            setStatus('sent')
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                            <Mail className="h-4 w-4" />
                            Get in touch
                        </span>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Contact our support team
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                            Have questions about the tools or need help with the site? Send us a message and we’ll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h2 className="text-2xl font-semibold">Send a message</h2>
                                    <p className="text-sm text-muted-foreground">
                                        We typically respond within 24 hours.
                                    </p>
                                </div>

                                {status === 'sent' && (
                                    <Alert variant="default">
                                        <div className="flex items-start gap-3">
                                            <Sparkles className="h-5 w-5" />
                                            <div>
                                                <p className="font-semibold">Message received</p>
                                                <p className="text-sm text-muted-foreground">We’ll get back to you shortly.</p>
                                            </div>
                                        </div>
                                    </Alert>
                                )}

                                {status === 'error' && (
                                    <Alert variant="destructive">
                                        <div className="flex items-start gap-3">
                                            <ShieldCheck className="h-5 w-5" />
                                            <div>
                                                <p className="font-semibold">Submission failed</p>
                                                <p className="text-sm text-muted-foreground">Please complete every field and try again.</p>
                                            </div>
                                        </div>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Name</label>
                                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Email</label>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Message</label>
                                        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What can we help you with?" rows={6} />
                                    </div>
                                    <Button type="submit">Send message</Button>
                                </form>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <MessageCircle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Need urgent help?</p>
                                        <p className="text-sm text-muted-foreground">We’re here to help with site questions and feedback.</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm text-muted-foreground">
                                    <div>
                                        <p className="font-medium text-foreground">Email</p>
                                        <p>zohaibdev121@gmail.com</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Help center</p>
                                        <Link href="/faq" className="text-primary underline">Visit the FAQ</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
