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

export interface ToolDetails {
  purpose: string
  longDescription: string
  howToUse: string[]
  exampleInput: string
  exampleOutput: string
  faq: { question: string; answer: string }[]
}

const toolAudiences: Record<string, string> = {
  developer: 'developers and technical users',
  document: 'writers, editors, and creators',
  calculator: 'students, planners, and people making quick decisions',
  utility: 'anyone who needs a rapid web-based utility',
}

const toolUseCases: Record<string, string> = {
  'json-formatter': 'clean up JSON for APIs, config files, and debugging workflows',
  'jwt-decoder': 'inspect authentication tokens and read claims without writing code',
  'regex-tester': 'build, test, and validate regular expressions with live matching feedback',
  'sql-formatter': 'beautify SQL queries for readability and team collaboration',
  'base64-encoder': 'encode and decode Base64 values for data transfer and storage',
  'url-encoder': 'prepare URLs and query strings for safe sharing and integration',
  'hash-generator': 'create hash digests for checksums, validation, and fingerprinting',
  'color-converter': 'switch between HEX, RGB, and HSL color formats for design work',
  'code-minifier': 'shrink CSS, JavaScript, and HTML for faster page performance',
  'diff-checker': 'compare text side-by-side to find differences quickly',
  'xml-formatter': 'tidy XML documents for data exchange and configuration files',
  'uuid-generator': 'generate unique identifiers for database records, tests, and prototypes',
  'word-counter': 'measure word, character, and paragraph counts with reading time estimates',
  'qr-code-generator': 'generate QR codes for links, text, and contact details',
  'markdown-editor': 'edit Markdown and preview rendered output instantly',
  'image-compressor': 'reduce image file size while preserving visual quality',
  'text-to-speech': 'convert text into natural-sounding audio files',
  'json-to-csv': 'turn structured JSON into spreadsheet-ready CSV data',
  'text-to-html': 'transform plain text into clean HTML markup for web use',
  'unit-converter': 'convert between length, weight, volume, temperature, and more',
  'loan-calculator': 'estimate loan payments, interest, and payoff schedules',
  'percentage-calculator': 'calculate percentages, increases, decreases, and ratios',
  'mortgage-calculator': 'estimate mortgage payments and compare repayment costs',
  'age-calculator': 'calculate age and the time between important dates',
  'bmi-calculator': 'determine body mass index and health categories',
  'discount-calculator': 'work out sale prices, savings, and final totals',
  'tip-calculator': 'split tips and bills cleanly for groups and services',
  'password-generator': 'create strong random passwords for accounts and services',
  'random-name-generator': 'generate character names, team names, and creative ideas',
  'todo-list': 'track tasks and stay organized with simple list management',
  'timer-stopwatch': 'time sessions with countdown and stopwatch controls',
  'dice-roller': 'simulate dice rolls for games and probability testing',
  'coin-flipper': 'flip a virtual coin for decisions and fun',
  'morse-code-translator': 'encode and decode Morse code for communication and learning',
  'unit-calculator': 'compute formulas and unit-based values quickly',
}

const toolActions: Record<string, string> = {
  'json-formatter': 'format and validate JSON',
  'jwt-decoder': 'decode your token',
  'regex-tester': 'test a pattern',
  'sql-formatter': 'format SQL',
  'base64-encoder': 'encode or decode Base64',
  'url-encoder': 'encode or decode URLs',
  'hash-generator': 'generate a hash',
  'color-converter': 'convert color formats',
  'code-minifier': 'minify code',
  'diff-checker': 'compare text',
  'xml-formatter': 'format XML',
  'uuid-generator': 'generate a UUID',
  'word-counter': 'count words and characters',
  'qr-code-generator': 'generate a QR code',
  'markdown-editor': 'preview Markdown',
  'image-compressor': 'compress an image',
  'text-to-speech': 'convert text to speech',
  'json-to-csv': 'convert JSON to CSV',
  'text-to-html': 'convert text to HTML',
  'unit-converter': 'convert units',
  'loan-calculator': 'calculate a loan payment',
  'percentage-calculator': 'calculate a percentage',
  'mortgage-calculator': 'calculate mortgage payments',
  'age-calculator': 'calculate age',
  'bmi-calculator': 'calculate BMI',
  'discount-calculator': 'calculate discount pricing',
  'tip-calculator': 'calculate tip and split amounts',
  'password-generator': 'generate a secure password',
  'random-name-generator': 'generate a name',
  'todo-list': 'manage your task list',
  'timer-stopwatch': 'track time',
  'dice-roller': 'roll dice',
  'coin-flipper': 'flip a coin',
  'morse-code-translator': 'translate Morse code',
  'unit-calculator': 'calculate units with formulas',
}

