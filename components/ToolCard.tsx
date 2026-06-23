import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'

interface ToolCardProps {
  name: string
  description: string
  icon: string
  slug: string
  featured?: boolean
}

export function ToolCard({
  name,
  description,
  icon,
  slug,
  featured = false,
}: ToolCardProps) {
  // Get the icon component from lucide-react by name
  const IconComponent = (Icons as Record<string, any>)[icon] || Icons.Zap
  
  return (
    <Link href={`/tools/${slug}`}>
      <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col ${featured ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5' : ''}`}>
        <div className="flex-1 p-6 flex flex-col">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mb-4">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {name}
          </h2>
          <p className="text-sm text-muted-foreground flex-1">
            {description}
          </p>
        </div>
        <div className="px-6 pb-6 pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between group-hover:bg-primary/10"
          >
            Use Tool
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </Link>
  )
}
