export interface Tool {
  id: string
  name: string
  description: string
  category: 'developer' | 'document' | 'calculator' | 'utility'
  icon: string // lucide-react icon name
  slug: string
  keywords: string[]
  featured?: boolean
}

export const tools: Tool[] = [
  // Developer Tools (12)
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON with syntax highlighting',
    category: 'developer',
    icon: 'Braces',
    slug: 'json-formatter',
    keywords: ['json', 'format', 'validate', 'minify'],
    featured: true,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and validate JWT tokens instantly',
    category: 'developer',
    icon: 'Lock',
    slug: 'jwt-decoder',
    keywords: ['jwt', 'token', 'decode', 'auth'],
    featured: true,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with live matching',
    category: 'developer',
    icon: 'Search',
    slug: 'regex-tester',
    keywords: ['regex', 'regexp', 'pattern', 'test'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries',
    category: 'developer',
    icon: 'Database',
    slug: 'sql-formatter',
    keywords: ['sql', 'database', 'query', 'formatter'],
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'developer',
    icon: 'Binary',
    slug: 'base64-encoder',
    keywords: ['base64', 'encode', 'decode'],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs and special characters',
    category: 'developer',
    icon: 'Link',
    slug: 'url-encoder',
    keywords: ['url', 'encode', 'decode', 'uri'],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256, SHA512 hashes',
    category: 'developer',
    icon: 'Hash',
    slug: 'hash-generator',
    keywords: ['hash', 'md5', 'sha256', 'crypto'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL color formats',
    category: 'developer',
    icon: 'Palette',
    slug: 'color-converter',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'convert'],
  },
  {
    id: 'code-minifier',
    name: 'Code Minifier',
    description: 'Minify CSS, JavaScript, and HTML code',
    category: 'developer',
    icon: 'Zap',
    slug: 'code-minifier',
    keywords: ['minify', 'css', 'javascript', 'html'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare and highlight differences between two texts',
    category: 'developer',
    icon: 'GitCompare',
    slug: 'diff-checker',
    keywords: ['diff', 'compare', 'text', 'changes'],
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and validate XML documents',
    category: 'developer',
    icon: 'Code',
    slug: 'xml-formatter',
    keywords: ['xml', 'format', 'validate', 'beautify'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate v1, v4, and other UUID versions',
    category: 'developer',
    icon: 'Id',
    slug: 'uuid-generator',
    keywords: ['uuid', 'generate', 'identifier'],
  },

  // Document & Media Tools (7)
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, paragraphs, and reading time',
    category: 'document',
    icon: 'FileText',
    slug: 'word-counter',
    keywords: ['word', 'count', 'character', 'reading time'],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs',
    category: 'document',
    icon: 'QrCode',
    slug: 'qr-code-generator',
    keywords: ['qr', 'code', 'barcode', 'generate'],
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Edit and preview Markdown in real-time',
    category: 'document',
    icon: 'NotebookPen',
    slug: 'markdown-editor',
    keywords: ['markdown', 'editor', 'preview', 'md'],
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images while maintaining quality',
    category: 'document',
    icon: 'Image',
    slug: 'image-compressor',
    keywords: ['image', 'compress', 'optimization', 'size'],
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to speech with voice options',
    category: 'document',
    icon: 'Volume2',
    slug: 'text-to-speech',
    keywords: ['speech', 'voice', 'audio', 'tts'],
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON data to CSV format',
    category: 'document',
    icon: 'FileJson',
    slug: 'json-to-csv',
    keywords: ['json', 'csv', 'convert', 'export'],
  },
  {
    id: 'text-to-html',
    name: 'Text to HTML',
    description: 'Convert plain text to HTML with formatting',
    category: 'document',
    icon: 'Code2',
    slug: 'text-to-html',
    keywords: ['html', 'text', 'convert', 'markup'],
  },

  // Calculator Tools (8)
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between length, weight, temperature units',
    category: 'calculator',
    icon: 'Ruler',
    slug: 'unit-converter',
    keywords: ['unit', 'convert', 'length', 'weight', 'temperature'],
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate loan payments and total interest',
    category: 'calculator',
    icon: 'DollarSign',
    slug: 'loan-calculator',
    keywords: ['loan', 'calculate', 'payment', 'interest'],
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    category: 'calculator',
    icon: 'Percent',
    slug: 'percentage-calculator',
    keywords: ['percentage', 'calculate', 'percent'],
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and schedules',
    category: 'calculator',
    icon: 'Home',
    slug: 'mortgage-calculator',
    keywords: ['mortgage', 'calculate', 'loan', 'payment'],
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age and days between dates',
    category: 'calculator',
    icon: 'Calendar',
    slug: 'age-calculator',
    keywords: ['age', 'date', 'calculate', 'birthday'],
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and health category',
    category: 'calculator',
    icon: 'Activity',
    slug: 'bmi-calculator',
    keywords: ['bmi', 'health', 'weight', 'height'],
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discounts and sale prices',
    category: 'calculator',
    icon: 'Tag',
    slug: 'discount-calculator',
    keywords: ['discount', 'sale', 'price', 'calculate'],
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills easily',
    category: 'calculator',
    icon: 'Wallet',
    slug: 'tip-calculator',
    keywords: ['tip', 'bill', 'split', 'calculate'],
  },

  // Utility Tools (8)
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    category: 'utility',
    icon: 'Key',
    slug: 'password-generator',
    keywords: ['password', 'generate', 'secure', 'random'],
  },
  {
    id: 'random-name-generator',
    name: 'Random Name Generator',
    description: 'Generate random names for characters or projects',
    category: 'utility',
    icon: 'Users',
    slug: 'random-name-generator',
    keywords: ['random', 'name', 'generate', 'character'],
  },
  {
    id: 'todo-list',
    name: 'Todo List',
    description: 'Create and manage your tasks and todo lists',
    category: 'utility',
    icon: 'CheckSquare',
    slug: 'todo-list',
    keywords: ['todo', 'task', 'list', 'manage'],
  },
  {
    id: 'timer-stopwatch',
    name: 'Timer & Stopwatch',
    description: 'Use timer and stopwatch with sound alerts',
    category: 'utility',
    icon: 'Clock',
    slug: 'timer-stopwatch',
    keywords: ['timer', 'stopwatch', 'time', 'alert'],
  },
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    description: 'Roll dice with custom sides and quantities',
    category: 'utility',
    icon: 'Dices',
    slug: 'dice-roller',
    keywords: ['dice', 'roll', 'random', 'game'],
  },
  {
    id: 'coin-flipper',
    name: 'Coin Flipper',
    description: 'Flip a coin with realistic animation',
    category: 'utility',
    icon: 'Circle',
    slug: 'coin-flipper',
    keywords: ['coin', 'flip', 'random', 'toss'],
  },
  {
    id: 'morse-code-translator',
    name: 'Morse Code Translator',
    description: 'Convert text to Morse code and vice versa',
    category: 'utility',
    icon: 'Radio',
    slug: 'morse-code-translator',
    keywords: ['morse', 'code', 'translate', 'text'],
  },
  {
    id: 'unit-calculator',
    name: 'Unit Calculator',
    description: 'Calculate unit conversions with formulas',
    category: 'utility',
    icon: 'Calculator',
    slug: 'unit-calculator',
    keywords: ['calculate', 'formula', 'math', 'compute'],
  },
]

export const categories = [
  { id: 'developer', name: 'Developer Tools', description: 'Tools for developers and programmers' },
  { id: 'document', name: 'Document & Media', description: 'Tools for documents and media files' },
  { id: 'calculator', name: 'Calculators', description: 'Calculators for various calculations' },
  { id: 'utility', name: 'Utilities', description: 'Useful utility tools' },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug)
}

export function getCategory(id: string) {
  return categories.find(cat => cat.id === id)
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(tool => tool.category === categoryId)
}

export function getAllTools(): Tool[] {
  return tools
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(tool => tool.featured)
}