const toolExamples: Record<string, { input: string; output: string }> = {
  'json-formatter': {
    input: '{"name":"Alice","age":30,"skills":["js","react"]}',
    output: '{\n  "name": "Alice",\n  "age": 30,\n  "skills": [\n    "js",\n    "react"\n  ]\n}',
  },
  'jwt-decoder': {
    input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.s5LkR5yH4...',
    output: 'Header:\n{\n  "alg": "HS256",\n  "typ": "JWT"\n}\n\nPayload:\n{\n  "name": "John Doe"\n}',
  },
  'regex-tester': {
    input: '/^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$/\n\ntest@example.com',
    output: 'Match found\nGroup 0: test@example.com',
  },
  'sql-formatter': {
    input: 'SELECT id,name FROM users WHERE status="active" ORDER BY created_at DESC',
    output: 'SELECT id,\n       name\nFROM users\nWHERE status = "active"\nORDER BY created_at DESC',
  },
  'base64-encoder': {
    input: 'Hello World',
    output: 'SGVsbG8gV29ybGQ=',
  },
  'url-encoder': {
    input: 'https://example.com/search?q=free tools',
    output: 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dfree%20tools',
  },
  'hash-generator': {
    input: 'password123',
    output: 'ef92b778bafe771e89245b89ecbc4e59',
  },
  'color-converter': {
    input: '#3498db',
    output: 'RGB(52, 152, 219)\nHSL(204, 70%, 53%)',
  },
  'code-minifier': {
    input: 'function add(a, b) { return a + b; }',
    output: 'function add(a,b){return a+b;}',
  },
  'diff-checker': {
    input: 'Hello world\nThis is a test\nDone\n\nHello world\nThis is a test!\nDone',
    output: '- This is a test\n+ This is a test!',
  },
  'xml-formatter': {
    input: '<note><to>Alice</to><from>Bob</from><message>Hello</message></note>',
    output: '<note>\n  <to>Alice</to>\n  <from>Bob</from>\n  <message>Hello</message>\n</note>',
  },
  'uuid-generator': {
    input: 'Generate a new UUID',
    output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  },
  'word-counter': {
    input: 'Free online tools make tasks faster and easier.',
    output: 'Words: 8\nCharacters: 47\nReading time: 1 min',
  },
  'qr-code-generator': {
    input: 'https://example.com',
    output: 'QR code generated for URL: https://example.com',
  },
  'markdown-editor': {
    input: '# Heading\n\nThis is *Markdown* text.',
    output: '<h1>Heading</h1>\n<p>This is <em>Markdown</em> text.</p>',
  },
  'image-compressor': {
    input: 'Upload a JPG or PNG image',
    output: 'Compressed image ready to download (45% smaller)',
  },
  'text-to-speech': {
    input: 'Hello, welcome to our free online tools website.',
    output: 'Audio file ready to play or download',
  },
  'json-to-csv': {
    input: '[{"name":"Alice","age":30},{"name":"Bob","age":27}]',
    output: 'name,age\nAlice,30\nBob,27',
  },
  'text-to-html': {
    input: 'Line one\nLine two\n\nA paragraph.',
    output: '<p>Line one<br>Line two</p>\n<p>A paragraph.</p>',
  },
  'unit-converter': {
    input: '5 miles to kilometers',
    output: '8.05 kilometers',
  },
  'loan-calculator': {
    input: 'Principal: 250000, Rate: 5.5%, Term: 30 years',
    output: 'Monthly payment: $1,419.47\nTotal interest: $260,010.40',
  },
  'percentage-calculator': {
    input: 'What is 15% of 80?',
    output: '12',
  },
  'mortgage-calculator': {
    input: 'Loan: 300000, Rate: 3.5%, Term: 30 years',
    output: 'Monthly payment: $1,347.13\nTotal paid: $484,966.80',
  },
  'age-calculator': {
    input: 'Born: 1990-05-22, Today: 2026-05-22',
    output: 'Age: 36 years',
  },
  'bmi-calculator': {
    input: 'Height: 170 cm, Weight: 68 kg',
    output: 'BMI: 23.53 (Normal weight)',
  },
  'discount-calculator': {
    input: 'Original: $80, Discount: 25%',
    output: 'Discounted price: $60',
  },
  'tip-calculator': {
    input: 'Bill: $120, Tip: 18%, People: 3',
    output: 'Tip per person: $7.20\nTotal per person: $47.20',
  },
  'password-generator': {
    input: 'Generate an 12-character password',
    output: 'Example: X7m$9vTpQ2w!',
  },
  'random-name-generator': {
    input: 'Generate a character name',
    output: 'Arielle Stormwood',
  },
  'todo-list': {
    input: 'Add: Buy groceries, Call plumber, Schedule meeting',
    output: 'Your tasks have been added to the list.',
  },
  'timer-stopwatch': {
    input: 'Start a 15-minute timer',
    output: 'Timer running: 15:00 remaining',
  },
  'dice-roller': {
    input: 'Roll 2d6',
    output: 'Die 1: 4\nDie 2: 5\nTotal: 9',
  },
  'coin-flipper': {
    input: 'Flip a coin',
    output: 'Result: Heads',
  },
  'morse-code-translator': {
    input: 'SOS',
    output: '... --- ...',
  },
  'unit-calculator': {
    input: 'Calculate 9 * 7 / 3',
    output: 'Result: 21',
  },
}

