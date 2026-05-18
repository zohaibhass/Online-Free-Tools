import { getCategory, getToolsByCategory } from '@/lib/tools'
import { ToolCard } from '@/components/ToolCard'
import { AdSenseAd } from '@/components/AdSenseAd'
import { notFound } from 'next/navigation'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const category = getCategory(id)

  if (!category) {
    notFound()
  }

  const categoryTools = getToolsByCategory(id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-lg text-muted-foreground">{category.description}</p>
      </div>

      {/* Top Ad */}
      <div className="mb-12">
        <AdSenseAd slot="5555555555" format="auto" />
      </div>

      {/* Tools Grid */}
      {categoryTools.length > 0 ? (
        <>
          <div className="mb-8">
            <p className="text-muted-foreground">
              Found <span className="font-semibold text-foreground">{categoryTools.length}</span> tool{categoryTools.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categoryTools.map(tool => (
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
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No tools found in this category.</p>
        </div>
      )}

      {/* Bottom Ad */}
      <div className="mt-12">
        <AdSenseAd slot="6666666666" format="auto" />
      </div>
    </div>
  )
}
