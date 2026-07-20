"use client"

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { getToolBySlug, getToolDetails } from '@/lib/tools'

interface ToolCardProps {
  name: string
  description: string
  icon: string
  slug: string
  featured?: boolean
  category?: string
}

export function ToolCard({
  name,
  description,
  icon,
  slug,
  featured = false,
  category,
}: ToolCardProps) {
  const IconComponent = (Icons as Record<string, any>)[icon] || Icons.Zap

  // If the provided description is terse, supplement it with a slightly longer blurb
  // pulled from the central tool details (non-destructive, read-only).
  let supplemental: string | null = null
  try {
    const tool = getToolBySlug(slug)
    if (tool) {
      const details = getToolDetails(tool)
      const wordCount = description?.trim().split(/\s+/).length ?? 0
      if (wordCount < 8) {
        supplemental = details.aboutBlurb || details.purpose
      }
    }
  } catch (e) {
    supplemental = null
  }

  return (
    <Link href={`/tools/${slug}`} className="group h-full">
      <Card className={`flex flex-col h-full overflow-hidden border transition-transform duration-300 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 hover:-translate-y-1 hover:shadow-2xl`}>
        <div className="relative overflow-hidden flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
          <div className="relative p-6 flex flex-col gap-5 h-full">
            <div className="flex items-start justify-between gap-4">
              <div className="grid place-items-center rounded-3xl border border-border bg-card/90 text-primary shadow-sm w-14 h-14">
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                {featured && <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-transparent">Popular</Badge>}
                {category && <Badge variant="outline" className="rounded-full border-accent/15 text-muted-foreground bg-card/80">{category.replace(' Tools', '')}</Badge>}
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">{name}</h2>
              <p className="text-sm leading-6 text-muted-foreground line-clamp-3">{description}</p>
              {supplemental && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3">{supplemental}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border/70 bg-card px-6 py-5">
          <Button variant="ghost" size="sm" className="w-full justify-between text-sm text-foreground hover:bg-primary/10 hover:text-primary">
            Use tool
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </Link>
  )
}