export function getToolDetails(tool: Tool): ToolDetails {
  const audience = toolAudiences[tool.category] || 'users'
  const useCase = toolUseCases[tool.slug] ?? 'complete common tasks quickly and reliably'
  const action = toolActions[tool.slug] ?? 'process your input'
  const example = toolExamples[tool.slug] ?? {
    input: `Example input for ${tool.name}`,
    output: `Example output for ${tool.name}`,
  }
  return {
    purpose: `Use ${tool.name} to ${tool.description.toLowerCase()}.`,
    longDescription: `The ${tool.name} is a browser-based utility that helps ${audience} ${useCase}. It offers a clean, responsive interface with fast results delivered in the browser, so you can work without installing software or creating an account. The tool makes it easy to ${action} and then copy or export the result immediately for use in your project or workflow. Built for both beginners and advanced users, it saves time by removing manual steps and improving accuracy. You can use the tool on desktop and mobile devices, and the interface includes clear examples to help you verify output quickly. Whether you are preparing a document, troubleshooting data, or planning a project, ${tool.name} is designed to reduce friction and keep your work moving. This makes it a practical, dependable choice for anyone looking for a polished online utility.`,
    howToUse: [
      `Enter or paste your ${tool.name.toLowerCase()} input into the tool interface.`,
      `Adjust any available options for the result format, output style, or calculation settings.`,
      `Click the action button to ${action} and wait for the updated output.`,
      `Review the result, then copy or download the output for your next task.`,
    ],
    exampleInput: example.input,
    exampleOutput: example.output,
    faq: [
      {
        question: 'Is this tool free?',
        answer: `Yes. ${tool.name} is free to use with no signup required.`,
      },
      {
        question: 'Is my data stored?',
        answer: 'Most inputs are processed in your browser and not stored on our servers. We only keep anonymous usage data to improve the service.',
      },
      {
        question: 'Can I use the results commercially?',
        answer: 'Yes. The output is available for personal or commercial use, subject to the Terms of Service.',
      },
      {
        question: 'Does this tool work in any browser?',
        answer: 'Yes. The tool runs in modern browsers on desktop and mobile without needing downloads or plugins.',
      },
    ],
  }
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
    description: 'Compress images and reduce file size while preserving quality',
    category: 'document',
    icon: 'Images',
    slug: 'image-compressor',
    keywords: ['image', 'compress', 'optimize', 'resize'],
    featured: true,
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
