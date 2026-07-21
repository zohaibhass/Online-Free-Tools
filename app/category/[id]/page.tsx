import { Metadata } from 'next'
import { getCategory, getToolsByCategory } from '@/lib/tools'
import { ToolCard } from '@/components/ToolCard'
import { AdSenseAd } from '@/components/AdSenseAd'
import { notFound } from 'next/navigation'
import { generateCategoryMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const category = getCategory(id)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'Category not found',
    }
  }

  return generateCategoryMetadata(category)
}

const categoryIntros: Record<string, string> = {
  developer: 'Our Developer Tools collection includes 13 utilities built for programming workflows. Use the JSON Formatter to validate and pretty-print API responses, the JWT Decoder to inspect authentication tokens without writing code, and the Regex Tester to build and debug regular expressions with live matching feedback. The SQL Formatter beautifies queries for readability, while the Base64 Encoder/Decoder and URL Encoder/Decoder handle data encoding tasks for API integrations. Generate hash digests with the Hash Generator (MD5, SHA-1, SHA-256, SHA-512), switch between HEX, RGB, and HSL color formats with the Color Converter, and shrink CSS, JavaScript, or HTML with the Code Minifier. The Diff Checker highlights differences between two text snippets line by line, the XML Formatter tidies data exchange files, and the UUID Generator creates unique identifiers for database records and prototypes. The Cron Expression Generator builds cron schedules from plain English or visual selectors with run-time preview. All of these tools process your data entirely in your browser — nothing is sent to a server.',
  document: 'Our Document & Media tools help with text processing, image optimization, and content creation. The Word Counter measures words, characters, paragraphs, and reading time — useful for meeting assignment requirements or optimizing content length. The Image Compressor reduces file sizes using the browser\'s Canvas API, processing images entirely on your device without uploading them. The Markdown Editor provides a split-pane interface for writing Markdown and previewing the rendered output instantly. Generate scannable QR codes for links and text with the QR Code Generator, convert written text into audio with Text to Speech using the browser\'s Web Speech API, transform structured JSON data into spreadsheet-ready CSV with JSON to CSV, and convert plain text into clean HTML markup with Text to HTML. All tools except the QR Code Generator (which uses a third-party rendering service) process data entirely in your browser.',
  calculator: 'Our Calculators collection covers 11 tools for everyday math and measurement conversions. The Unit Converter handles length, weight, volume, and temperature conversions, while the Unit Calculator solves formulas that combine multiple variables with units. Financial calculators include the Loan Calculator for estimating monthly payments and interest, the Mortgage Calculator for amortization schedules and total cost analysis, the Percentage Calculator for ratios and reverse percentage problems, the Discount Calculator for working out sale prices, and the Tip Calculator for splitting bills with custom tip percentages. The BMI Calculator computes body mass index with health category classification, and the Age Calculator determines exact age and days between dates. The Pixels to Inches converter (and its focused variants PX to Inches and Inches to PX) handles print-to-screen dimension conversions with selectable DPI settings. All calculations run locally in your browser.',
  utility: 'Our Utilities collection includes 9 general-purpose tools for everyday tasks. The Password Generator creates cryptographically random passwords with customizable length and character types. The Random Name Generator produces character names, team names, and creative ideas for writers and game developers. The Todo List provides simple browser-based task management with priorities, and the Timer & Stopwatch supports countdown and elapsed timing with optional sound alerts. For gaming and probability, the Dice Roller simulates 1-5 polyhedral dice (d4 through d100) with 3D animation and roll history, while the Coin Flipper offers Heads/Tails or Yes/No decisions with streak tracking. The Morse Code Translator encodes and decodes Morse code for learning and hobbyist use. All tools store data in your browser\'s local storage and never send your inputs to any server.',
}

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
  const intro = categoryIntros[id]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-lg text-muted-foreground mb-6">{category.description}</p>
        {intro && (
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-7">{intro}</p>
          </div>
        )}
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
              Found <span className="font-semibold text-foreground">{categoryTools.length}</span> tool{categoryTools.length !== 1 ? 's' : ''} in {category.name}
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
