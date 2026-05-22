import { Metadata } from 'next'
import { ToolLayout } from '@/components/ToolLayout'
import { JsonFormatterTool } from '@/components/tools/JsonFormatterTool'
import { Base64EncoderTool } from '@/components/tools/Base64EncoderTool'
import { UuidGeneratorTool } from '@/components/tools/UuidGeneratorTool'
import { RegexTesterTool } from '@/components/tools/RegexTesterTool'
import { SqlFormatterTool } from '@/components/tools/SqlFormatterTool'
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool'
import { WordCounterTool } from '@/components/tools/WordCounterTool'
import { QrCodeGeneratorTool } from '@/components/tools/QrCodeGeneratorTool'
import { UnitConverterTool } from '@/components/tools/UnitConverterTool'
import { JwtDecoderTool } from '@/components/tools/JwtDecoderTool'
import { UrlEncoderTool } from '@/components/tools/UrlEncoderTool'
import { HashGeneratorTool } from '@/components/tools/HashGeneratorTool'
import { ColorConverterTool } from '@/components/tools/ColorConverterTool'
import { CodeMinifierTool } from '@/components/tools/CodeMinifierTool'
import { DiffCheckerTool } from '@/components/tools/DiffCheckerTool'
import { XmlFormatterTool } from '@/components/tools/XmlFormatterTool'
import { TipCalculatorTool } from '@/components/tools/TipCalculatorTool'
import { MarkdownEditorTool } from '@/components/tools/MarkdownEditorTool'
import { ImageCompressorTool } from '@/components/tools/ImageCompressorTool'
import { TextToSpeechTool } from '@/components/tools/TextToSpeechTool'
import { JsonToCsvTool } from '@/components/tools/JsonToCsvTool'
import { TextToHtmlTool } from '@/components/tools/TextToHtmlTool'
import { LoanCalculatorTool } from '@/components/tools/LoanCalculatorTool'
import { PercentageCalculatorTool } from '@/components/tools/PercentageCalculatorTool'
import { MortgageCalculatorTool } from '@/components/tools/MortgageCalculatorTool'
import { AgeCalculatorTool } from '@/components/tools/AgeCalculatorTool'
import { BmiCalculatorTool } from '@/components/tools/BmiCalculatorTool'
import { DiscountCalculatorTool } from '@/components/tools/DiscountCalculatorTool'
import { RandomNameGeneratorTool } from '@/components/tools/RandomNameGeneratorTool'
import { TodoListTool } from '@/components/tools/TodoListTool'
import { TimerStopwatchTool } from '@/components/tools/TimerStopwatchTool'
import { DiceRollerTool } from '@/components/tools/DiceRollerTool'
import { CoinFlipperTool } from '@/components/tools/CoinFlipperTool'
import { MorseCodeTranslatorTool } from '@/components/tools/MorseCodeTranslatorTool'
import { UnitCalculatorTool } from '@/components/tools/UnitCalculatorTool'
import { getToolBySlug, getToolDetails } from '@/lib/tools'
import { notFound } from 'next/navigation'
import { generateToolMetadata } from '@/lib/seo'

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

// Map of tool slugs to their components
const toolComponents: Record<string, React.ReactNode> = {
  // Developer Tools (12)
  'json-formatter': <JsonFormatterTool />,
  'base64-encoder': <Base64EncoderTool />,
  'uuid-generator': <UuidGeneratorTool />,
  'regex-tester': <RegexTesterTool />,
  'sql-formatter': <SqlFormatterTool />,
  'jwt-decoder': <JwtDecoderTool />,
  'url-encoder': <UrlEncoderTool />,
  'hash-generator': <HashGeneratorTool />,
  'color-converter': <ColorConverterTool />,
  'code-minifier': <CodeMinifierTool />,
  'diff-checker': <DiffCheckerTool />,
  'xml-formatter': <XmlFormatterTool />,
  // Document Tools (7)
  'word-counter': <WordCounterTool />,
  'qr-code-generator': <QrCodeGeneratorTool />,
  'markdown-editor': <MarkdownEditorTool />,
  'image-compressor': <ImageCompressorTool />,
  'text-to-speech': <TextToSpeechTool />,
  'json-to-csv': <JsonToCsvTool />,
  'text-to-html': <TextToHtmlTool />,
  // Calculator Tools (8)
  'unit-converter': <UnitConverterTool />,
  'loan-calculator': <LoanCalculatorTool />,
  'percentage-calculator': <PercentageCalculatorTool />,
  'mortgage-calculator': <MortgageCalculatorTool />,
  'age-calculator': <AgeCalculatorTool />,
  'bmi-calculator': <BmiCalculatorTool />,
  'discount-calculator': <DiscountCalculatorTool />,
  'tip-calculator': <TipCalculatorTool />,
  // Utility Tools (8)
  'password-generator': <PasswordGeneratorTool />,
  'random-name-generator': <RandomNameGeneratorTool />,
  'todo-list': <TodoListTool />,
  'timer-stopwatch': <TimerStopwatchTool />,
  'dice-roller': <DiceRollerTool />,
  'coin-flipper': <CoinFlipperTool />,
  'morse-code-translator': <MorseCodeTranslatorTool />,
  'unit-calculator': <UnitCalculatorTool />,
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const toolDetails = getToolDetails(tool)
  const content = toolComponents[tool.slug]

  return (
    <ToolLayout
      title={tool.name}
      description={tool.description}
      showAds={true}
      toolDetails={toolDetails}
    >
      {content}
    </ToolLayout>
  )
}
