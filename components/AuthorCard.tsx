import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

interface AuthorCardProps {
    name?: string
    bio?: string
    date?: string
    compact?: boolean
}

export default function AuthorCard({ name = 'Zohaib Hassan', bio, date, compact = false }: AuthorCardProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">About the author</p>
                <h3 className="text-2xl font-semibold mt-2">{name}</h3>
                {bio && <p className="mt-2 text-sm text-muted-foreground leading-7">{bio}</p>}
                {date && <p className="mt-2 text-sm text-muted-foreground">Published: {date}</p>}
            </div>

            <div className="flex flex-col items-center gap-2">
                <Link href="https://github.com/zohaibhass" target="_blank" rel="noopener noreferrer" aria-label="Zohaib on GitHub" className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 hover:bg-primary/10">
                    <Github className="w-5 h-5" />
                </Link>
                <Link href="https://www.linkedin.com/in/zohaib-hassan-811310252/" target="_blank" rel="noopener noreferrer" aria-label="Zohaib on LinkedIn" className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 hover:bg-primary/10">
                    <Linkedin className="w-5 h-5" />
                </Link>
            </div>
        </div>
    )
}
