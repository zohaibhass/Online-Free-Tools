import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { ToolLayout } from '@/components/ToolLayout'
import { getToolBySlug, getToolDetails } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { generateToolMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/config'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found | Free Online Tools',
      description: 'Tool not found',
    }
  }

  return generateToolMetadata(tool)
}

// Map of tool slugs to their dynamically-imported components
const toolComponents: Record<string, React.ComponentType> = {
  'json-formatter': dynamic(() => import('@/components/tools/JsonFormatterTool').then(m => ({ default: m.JsonFormatterTool }))),
  'base64-encoder': dynamic(() => import('@/components/tools/Base64EncoderTool').then(m => ({ default: m.Base64EncoderTool }))),
  'uuid-generator': dynamic(() => import('@/components/tools/UuidGeneratorTool').then(m => ({ default: m.UuidGeneratorTool }))),
  'regex-tester': dynamic(() => import('@/components/tools/RegexTesterTool').then(m => ({ default: m.RegexTesterTool }))),
  'sql-formatter': dynamic(() => import('@/components/tools/SqlFormatterTool').then(m => ({ default: m.SqlFormatterTool }))),
  'jwt-decoder': dynamic(() => import('@/components/tools/JwtDecoderTool').then(m => ({ default: m.JwtDecoderTool }))),
  'url-encoder': dynamic(() => import('@/components/tools/UrlEncoderTool').then(m => ({ default: m.UrlEncoderTool }))),
  'hash-generator': dynamic(() => import('@/components/tools/HashGeneratorTool').then(m => ({ default: m.HashGeneratorTool }))),
  'color-converter': dynamic(() => import('@/components/tools/ColorConverterTool').then(m => ({ default: m.ColorConverterTool }))),
  'code-minifier': dynamic(() => import('@/components/tools/CodeMinifierTool').then(m => ({ default: m.CodeMinifierTool }))),
  'diff-checker': dynamic(() => import('@/components/tools/DiffCheckerTool').then(m => ({ default: m.DiffCheckerTool }))),
  'xml-formatter': dynamic(() => import('@/components/tools/XmlFormatterTool').then(m => ({ default: m.XmlFormatterTool }))),
  'word-counter': dynamic(() => import('@/components/tools/WordCounterTool').then(m => ({ default: m.WordCounterTool }))),
  'qr-code-generator': dynamic(() => import('@/components/tools/QrCodeGeneratorTool').then(m => ({ default: m.QrCodeGeneratorTool }))),
  'markdown-editor': dynamic(() => import('@/components/tools/MarkdownEditorTool').then(m => ({ default: m.MarkdownEditorTool }))),
  'image-compressor': dynamic(() => import('@/components/tools/ImageCompressorTool').then(m => ({ default: m.ImageCompressorTool }))),
  'text-to-speech': dynamic(() => import('@/components/tools/TextToSpeechTool').then(m => ({ default: m.TextToSpeechTool }))),
  'json-to-csv': dynamic(() => import('@/components/tools/JsonToCsvTool').then(m => ({ default: m.JsonToCsvTool }))),
  'text-to-html': dynamic(() => import('@/components/tools/TextToHtmlTool').then(m => ({ default: m.TextToHtmlTool }))),
  'unit-converter': dynamic(() => import('@/components/tools/UnitConverterTool').then(m => ({ default: m.UnitConverterTool }))),
  'loan-calculator': dynamic(() => import('@/components/tools/LoanCalculatorTool').then(m => ({ default: m.LoanCalculatorTool }))),
  'percentage-calculator': dynamic(() => import('@/components/tools/PercentageCalculatorTool').then(m => ({ default: m.PercentageCalculatorTool }))),
  'mortgage-calculator': dynamic(() => import('@/components/tools/MortgageCalculatorTool').then(m => ({ default: m.MortgageCalculatorTool }))),
  'age-calculator': dynamic(() => import('@/components/tools/AgeCalculatorTool').then(m => ({ default: m.AgeCalculatorTool }))),
  'bmi-calculator': dynamic(() => import('@/components/tools/BmiCalculatorTool').then(m => ({ default: m.BmiCalculatorTool }))),
  'discount-calculator': dynamic(() => import('@/components/tools/DiscountCalculatorTool').then(m => ({ default: m.DiscountCalculatorTool }))),
  'tip-calculator': dynamic(() => import('@/components/tools/TipCalculatorTool').then(m => ({ default: m.TipCalculatorTool }))),
  'password-generator': dynamic(() => import('@/components/tools/PasswordGeneratorTool').then(m => ({ default: m.PasswordGeneratorTool }))),
  'random-name-generator': dynamic(() => import('@/components/tools/RandomNameGeneratorTool').then(m => ({ default: m.RandomNameGeneratorTool }))),
  'todo-list': dynamic(() => import('@/components/tools/TodoListTool').then(m => ({ default: m.TodoListTool }))),
  'timer-stopwatch': dynamic(() => import('@/components/tools/TimerStopwatchTool').then(m => ({ default: m.TimerStopwatchTool }))),
  'dice-roller': dynamic(() => import('@/components/tools/DiceRollerTool').then(m => ({ default: m.DiceRollerTool }))),
  'coin-flipper': dynamic(() => import('@/components/tools/CoinFlipperTool').then(m => ({ default: m.CoinFlipperTool }))),
  'morse-code-translator': dynamic(() => import('@/components/tools/MorseCodeTranslatorTool').then(m => ({ default: m.MorseCodeTranslatorTool }))),
  'unit-calculator': dynamic(() => import('@/components/tools/UnitCalculatorTool').then(m => ({ default: m.UnitCalculatorTool }))),
  'pixels-to-inches': dynamic(() => import('@/components/tools/PixelsInchesConverterTool').then(m => ({ default: m.PixelsInchesConverterTool }))),
  'px-to-inches': dynamic(() => import('@/components/tools/PixelsInchesConverterTool').then(m => ({ default: m.PixelsInchesConverterTool }))),
  'inches-to-px': dynamic(() => import('@/components/tools/PixelsInchesConverterTool').then(m => ({ default: m.PixelsInchesConverterTool }))),
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const toolDetails = getToolDetails(tool)
  const ToolComponent = toolComponents[tool.slug]

  if (!ToolComponent) {
    notFound()
  }

  const relatedPostsMap: Record<string, { title: string; url: string }[]> = {
    'pixels-to-inches': [
      { title: 'How Many Pixels in an Inch? The Complete Pixels to Inches Guide', url: '/blog/pixels-to-inches-conversion-guide' },
      { title: 'DPI vs PPI: What\'s the Difference and Why It Matters for Pixel Conversions', url: '/blog/dpi-vs-ppi-explained' },
      { title: 'How to Convert Image Pixels to Inches for Printing (2026 Guide)', url: '/blog/convert-image-pixels-to-inches-for-print' },
      { title: 'Common Screen Resolutions in Inches: 1920×1080, 1080px, and More Explained', url: '/blog/common-screen-resolutions-in-inches' },
    ],
  }

  return (
    <>
      <ToolLayout
        title={tool.name}
        h1={tool.h1}
        description={tool.description}
        showAds={true}
        toolDetails={toolDetails}
        relatedPosts={relatedPostsMap[tool.slug]}
      >
        <ToolComponent />
      </ToolLayout>

      {tool.slug === 'pixels-to-inches' && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
                { "@type": "ListItem", "position": 2, "name": "Tools", "item": `${SITE_URL}/tools` },
                { "@type": "ListItem", "position": 3, "name": tool.name, "item": `${SITE_URL}/tools/${tool.slug}` }
              ]
            })
          }}
        />
      )}
    </>
  )
}
