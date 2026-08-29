import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { ToolLayout } from '@/components/ToolLayout'
import { getToolBySlug, getToolDetails } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { generateToolMetadata, generateHowToSchema, generateFaqSchema } from '@/lib/seo'
import { SITE_URL } from '@/lib/config'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found',
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
  'slug-generator': dynamic(() => import('@/components/tools/SlugGeneratorTool').then(m => ({ default: m.SlugGeneratorTool }))),
  'cron-expression-generator': dynamic(() => import('@/components/tools/CronExpressionGeneratorTool').then(m => ({ default: m.CronExpressionGeneratorTool }))),
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
    'json-formatter': [
      { title: 'What is JSON? A Beginner\'s Complete Guide', url: '/blog/what-is-json' },
      { title: 'XML vs JSON vs YAML: Choosing the Right Data Format', url: '/blog/xml-vs-json-vs-yaml-choosing-right-format' },
      { title: 'JSON to CSV Data Migration: A Practical Guide', url: '/blog/json-to-csv-data-migration' },
      { title: 'How to Compare Files Like a Pro', url: '/blog/how-to-compare-files-like-a-pro' },
    ],
    'jwt-decoder': [
      { title: 'What is a JWT Token? A Complete Beginner\'s Guide', url: '/blog/what-is-a-jwt-token' },
      { title: 'How JWT Authentication Works (Step-by-Step)', url: '/blog/how-jwt-authentication-works' },
      { title: 'What is a JWT Token? Plain English Explanation', url: '/blog/what-is-jwt-token' },
      { title: 'Can You Decode a JWT Without a Secret?', url: '/blog/can-you-decode-jwt-without-secret' },
    ],
    'regex-tester': [
      { title: 'What is Regex? A Beginner\'s Guide to Regular Expressions', url: '/blog/what-is-regex' },
      { title: 'Regex Guide for Beginners', url: '/blog/regex-guide-beginners' },
      { title: 'Real-World Regex Testing Tips', url: '/blog/real-world-regex-testing-tips' },
    ],
    'sql-formatter': [
      { title: 'SQL Formatting Best Practices', url: '/blog/sql-formatting-best-practices' },
    ],
    'base64-encoder': [
      { title: 'What is Base64 Encoding? How It Works and When to Use It', url: '/blog/what-is-base64-encoding' },
      { title: 'Base64 Encoding Explained', url: '/blog/base64-encoding-explained' },
      { title: 'Base64 Encoding: Beyond the Basics', url: '/blog/base64-encoding-beyond-the-basics' },
    ],
    'url-encoder': [
      { title: 'URL Encoding Explained: What It Is and How It Works', url: '/blog/url-encoding-explained' },
      { title: 'Save Time with Browser Tool Workflows', url: '/blog/save-time-with-browser-tool-workflows' },
    ],
    'hash-generator': [
      { title: 'SHA256 vs MD5: Which Hashing Algorithm Should You Use?', url: '/blog/sha256-vs-md5' },
      { title: 'MD5 vs SHA256: A Side-by-Side Comparison', url: '/blog/md5-vs-sha256' },
      { title: 'Secure Password Storage Practices', url: '/blog/secure-password-storage-practices' },
    ],
    'color-converter': [
      { title: 'Color Formats: HEX, RGB, and HSL Explained', url: '/blog/color-formats-hex-rgb-hsl' },
      { title: 'Color Theory for Web Developers', url: '/blog/color-theory-for-web-developers' },
    ],
    'code-minifier': [
      { title: 'JavaScript Code Minification: A Practical Guide', url: '/blog/javascript-code-minification-guide' },
    ],
    'diff-checker': [
      { title: 'How to Compare Files Like a Pro', url: '/blog/how-to-compare-files-like-a-pro' },
    ],
    'xml-formatter': [
      { title: 'XML vs JSON vs YAML: Choosing the Right Data Format', url: '/blog/xml-vs-json-vs-yaml-choosing-right-format' },
    ],
    'uuid-generator': [
      { title: 'GUID vs UUID: What\'s the Difference?', url: '/blog/guid-vs-uuid-difference' },
      { title: 'When to Use UUIDs/GUIDs in Your Database and Code', url: '/blog/when-to-use-uuid-guid-in-development' },
      { title: 'UUID Best Practices for 2026', url: '/blog/uuid-best-practices-2026' },
    ],
    'image-compressor': [
      { title: 'How to Compress Images for Web Without Losing Quality', url: '/blog/how-to-compress-images-for-web' },
      { title: 'Image Compression Guide', url: '/blog/image-compression-guide' },
    ],
    'word-counter': [
      { title: 'Text Analysis for SEO: A Practical Guide', url: '/blog/text-analysis-for-seo' },
    ],
    'qr-code-generator': [
      { title: 'QR Codes in Modern Marketing', url: '/blog/qr-codes-modern-marketing' },
    ],
    'markdown-editor': [
      { title: 'Mastering Markdown for Technical Documentation', url: '/blog/mastering-markdown-technical-documentation' },
    ],
    'text-to-speech': [
      { title: 'Text to Speech and Web Accessibility', url: '/blog/text-to-speech-web-accessibility' },
    ],
    'json-to-csv': [
      { title: 'JSON to CSV Data Migration: A Practical Guide', url: '/blog/json-to-csv-data-migration' },
    ],
    'text-to-html': [
      { title: 'Plain Text to Semantic HTML', url: '/blog/plain-text-to-semantic-html' },
      { title: 'Text Analysis for SEO', url: '/blog/text-analysis-for-seo' },
    ],
    'unit-converter': [
      { title: 'Unit Conversion Pitfalls in Software', url: '/blog/unit-conversion-pitfalls-software' },
    ],
    'loan-calculator': [
      { title: 'Loan Mathematics Every Developer Should Know', url: '/blog/loan-mathematics-every-developer-should-know' },
    ],
    'mortgage-calculator': [
      { title: 'Mortgage Calculator: Total Cost of Homeownership', url: '/blog/mortgage-calculator-total-cost-homeownership' },
      { title: 'Loan Mathematics Every Developer Should Know', url: '/blog/loan-mathematics-every-developer-should-know' },
    ],
    'percentage-calculator': [
      { title: 'Percentage Calculations Developers Get Wrong', url: '/blog/percentage-calculations-developers-get-wrong' },
    ],
    'discount-calculator': [
      { title: 'Building E-Commerce Discount Systems', url: '/blog/building-ecommerce-discount-systems' },
    ],
    'tip-calculator': [
      { title: 'Tipping Calculator Logic for POS Systems', url: '/blog/tipping-calculator-logic-pos-systems' },
    ],
    'age-calculator': [
      { title: 'Age Verification in Web Applications', url: '/blog/age-verification-web-applications' },
    ],
    'bmi-calculator': [
      { title: 'BMI Chart for Men and Women: What Your BMI Really Means', url: '/blog/bmi-chart-men-women' },
      { title: 'BMI and Health Metrics: What Developers Should Know', url: '/blog/bmi-health-metrics-developers' },
      { title: 'Healthy BMI for Men: Weight Ranges Explained', url: '/blog/what-is-a-healthy-bmi-for-men' },
      { title: 'Healthy BMI for Women: Weight Ranges Explained', url: '/blog/what-is-a-healthy-bmi-for-women' },
    ],
    'pixels-to-inches': [
      { title: 'How Many Pixels in an Inch? The Complete Pixels to Inches Guide', url: '/blog/pixels-to-inches-conversion-guide' },
      { title: 'DPI vs PPI: What\'s the Difference and Why It Matters for Pixel Conversions', url: '/blog/dpi-vs-ppi-explained' },
      { title: 'How to Convert Image Pixels to Inches for Printing (2026 Guide)', url: '/blog/convert-image-pixels-to-inches-for-print' },
      { title: 'Common Screen Resolutions in Inches: 1920\u00d71080, 1080px, and More Explained', url: '/blog/common-screen-resolutions-in-inches' },
    ],
    'slug-generator': [
      { title: 'What Is a URL Slug? A Complete Guide to SEO-Friendly URLs', url: '/blog/what-is-a-url-slug' },
      { title: 'How to Write SEO-Friendly URL Slugs (With Real Examples)', url: '/blog/seo-friendly-url-slug-best-practices' },
      { title: 'Bulk Slug Generation: How to Convert Hundreds of Titles to URLs Fast', url: '/blog/bulk-slug-generation-for-content-migration' },
    ],
    'dice-roller': [
      { title: 'Dice Probability Explained: Why 7 Is the Most Common Roll', url: '/blog/dice-probability-explained' },
      { title: 'Dice Roll vs Coin Flip: Which Random Decision Tool Should You Use?', url: '/blog/dice-roll-vs-coin-flip-random-decision-tools' },
    ],
    'coin-flipper': [
      { title: 'Dice Roll vs Coin Flip: Which Random Decision Tool Should You Use?', url: '/blog/dice-roll-vs-coin-flip-random-decision-tools' },
    ],
    'timer-stopwatch': [
      { title: 'Timeboxing, Pomodoro, and To-Do Lists: Productivity Tools That Actually Work', url: '/blog/timeboxing-pomodoro-simple-productivity-tools' },
    ],
    'todo-list': [
      { title: 'Task Prioritization Methods That Actually Work: GTD, the Eisenhower Matrix, and Simple Lists', url: '/blog/task-prioritization-methods-gtd-eisenhower' },
      { title: 'Timeboxing, Pomodoro, and To-Do Lists: Productivity Tools That Actually Work', url: '/blog/timeboxing-pomodoro-simple-productivity-tools' },
    ],
    'morse-code-translator': [
      { title: 'How Morse Code Works: A Complete Guide to Reading and Writing It', url: '/blog/how-morse-code-works-guide' },
    ],
    'random-name-generator': [
      { title: 'How to Generate Names for Projects, Characters, and Brands', url: '/blog/how-to-generate-names-for-projects-characters-brands' },
    ],
    'password-generator': [
      { title: 'Secure Password Storage Practices', url: '/blog/secure-password-storage-practices' },
    ],
    'cron-expression-generator': [
      { title: 'What Is a Cron Expression? A Complete Guide to Cron Syntax', url: '/blog/what-is-a-cron-expression' },
      { title: '10 Common Cron Expression Examples You\'ll Actually Use', url: '/blog/common-cron-expression-examples' },
      { title: 'Cron vs Quartz Cron: What\'s the Difference?', url: '/blog/cron-vs-quartz-cron-difference' },
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

      <Script
        id="tool-webapp-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${SITE_URL}/tools/${tool.slug}#webapp`,
            "name": tool.name,
            "url": `${SITE_URL}/tools/${tool.slug}`,
            "description": tool.seoDescription ?? tool.description,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      <Script
        id="tool-howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHowToSchema({
            name: tool.name,
            description: tool.seoDescription ?? tool.description,
            url: `${SITE_URL}/tools/${tool.slug}`,
            image: `${SITE_URL}/og-image.jpg`,
            steps: toolDetails.howToUse.map((step) => ({
              name: step,
              text: step,
              url: `${SITE_URL}/tools/${tool.slug}`,
            })),
          }))
        }}
      />

      {toolDetails.faq.length > 0 && (
        <Script
          id="tool-faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFaqSchema(toolDetails.faq))
          }}
        />
      )}

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
    </>
  )
}
