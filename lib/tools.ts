export interface Tool {
  id: string
  name: string
  description: string
  category: 'developer' | 'document' | 'calculator' | 'utility'
  icon: string // lucide-react icon name
  slug: string
  keywords: string[]
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  h1?: string
}

export interface ToolGuideSection {
  heading: string
  paragraphs: string[]
  tips?: string[]
}

export interface ToolDetails {
  purpose: string
  longDescription: string
  aboutBlurb: string
  howToUse: string[]
  exampleInput: string
  exampleOutput: string
  guideSections: ToolGuideSection[]
  faq: { question: string; answer: string }[]
  relatedTools: { name: string; slug: string; description: string }[]
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
  'percentage-calculator': 'calculate percentages, increases, decreases, reverse values, and ratios',
  'mortgage-calculator': 'estimate mortgage payments, amortization schedules, and loan performance',
  'age-calculator': 'calculate age and the time between important dates',
  'bmi-calculator': 'determine body mass index, ideal weight range, and health categories',
  'discount-calculator': 'work out sale prices, fixed or percent savings, and final totals',
  'tip-calculator': 'split tips, calculate per-person totals, and support currency selection',
  'password-generator': 'create strong random passwords for accounts and services',
  'random-name-generator': 'generate character names, team names, and creative ideas',
  'todo-list': 'track tasks and stay organized with simple list management',
  'timer-stopwatch': 'time sessions with countdown and stopwatch controls',
  'dice-roller': 'simulate dice rolls for games and probability testing',
  'coin-flipper': 'flip a virtual coin for decisions and fun',
  'morse-code-translator': 'encode and decode Morse code for communication and learning',
  'unit-calculator': 'compute formulas and unit-based values quickly',
  'pixels-to-inches': 'convert between pixels and inches for print and screen sizing',
  'px-to-inches': 'convert px to inches for print and digital design work',
  'inches-to-px': 'convert inches to pixels for digital design and screen layouts',
  'slug-generator': 'turn titles and text into clean SEO-friendly URL slugs with bulk support and smart options',
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
  'percentage-calculator': 'calculate percentages, ratios, and reverse percentage values',
  'mortgage-calculator': 'calculate mortgage payments and loan schedules',
  'age-calculator': 'calculate age',
  'bmi-calculator': 'calculate BMI and weight categories',
  'discount-calculator': 'calculate discount pricing from percent or fixed savings',
  'tip-calculator': 'calculate tip amounts, per-person totals, and currency-based splits',
  'password-generator': 'generate a secure password',
  'random-name-generator': 'generate a name',
  'todo-list': 'manage your task list',
  'timer-stopwatch': 'track time',
  'dice-roller': 'roll dice',
  'coin-flipper': 'flip a coin',
  'morse-code-translator': 'translate Morse code',
  'unit-calculator': 'calculate units with formulas',
  'pixels-to-inches': 'convert pixels to inches or inches to pixels',
  'px-to-inches': 'convert px to inches',
  'inches-to-px': 'convert inches to px',
  'slug-generator': 'generate a clean SEO-friendly URL slug',
}

const toolAboutBlurbs: Record<string, string> = {
  'json-formatter': 'JSON Formatter is essential for any developer working with APIs, configuration files, or data exchanges. Paste minified or messy JSON, and instantly get a clean, readable, properly indented version. Perfect for debugging API responses, validating configurations, and understanding data structures at a glance.',
  'jwt-decoder': 'JWT Decoder is a security tool for developers, backend engineers, and security teams to inspect authentication tokens without writing code. Decode any JWT to view the header, payload, and signature, verify claims, and check expiration dates. Ideal for debugging authentication flows and auditing token contents.',
  'base64-encoder': 'Base64 Encoder/Decoder handles encoding and decoding for developers, system administrators, and anyone working with data transmission. Use it to encode text for APIs, decode credentials from authentication headers, or prepare data for safe text-only transmission systems like email.',
  'hash-generator': 'Hash Generator creates cryptographic fingerprints of your data with support for MD5, SHA-1, SHA-256, and SHA-512. Essential for verifying file integrity, storing passwords securely, and creating unique identifiers. Developers rely on this tool for checksums and data validation in production systems.',
  'regex-tester': 'Regex Tester is the go-to tool for developers and technical writers who build and debug regular expressions. Test patterns in real-time, see exactly what matches, and validate your regex logic before using it in code. Perfect for form validation, data extraction, and log file analysis.',
  'image-compressor': 'Image Compressor reduces file sizes for web designers, content creators, and developers optimizing website performance. Compress JPG, PNG, and other formats while keeping visual quality high. Ideal for reducing page load times, meeting social media size limits, and cutting storage costs.',
  'url-encoder': 'URL Encoder/Decoder is indispensable for API developers, web developers, and anyone building URLs with special characters. Encode spaces, ampersands, and other characters for safe query parameters; decode to troubleshoot malformed URLs. Essential for debugging API requests and OAuth redirects.',
  'sql-formatter': 'SQL Formatter helps database administrators, backend developers, and data analysts write and share clean SQL queries. Format minified queries for readability, review complex joins, and prepare SQL for documentation. Makes code review easier and helps catch logic errors before running against production databases.',
  'color-converter': 'Color Converter is invaluable for designers, frontend developers, and brand teams working across different color formats. Convert between HEX, RGB, and HSL instantly when moving colors from design tools into CSS or working with color palettes. Essential for maintaining consistency across digital projects.',
  'code-minifier': 'Code Minifier compresses CSS, JavaScript, and HTML to reduce file sizes and improve website performance. Frontend developers and DevOps teams use this tool to shrink code for production deployment, cutting bandwidth and improving page load times for users worldwide.',
  'diff-checker': 'Diff Checker allows developers, content editors, and data analysts to compare two versions of text and highlight exact differences. Perfect for code reviews, version control, and spotting changes in documents, configurations, or data exports. See exactly what changed, line by line.',
  'xml-formatter': 'XML Formatter is used by backend developers, data engineers, and API specialists to format and validate XML documents. Clean up XML from data exchanges, config files, and APIs; spot structural errors instantly. Essential for SOAP APIs, data imports, and legacy system integration.',
  'uuid-generator': 'UUID Generator (also a GUID Generator) creates unique 128-bit identifiers for developers building databases, testing, and creating prototypes. Generate v1, v4, and v7 UUIDs — all valid as both UUIDs and GUIDs — instantly for use as primary keys, test data IDs, and distributed system identifiers. No signup required—just generate and copy.',
  'word-counter': 'Word Counter is essential for writers, content creators, and students tracking essay and article length. Count words, characters, paragraphs, and get accurate reading time estimates. Use it to meet assignment requirements, plan content, and optimize writing for readability and SEO.',
  'qr-code-generator': 'QR Code Generator creates scannable codes from URLs, text, and contact details. Marketers, event organizers, and business owners use this to link print materials to websites, share WiFi, and distribute contact info. Instant QR codes ready to print or share online.',
  'markdown-editor': 'Markdown Editor is perfect for technical writers, documentation specialists, and developers who work with Markdown syntax. Write in Markdown, preview rendered output instantly, and verify formatting before publishing to blogs, GitHub, or documentation sites.',
  'text-to-speech': 'Text to Speech converts written text into natural-sounding audio, helping content creators, educators, and accessibility specialists. Generate audio files for videos, presentations, and blogs. Great for reaching audiences who prefer listening and for making content accessible to people with visual impairments.',
  'json-to-csv': 'JSON to CSV transforms structured data into spreadsheet-ready format for data analysts, business intelligence teams, and developers. Convert API responses or data exports to CSV instantly for analysis in Excel, Google Sheets, or data visualization tools.',
  'text-to-html': 'Text to HTML converts plain text into proper HTML markup for web developers, content managers, and bloggers. Transform paragraphs, line breaks, and simple formatting into valid HTML ready to paste into websites, CMSs, or email templates.',
  'unit-converter': 'Unit Converter handles conversions across length, weight, volume, and temperature for students, engineers, and international professionals. Quick, accurate conversions for homework, recipes, science projects, and working across measurement systems globally.',
  'loan-calculator': 'Loan Calculator helps borrowers, financial planners, and students understand monthly payments, total interest, and payoff schedules. Input loan amount, rate, and term to see exact payments and plan finances. Perfect for mortgages, car loans, and personal loans.',
  'percentage-calculator': 'Percentage Calculator quickly answers percentage questions for students, shoppers, and business professionals. Calculate what percent one number is of another, find percentage increases and decreases, compare values with ratios, and work backwards using reverse percentage calculations.',
  'mortgage-calculator': 'Mortgage Calculator helps homebuyers, real estate agents, and financial advisors estimate monthly payments, compare loan options, and review amortization details. See total interest paid, down payment impact, loan-to-value, and how extra payments can shorten your loan term.',
  'age-calculator': 'Age Calculator determines exact age and days between important dates. Perfect for birthday planning, calculating time until milestones, and verifying ages for forms and records. Simple, instant results.',
  'bmi-calculator': 'BMI Calculator computes Body Mass Index for health professionals, fitness enthusiasts, and individuals tracking wellness. See BMI value, health category, and ideal weight range instantly using metric or imperial units.',
  'discount-calculator': 'Discount Calculator figures out final prices, savings amounts, and discounted costs for shoppers and sales staff. Use percentage-based or fixed amount discounts to see your final price and savings instantly.',
  'tip-calculator': 'Tip Calculator splits bills and calculates tips instantly for diners, servers, and group payments. Use currency selection, custom tip percentages, and per-person totals for shared meals, taxis, and service charges.',
  'password-generator': 'Password Generator creates strong, random passwords for IT professionals and anyone securing accounts. Customize length and character types (uppercase, lowercase, numbers, symbols) to meet password requirements for any service.',
  'random-name-generator': 'Random Name Generator produces character names for writers, game developers, and tabletop RPG players. Great for fantasy worlds, fiction writing, and creating diverse character backgrounds. Instant inspiration for your next project.',
  'todo-list': 'Todo List is a simple task manager for students, professionals, and anyone organizing their day. Add, check off, and organize tasks without installing apps or creating accounts. Keep your priorities visible and stay on track.',
  'timer-stopwatch': 'Timer & Stopwatch lets you count down to a deadline or measure elapsed time with simple, reliable controls. Perfect for productivity, workouts, cooking, presentations, and any activity that needs precise timing. Optional sound alerts included.',
  'dice-roller': 'Dice Roller simulates realistic dice rolls for tabletop gamers, probability students, and game designers. Roll any number of dice with any sides; see individual results and totals instantly. Perfect for D&D, board games, and game balance testing.',
  'coin-flipper': 'Coin Flipper makes virtual coin tosses for making decisions, settling disputes, or testing probability. Realistic animation and instant results. Perfect for games, choosing between options, and fair decision-making.',
  'morse-code-translator': 'Morse Code Translator encodes and decodes Morse code for history enthusiasts, amateur radio operators, and curious learners. Convert text to dots and dashes or vice versa. Great for learning telegraphy and experimenting with alternative communication.',
  'pixels-to-inches': 'Pixels to Inches Converter is the go-to tool for designers, print professionals, and anyone who needs to convert between pixel dimensions and physical inch measurements. Unlike many converters that assume a fixed DPI, this tool lets you choose from common presets (72 DPI for web, 96 DPI for Windows screens, 150 DPI for draft print, 300 DPI for print quality) or enter any custom DPI. The bidirectional converter updates instantly as you type, with a handy Width × Height mode for dimension pairs. Whether you are sizing images for print layout, calculating screen dimensions, or working on a design project that crosses between digital and physical media, this converter gives you accurate results in real time.',
  'px-to-inches': 'PX to Inches Converter is a focused tool for designers and developers who need quick, accurate conversions from pixels to physical inches. Perfect for translating screen mockups into print-ready dimensions, this converter supports all major DPI settings including web standard (96 DPI) and print quality (300 DPI). The instant bidirectional calculation means you can work in either direction without clicking swap buttons — just type and convert.',
  'inches-to-px': 'Inches to PX Converter is designed for users who think in physical measurements first and need to translate them into pixel dimensions. Print designers, signage creators, and layout artists use this tool to convert real-world inch measurements into precise pixel values for digital production. With support for any DPI setting, you get accurate pixel outputs for screen, web, and print workflows.',
  'slug-generator': 'Slug Generator is a modern URL slug creation tool for content creators, SEO specialists, and web developers who need clean, SEO-friendly slugs from titles and text. Unlike basic converters that only lowercase and hyphenate, this tool handles accented characters (like é, ñ, ü), strips stop words, controls slug length, and converts bulk lists of titles in one pass. Whether you are writing a blog post, migrating a site, or setting up product pages, you get precise, readable slugs that follow current SEO best practices — hyphens, lowercase, and free of special characters.',
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
  'pixels-to-inches': {
    input: 'Pixels: 1080, DPI: 96',
    output: '11.250 inches',
  },
  'px-to-inches': {
    input: 'Pixels: 600, DPI: 300',
    output: '2.000 inches',
  },
  'inches-to-px': {
    input: 'Inches: 8.5, DPI: 300',
    output: '2550 pixels',
  },
  'slug-generator': {
    input: 'How to Bake Bread at Home',
    output: 'how-to-bake-bread-at-home',
  },
}

// Comprehensive tool-specific guide content (500+ words for priority tools)
export const toolGuideContent: Record<string, { sections: ToolGuideSection[]; relatedTools: string[]; faq?: { question: string; answer: string }[] }> = {
  'json-formatter': {
    sections: [
      {
        heading: 'What is JSON?',
        paragraphs: [
          'JSON (JavaScript Object Notation) is a lightweight, text-based data format used to store and transmit structured information. It is one of the most widely used formats in web development because it is easy for humans to read and write, and simple for machines to parse and generate. JSON uses key-value pairs enclosed in curly braces to represent objects, and square brackets to represent arrays, making it ideal for APIs, configuration files, and data storage.',
          'Unlike HTML or XML, JSON focuses purely on data structure without presentation or document markup. This makes it the preferred format for communicating between web applications, servers, and databases. JSON is language-independent, which means it works seamlessly with JavaScript, Python, Java, C#, and virtually every modern programming language.',
          'JSON supports several data types including strings, numbers, booleans, null values, objects, and arrays. This flexibility allows developers to represent complex data hierarchies in a compact, efficient format. Many popular APIs, including Twitter, GitHub, and Google Maps, use JSON as their primary data exchange format.',
        ],
      },
      {
        heading: 'When should you use the JSON Formatter?',
        paragraphs: [
          'Use the JSON Formatter when you receive minified JSON that is difficult to read. Minified JSON removes all whitespace and line breaks to reduce file size for transmission, which makes it unreadable for debugging and verification. Pasting the minified JSON into this tool instantly formats it with proper indentation so you can inspect the data structure clearly.',
          'API developers use the JSON Formatter to validate responses from endpoints. After making an API call, the response is often returned as minified JSON. By formatting it immediately, you can verify that the response contains the expected fields, check for errors, and confirm the data hierarchy is correct before integrating it into your application.',
          'Configuration file editors use this tool to beautify package.json, tsconfig.json, eslint.json, and other JSON-based configuration files. This is especially helpful when manually editing these files or merging changes from version control, as proper formatting makes it easier to spot syntax errors and validate structure.',
          'Data analysts and engineers use the JSON Formatter to examine exported data from databases or APIs. When exporting data in bulk, it often arrives as minified JSON. Formatting the data makes it easier to identify duplicates, missing fields, and unexpected value types before loading into a processing pipeline.',
          'Students and learners use the JSON Formatter to understand API response structures. By formatting real API responses, they can trace through the data hierarchy, understand how nested objects work, and practice reading and writing JSON correctly.',
        ],
      },
      {
        heading: 'How to use the JSON Formatter',
        paragraphs: [
          'Step 1: Paste or type your JSON into the input field on the left side of the tool. You can copy raw JSON from an API response, a configuration file, or any other source and paste it directly. The tool will automatically detect the JSON format.',
          'Step 2: The formatter will parse the JSON and format it with proper indentation, making the structure visible. If there are syntax errors in your JSON, the tool will display an error message indicating the exact location of the problem, such as a missing comma or unclosed bracket.',
          'Step 3: Review the formatted output on the right side. Check that the data hierarchy makes sense, all required fields are present, and values are of the expected type. You can expand or collapse sections if the output is long.',
          'Step 4: Copy the formatted JSON using the copy button. The formatted output is now ready to paste into your editor, documentation, or code. Many developers keep a formatted version alongside their minified version for reference and debugging.',
          'Step 5: For additional options, you can often choose compression levels, such as compact formatting with single-line values or fully expanded formatting with each property on its own line.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Missing commas between properties. If you see "Unexpected token" errors, check that each key-value pair (except the last one) ends with a comma. For example, {"name": "Alice", "age": 30} is correct, but {"name": "Alice" "age": 30} (missing comma) will cause an error. The tool will point you to the exact location of the missing comma.',
          'Error: Unclosed brackets or braces. If your JSON has an opening curly brace { or square bracket [ without a closing counterpart }, the formatter will report an error. This is especially common when manually editing large JSON files. Count your opening and closing braces to ensure they match, then correct the error.',
          'Error: Quotes around property names. JSON requires property names to be enclosed in double quotes, not single quotes. For example, {"name": "value"} is correct, but {\'name\': \'value\'} is not. If you copy JSON from Python or JavaScript where single quotes are acceptable, you must convert them to double quotes for valid JSON.',
          'Error: Trailing commas. JSON does not allow trailing commas after the last element in an array or object. For example, {"items": [1, 2, 3,]} is invalid, while {"items": [1, 2, 3]} is correct. Remove any commas that appear immediately before a closing bracket or brace.',
          'Error: Invalid data types. Ensure that strings are wrapped in quotes, numbers are not quoted (unless you want them as strings), and boolean values are lowercase (true or false, not True or False). Mixed or incorrect data types cause validation errors.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'JSON to CSV: If you need to convert your formatted JSON into spreadsheet format, the JSON to CSV tool will export your data into a comma-separated file that opens directly in Excel or Google Sheets.',
          'Code Minifier: After formatting your JSON for readability, use the Code Minifier to shrink it back to a compact format for production or API transmission. This reduces file size and network bandwidth.',
          'Diff Checker: When working with multiple versions of JSON configuration files, use the Diff Checker to highlight the differences between two versions, making it easy to spot what changed.',
        ],
      },
    ],
    relatedTools: ['json-to-csv', 'code-minifier', 'diff-checker'],
    faq: [
    { question: 'How do I format JSON online for free?', answer: 'Paste your minified or messy JSON into the input area and the tool instantly formats it with proper indentation. You can copy the beautified output and use it in your code, documentation, or debugging workflow.' },
    { question: 'What is JSON formatting and why is it important?', answer: 'JSON formatting adds proper indentation and line breaks to make JSON data human-readable. It is important for debugging API responses, reviewing configuration files, and understanding complex nested data structures.' },
    { question: 'Can I validate JSON with this formatter?', answer: 'Yes, the formatter validates your JSON syntax as it processes. If there are errors like missing commas or unclosed brackets, it will display an error message indicating the exact issue location.' },
    { question: 'How do I minify JSON for production?', answer: 'Use the minify option to remove all whitespace and line breaks from your JSON. This reduces file size and improves load times when transferring JSON over the network.' },
    { question: 'Is my JSON data safe when I use this formatter?', answer: 'Yes, all processing happens in your browser. Your data is never sent to any server or stored anywhere. You can safely work with sensitive configuration data.' },
  ],
  },



  'jwt-decoder': {
    sections: [
      {
        heading: 'What is a JWT token?',
        paragraphs: [
          'A JWT (JSON Web Token) is a compact, self-contained way to transmit information securely between parties. It is commonly used for authentication and authorization in web applications. A JWT consists of three parts separated by dots: the header (which specifies the algorithm), the payload (which contains the actual claims or user data), and the signature (which verifies that the token has not been tampered with).',
          'JWTs are stateless, meaning the server does not need to store session data to validate them. When a user logs in, the server creates a JWT and sends it to the client. The client includes this token in subsequent requests, and the server can verify the token\'s authenticity by checking the signature without querying a database. This makes JWTs efficient for scaling applications, as each server can independently verify tokens.',
          'JWTs are widely used in modern web applications, especially in APIs and microservices architectures. They are part of the OAuth 2.0 and OpenID Connect standards, making them the de facto standard for authentication tokens across the internet. Popular platforms like Google, GitHub, and Auth0 use JWTs to manage user sessions and permissions.',
        ],
      },
      {
        heading: 'When should you use the JWT Decoder?',
        paragraphs: [
          'Use the JWT Decoder when you receive an authentication token and need to inspect its contents. Developers commonly receive JWTs in API responses after login. By decoding the token, you can verify that the correct user information, permissions, and expiration date are embedded in the token without needing to check a database.',
          'Backend developers use the JWT Decoder to troubleshoot authentication issues. If a user is getting denied access or experiencing permission problems, you can decode their JWT to see what roles or claims are assigned to their account, which helps identify configuration errors or permission conflicts.',
          'Security engineers use the JWT Decoder to audit tokens and ensure they contain expected data. By regularly decoding JWTs in your system, you can verify that no sensitive data is being exposed, tokens expire at appropriate times, and user permissions are correctly assigned.',
          'Frontend developers use this tool to debug authentication flows. When integrating login systems or third-party authentication providers (like Google or GitHub), decoding the JWT helps confirm that user data is being received and stored correctly.',
          'Token validation and testing: Use the decoder to verify that tokens issued by your authentication server include all required claims. If you are writing tests for your auth system, decoding sample tokens helps confirm they are generated correctly.',
        ],
      },
      {
        heading: 'How to use the JWT Decoder',
        paragraphs: [
          'Step 1: Copy your JWT from the Authorization header, response payload, or local storage where it is stored. A complete JWT looks like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U (three parts separated by dots).',
          'Step 2: Paste the JWT into the decoder input field. The tool will immediately parse the three components (header, payload, and signature) and display them in readable JSON format.',
          'Step 3: Review the Header section to see the algorithm used for signing (typically HS256, RS256, or similar). This tells you how the token was cryptographically signed.',
          'Step 4: Examine the Payload section, which contains the claims (user data). This might include user ID, username, email, role, permissions, and the expiration time (exp claim). Verify that all expected fields are present and have correct values.',
          'Step 5: Note the Signature section. The decoder displays the signature but cannot verify it without access to the signing key (this is intentional for security). If you have the signing key, you can use other tools or libraries to verify the signature authenticity.',
          'Step 6: Check the expiration time. Look for the "exp" claim in the payload, which is a Unix timestamp indicating when the token expires. If the current time is after this timestamp, the token has expired and is no longer valid.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Invalid token format. Ensure the JWT contains exactly three parts separated by two dots. If it is missing a part or has extra dots, the decoder will reject it. The token should always follow the pattern: xxxxx.yyyyy.zzzzz. Copy the complete token from the source without cutting off characters.',
          'Error: Token is not valid JSON. After the decoder parses the token, if the header or payload is not valid JSON, an error will appear. This usually indicates the token is corrupted or was not properly encoded. Check the source of the token and ensure you are copying the complete, unmodified JWT.',
          'Error: Token expired. If you decode a token and see an "exp" claim with a timestamp in the past, the token has expired. The server will reject this token for authentication. You need to request a fresh token by logging in again or using a refresh token if your system provides one.',
          'Error: Wrong signature algorithm. If you know the signing key but the signature does not verify, ensure you are using the correct algorithm (HS256, RS256, ES256, etc.). Different algorithms require different verification methods, and using the wrong one will fail.',
          'Error: Signature tampering detected. If the signature does not match the header and payload, it means the token has been modified. This is a security red flag indicating either data corruption or a malicious attempt to forge a token. Do not trust tokens with invalid signatures.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Hash Generator: Use this tool to generate cryptographic hashes for creating or verifying JWT signatures. Understand the different hash algorithms (MD5, SHA-256, SHA-512) that power JWT security.',
          'Base64 Encoder/Decoder: JWTs use Base64 URL encoding for each component. If you need to manually encode or decode specific JWT parts, the Base64 tool can help.',
          'JSON Formatter: If you need to prettify the payload or header of a decoded JWT for better readability, use the JSON Formatter to format it nicely.',
        ],
      },
    ],
    relatedTools: ['hash-generator', 'base64-encoder', 'json-formatter'],
    faq: [
    { question: 'How do I decode a JWT token online?', answer: 'Copy your JWT token and paste it into the decoder input. The tool immediately displays the header, payload, and signature in readable JSON format without sending your token anywhere.' },
    { question: 'Is it safe to decode JWT tokens online?', answer: 'Yes, this tool processes everything in your browser. The token never leaves your device, making it safe to inspect authentication tokens without security risks.' },
    { question: 'What information is inside a JWT token?', answer: 'A JWT contains three parts: the header (algorithm and token type), the payload (claims like user ID, roles, expiration), and the signature (used to verify the token has not been tampered with).' },
    { question: 'What is the difference between JWT header and payload?', answer: 'The header contains metadata about the token like the signing algorithm (e.g., HS256). The payload contains the actual claims and user data like user ID, permissions, and expiration time.' },
    { question: 'Can I verify JWT signature online?', answer: 'You can view the signature but verifying it requires the signing key which is only known to the server that issued the token. The decoder shows the signature but cannot verify without the secret.' },
  ],
  },

  'base64-encoder': {
    sections: [
      {
        heading: 'What is Base64 encoding?',
        paragraphs: [
          'Base64 is an encoding scheme that converts binary data into a text-based format using a set of 64 safe characters (letters, numbers, +, /, and =). The purpose of Base64 is to represent binary data in a way that can be safely transmitted through systems that only support text (like emails, JSON APIs, and HTML). When you encode data with Base64, you are converting raw bytes into a string of printable characters that any system can handle.',
          'Base64 does not encrypt data—it is purely a encoding format. Anyone with a Base64-encoded string can easily decode it back to the original data. Therefore, Base64 should never be used for security purposes. It is useful for transmitting images in JSON, embedding fonts in CSS, storing binary files as text, and protecting against certain parsing issues in data transmission.',
          'The name "Base64" comes from the fact that it uses 64 characters in its alphabet. Each encoded character represents 6 bits of data, which is why encoding typically increases data size by about 33% compared to the original binary form.',
        ],
      },
      {
        heading: 'When should you use the Base64 Encoder/Decoder?',
        paragraphs: [
          'Encode images to embed in JSON: When building APIs or web applications that need to send images as JSON, you can Base64-encode the image file and include it in the response. The client can then decode it and display it in the browser.',
          'Email attachments and headers: Email systems traditionally use Base64 to encode attachments and binary data in email headers. When you send an attachment through SMTP, it is Base64-encoded to ensure it survives transmission across email servers.',
          'Data URLs in HTML and CSS: Use Base64 encoding to create data URLs that embed images, fonts, and other resources directly into HTML and CSS files. This reduces HTTP requests and improves page load performance for small resources.',
          'API authentication credentials: Some APIs require you to send username and password credentials in the Authorization header using Basic Authentication, which Base64-encodes "username:password". This tool helps you generate that encoded string quickly.',
          'Storing binary data in text databases: If you need to store binary files (like PDFs or images) in a text-based database without BLOB support, Base64 encoding allows you to represent the data as text.',
          'JWT tokens and cookie values: JWTs and secure cookies often use Base64 encoding for their payloads. Understanding how to encode and decode these formats helps with debugging and token inspection.',
        ],
      },
      {
        heading: 'How to use the Base64 Encoder/Decoder',
        paragraphs: [
          'Step 1: Paste your text or data into the input field on the left side. You can paste plain text, JSON, HTML, or any data you want to encode.',
          'Step 2: The tool will automatically detect whether you want to encode or decode. If it recognizes the input as valid Base64 (only contains Base64 characters), it will default to decoding. Otherwise, it will encode.',
          'Step 3: For encoding, the tool converts your input into Base64 format. Each character in the input becomes a series of Base64 characters. The output will be longer than the input, usually by about 33%.',
          'Step 4: For decoding, the tool converts Base64 back into the original text. If the Base64 is valid, you will see the original data. If it is corrupted or incomplete, the decoder will report an error.',
          'Step 5: Copy the result using the copy button. You can then use the encoded string in your API response, HTML, CSS, email, or wherever you need to transmit text-safe binary data.',
          'Step 6: Test by decoding what you just encoded. Paste the Base64 output back into the tool and set it to decode mode to verify the data is unchanged.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Invalid Base64 format when decoding. If you are trying to decode data and see an error, ensure the input contains only valid Base64 characters (A-Z, a-z, 0-9, +, /, and =). If there are extra line breaks, spaces, or other characters, remove them.',
          'Error: Incomplete Base64 string. Base64-encoded strings must be a multiple of 4 characters (padded with = signs if needed). If your string is missing padding or is cut off, add the required = characters at the end.',
          'Error: Special characters causing encoding issues. If you are encoding text with special characters (accents, emojis, non-ASCII characters), ensure you are working with the correct character encoding (usually UTF-8). The tool should handle this automatically.',
          'Error: Line breaks in the middle of Base64. When copying Base64 from emails or documents, line breaks are sometimes added for readability. Remove all line breaks and extra spaces before decoding.',
          'Error: Case sensitivity matters. Base64 is case-sensitive, so "Ab" is different from "ab". When copying, ensure you preserve the exact capitalization.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'URL Encoder/Decoder: For encoding URLs and query parameters, use the URL Encoder. It handles percent-encoding, which is different from Base64 but serves a similar purpose for URLs.',
          'Hash Generator: If you need to generate cryptographic hashes (like SHA-256) instead of Base64 encoding, use the Hash Generator.',
          'JWT Decoder: JWTs are partially Base64-encoded. Use the JWT Decoder to inspect and parse JWT tokens.',
        ],
      },
    ],
    relatedTools: ['url-encoder', 'hash-generator', 'jwt-decoder'],
    faq: [
    { question: 'How do I decode Base64 online for free?', answer: 'Paste your Base64-encoded string into the input field and select decode mode. The tool converts it back to plain text instantly. All processing happens in your browser.' },
    { question: 'What is Base64 encoding used for?', answer: 'Base64 is used to transmit binary data through text-only systems like email, JSON APIs, and HTML. It converts binary data into a safe text format using 64 printable characters.' },
    { question: 'How do I encode text to Base64?', answer: 'Type or paste your text into the input field and select encode mode. The tool converts each character into its Base64 representation, producing a longer but safely transmittable string.' },
    { question: 'Can I decode Base64 images online?', answer: 'Yes, you can decode Base64 image data (data URIs) to view the original image content. The tool handles image data encoded in Base64 format.' },
    { question: 'Is Base64 encoding the same as encryption?', answer: 'No, Base64 is encoding, not encryption. Anyone can decode Base64 data back to its original form easily. It should never be used to protect sensitive data.' },
  ],
  },

  'hash-generator': {
    sections: [
      {
        heading: 'What is a hash function?',
        paragraphs: [
          'A hash function is a mathematical algorithm that takes any input (text, numbers, files) and produces a fixed-length string of characters called a hash. The primary characteristic of a hash is that the same input always produces the same hash output, but even a tiny change in the input produces a completely different hash. This property makes hashes ideal for detecting data corruption, verifying file integrity, and creating digital fingerprints.',
          'Hashes are one-way functions, meaning you cannot reverse a hash to recover the original input. For example, if you have the hash "5d41402abc4b2a76b9719d911017c592", it is impossible to determine that the original input was "hello" just by looking at the hash. This property is crucial for password storage and security.',
          'Common hash algorithms include MD5 (older, deprecated for security), SHA-1 (also deprecated), SHA-256 (industry standard, widely used), and SHA-512 (even more secure). The number in the name indicates the output size in bits: SHA-256 produces a 256-bit hash (64 hexadecimal characters), while SHA-512 produces a 512-bit hash (128 hexadecimal characters).',
        ],
      },
      {
        heading: 'When should you use the Hash Generator?',
        paragraphs: [
          'Password storage: Never store plain-text passwords in your database. Instead, hash the password when a user creates an account, and store the hash. When the user logs in, hash their input and compare it to the stored hash. If they match, the password is correct.',
          'File integrity verification: When downloading large files, the provider often publishes the hash of the file. You can generate the hash of your downloaded file and compare it to the published hash. If they match, the file was not corrupted during download.',
          'Creating unique identifiers: Use hashes to create unique fingerprints of data. For example, if you want to detect duplicate records in a database, you can hash each record and find entries with identical hashes.',
          'API request signing: Some APIs require you to sign requests by hashing your request data with a secret key. This proves you are authorized to make the request and prevents tampering.',
          'Deduplication and caching: Content delivery networks (CDNs) and caching systems use hashes to identify identical content. If two users upload the same file, the hash allows the system to store only one copy and serve it to both users.',
          'Blockchain and cryptocurrency: Hashes are fundamental to blockchain technology. Bitcoin and Ethereum use hashes to create cryptographically secure chains of blocks.',
        ],
      },
      {
        heading: 'How to use the Hash Generator',
        paragraphs: [
          'Step 1: Select the hash algorithm you want to use. For new projects, SHA-256 is the recommended choice. MD5 and SHA-1 are deprecated due to security vulnerabilities, so avoid using them for security-sensitive operations.',
          'Step 2: Enter or paste the text, password, or file content you want to hash into the input field.',
          'Step 3: Click the Generate Hash button. The tool will compute the hash using your selected algorithm.',
          'Step 4: The output is displayed as a hexadecimal string. For SHA-256, this will be 64 characters. Copy this hash for use in your application, database, or security verification.',
          'Step 5: To verify a hash, generate the hash from your data again. If it matches a previously generated hash, the data has not changed. If it is different, the data has been modified.',
          'Step 6: Use the hash in your workflow. For password storage, hash the password when it is created. For file verification, compare the generated hash with a published hash.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Different hash for the same input. If you hash the same text twice and get different results, ensure you are using the same algorithm both times. Different algorithms produce different hashes. Also check for extra spaces or line breaks in your input, as they are part of the data being hashed.',
          'Error: Hash does not match downloaded file. If you are verifying a downloaded file and the hashes do not match, ensure you are using the correct hash algorithm (SHA-256, MD5, etc.). The provider should specify which algorithm they used.',
          'Error: Salting for password hashing. For passwords, use a salted hash to prevent rainbow table attacks. A salt is a random string added to the password before hashing. This ensures the same password produces different hashes in different systems. This tool generates simple hashes without salting; for production password storage, use a library like bcrypt that handles salting automatically.',
          'Error: Collision concerns. In theory, two different inputs could produce the same hash (called a collision). However, for modern algorithms like SHA-256, collisions are computationally infeasible to find. This is why SHA-256 is considered cryptographically secure.',
          'Error: Hashing large files. If you are trying to hash very large files, the tool may be slow or use significant memory. For production systems, use command-line tools like "sha256sum" (Linux/Mac) or "certUtil" (Windows) for large files.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Password Generator: Use this tool to generate strong passwords that should be hashed before storage in your application.',
          'Base64 Encoder/Decoder: Hashes are often encoded in Base64 for transmission over text-only systems. Use this tool to encode or decode hashes if needed.',
          'JWT Decoder: JWT tokens use hashes for their signatures. Understanding how hashing works helps you understand JWT security.',
        ],
      },
    ],
    relatedTools: ['password-generator', 'base64-encoder', 'jwt-decoder'],
    faq: [
    { question: 'How do I generate an MD5 hash online?', answer: 'Select the MD5 algorithm, enter your text, and click generate. The tool computes a 32-character hexadecimal hash. MD5 is fast but not recommended for security purposes.' },
    { question: 'What is the difference between MD5 and SHA256?', answer: 'MD5 produces a 128-bit (32 character) hash and is considered cryptographically broken. SHA256 produces a 256-bit (64 character) hash and is the industry standard for security.' },
    { question: 'Is MD5 still safe to use?', answer: 'MD5 is not safe for security-critical applications like password storage or digital signatures. Use SHA256 or SHA512 instead. MD5 is acceptable for non-security uses like checksums.' },
    { question: 'How do I verify a file hash online?', answer: 'Generate the hash of your downloaded file and compare it to the hash provided by the source. If they match exactly, the file has not been corrupted or tampered with.' },
    { question: 'Can I reverse a hash back to the original text?', answer: 'No, hashes are one-way functions. You cannot reverse a hash to get the original input. This is why hashes are used for password storage instead of encryption.' },
  ],
  },

  'regex-tester': {
    sections: [
      {
        heading: 'What is a regular expression?',
        paragraphs: [
          'A regular expression (regex or regexp) is a sequence of characters that defines a search pattern. It allows you to match, find, replace, or validate text based on specific patterns. Regex is a powerful tool used in programming, text editing, and data processing to work with strings efficiently. Instead of manually checking for specific words or formats, regex lets you describe what pattern you are looking for, and the regex engine finds all matches.',
          'Regex patterns use special characters and syntax to describe what text they should match. For example, the pattern "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" matches email addresses. The ^ means start of string, the [] defines character classes, the + means one or more, and the $ means end of string.',
          'Regex is supported in virtually every programming language, including JavaScript, Python, Java, C#, PHP, and Ruby. It is also built into text editors, grep commands in Linux, and find-and-replace functions. Learning regex significantly speeds up text processing and data validation tasks.',
        ],
      },
      {
        heading: 'When should you use the Regex Tester?',
        paragraphs: [
          'Form validation: Before writing regex code, test patterns to ensure they match valid inputs and reject invalid ones. For example, test an email pattern against real email addresses and non-emails to confirm it works correctly.',
          'Data extraction: Use regex to extract specific data from text. For example, extract all URLs from a document, all phone numbers from a text, or all dates in a specific format.',
          'Log file analysis: Parse and analyze log files by searching for patterns that indicate errors, warnings, or specific events. Regex makes it easy to filter large log files for relevant entries.',
          'Find and replace in text: Test a pattern before using find-and-replace in your editor or code. Ensure the pattern matches only what you intend to replace, preventing accidental data loss.',
          'Data cleaning and normalization: Use regex to identify and fix inconsistent data. For example, normalize phone numbers from various formats into a single standard format.',
          'Testing programming code: Before implementing regex in your application, test it with actual data samples to catch edge cases and ensure the pattern works as expected.',
        ],
      },
      {
        heading: 'How to use the Regex Tester',
        paragraphs: [
          'Step 1: Enter your regex pattern in the pattern field. Start with a simple pattern like "abc" to match the literal text "abc". Gradually add special characters as you get comfortable with regex syntax.',
          'Step 2: Enter the text you want to search in the test field. This can be a single line or multiple lines of text.',
          'Step 3: The tool will highlight all matches in green. If there are no matches, the text will remain unhighlighted.',
          'Step 4: Review the matches to verify they are correct. If the pattern is matching too much or too little, adjust the regex.',
          'Step 5: Use flags to modify matching behavior. Common flags include: "g" for global (find all matches), "i" for case-insensitive, "m" for multiline (^ and $ match line boundaries), and "s" for single-line (dot matches newlines).',
          'Step 6: Once your pattern works correctly, copy it and use it in your code, editor, or application.',
          'Step 7: Test edge cases. Try your pattern with unusual inputs, empty strings, very long strings, and special characters to ensure robustness.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Metacharacters not escaped. Special characters like . * + ? [] () {} ^ $ | \\ have special meaning in regex and must be escaped with \\ if you want to match them literally. For example, to match a period, use "\\." instead of just ".".',
          'Error: Forgetting anchors. If you want to match the entire string (not just find a pattern within it), use ^ at the start and $ at the end. For example, "^[0-9]{3}$" matches exactly three digits, while "[0-9]{3}" matches three digits anywhere in the string.',
          'Error: Greedy vs non-greedy matching. By default, quantifiers like * and + are greedy and match as much as possible. Use *? or +? for non-greedy matching that matches as little as possible. This is important when extracting data from formatted text.',
          'Error: Incorrect character classes. Ensure you use the correct bracket syntax. [abc] matches a, b, or c, while [^abc] matches anything except a, b, or c. Common mistake: forgetting the ^ for negation.',
          'Error: Wrong flags. The "g" flag is required to find all matches; without it, most tools only find the first match. The "i" flag makes matching case-insensitive; if you need case sensitivity, do not use this flag.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Diff Checker: Use this to compare two text samples and identify patterns in the differences, which can help you build better regex patterns.',
          'JSON Formatter: If you are testing regex patterns on JSON data, use the JSON Formatter to prettify the data for easier pattern development.',
          'Hash Generator: In some workflows, you might need to hash matched data. Use the Hash Generator to create checksums of extracted content.',
        ],
      },
    ],
    relatedTools: ['diff-checker', 'json-formatter', 'hash-generator'],
    faq: [
    { question: 'How do I test a regex pattern online?', answer: 'Enter your regex pattern in the pattern field and the test text in the text field. The tool highlights all matches in real-time, making it easy to debug your expression.' },
    { question: 'What regex flags are supported?', answer: 'Common flags include g (global matching), i (case-insensitive), m (multiline where ^ and $ match line boundaries), and s (dot matches newlines). You can combine flags as needed.' },
    { question: 'How do I match email addresses with regex?', answer: 'A basic email regex pattern is: ^[\\w.-]+@[\\w.-]+\\.\\w{2,}$. Test it against valid and invalid emails to ensure it matches correctly.' },
    { question: 'What does the global flag do in regex?', answer: 'The global flag (g) makes the regex find all matches in the text instead of stopping after the first match. Without it, only the first occurrence is found.' },
    { question: 'How do I test multiple lines with regex?', answer: 'Use the multiline flag (m) to make ^ and $ match the start and end of each line instead of the start and end of the entire string.' },
  ],
  },

  'image-compressor': {
    sections: [
      {
        heading: 'What is image compression?',
        paragraphs: [
          'Image compression is the process of reducing the file size of an image while maintaining acceptable visual quality. There are two main types of compression: lossless and lossy. Lossless compression reduces file size without discarding any data, making it suitable for formats like PNG where you need perfect fidelity. Lossy compression achieves smaller file sizes by discarding some visual information that is less noticeable to the human eye, making it ideal for formats like JPEG and WebP.',
          'Smaller image files improve website performance by reducing bandwidth usage and page load times. On mobile devices with limited data plans, smaller images save users money and improve their experience. For e-commerce sites, faster image loading directly increases conversion rates. Modern image formats like WebP can achieve 25-35% better compression than JPEG for the same visual quality.',
          'Image compression is essential for web performance optimization, social media sharing (where size limits exist), email attachments, and archiving. Tools like this compressor help remove unnecessary metadata, optimize color palettes, and apply compression algorithms that the average user does not need to understand manually.',
        ],
      },
      {
        heading: 'When should you use the Image Compressor?',
        paragraphs: [
          'Optimizing website images: Before uploading images to your website or CMS, compress them to reduce page load times. This is especially critical for product images, hero images, and any image visible above the fold.',
          'Preparing images for social media: Each social platform has recommended image sizes and file size limits. Use the compressor to optimize images before uploading to Instagram, Facebook, Twitter, or LinkedIn.',
          'Email attachments: Compress images before attaching them to emails. Large attachments may be rejected by email servers or take too long to download.',
          'Mobile app resources: In iOS and Android development, image assets should be compressed and optimized for different screen sizes. The compressor helps reduce the size of app bundles.',
          'Screenshot and screenshot libraries: When building documentation or tutorials, compress screenshots to keep file sizes manageable while maintaining clarity.',
          'Archiving and storage: If you have large image collections, compressing them saves storage space on your server or cloud storage, reducing costs.',
          'Improving SEO: Google considers page speed a ranking factor. Compressed images contribute to faster page loads, which can improve your search rankings.',
        ],
      },
      {
        heading: 'How to use the Image Compressor',
        paragraphs: [
          'Step 1: Upload an image by clicking the upload area or dragging and dropping an image file onto the tool. Supported formats typically include JPG, PNG, WebP, and GIF.',
          'Step 2: The tool analyzes the image and displays the original file size. You can then adjust compression settings such as quality level (usually a slider from 1-100%) and output format.',
          'Step 3: Preview the compressed image to ensure the quality is acceptable. Most tools show a comparison between the original and compressed versions so you can see the trade-off.',
          'Step 4: Select an output format. PNG is best for images that need transparency or lossless compression. JPEG is ideal for photographs. WebP is the modern format that offers the best compression.',
          'Step 5: Set the quality level. For photographs, 70-85% quality usually provides good results. For graphics or images with text, use higher quality (85-95%). Experiment to find the sweet spot.',
          'Step 6: Download the compressed image. It will have a smaller file size than the original, sometimes 50% smaller or more, depending on the original format and quality settings.',
          'Step 7: Test the image on your website or app to ensure it looks acceptable to users before deploying in production.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Excessive quality loss. If your compressed image looks blurry or pixelated, increase the quality slider. You may need to find a balance between file size and visual fidelity. Try 80-90% quality as a starting point.',
          'Error: Transparent areas turning solid. If your PNG has transparency (alpha channel) and it is converting to JPG, the transparency will be lost and replaced with a solid background color. Keep PNGs in PNG format if transparency is essential.',
          'Error: File size not reducing much. Some images are already well-compressed or have little redundancy to remove. Photographs compress better than simple graphics. If compression is minimal, you may have already optimized the image, or try a different format.',
          'Error: Colors shifting or banding. In highly compressed images, you might see color banding or slight color shifts. This is a result of aggressive compression. Use a higher quality setting or switch to a lossless format if color accuracy is critical.',
          'Error: Animated GIFs becoming static. Most image compressors cannot preserve GIF animation. If you need to compress an animated GIF, use a specialized GIF compressor or video compression tool.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Text to HTML: If you are creating HTML pages with compressed images, use the Text to HTML tool to generate the proper img tags and embed images efficiently.',
          'QR Code Generator: After compressing images for your website, you can create QR codes pointing to those images for sharing or linking.',
          'Color Converter: If you need to optimize colors in your images before compression, understand color formats (RGB, HEX, HSL) using the Color Converter.',
        ],
      },
    ],
    relatedTools: ['text-to-html', 'qr-code-generator', 'color-converter'],
    faq: [
    { question: 'How do I compress an image online for free?', answer: 'Upload your image using the upload button or drag and drop. Adjust the quality slider and download the compressed version. No signup or payment required.' },
    { question: 'Does compressing reduce image quality?', answer: 'Compression reduces file size by removing some image data. With lossy compression (JPEG), quality decreases as file size decreases. Lossless compression (PNG) preserves quality but achieves less size reduction.' },
    { question: 'What is the best image format for web?', answer: 'WebP offers the best compression with quality comparable to JPEG but 25-35% smaller files. JPEG is best for photographs, PNG for graphics with transparency, and WebP for modern websites.' },
    { question: 'How do I reduce image size without losing quality?', answer: 'Use lossless compression which removes metadata and optimizes compression without discarding pixel data. Start with 80-90% quality for JPEG and adjust until you find the right balance.' },
    { question: 'Can I compress multiple images at once?', answer: 'Currently the tool processes one image at a time. For batch processing, consider using desktop software or command-line tools like ImageMagick.' },
  ],
  },

  'url-encoder': {
    sections: [
      {
        heading: 'What is URL encoding?',
        paragraphs: [
          'URL encoding (also called percent encoding) is a method of encoding special characters in URLs so they can be safely transmitted over the internet. URLs can only contain certain characters from the ASCII character set, including letters, digits, and a few special characters like - . _ ~. Any other character, including spaces, accents, and symbols, must be encoded as a percent sign (%) followed by its hexadecimal ASCII value. For example, a space is encoded as %20, an ampersand (&) is %26, and a forward slash (/) is %2F.',
          'URL encoding is essential for query parameters, form submissions, and API calls. When you submit a form or click a link with parameters, the browser automatically encodes the values. However, if you are manually constructing URLs or working with APIs, understanding URL encoding helps you correctly format data.',
          'URL decoding is the reverse process: converting percent-encoded characters back to their original form. For example, %3Fquery%3Dvalue decodes to ?query=value. This tool handles both encoding and decoding, making it easy to work with URLs programmatically.',
        ],
      },
      {
        heading: 'When should you use the URL Encoder/Decoder?',
        paragraphs: [
          'Creating API query parameters: When building API requests with query strings, you must encode special characters in parameter values. For example, if a search query contains spaces or punctuation, encoding ensures the URL is valid.',
          'Sharing URLs with special characters: If you have a URL with spaces, accents, or other special characters, encoding makes it safe to share via email or messaging apps where URL parsing might fail.',
          'Debugging API requests: When troubleshooting why an API call is failing, decode the URL to see the actual parameter values. This helps identify if encoding or decoding errors are the problem.',
          'Form submission handling: When submitting HTML forms, browsers automatically encode the data, but understanding this process helps you debug form-related issues.',
          'Building redirect URLs: In authentication flows and OAuth implementations, redirect URLs with query parameters must be properly encoded to ensure they work correctly.',
          'Storing URLs in databases: URLs should be stored in their encoded form to ensure they are valid and can be retrieved and used without modification.',
          'Working with internationalized domain names: URLs with non-ASCII characters must be encoded before transmission, a process called Punycode encoding.',
        ],
      },
      {
        heading: 'How to use the URL Encoder/Decoder',
        paragraphs: [
          'Step 1: Paste your URL or parameter value into the input field. You can encode a full URL or just the parameter values.',
          'Step 2: The tool will detect whether you want to encode or decode. If the input looks like encoded data (contains % signs), it will default to decoding. Otherwise, it will encode.',
          'Step 3: For encoding, the tool converts special characters to their percent-encoded equivalents. Spaces become %20, ampersands become %26, and so on.',
          'Step 4: For decoding, the tool converts percent-encoded characters back to their original form. %20 becomes a space, %26 becomes &, etc.',
          'Step 5: Copy the result and use it in your URL, API request, or application.',
          'Step 6: Test the result by pasting it into your browser address bar or API client to verify it works as expected.',
          'Step 7: If you are building API queries, remember that different characters have different encoding values. Refer to ASCII tables or use this tool to look up specific characters.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Double encoding. If you encode already-encoded data, you end up with double encoding (for example, %2520 instead of %20). Always start with raw data. Decode first if you are unsure whether data is already encoded.',
          'Error: Spaces encoded differently. Spaces can be encoded as %20 or as + (in query parameters). Most modern tools use %20, but some legacy systems use +. Ensure your application handles the format it expects.',
          'Error: Reserved characters encoded incorrectly. In URLs, some characters like / : ? # are reserved and have special meaning. Whether they should be encoded depends on context. In paths, slashes usually are not encoded, but in query values, they should be.',
          'Error: Accented characters not supported. If you are trying to encode accented characters (é, ñ, ü) or non-ASCII characters, ensure you are using UTF-8 encoding, not ASCII.',
          'Error: Plus signs in decoded output. If you decode a query string and see + instead of spaces, this is correct for query strings (+ encodes space in query parameters). If you need spaces, convert + to %20 first.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Base64 Encoder/Decoder: While Base64 and URL encoding are different, both are used for encoding data. Use Base64 for general binary data and URL encoding for URLs and query parameters.',
          'QR Code Generator: Generate QR codes for encoded URLs. This makes it easy to share complex URLs via QR codes instead of typing them.',
          'JSON Formatter: When working with APIs that use JSON with URL-encoded query parameters, use the JSON Formatter to prettify responses.',
        ],
      },
    ],
    relatedTools: ['base64-encoder', 'qr-code-generator', 'json-formatter'],
    faq: [
    { question: 'How do I URL encode a string online?', answer: 'Paste your string into the input and select encode. Special characters like spaces and ampersands are converted to percent-encoded format (e.g., space becomes %20).' },
    { question: 'What does %20 mean in a URL?', answer: '%20 is the URL-encoded representation of a space character. URLs cannot contain spaces, so they are encoded as %20 (percent sign followed by the hex value 20).' },
    { question: 'How do I decode a percent-encoded URL?', answer: 'Paste the encoded URL into the tool and select decode mode. It converts %20 back to spaces, %26 back to ampersands, and all other percent-encoded characters to their original form.' },
    { question: 'What characters need to be URL encoded?', answer: 'Characters like spaces, ampersands (&), question marks (?), hash signs (#), and other special characters must be encoded. Only letters, digits, and -._~ are safe without encoding.' },
    { question: 'What is the difference between URL encoding and HTML encoding?', answer: 'URL encoding (percent-encoding) encodes characters for URLs using % followed by hex codes. HTML encoding uses entities like &amp; for ampersands. They serve different purposes in web development.' },
  ],
  },

  'sql-formatter': {
    sections: [
      {
        heading: 'What is SQL?',
        paragraphs: [
          'SQL (Structured Query Language) is the standard language for managing and querying databases. It is used to insert, update, delete, and retrieve data from databases. SQL queries tell the database what data you want, and the database returns the matching records. Virtually every application that stores data uses SQL in some form, whether through a SQL database like MySQL, PostgreSQL, or through ORMs (Object-Relational Mappers) that generate SQL behind the scenes.',
          'SQL is declarative, meaning you specify what data you want, not how to get it. The database engine optimizes the query execution. Common SQL databases include MySQL, PostgreSQL, SQL Server, Oracle, and SQLite. Each has slight syntax variations, but the core language is standardized.',
          'SQL consists of several statement types: SELECT retrieves data, INSERT adds new records, UPDATE modifies existing records, DELETE removes records, and CREATE/ALTER manage database structure. Most work with databases involves SELECT and INSERT statements, but understanding all statement types is important for database administration and data management.',
        ],
      },
      {
        heading: 'When should you use the SQL Formatter?',
        paragraphs: [
          'Formatting minified or compressed queries: Databases sometimes output queries without formatting for efficiency. The SQL Formatter indents and structures the query for readability, making it easy to understand the logic.',
          'Code review and documentation: When sharing SQL queries with team members, properly formatted SQL is much easier to review. Formatted queries are also easier to include in code documentation.',
          'Debugging complex queries: Formatted SQL with proper indentation helps you trace through JOIN conditions, WHERE clauses, and subqueries to find logic errors.',
          'Performance optimization: Sometimes formatting reveals opportunities for optimization. When you can see the query structure clearly, you might notice redundant conditions or inefficient join orders.',
          'Learning SQL: Students and new developers use formatted SQL to understand query structure and learn how different clauses combine.',
          'Converting between SQL dialects: Different databases have slightly different syntax. While the formatter does not convert between dialects, well-formatted code makes manual conversion easier.',
          'Preparing queries for testing: Before running a query against a production database, format and review it to catch syntax errors and logical mistakes.',
        ],
      },
      {
        heading: 'How to use the SQL Formatter',
        paragraphs: [
          'Step 1: Paste your SQL query into the input field. It can be minified, on a single line, or messily formatted.',
          'Step 2: Choose your SQL dialect if the tool offers options (MySQL, PostgreSQL, SQL Server, etc.). Most formatters auto-detect the dialect, but selecting it explicitly can improve formatting accuracy.',
          'Step 3: Set formatting preferences such as indentation size (2, 3, or 4 spaces), whether to uppercase keywords (SELECT, FROM, WHERE), and whether to add line breaks before clauses.',
          'Step 4: Click Format or it may format automatically. The tool will reformat your query with proper indentation and line breaks.',
          'Step 5: Review the formatted output. Each clause (SELECT, FROM, WHERE, GROUP BY, ORDER BY) should be on its own line with consistent indentation.',
          'Step 6: Copy the formatted query. You can now use it in your code, documentation, or database client.',
          'Step 7: Run the formatted query to ensure it still produces the same results as the original. Formatting should not change query behavior.',
        ],
      },
      {
        heading: 'Common errors and how to fix them',
        paragraphs: [
          'Error: Incorrect indentation in subqueries. Complex queries with multiple nested subqueries can be tricky to indent properly. Most formatters handle this automatically, but review subquery alignment to ensure readability.',
          'Error: STRING values being reformatted. The formatter must not alter the contents of string literals (data inside single or double quotes). If your strings contain commas, parentheses, or keywords, ensure they are not being broken apart.',
          'Error: Comments being stripped. Some formatters remove SQL comments (-- single-line or /* multi-line */). If your query has important comments, use a formatter that preserves them.',
          'Error: Line breaks inside function calls. Functions like CONCAT, SUBSTRING, or aggregates like GROUP_CONCAT might be broken across lines awkwardly. Review function arguments to ensure they are on one line or properly indented.',
          'Error: SQL dialect mismatches. If you select the wrong dialect, the formatter might use syntax that is not supported by your actual database. Ensure you match the formatter setting to your database system.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Diff Checker: Compare two SQL queries side-by-side to find differences in logic or structure. Useful for reviewing changes or understanding why two similar queries produce different results.',
          'JSON Formatter: If your SQL queries work with JSON data, use the JSON Formatter to format the JSON portions or test data.',
          'Regex Tester: Use regex patterns to find and understand complex patterns in SQL queries, especially in WHERE clauses or string manipulation functions.',
        ],
      },
    ],
    relatedTools: ['diff-checker', 'json-formatter', 'regex-tester'],
    faq: [
    { question: 'How do I format SQL queries online?', answer: 'Paste your raw SQL query into the input field and the tool instantly formats it with proper indentation, line breaks, and keyword capitalization for maximum readability.' },
    { question: 'What is SQL formatting and why does it matter?', answer: 'SQL formatting organizes your queries with consistent indentation and structure, making them easier to read, debug, and share with team members during code review.' },
    { question: 'Does this formatter support MySQL and PostgreSQL?', answer: 'Yes, the formatter works with MySQL, PostgreSQL, SQL Server, and other major SQL dialects. It correctly handles syntax differences between database systems.' },
    { question: 'How do I indent SQL code properly?', answer: 'The tool automatically indents your SQL with proper nesting. Each clause (SELECT, FROM, WHERE, JOIN) is placed on its own line with consistent indentation for subqueries.' },
    { question: 'Can I minify SQL queries too?', answer: 'Yes, the tool includes a minify option that compresses SQL into a single line by removing unnecessary whitespace, useful for reducing query size in production.' },
  ],
  },

  'password-generator': {
    sections: [
      {
        heading: 'What is a secure password?',
        paragraphs: [
          'A secure password is a string of characters that is hard for attackers to guess or brute force. It should be long enough to resist automated guessing, include a mix of letters, numbers, and symbols, and avoid common patterns such as "password123" or "qwerty". Strong passwords are essential for protecting accounts, personal data, and sensitive systems from unauthorized access.',
          'Random passwords are safer than passwords based on dictionary words or predictable substitutions. Reusing the same password across multiple sites also increases risk—if one service is breached, attackers can try that password elsewhere. That is why a password generator that creates unique, complex passwords is so valuable for modern security practices.',
          'This Password Generator produces passwords instantly without storing them. Use it when you need a quick, strong password for a new account, a password manager entry, or a temporary credential during setup. Strong passwords reduce the chance of account compromise and make your login security much more robust.',
        ],
      },
      {
        heading: 'When should you use the Password Generator?',
        paragraphs: [
          'Create new passwords for online accounts, especially banking, email, social media, and work-related services. Strong passwords are the first line of defense against unauthorized access.',
          'Generate one-time temporary passwords for shared accounts or guest access that you plan to rotate later. A randomly generated password is easier to manage when you do not need to remember it long-term.',
          'Use the generator before setting up a password manager entry. Many password managers will remember the generated password, so you only need to store it once in a secure vault instead of memorizing it.',
          'When recovering accounts or changing credentials after a breach, generate a fresh password and avoid reusing old ones. This helps ensure the compromised credential cannot be used again.',
        ],
      },
      {
        heading: 'How to use the Password Generator',
        paragraphs: [
          'Step 1: Choose the password length and character options. Longer passwords with uppercase, lowercase, numbers, and symbols are stronger. Aim for at least 12 characters for general use and 16 or more for sensitive accounts.',
          'Step 2: Click generate to create a new password instantly. The tool will produce a random string that avoids predictable patterns and maximizes entropy.',
          'Step 3: Review the generated password and, if needed, click generate again until you find one you want to use. Each click creates a unique password.',
          'Step 4: Copy the password and paste it into the account creation or password reset field. Store it in a secure password manager rather than writing it down in plain text.',
          'Step 5: If you need multiple passwords, generate them one at a time and save each securely. Do not reuse the same generated password across different services.',
        ],
      },
      {
        heading: 'Best practices',
        paragraphs: [
          'Never reuse passwords across sites. If one service is compromised, reused passwords allow attackers to access your other accounts.',
          'Prefer passphrases or long random strings if your service supports them. A longer password is usually stronger than one with more symbols but shorter length.',
          'Use a reputable password manager to store generated passwords securely. Password managers help you keep unique credentials for every account without memorization.',
          'Avoid storing generated passwords in plain text files or notes apps. If you need a temporary note, remove it immediately after storing the password safely.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Hash Generator: Learn how passwords are protected using hash functions and why hashes are used instead of storing raw passwords.',
          'JWT Decoder: If you are working on authentication systems, JWT Decoder helps inspect token payloads and understand session-based security.',
          'Base64 Encoder/Decoder: Some authentication systems encode tokens or credentials in Base64 before storage or transmission. Use this tool to validate those values.',
        ],
      },
    ],
    relatedTools: ['hash-generator', 'jwt-decoder', 'base64-encoder'],
    faq: [
    { question: 'How do I generate a strong password online?', answer: 'Select your desired length and character types (uppercase, lowercase, numbers, symbols), then click generate. The tool creates a cryptographically random password instantly.' },
    { question: 'What makes a password strong?', answer: 'A strong password is long (12+ characters), uses a mix of character types, avoids dictionary words and patterns, and is unique to each account. Random generation ensures maximum strength.' },
    { question: 'Is it safe to generate passwords online?', answer: 'Yes, this tool generates passwords entirely in your browser. No passwords are sent to any server or stored. They exist only on your device and disappear when you close the page.' },
    { question: 'How long should my password be?', answer: 'Use at least 12 characters for general accounts and 16+ characters for sensitive accounts like banking and email. Each additional character exponentially increases cracking difficulty.' },
    { question: 'Should I use a password manager?', answer: 'Yes, a password manager securely stores all your generated passwords so you can use unique, complex passwords for every account without needing to remember them.' },
  ],
  },

  'random-name-generator': {
    sections: [
      {
        heading: 'What is a random name generator?',
        paragraphs: [
          'A random name generator creates creative and unexpected names for characters, projects, businesses, or teams. Instead of spending time inventing names manually, this tool gives you instant inspiration with combinations that you might not think of on your own.',
          'This tool helps writers, game designers, and content creators break through naming blocks. It can produce names for fantasy characters, modern personas, product ideas, or playful aliases based on the options you choose.',
          'Random names are useful in many contexts, from brainstorming fiction characters to naming placeholders in design mockups. A good generator balances variety and readability so the names feel both original and usable.',
        ],
      },
      {
        heading: 'When should you use the Random Name Generator?',
        paragraphs: [
          'When writing fiction or creating a game, use the generator to find names for protagonists, supporting characters, and NPCs. It can help spark ideas when story names feel stale.',
          'When naming a project, product, or app prototype. A generated name can act as a starting point for branding or internal code names.',
          'When working on creative exercises, screenplays, or role-playing game campaigns, the generator provides ready-to-use names so you can focus on the story rather than the naming itself.',
          'When building sample data or demo content, use randomly generated names to make examples feel more natural and less repetitive.',
        ],
      },
      {
        heading: 'How to use the Random Name Generator',
        paragraphs: [
          'Step 1: Choose any available settings, such as theme, name length, or style, if the tool offers them. This helps tailor results to your use case.',
          'Step 2: Click generate to produce one or more names instantly. The tool will combine options in ways that are unique and easy to read.',
          'Step 3: Review the generated names and select the ones that fit your project. You can regenerate if you want additional options or a different tone.',
          'Step 4: Copy the selected name into your document, spreadsheet, or project notes. If you need more names, repeat generation until you have enough good choices.',
          'Step 5: If you are using names for characters or story elements, consider their personalities and backstories to ensure the name matches the tone and setting.',
        ],
      },
      {
        heading: 'Tips for getting better names',
        paragraphs: [
          'Use the tool as a starting point, then refine the names manually. A generated name can be modified slightly to match your style or brand.',
          'Try multiple generations if you do not immediately find a fit. The best names often appear after a few rounds of randomization.',
          'Combine generated words or adjust spelling if you want a more unique result. This is especially useful for fictional worlds or product names.',
          'Think about context: names for a fantasy story should feel different from names for a modern startup or a children’s game.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Todo List: Pair generated names with tasks in your creative workflow when planning characters, projects, or story arcs.',
          'Markdown Editor: Use the Markdown Editor to document your characters, settings, or product ideas with properly formatted notes.',
          'QR Code Generator: Create QR codes for project names, character sheets, or event names to share them quickly with collaborators.',
        ],
      },
    ],
    relatedTools: ['todo-list', 'markdown-editor', 'qr-code-generator'],
  },

  'todo-list': {
    sections: [
      {
        heading: 'What is a todo list tool?',
        paragraphs: [
          'A todo list tool helps you manage tasks, track priorities, and stay organized. It provides a simple way to capture work items, mark them complete, and keep everything visible in one place. Whether you are planning errands, managing a project, or organizing daily work, a todo list is a core productivity tool.',
          'This tool is designed for quick task entry without the overhead of complex project management software. It is ideal for short-term planning, checklists, and lightweight task tracking that you can use immediately in your browser.',
          'Todo lists work best when they are simple and focused. The tool helps you avoid forgetting important items and gives you a satisfying way to mark progress as you complete tasks.',
        ],
      },
      {
        heading: 'When should you use the Todo List?',
        paragraphs: [
          'Use the todo list when planning a day’s work or handling a short-term project. It is perfect for shopping lists, quick work sprints, and event prep.',
          'Use it to break a larger project into smaller steps. Capturing each action item separately makes the work feel more manageable.',
          'Use the list when juggling personal and professional tasks at once. Having a single list helps you keep both types of work visible and avoid missing deadlines.',
          'Use it for recurring routines or checklists, like packing for travel, preparing presentations, or coordinating meeting agendas.',
        ],
      },
      {
        heading: 'How to use the Todo List',
        paragraphs: [
          'Step 1: Enter each task in the input field, one item at a time. Keep tasks short and actionable to make them easier to complete.',
          'Step 2: Arrange tasks by priority if the tool supports reordering. Put the most important or time-sensitive items at the top.',
          'Step 3: Mark tasks complete as you finish them. This gives you immediate feedback and helps you track progress.',
          'Step 4: Remove completed tasks or archive them if you want to keep the list focused on what remains. Clearing finished tasks keeps the list clean and easy to read.',
          'Step 5: Revisit the list regularly. Update it with new tasks, adjust priorities, and add notes as your plan evolves.',
        ],
      },
      {
        heading: 'Productivity tips',
        paragraphs: [
          'Use short, specific task descriptions like “Email project update” rather than vague entries like “Work on project.” Specific items are easier to complete.',
          'Group related tasks together. For example, batch all research tasks separately from communication tasks to maintain focus.',
          'If a task is too large, break it into smaller steps. Smaller tasks are easier to finish and make your progress more visible.',
          'Keep the list visible while you work. A browser-based todo list is convenient for quick reference during the day.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Timer & Stopwatch: Time work sessions with the timer to stay focused while you complete the tasks on your list.',
          'Markdown Editor: Keep meeting notes, project plans, and task details formatted neatly in Markdown alongside your todo list.',
          'Random Name Generator: Use generated names for project codenames, task labels, or creative organization.',
        ],
      },
    ],
    relatedTools: ['timer-stopwatch', 'markdown-editor', 'random-name-generator'],
  },

  'timer-stopwatch': {
    sections: [
      {
        heading: 'What is a timer and stopwatch tool?',
        paragraphs: [
          'A timer and stopwatch tool lets you count down from a set duration or measure elapsed time. The countdown timer is useful for timed tasks, workouts, cooking, or presentations. The stopwatch is ideal for tracking how long an activity takes, creating time logs, or measuring performance.',
          'This type of tool is useful for anyone who wants to manage time better without needing a separate app or device. It keeps timing simple and accessible directly in the browser, with start, stop, pause, and reset controls.',
          'The stopwatch mode helps you record durations accurately; the timer mode helps you work toward a deadline. Both are valuable for productivity, learning, and everyday routines.',
        ],
      },
      {
        heading: 'When should you use the Timer & Stopwatch?',
        paragraphs: [
          'Use the timer for focused work sessions, such as Pomodoro intervals, study blocks, or short sprints. It helps you stay accountable and finish tasks within a fixed time window.',
          'Use the stopwatch to measure performance, such as how long it takes to complete a task, run a set, or finish an exercise. It is useful for fitness, practice, and time tracking.',
          'Use the timer in the kitchen or during meetings to keep things on schedule. A browser timer is handy when you need a quick countdown without opening another app.',
          'Use the stopwatch for experiments or tests where precise duration matters. It is also helpful for measuring reaction times and time-based tasks.',
        ],
      },
      {
        heading: 'How to use the Timer & Stopwatch',
        paragraphs: [
          'Step 1: Choose countdown timer mode or stopwatch mode. Enter the desired time for countdown mode, or simply start the stopwatch to begin timing.',
          'Step 2: Click start to begin timing. The display will update in real time so you can watch the remaining time or elapsed time.',
          'Step 3: Use pause and resume controls if you need to stop timing temporarily. This is helpful if your task is interrupted and you want to continue later without losing progress.',
          'Step 4: Stop and reset when you are finished. Review the final duration and use it to improve your next session or log your results.',
          'Step 5: If the tool offers alerts, enable sound reminders so you know when the timer ends even if you are not watching the screen closely.',
        ],
      },
      {
        heading: 'Timing best practices',
        paragraphs: [
          'Use consistent intervals for work and breaks. Techniques like Pomodoro use 25-minute work sessions followed by short breaks to stay productive without burning out.',
          'Track how long recurring tasks take over several sessions. This helps you estimate future work more accurately and manage your schedule better.',
          'Use the stopwatch for benchmarking. If you want to improve speed or efficiency, measure the same task multiple times and compare results.',
          'Avoid multitasking while timing a focused session. The timer works best when you concentrate on one task and stop when the interval ends.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Todo List: Combine timed work sessions with your task list to make steady progress and track completion.',
          'Dice Roller: If you are running games or events with time limits, use the timer alongside game mechanics managed by the dice roller.',
          'Coin Flipper: Use this with timed decisions or quick choices during games, meetings, or planning sessions.',
        ],
      },
    ],
    relatedTools: ['todo-list', 'dice-roller', 'coin-flipper'],
  },

  'dice-roller': {
    sections: [
      {
        heading: 'What is a dice roller tool?',
        paragraphs: [
          'A dice roller simulates rolling one or more dice with any number of sides. It is useful for tabletop gaming, probability experiments, decision-making, and role-playing sessions. The tool produces random results instantly, so you can focus on gameplay rather than physical dice.',
          'Dice rollers are especially handy when you need non-standard dice like d20, d12, d10, or custom dice with more sides. They remove the need to carry multiple dice sets and make digital game sessions easier to manage.',
          'Random number generation in this tool is designed to behave like real dice rolls, giving each side an equal chance. It is a convenient way to resolve game actions, simulate outcomes, and run quick probability tests.',
        ],
      },
      {
        heading: 'When should you use the Dice Roller?',
        paragraphs: [
          'Use the dice roller during tabletop RPG sessions to resolve attacks, skill checks, saving throws, and other chance-based actions.',
          'Use it for board games that require dice rolls, especially when you don’t have the right physical dice available.',
          'Use it for probability experiments, statistics homework, or math practice when you need repeated random rolls for analysis.',
          'Use it to make quick decisions when you want a fair random result with multiple weighted outcomes.',
        ],
      },
      {
        heading: 'How to use the Dice Roller',
        paragraphs: [
          'Step 1: Choose the number of dice and the number of sides per die. Common choices include 6-sided dice for classic games or 20-sided dice for role-playing games.',
          'Step 2: Click roll to generate the random outcomes. The tool will display each die result and the total if multiple dice are rolled.',
          'Step 3: Review the result and apply it to your game, decision, or experiment. If needed, roll again to simulate another round or try a different configuration.',
          'Step 4: Use the output to compare probabilities or verify game mechanics. For example, rolling multiple dice helps illustrate how averages and extremes behave over repeated rolls.',
        ],
      },
      {
        heading: 'Gaming and probability tips',
        paragraphs: [
          'For role-playing games, choose the correct die type for the action. A d20 is common for checks and attacks, while damage rolls often use d6, d8, or d10.',
          'If the game uses advantage or disadvantage, roll twice and take the higher or lower result accordingly. This tool can simulate those mechanics quickly.',
          'Use multiple-roll summaries to understand the overall outcome, especially when rolling several dice at once. Knowing the total and individual results helps with strategy and bookkeeping.',
          'Remember that each roll is independent. A streak of high or low rolls is normal, so avoid assuming patterns in random outcomes.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Coin Flipper: Use the coin flipper for binary decisions in games or when a simple yes/no outcome is needed.',
          'Timer & Stopwatch: Keep game rounds and timed activities on track with the timer while you roll dice for actions.',
          'Random Name Generator: Generate character or NPC names for your tabletop campaigns and role-playing sessions.',
        ],
      },
    ],
    relatedTools: ['coin-flipper', 'timer-stopwatch', 'random-name-generator'],
  },

  'coin-flipper': {
    sections: [
      {
        heading: 'What is the Coin Flipper tool?',
        paragraphs: [
          'The Coin Flipper tool simulates a fair coin toss for making quick decisions, settling disputes, or testing probability. It generates either Heads or Tails with equal likelihood, just like a real coin flip.',
          'This tool is useful when you need a neutral, random choice and want to avoid bias. It is perfect for deciding who goes first, choosing between two options, or adding a random element to games and experiments.',
          'Unlike physical coins, the digital Coin Flipper is always available and consistent. It works anywhere you have a browser, and it removes the possibility of coins being lost or unavailable when you need a quick decision.',
        ],
      },
      {
        heading: 'When should you use the Coin Flipper?',
        paragraphs: [
          'Use it when you want a quick yes/no decision or need to choose between two equally valid options.',
          'Use it for game mechanics that require a coin toss, such as determining the starting player or resolving binary outcomes.',
          'Use it for simple probability demonstrations or classroom activities that explore randomness and fairness.',
          'Use it during meetings or group decisions when a neutral, impartial method is needed to break ties.',
        ],
      },
      {
        heading: 'How to use the Coin Flipper',
        paragraphs: [
          'Step 1: Open the Coin Flipper tool in your browser. You do not need any preparation—just click the flip button.',
          'Step 2: Click the flip button to simulate the toss. The tool will display either Heads or Tails with animation and instant results.',
          'Step 3: Use the result to make your decision, assign teams, or progress your game. If you need a new toss, click flip again.',
          'Step 4: Repeat as often as needed. The tool behaves like repeated fair coin tosses, so each flip is independent and has a 50/50 chance.',
        ],
      },
      {
        heading: 'Fairness and probability',
        paragraphs: [
          'Each flip is independent, which means previous results do not affect future flips. A streak of heads or tails is normal in random sequences.',
          'The tool is designed to keep outcomes balanced over many flips. If you want to verify fairness, flip the coin repeatedly and observe the distribution over time.',
          'Use the coin flipper for binary decisions only. If you need more than two options, consider using the Dice Roller instead.',
          'Avoid using the same result for serious decisions without agreement. This tool is best for low-stakes choices and quick group decisions.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Dice Roller: Use the Dice Roller when you need more than two outcomes or want to simulate structured game mechanics.',
          'Timer & Stopwatch: Time decision windows or game rounds while using the Coin Flipper for tie-breaking or turn order.',
          'Todo List: If your team needs a quick way to assign small tasks or choose a responsibility, use the coin flip as the neutral selector.',
        ],
      },
    ],
    relatedTools: ['dice-roller', 'timer-stopwatch', 'todo-list'],
  },

  'morse-code-translator': {
    sections: [
      {
        heading: 'What is Morse code?',
        paragraphs: [
          'Morse code is a method of encoding text using dots and dashes. Each letter and number is represented by a unique short-and-long signal pattern. Originally developed for telegraph systems in the 19th century, Morse code remains a useful way to send text through simple audio, light, or radio signals.',
          'This tool converts plain text into Morse code and vice versa. It helps learners, hobbyists, and communication enthusiasts translate messages quickly without needing to memorize the full alphabet.',
          'Morse code is still used today by amateur radio operators, emergency responders, and anyone who wants an alternate way to communicate when voice or text may not be available.',
        ],
      },
      {
        heading: 'When should you use the Morse Code Translator?',
        paragraphs: [
          'Use it when you want to encode a message into Morse code for learning or demonstration purposes.',
          'Use it to decode Morse code you receive in audio or text form so you can read the message clearly.',
          'Use it as an educational aid when practicing telegraphy, amateur radio, or historic communication systems.',
          'Use it for creative projects, puzzles, or games that involve secret messages and alternative encoding.',
        ],
      },
      {
        heading: 'How to use the Morse Code Translator',
        paragraphs: [
          'Step 1: Enter the text you want to encode, or paste Morse code to decode. The tool accepts letters, numbers, and common punctuation in standard Morse encoding.',
          'Step 2: Choose encode or decode mode, if available. Enter plain text for encoding or dot-and-dash text for decoding.',
          'Step 3: Review the translated output. Encoded text will appear as dots and dashes, while decoded Morse code will appear as readable letters and numbers.',
          'Step 4: Copy the result and use it in your learning materials, messages, or creative projects. If you are decoding, verify the spacing between letters and words for accurate translation.',
          'Step 5: Practice regularly to build familiarity with common Morse patterns. Short codes like SOS (... --- ...) become much easier to recognize over time.',
        ],
      },
      {
        heading: 'Learning tips',
        paragraphs: [
          'Start with the most common letters and numbers, then gradually learn less frequent symbols. Knowing the Morse code for E, T, A, N, and I gives you a strong foundation.',
          'Listen to Morse code audio or tap it out yourself for muscle memory. Visual patterns alone are useful, but sound-based practice helps a lot with real-world decoding.',
          'Use this tool to check your translations and practice both encoding and decoding. Try encoding a short message and then decoding it again to verify accuracy.',
          'Remember that proper spacing is critical. In Morse code, a short gap separates elements of a letter, a medium gap separates letters, and a longer gap separates words.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Text to HTML: Create formatted guides or cheatsheets for Morse code lessons that you can publish online.',
          'Random Name Generator: Generate sample text or character names to encode in Morse code for practice.',
          'QR Code Generator: Share Morse code messages with others through QR codes that link to your encoded content.',
        ],
      },
    ],
    relatedTools: ['text-to-html', 'random-name-generator', 'qr-code-generator'],
  },

  'unit-calculator': {
    sections: [
      {
        heading: 'What is the Unit Calculator?',
        paragraphs: [
          'The Unit Calculator solves mathematical formulas that include units, such as converting between different measurement systems or calculating values with physical dimensions. It helps you compute results accurately without manually converting units or applying the wrong formula.',
          'This tool is useful for students, engineers, and anyone working with formulas involving length, mass, volume, temperature, or other measurable quantities. It reduces errors by combining calculation and unit conversion in one step.',
          'The Unit Calculator is ideal when you need to compute a value that depends on more than one variable, such as converting distance and time into speed, or using area and rate to determine total volume.',
        ],
      },
      {
        heading: 'When should you use the Unit Calculator?',
        paragraphs: [
          'Use it for physics homework and science problems that require unit-based formulas, such as speed, force, density, or energy.',
          'Use it when you need to convert between units as part of a calculation, such as converting miles per hour into meters per second.',
          'Use it for recipe scaling, construction measurements, or engineering estimates where units must remain consistent.',
          'Use it when working across systems, such as converting imperial values into metric units to avoid mistakes in the final result.',
        ],
      },
      {
        heading: 'How to use the Unit Calculator',
        paragraphs: [
          'Step 1: Enter the formula or values with their units into the input field. Be explicit about units to make sure the tool computes correctly.',
          'Step 2: If available, select the desired output unit or let the tool choose the most appropriate unit automatically.',
          'Step 3: Run the calculation and review the result. Check that the units and numeric value make sense for your problem.',
          'Step 4: Use the output in your homework, report, or project. If the result seems unexpected, verify each input and unit before trusting the result.',
          'Step 5: When doing multiple calculations, keep your inputs consistent and avoid mixing units unless the tool can handle the conversion automatically.',
        ],
      },
      {
        heading: 'Unit calculation tips',
        paragraphs: [
          'Always include units in your input when possible. Units are part of the value and help the tool produce accurate results.',
          'Check unit compatibility. The tool should only combine values when the units make sense together, such as converting length and time into speed.',
          'Use standard unit names and symbols. Accept recognizable formats like “m”, “km”, “lb”, and “°C” to avoid misinterpretation.',
          'If you are unsure, perform a simple conversion first to confirm the tool handles the units correctly before using it in more complex formulas.',
        ],
      },
      {
        heading: 'Related tools',
        paragraphs: [
          'Unit Converter: Convert individual units between different measurement systems before using them in more complex formulas.',
          'Calculator Tools: Use other calculators like the Loan Calculator or Mortgage Calculator when your project combines financial math with unit-based analysis.',
          'Percentage Calculator: Use this when you need percentage-based adjustments or ratios within unit-based calculations.',
        ],
      },
    ],
    relatedTools: ['unit-converter', 'percentage-calculator', 'loan-calculator'],
  },
  'color-converter': {
    sections: [
      {
        heading: 'Understanding color space conversions',
        paragraphs: [
          'Converting between hex, RGB, HSL, and named color formats is common in front-end development, but each color space has different characteristics. Hex and RGB are device-dependent and describe color as additive light mixes, while HSL (hue-saturation-lightness) maps more closely to how humans perceive color. When you convert between them, rounding differences can shift the value by 1 in any channel, which matters for brand-color precision.',
          'Modern CSS also supports OKLCH and Display P3, which offer wider gamuts than sRGB. If your project targets wide-gamut displays, consider keeping colors in OKLCH or P3 rather than converting to hex and losing information. Our converter preserves the full float precision during intermediate calculations so round-trip conversions stay lossless.',
        ],
        tips: [
          'Use HSL when building programmatic color schemes (complementary, triadic) because hue rotations behave predictably, unlike hex-channel manipulation.',
          'When matching a brand color, verify the result in both hex and RGB — a 1-digit shift in hex (like #1a1a1a vs #1a1a1b) is imperceptible but can fail a visual regression test.',
        ],
      },
      {
        heading: 'Practical color workflow for developers',
        paragraphs: [
          'Color conversion is essential when translating design tokens from Figma (which often exports OKLCH or P3) into CSS custom properties. Rather than eyeballing the difference, use this tool to confirm the sRGB equivalent stays within acceptable Delta E. You can also convert Tailwind or Material Design palette values between formats when migrating a design system.',
          'Dark-theme development frequently requires inverting or adjusting lightness while preserving hue and saturation. HSL conversion makes this trivial: keep H and S constant, tweak L. For example, a surface color at L=95% for light mode becomes L=10% for dark mode using the same H and S values.',
        ],
      },
    ],
    faq: [
      { question: 'Why does #0000ff convert to hsl(240, 100%, 50%) but rgb(0, 0, 255) shows the same?', answer: 'They are mathematically identical. Hex #0000ff and rgb(0, 0, 255) both represent pure blue. HSL represents the same point in color space using different coordinates: hue 240° (blue on the color wheel), 100% saturation, 50% lightness.' },
      { question: 'Can I lose color accuracy converting between formats?', answer: 'Hex uses 8-bit per channel (256 values), while HSL uses float percentages. Rounding during conversion can shift a channel by ±1. For brand-critical colors, keep the original format and convert only for delivery — our tool uses double-precision math to minimize error.' },
      { question: 'What is the CSS color() function and should I use it?', answer: 'The CSS color() function (e.g., color(display-p3 0.5 0.3 0.8)) lets you specify colors in any supported color space. It is useful for wide-gamut displays but has limited browser support. Convert to fallback hex or RGB for broader compatibility.' },
    ],
    relatedTools: ['json-formatter', 'image-compressor'],
  },
  'code-minifier': {
    sections: [
      {
        heading: 'Minification strategies beyond whitespace removal',
        paragraphs: [
          'JavaScript minification goes far beyond stripping comments and whitespace. Advanced minifiers rename local variables to single letters, eliminate dead code branches, inline constant expressions, and even rewrite if-else chains into ternary operators. Our tool applies these transformations safely, preserving semantics while reducing the AST footprint. For production builds, pair minification with tree-shaking so unused exports are removed before the minifier runs.',
          'HTML minification is trickier because it must respect conditional comments, inline SVG, and script template literals. Our minifier handles these edge cases by parsing the DOM structure rather than using naive regex. CSS minification similarly merges identical selectors, removes unused @keyframes, and compresses color values to their shortest hex form (e.g., #ff8800 → #f80).',
        ],
        tips: [
          'Always serve minified assets with a Content-Encoding header (gzip or brotli) for maximum savings — minification plus compression beats either alone.',
          'Keep source maps in a separate .map file (not inlined) so the browser can still show debuggable code in DevTools without bloating the production payload.',
        ],
      },
      {
        heading: 'When NOT to minify',
        paragraphs: [
          'Avoid minifying code that will be consumed by other tools or libraries — for instance, Web Workers, service workers, or dynamic import() paths often depend on readable function names. Similarly, polyfill bundles that need to remain self-documented should stay unminified during development. Our tool lets you toggle specific transformations so you can keep names readable while still removing whitespace.',
          'Server-side rendering (SSR) frameworks like Next.js and Nuxt handle minification at build time. Minifying their output again can double-process templates and cause hydration mismatches. Let the framework handle it and use this tool for standalone scripts, bookmarklets, or inline <script> blocks.',
        ],
      },
    ],
    faq: [
      { question: 'Does minification always break stack traces?', answer: 'Yes, if you do not publish source maps. Without source maps, errors point to the minified file (e.g., main.js:1:2345). Generate a .map file and upload it to your error tracking service (Sentry, Datadog) to restore readable stack traces.' },
      { question: 'Can I minify and obfuscate at the same time?', answer: 'Minification and obfuscation are separate goals. Minification reduces size; obfuscation intentionally makes code hard to reverse-engineer. Our tool focuses on safe size reduction. For obfuscation, use a dedicated tool that renames strings, inserts junk code, and applies control-flow flattening.' },
      { question: 'What is the difference between UglifyJS, Terser, and esbuild minification?', answer: 'Terser (fork of UglifyJS) supports ES6+ syntax and is the standard for Webpack 5. esbuild minifies 10-100x faster but applies fewer optimizations. Our tool uses Terser-style transformations for maximum compression while being compatible with modern JavaScript.' },
    ],
    relatedTools: ['json-formatter', 'diff-checker', 'regex-tester'],
  },
  'diff-checker': {
    sections: [
      {
        heading: 'How diff algorithms compare text',
        paragraphs: [
          'Our diff checker implements the Myers diff algorithm (used by Git) with a patience-mode fallback for structured text. The Myers algorithm finds the shortest edit script between two sequences in O(ND) time, where N is total text length and D is the number of differences. For most file comparisons, this completes in milliseconds. For large files (10,000+ lines), patience mode reduces spurious matches on repeated lines like import statements or closing braces.',
          'The tool also highlights intra-line changes (word-level or character-level diff) so you can spot spelling fixes or variable renames within a modified line. This is powered by a secondary diff pass on each changed line segment, splitting on whitespace and punctuation boundaries.',
        ],
        tips: [
          'Use unified diff format when sharing changes with teammates — it includes 3 lines of context around each change, making reviews faster.',
          'For configuration files (YAML, JSON), sort keys before diffing to avoid false positives from key reordering.',
        ],
      },
      {
        heading: 'Real-world diffing workflows',
        paragraphs: [
          'Before refactoring, diff the original and refactored versions to confirm the only changes are structural (renames, extracted functions) — the behavioral output should be identical. This is especially useful when modernizing legacy jQuery code to vanilla JS or React hooks.',
          'When reviewing pull requests, paste the raw diff into this tool and toggle unified/split view to catch non-obvious changes like whitespace-only modifications or accidental semicolon insertion that could introduce ASI bugs. The character-level diff helps spot differences in long hex strings or UUIDs that are easy to miss.',
        ],
      },
    ],
    faq: [
      { question: 'What is the difference between unified and split view?', answer: 'Unified view shows both versions interleaved with +/- markers (compact, good for small diffs). Split view shows old and new side-by-side (better for wide files or visual comparison). Our tool supports both.' },
      { question: 'Can I compare two JSON files structurally?', answer: 'For structural JSON comparison (ignoring key order), use the JSON Formatter tool first to normalize both files, then diff the normalized output. This avoids false positives from key reordering.' },
      { question: 'Why does the tool say everything is different when files seem identical?', answer: 'Check for trailing whitespace, different line endings (CRLF vs LF), or encoding differences (UTF-8 with/without BOM). Our tool highlights whitespace changes when you enable the "Show whitespace" toggle.' },
    ],
    relatedTools: ['json-formatter', 'xml-formatter', 'code-minifier'],
  },
  'xml-formatter': {
    sections: [
      {
        heading: 'XML formatting and validity',
        paragraphs: [
          'XML is stricter than HTML: every opening tag must have a corresponding closing tag, attribute values must be quoted, and the document must have exactly one root element. Our formatter parses the XML into a DOM tree and serializes it with configurable indentation (2 or 4 spaces), which also catches structural errors. If the input is malformed, the tool reports the exact line and column of the parsing failure, saving you from hunting through thousands of lines.',
          'Beyond formatting, the tool preserves CDATA sections, processing instructions, and namespace declarations. Namespace prefixes (xmlns) are especially tricky — our formatter maintains the correct namespace context even when elements are deeply nested or when default namespaces change mid-document.',
        ],
        tips: [
          'Use the minify toggle to strip whitespace-only text nodes before shipping XML over the wire — this reduces payload size without affecting the logical structure.',
          'When editing XSLT or SVG files, format first to verify the nesting is correct; a misplaced closing tag in SVG can cause the entire graphic to fail to render.',
        ],
      },
      {
        heading: 'XML vs JSON: when to use each',
        paragraphs: [
          'XML supports attributes, namespaces, schemas (XSD), and mixed content (text + elements in any order), making it more expressive than JSON for complex documents. Use XML when you need document validation, namespaced vocabularies (like SOAP, RSS, or SVG), or when interop with legacy enterprise systems is required. JSON is better for most API payloads because it is lighter and natively parsed by JavaScript.',
          'Our XML formatter helps when you receive minified XML from a legacy API — format it immediately to inspect the structure, then use XPath or XSLT to extract the data you need. The tool also compresses formatted XML back to a compact single line for efficient storage.',
        ],
      },
    ],
    faq: [
      { question: 'Will my XML look different after formatting?', answer: 'Formatting only changes whitespace — it adds newlines and indentation between elements. Attribute order, namespace declarations, and CDATA sections are preserved exactly as written.' },
      { question: 'Does this tool validate against an XSD schema?', answer: 'No, the formatter checks well-formedness (correct nesting, matching tags, quoted attributes) but does not validate against a schema. Use a dedicated XML validator with XSD support for schema-level validation.' },
      { question: 'Can it handle very large XML files?', answer: 'Our tool processes files up to ~5 MB in the browser. For larger enterprise XML files (10+ MB), consider streaming XML parsers like SAX or StAX rather than loading the full DOM into memory.' },
    ],
    relatedTools: ['json-formatter', 'sql-formatter', 'diff-checker'],
  },
  'uuid-generator': {
    sections: [
      {
        heading: 'GUID vs UUID: What\u2019s the Difference?',
        paragraphs: [
          'GUID (Globally Unique Identifier) and UUID (Universally Unique Identifier) refer to the same 128-bit identifier standard. Both follow the exact same format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx), use the same versioning system (v1 time-based, v4 random, etc.), and produce values that are structurally identical. The only difference is which term a given ecosystem uses — GUID is the Microsoft term found in .NET, Windows, and SQL Server, while UUID is more common in Unix, web development, and the official RFC 4122 specification.',
          'This means any value generated by this tool is valid as both a GUID and a UUID. Whether you need a guid generator for a .NET codebase, a uuid generator for a PostgreSQL database, or a guid uuid generator that produces values acceptable in any context, the tool handles all of them with the same underlying generation methods. If you have ever searched for a guid generator online or needed to generate guid values for a configuration or database migration, the v4 generation method here produces exactly what you need — the same high-entropy random identifiers used across both Microsoft and open-source ecosystems.',
          'The practical takeaway: do not overthink which term to use. If you are working in a .NET or SQL Server environment, call it a GUID; everywhere else, call it a UUID. The generating guid process is identical, the resulting identifier is interchangeable, and this tool supports both naming conventions without requiring you to choose one.',
        ],
      },
      {
        heading: 'UUID versions and when to use them',
        paragraphs: [
          'UUID v4 is the most common — it generates 122 random bits (6 bits are reserved for the version/variant), giving about 5.3 x 10^36 possible values. Collision probability is negligible for typical use (the birthday paradox says you need ~2.7 x 10^18 IDs for a 50% collision chance). UUID v7 (time-ordered) is newer and sortable by creation time, making it better for database indexes because it avoids B-tree fragmentation. Our tool supports v4 (random), v1 (time-based with MAC), and v7 (time-ordered).',
          'For database primary keys, UUIDv7 is increasingly preferred over auto-increment integers because it prevents enumeration attacks and works across distributed systems without coordination. PostgreSQL extensions like pg_uuidv7 implement this natively. Our v7 generator uses the current timestamp in milliseconds plus random node bits, producing keys that sort chronologically.',
        ],
        tips: [
          'Use crypto.getRandomValues() in browser environments instead of Math.random() for UUID generation — Math.random() is not cryptographically secure and can produce predictable IDs.',
          'When using UUIDs as database primary keys, always use UUIDv7 (time-ordered) to avoid index fragmentation. UUIDv4 random distribution causes page splits in B-tree indexes.',
        ],
      },
      {
        heading: 'UUID validation and normalization',
        paragraphs: [
          'UUIDs come in different casing (upper/lower) and with or without hyphens. Our generator provides options for uppercase, lowercase, and compact (no hyphens) formats. UUIDs are case-insensitive per RFC 4122, but some systems (like file systems on Linux) treat them as case-sensitive. Standardize on lowercase with hyphens for maximum compatibility.',
          'The validator component checks the RFC 4122 format: 8-4-4-4-12 hex digits (32 chars total, 36 with hyphens). It also verifies the version nibble (the 13th character: 1-8) and variant bits (the 17th character must be 8, 9, a, or b). This catches copy-paste errors and truncated IDs.',
        ],
      },
    ],
    faq: [
      { question: 'How many UUIDs can I generate before a collision?', answer: 'For UUID v4, the probability of collision reaches 50% after generating about 2.7 quintillion UUIDs (2.7 x 10^18). For practical purposes, collisions are not a concern unless you are generating billions per second across many machines.' },
      { question: 'Should I use UUIDs or auto-increment IDs?', answer: 'Use UUIDs when you need globally unique IDs across distributed systems, databases, or offline clients. Use auto-increment IDs for simple single-server applications where sequential ordering and smaller index size matter.' },
      { question: 'Why are UUIDs so long?', answer: 'A UUID is 128 bits (16 bytes) of data, typically encoded as 36 characters. The length ensures global uniqueness without a central authority. For shorter unique IDs, consider NanoID (21 chars, 128 bits of entropy) or Snowflake-style IDs (64-bit, time-sorted).' },
      { question: 'What is a GUID?', answer: 'A GUID (Globally Unique Identifier) is a 128-bit identifier used to uniquely label information in computer systems, most commonly associated with Microsoft technologies like .NET and SQL Server. It follows the same format and generation standards as a UUID — the two terms refer to the same underlying identifier type.' },
      { question: 'Is a GUID the same as a UUID?', answer: 'Yes. GUID and UUID describe the same 128-bit identifier standard and use the same format. GUID is the term Microsoft uses in Windows, .NET, and SQL Server contexts, while UUID is the more general term used in Unix-based systems, web development, and the official RFC 4122 specification. Any value generated here is valid as both a GUID and a UUID.' },
      { question: 'How do I generate a GUID online?', answer: 'Use the generator above — set how many you need and choose your preferred case (uppercase or lowercase), then click generate. Each result is a valid, randomly generated GUID/UUID you can copy and use immediately in your code, database, or configuration.' },
    ],
    relatedTools: ['hash-generator', 'password-generator', 'random-name-generator'],
  },
  'word-counter': {
    sections: [
      {
        heading: 'What counts as a word?',
        paragraphs: [
          'The definition of "word" varies by language and context. Our counter uses Unicode-aware word segmentation that correctly handles CJK characters (Chinese, Japanese, Korean) where each character is a word, as well as compound words in Germanic languages. It also accounts for zero-width spaces, soft hyphens, and other invisible Unicode characters that can inflate counts. The tool reports distinct metrics: total words, unique words, characters (with and without spaces), sentences, and average word length.',
          'For SEO content analysis, word count matters because search engines use it as a quality signal — but quality of words matters more than quantity. A 500-word article with original research often outranks 2000-word thin content. Our counter helps you audit existing content against your target word counts.',
        ],
        tips: [
          'Paste your meta description into the counter — Google typically truncates descriptions after 155-160 characters. Keep it under that limit.',
          'For academic or technical writing, check the readability score (Flesch-Kincaid) alongside word count to ensure your content matches the target audience reading level.',
        ],
      },
      {
        heading: 'Detecting content issues with word-level metrics',
        paragraphs: [
          'Beyond simple counting, analyze keyword density (how often a term appears relative to total words) to avoid keyword stuffing. A healthy keyword density for SEO is 1-3%. Our tool highlights the top 10 most frequent words and their percentages, helping you spot overused terms like "click here" or "learn more" that weaken copy. It also flags filler words (very, just, really, actually) that pad word count without adding value.',
          'When editing, use the "characters without spaces" metric to estimate translation costs (many translators charge per character). The sentence count helps gauge paragraph length — if sentences average 30+ words, consider breaking them up for readability. Short sentences (15-20 words average) perform better on mobile screens.',
        ],
      },
    ],
    faq: [
      { question: 'Does the counter include HTML tags in the count?', answer: 'No, the tool strips HTML tags before counting. Only visible text content is counted, so <p>Hello</p> counts as 1 word (5 characters), not 9 words.' },
      { question: 'How are hyphenated words counted?', answer: 'By default, hyphenated compounds (e.g., "well-known") are counted as one word. If you toggle the setting, they are split into individual words. This affects both word count and keyword density analysis.' },
      { question: 'Do emojis count as words?', answer: 'No, emojis are counted as characters but not as words. Each emoji counts as 2 characters (surrogate pair) or 1 character (single Unicode scalar), depending on the emoji.' },
    ],
    relatedTools: ['markdown-editor', 'text-to-html', 'diff-checker'],
  },
  'qr-code-generator': {
    sections: [
      {
        heading: 'QR code error correction and version selection',
        paragraphs: [
          'QR codes have four error correction levels: L (7% recovery), M (15%), Q (25%), and H (30%). Higher levels allow the code to be scanned even when partially damaged or obscured, but they increase the QR version (size). For printed materials like business cards or product labels, use level H or Q — the code can survive scratches, folds, or partial遮挡. For digital use (screens), level M is usually sufficient and produces a denser code.',
          'The QR version (1-40) determines the grid size, from 21x21 to 177x177 modules. Higher versions can encode more data but require higher print resolution. Our tool automatically selects the minimum version needed for your input, balancing scannability against data capacity. If you are encoding a URL longer than ~400 characters (e.g., UTM-tagged links), the version jumps significantly.',
        ],
        tips: [
          'Always add a quiet zone (4 modules of white space) around the QR code. Our tool outputs the code with the correct quiet zone included.',
          'Test your QR code at the actual print size — a code that scans perfectly on screen at 500px may fail when printed at 1cm. Minimum recommended print size is 2cm x 2cm.',
        ],
      },
      {
        heading: 'QR code design and branding',
        paragraphs: [
          'QR codes do not have to be black-and-white squares. You can customize the foreground color, background color, and even embed a logo in the center (our tool supports center image placement). The key constraint: maintain sufficient contrast — the dark modules must be noticeably darker than the light modules. A contrast ratio of at least 3:1 is recommended. Avoid using the logo area for critical encoding; error correction level H reserves 30% for recovery, which the logo occupies.',
          'For marketing materials, consider using a "QR code with frame" — surrounding the code with a call-to-action label (e.g., "Scan to visit our menu"). Our tool can add a configurable caption frame. The frame should be outside the quiet zone and should not overlap the code itself.',
        ],
      },
    ],
    faq: [
      { question: 'What is the maximum data I can encode in a QR code?', answer: 'QR codes support up to 7089 numeric digits, 4296 alphanumeric characters, or 2953 bytes of binary data (version 40, low error correction). For URLs, practical limits are 200-400 characters before the code becomes very dense.' },
      { question: 'Can I scan a QR code from a screenshot?', answer: 'Yes, most smartphone cameras can scan QR codes from screenshots, as long as the code is sharp and fills at least 25% of the image width. Avoid scaling down too much.' },
      { question: 'What is the difference between QR codes and barcodes?', answer: 'Barcodes store data in one dimension (horizontal lines) and hold ~20-25 characters. QR codes store data in two dimensions and hold much more data (up to ~3KB). QR codes also support error correction and can be scanned from any orientation.' },
    ],
    relatedTools: ['url-encoder', 'password-generator', 'json-to-csv'],
  },
  'markdown-editor': {
    sections: [
      {
        heading: 'Markdown flavors and compatibility',
        paragraphs: [
          'Markdown has multiple flavors: CommonMark (standardized core), GitHub Flavored Markdown (GFM adds tables, task lists, strikethrough), and extended variants supporting footnotes, definition lists, and math (LaTeX). Our editor uses GFM by default with CommonMark compatibility for the base syntax. The live preview renders the output so you can see exactly how the content will appear on GitHub, GitLab, or in static site generators like Next.js MDX.',
          'When writing documentation for open-source projects, stick to GFM — it is the most widely supported. Avoid HTML in Markdown (except for elements Markdown cannot produce, like <details> or <video>), because some renderers strip inline HTML for security. Our editor highlights unsupported syntax so you catch issues before publishing.',
        ],
        tips: [
          'Use reference-style links (`[text][ref]` and `[ref]: url`) for cleaner source Markdown that is easier to translate or maintain.',
          'Add a blank line before headings and lists to ensure correct rendering. Many renderers require this for proper block-level parsing.',
        ],
      },
      {
        heading: 'Markdown for developers: beyond basic formatting',
        paragraphs: [
          'Markdown is widely used for API documentation, README files, and blog content. Advanced techniques include: fenced code blocks with syntax highlighting (specifying the language after the opening ```), collapsible sections (<details>/<summary>), and table alignment using colon placement. Our editor supports all GFM extensions and provides character and word counts for tracking documentation progress.',
          'When using Markdown in CMS platforms like Contentlayer or MDX, be aware that frontmatter (YAML/TOML between --- delimiters) is parsed separately from the body. Our editor can validate frontmatter formatting and highlight YAML syntax errors.',
        ],
      },
    ],
    faq: [
      { question: 'Can I paste rich text and have it converted to Markdown?', answer: 'Yes, the editor accepts rich text pastes from Word, Google Docs, and web pages and attempts to convert them to Markdown. Complex formatting (tables with merged cells, nested lists) may lose fidelity — always review the conversion.' },
      { question: 'Does the editor support images?', answer: 'Yes, you can paste image URLs to generate Markdown image syntax, or upload local images (they are encoded as Base64 data URIs for the preview). For production, host images separately and reference their URLs.' },
      { question: 'How do I add a table of contents to my Markdown?', answer: 'Many renderers auto-generate TOCs from headings. For manual TOCs, use a tool like markdown-toc or write a simple script to extract ## and ### headings. Our editor can auto-generate a TOC from your document structure.' },
    ],
    relatedTools: ['text-to-html', 'json-to-csv', 'diff-checker'],
  },
  'text-to-speech': {
    sections: [
      {
        heading: 'Web Speech API and browser compatibility',
        paragraphs: [
          'The Web Speech API provides speech synthesis in all modern browsers, but voice quality and available languages vary significantly by operating system and browser engine. Chrome on Windows uses the 24kHz Microsoft voices (which are fast and intelligible), while Safari on macOS uses the higher-quality neural voices from the OS. Our tool detects browser capabilities and selects the best available voice for your selected language. For production applications that require consistent voice quality, consider cloud TTS services like Amazon Polly or Google Cloud Text-to-Speech.',
          'The API supports SSML (Speech Synthesis Markup Language) for fine control: you can add pauses, adjust pitch and rate per phrase, and emphasize specific words. Our tool provides an SSML mode where you can input or generate SSML and preview the spoken result. This is especially useful for voice applications, IVR systems, and accessibility features.',
        ],
        tips: [
          'Set rate to 0.9-1.1 for natural speech — too slow sounds robotic, too fast causes the engine to skip words.',
          'For long texts (1000+ words), the browser may pause or stop synthesis. Split long content into paragraphs and queue them sequentially.',
        ],
      },
      {
        heading: 'Accessibility use cases for TTS',
        paragraphs: [
          'Text-to-speech is essential for accessibility. Use it to preview how assistive technology will read your content aloud. Screen readers like NVDA and JAWS use their own TTS engines, but listening to a browser-based TTS version helps you identify: awkward phrasing, run-on sentences that cause unnatural pauses, and acronyms/abbreviations that should be spelled out. For example, "API" should be "A-P-I" not "appy" — our tool lets you define pronunciation overrides.',
          'When building accessible applications, test your UI labels, error messages, and dynamic content updates with TTS. ARIA live regions announce content changes to screen readers, but the phrasing must be natural. Our tool helps you iterate on the spoken form before deploying code changes.',
        ],
      },
    ],
    faq: [
      { question: 'Why does the voice sound different on different browsers?', answer: 'Each browser/platform uses its own speech engine. Chrome uses Microsoft or Google voices depending on the OS, Firefox uses system voices, and Safari uses macOS voices. Results vary by platform.' },
      { question: 'Can I download the audio file?', answer: 'Our tool plays audio directly in the browser. For downloadable TTS audio files (MP3/WAV), use a server-side TTS API (like Google Cloud TTS or AWS Polly) that returns audio streams.' },
      { question: 'Does this work offline?', answer: 'The Web Speech API requires online access for most voices (they are streamed from the OS or cloud). Chrome caches some voices locally, but full offline TTS requires a downloaded voice pack on your device.' },
    ],
    relatedTools: ['word-counter', 'markdown-editor', 'morse-code-translator'],
  },
  'json-to-csv': {
    sections: [
      {
        heading: 'Flattening nested JSON for tabular output',
        paragraphs: [
          'JSON is hierarchical (objects nested within objects), while CSV is strictly two-dimensional (rows and columns). Our converter handles nested objects by flattening keys with dot notation (e.g., "address.city" becomes a column header). Arrays within JSON objects are the hardest case — an array of addresses for one user produces either multiple rows (denormalized) or a single JSON-stringified cell. Our tool offers both modes: "expand" creates one row per array element (repeating parent data), and "compact" stores arrays as JSON strings in a single cell.',
          'Large JSON arrays (100,000+ objects) can cause browser memory issues because the entire dataset must be processed client-side. For production ETL pipelines, use a backend tool like jq or a streaming CSV parser. Our tool is best suited for moderate-sized data (up to ~10 MB of JSON) for analysis or import into spreadsheet applications.',
        ],
        tips: [
          'Preview the first 5 rows before converting — this catches unexpected nesting or missing keys that would produce empty columns.',
          'When columns have inconsistent key presence (e.g., some objects have "middleName" and others do not), the CSV fills missing cells with empty values. Review the column list to ensure it covers all fields you need.',
        ],
      },
      {
        heading: 'CSV encoding pitfalls',
        paragraphs: [
          'CSV has no official encoding standard (RFC 4180 is the closest). Common issues include: values containing commas (must be quoted with ""), values containing double quotes (must be escaped as ""), and multi-line values (must be quoted). Our converter follows RFC 4180 strictly: all cells are properly quoted and escaped. It also detects the delimiter — some systems expect semicolons as delimiters (European locales) — and lets you switch between comma, semicolon, and tab. For Excel compatibility (especially on non-English systems), semicolon-delimited CSV is often required.',
          'Character encoding is another common source of errors. Our converter outputs UTF-8 with BOM, which Excel for Windows uses to correctly detect the encoding. Without the BOM, Excel may interpret UTF-8 text as Windows-1252, mangling special characters like accented letters and em dashes.',
        ],
      },
    ],
    faq: [
      { question: 'Can I convert CSV back to JSON?', answer: 'Yes, our toolkit includes a CSV-to-JSON converter. The reverse conversion is simpler because CSV has no nesting — arrays and nested objects must be reconstructed from dot-notation headers.' },
      { question: 'What happens to null values in JSON?', answer: 'Null values in JSON become empty cells in CSV. If you need to preserve "null" as a literal string, toggle the option to keep nulls as text rather than empty cells.' },
      { question: 'Does the tool handle deeply nested JSON (5+ levels)?', answer: 'Yes, the flattening algorithm handles arbitrary depth. Column headers become very long (e.g., "user.profile.settings.notifications.email.enabled"), which may exceed Excel\'s column-width limits. Consider using the compact array mode for deeply nested structures.' },
    ],
    relatedTools: ['json-formatter', 'xml-formatter', 'diff-checker'],
  },
  'text-to-html': {
    sections: [
      {
        heading: 'From plain text to semantic HTML',
        paragraphs: [
          'Converting plain text to HTML involves more than just wrapping lines in <p> tags. Our converter applies semantic HTML: headings (h1-h6), lists (ul/ol), tables, blockquotes, and code blocks are detected from common plain-text conventions. The tool respects single vs double line breaks: a single newline within a paragraph becomes a <br> (or is ignored), while double newlines create a new paragraph. This mirrors how Markdown and most WYSIWYG editors handle line breaks.',
          'For accessibility, the generated HTML includes proper heading hierarchy (no skipping levels), alt text placeholders for detected image references, and ARIA labels for navigation-like structures. The output also includes a data-schema attribute that identifies the structural role of each section (article, navigation, complementary) for screen readers.',
        ],
        tips: [
          'Paste content from email clients or word processors — they often use invisible formatting markers. Our tool strips zero-width spaces and soft hyphens that cause visual artifacts in HTML.',
          'Enable "smart quotes" conversion to turn straight quotes (" ") into curly quotes (" "), which are more readable in rendered HTML and preferred by typographers.',
        ],
      },
      {
        heading: 'Security: preventing XSS in generated HTML',
        paragraphs: [
          'Converting user-provided text to HTML carries XSS risks if the input contains malicious HTML or JavaScript. Our tool sanitizes all output by encoding angle brackets (< >), ampersands (&), and quote characters. If the input appears to contain HTML tags, the tool offers a "passthrough" mode that preserves existing HTML while formatting the rest. By default, the tool operates in safe mode: all tags are escaped, and only structural formatting is applied. Never render user-generated HTML without additional server-side sanitization — a DOMPurify pass on the server is strongly recommended.',
          'The tool also normalizes URLs in detected links: href attributes are prefixed with https:// if no protocol is present (preventing javascript: injection), and mailto: links are encoded to protect against email harvesters.',
        ],
      },
    ],
    faq: [
      { question: 'Can I preserve existing HTML tags in the input?', answer: 'Yes, toggle "Preserve HTML" mode to keep existing tags and format only the plain text portions. Use this when editing partial HTML documents or CMS content blocks.' },
      { question: 'Does the tool generate a full HTML document or just body content?', answer: 'By default, it generates body-level HTML (paragraphs, headings, lists). Toggle "Full document" to wrap the output in <!DOCTYPE html>, <html>, <head>, and <body> tags with a configurable title.' },
      { question: 'How are email addresses handled?', answer: 'Detected email addresses are converted to mailto: links. The tool offers optional obfuscation (ROT13 or HTML entity encoding) to reduce spam harvesting while remaining clickable for users.' },
    ],
    relatedTools: ['markdown-editor', 'json-formatter', 'url-encoder'],
  },
  'unit-converter': {
    sections: [
      {
        heading: 'Precision and floating-point arithmetic',
        paragraphs: [
          'Unit conversion inherently involves floating-point arithmetic. For example, converting 1 inch to centimeters (1 * 2.54 = 2.54) is exact, but converting 1/3 meter to centimeters can produce 33.333333333333336 due to IEEE 754 double-precision. Our converter rounds results to a configurable number of significant figures (default 10) and displays trailing zeros only when they matter. For engineering work, set the precision to 15 decimal places; for everyday use, 4 decimal places is sufficient.',
          'The tool handles edge cases: absolute zero in temperature conversions (0 K = -273.15°C), zero-length conversions (0 meters = 0 feet), and unit prefixes (milli-, centi-, kilo-, mega-, giga-, tera-). Temperature is especially tricky because Fahrenheit and Celsius use both scaling and offset — the conversion formula is T(°F) = T(°C) × 9/5 + 32, not a simple multiplication.',
        ],
        tips: [
          'For cooking conversions, use the Volume and Mass categories — note that "cups" and "tablespoons" are volume, not weight. A cup of flour weighs differently than a cup of water.',
          'When converting currency, use a dedicated currency converter with live exchange rates. Our unit converter uses fixed conversion factors suitable for physical units only.',
        ],
      },
      {
        heading: 'Unit systems and internationalization',
        paragraphs: [
          'Most countries use the metric system (SI units), but the US, Liberia, and Myanmar primarily use imperial units. Many technical fields mix systems: aerospace uses imperial (feet, nautical miles, knots), while scientific research uses metric. Our converter supports both systems and common cross-system conversions like mph to km/h, pounds to kilograms, and inches to centimeters.',
          'Data storage conversions (bytes, kilobytes, megabytes) have two conventions: decimal (1 KB = 1000 bytes, used by hard drive manufacturers) and binary (1 KiB = 1024 bytes, used by operating systems). Our tool lets you choose which convention to use, preventing the classic "500 GB hard drive shows as 465 GB" confusion.',
        ],
      },
    ],
    faq: [
      { question: 'Why does 1 foot equal 30.48 cm but 1 cm equals 0.032808399 feet?', answer: '1 foot is exactly 30.48 cm by international agreement. The reverse conversion (1/30.48) produces a repeating decimal. Our tool shows the floating-point result with your chosen precision.' },
      { question: 'Do you support currency conversion?', answer: 'No, currency conversion requires live exchange rates. Our converter handles physical units (length, mass, volume, temperature, speed, time, data) with fixed conversion factors.' },
      { question: 'What is the difference between a metric ton and a US ton?', answer: 'A metric ton (tonne) is 1000 kg. A US short ton is 907.185 kg (2000 lbs). A UK long ton is 1016.047 kg (2240 lbs). Our converter supports all three.' },
    ],
    relatedTools: ['unit-calculator', 'percentage-calculator', 'bmi-calculator'],
  },
  'loan-calculator': {
    sections: [
      {
        heading: 'The math behind loan amortization',
        paragraphs: [
          'The monthly payment for an amortizing loan is calculated using the formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments (loan term in years × 12). This formula ensures each payment covers the interest accrued since the last payment and the remainder reduces the principal. Over the loan term, the interest portion decreases and the principal portion increases — a process called amortization.',
          'Our calculator generates a full amortization schedule showing the principal/interest breakdown for every payment. This is critical for understanding the total cost of borrowing: a 30-year mortgage at 6% APR costs almost as much in interest as the principal itself. The schedule also shows the remaining balance after each payment, useful for calculating the cost of early repayment or refinancing.',
        ],
        tips: [
          'Add extra principal payments to the calculator to see how much interest you save. Even $50/month extra on a 30-year mortgage can save thousands and shorten the term by years.',
          'Compare APR (includes fees) vs interest rate — the rate determines your monthly payment, but APR reflects the true cost including origination fees and closing costs.',
        ],
      },
      {
        heading: 'Loan comparison: fixed vs variable rate',
        paragraphs: [
          'Fixed-rate loans lock in the interest rate for the entire term, providing predictable payments. Variable-rate loans (ARMs) have lower initial rates that adjust periodically based on an index (like SOFR) plus a margin. Our calculator supports ARM scenarios by letting you set an initial rate, adjustment period, and maximum rate cap. Run scenarios with the maximum possible rate to stress-test your budget — if the fully indexed rate would break your finances, a fixed-rate loan may be safer.',
          'Our calculator also handles interest-only loans (where payments cover only interest for the first N years, then switch to fully amortizing payments). This is common for commercial real estate and construction loans but risky for personal mortgages because no equity is built during the interest-only period.',
        ],
      },
    ],
    faq: [
      { question: 'What is the difference between APR and interest rate?', answer: 'The interest rate is the cost of borrowing the principal. APR includes the interest rate plus fees (origination, points, closing costs), giving a more complete picture of the loan cost. APR is always ≥ the interest rate.' },
      { question: 'How does extra payment frequency affect total interest?', answer: 'Making bi-weekly payments (half the monthly payment every 2 weeks) results in 26 half-payments = 13 full payments per year, which is one extra payment annually. This can shorten a 30-year mortgage by 4-5 years and save tens of thousands in interest.' },
      { question: 'What is negative amortization?', answer: 'Negative amortization occurs when the monthly payment is less than the interest due. The unpaid interest is added to the principal, causing the loan balance to grow over time. It is prohibited for most residential mortgages in the US under Dodd-Frank.' },
    ],
    relatedTools: ['mortgage-calculator', 'percentage-calculator', 'unit-calculator'],
  },
  'percentage-calculator': {
    sections: [
      {
        heading: 'Percentage use cases in development',
        paragraphs: [
          'Percentage calculations are everywhere in software: CSS width values, discount codes, tax computation, progress bars, analytics dashboards, and A/B test result interpretation. Our calculator handles three core operations: "What is X% of Y?" (e.g., 15% of 200 = 30), "X is what percent of Y?" (e.g., 30 out of 200 = 15%), and "What is the percentage increase/decrease?" (e.g., 100 to 150 = 50% increase). Understanding the difference between these cases prevents common math errors in reporting.',
          'A common pitfall: percentage points vs percent change. If a conversion rate goes from 2% to 3%, that is a 1 percentage point increase but a 50% relative increase. These are often confused in business reporting. Our calculator shows both the absolute difference and the relative change so you can communicate the right metric.',
        ],
        tips: [
          'For reverse percentage (finding the original before a percentage was applied), use the formula: original = result / (1 + percentage/100). Our calculator has a dedicated "Reverse" mode.',
          'When computing percentage change, the base matters: a 50% increase followed by a 50% decrease does NOT return to the original value (100 → 150 → 75).',
        ],
      },
      {
        heading: 'Rounding strategies in percentage math',
        paragraphs: [
          'Rounding percentage results can produce totals that are not exact due to accumulated rounding error. For example, three categories at 33.33% each total 99.99%, not 100%. Our calculator offers floor, ceil, round, and banker\'s rounding (round-half-to-even) modes. For financial calculations, always use banker\'s rounding — it is the standard for accounting (IEEE 754) because it reduces cumulative bias over many operations. For display purposes, round to 2 decimal places but keep full precision for downstream calculations.',
          'When computing tax amounts, some jurisdictions require truncation (rounding toward zero) to avoid collecting more than legally owed. Our tool lets you select the rounding method appropriate for your jurisdiction. The difference is pennies per transaction but can be significant at scale.',
        ],
      },
    ],
    faq: [
      { question: 'How do I calculate a percentage of a percentage?', answer: 'Multiply the percentages: 20% of 50% = 0.20 × 0.50 = 0.10 = 10%. This is common when calculating tax on a discounted price (pay sales tax on the discounted amount).' },
      { question: 'What is the difference between percentage and percentage point?', answer: 'A percentage point is the arithmetic difference between two percentages. If a rate rises from 4% to 6%, that is a 2 percentage point increase. The relative increase is 50% (2/4 × 100). Percentage points describe the absolute difference.' },
      { question: 'When are percentages misleading?', answer: 'Percentages can be misleading when the base is small. "100% increase" from 1 to 2 sounds dramatic but represents only 1 additional unit. Always report the absolute values alongside percentages for context.' },
    ],
    relatedTools: ['discount-calculator', 'tip-calculator', 'loan-calculator'],
  },
  'mortgage-calculator': {
    sections: [
      {
        heading: 'PITI: the four components of a mortgage payment',
        paragraphs: [
          'A mortgage payment consists of four parts: Principal (repaying the loan amount), Interest (cost of borrowing), Taxes (property tax, typically 1-2% of home value annually), and Insurance (homeowner\'s insurance and PMI if down payment <20%). Our calculator breaks down each component and shows how they combine into your total monthly payment. Many online calculators show only P&I, but PITI is the true cost of homeownership and what lenders use for debt-to-income ratio qualification.',
          'PMI (Private Mortgage Insurance) is required when the down payment is less than 20% of the home value. PMI rates range from 0.5% to 1.5% of the loan amount annually. Our calculator factors in PMI and shows when it drops off (automatically at 78% loan-to-value, or at 80% if you request cancellation). Factoring PMI into your budget can mean the difference between qualifying for a loan and being denied.',
        ],
        tips: [
          'Use the amortization table to find your break-even point for refinancing — the month where interest savings exceed closing costs.',
          'Include HOA fees in your monthly budget even though they are not part of the mortgage — our calculator has a separate HOA field for this purpose.',
        ],
      },
      {
        heading: 'Comparing mortgage scenarios',
        paragraphs: [
          'The calculator lets you compare up to three scenarios side by side: different down payment amounts, interest rates, or loan terms (e.g., 30-year fixed vs 15-year fixed vs 5/1 ARM). The 15-year mortgage has higher monthly payments but saves significantly in total interest because less interest accrues over the shorter term. However, the 30-year offers flexibility — you can always make extra principal payments to accelerate the payoff while preserving the lower minimum payment as a safety net.',
          'Our calculator also models the impact of discount points (prepaid interest that reduces the rate). One point costs 1% of the loan amount and typically reduces the rate by 0.25%. The break-even period is the time required for the monthly savings to exceed the points paid. If you plan to stay in the home past the break-even point, buying points makes financial sense.',
        ],
      },
    ],
    faq: [
      { question: 'What is the debt-to-income ratio and how does it affect me?', answer: 'DTI is your total monthly debt payments (including the new mortgage PITI) divided by your gross monthly income. Lenders typically require a DTI below 43% (FHA) or 36% (conventional). Use our DTI calculator (separate tool) to check your ratios before applying.' },
      { question: 'Should I put 20% down?', answer: '20% down avoids PMI and may get a better rate, but it is not always necessary. FHA loans require as little as 3.5% down, and conventional loans allow 3% down for first-time buyers. Compare the monthly cost of PMI against the years of saving to reach 20%.' },
      { question: 'What is escrow and how does it work?', answer: 'Escrow is an account managed by the lender that collects property taxes and insurance premiums as part of your monthly payment. The lender pays these bills on your behalf. This ensures taxes and insurance are always paid but also means higher monthly payments than principal + interest alone.' },
    ],
    relatedTools: ['loan-calculator', 'percentage-calculator', 'unit-calculator'],
  },
  'age-calculator': {
    sections: [
      {
        heading: 'Leap year and timezone edge cases',
        paragraphs: [
          'Age calculations must handle leap years, timezone offsets, and daylight saving time transitions. Someone born on February 29, 2000 has a legal birthday of February 28 or March 1 in non-leap years (depending on jurisdiction). Our calculator correctly accounts for this and shows both the "legal age" and "actual days alive" for clarity. In leap years, the person turns exactly one year older on February 29 itself.',
          'Timezone handling is critical for precise age. If someone is born at 11:00 PM UTC-5 and the current time is 1:00 AM UTC+1, the calendar date may differ. Our calculator uses the browser\'s local timezone by default but lets you specify a timezone for both birthdate and "as of" date. This is especially important for legal documents and age-restricted services that follow a specific jurisdiction\'s timezone.',
        ],
        tips: [
          'Use the "age at specific date" feature for legal forms — calculate exactly how old someone will be on a future date like contract signing or travel date.',
          'For international applications, specify the jurisdiction\'s timezone to get legally correct age. A person in Tokyo may be "one day older" than someone born at the same UTC moment in New York.',
        ],
      },
      {
        heading: 'Age calculation in software systems',
        paragraphs: [
          'Computing age in code is deceptively simple. The naive approach — subtracting birth year from current year — fails when the birthday has not yet occurred this year. The correct approach is: age = current_year - birth_year - (birthday_this_year > today ? 1 : 0). Our calculator uses this logic internally. For database queries, compute age in SQL using DATEDIFF with CASE statements, or better, compute it in application code where timezone handling is more controllable.',
          'For age-based filtering in web applications (e.g., age-gated content), always compute age server-side using a consistent timezone. Client-side age calculations can be manipulated by changing the system clock or timezone. Our calculator is client-side for convenience, but production systems should validate age on the server.',
        ],
      },
    ],
    faq: [
      { question: 'How do I calculate age if born on February 29?', answer: 'For legal purposes, most jurisdictions consider the birthday to be March 1 in non-leap years (the day after February 28). Our calculator shows both the legal age (using the jurisdiction rule) and the exact days since birth for reference.' },
      { question: 'Why does my age change at different times on my birthday?', answer: 'Your legal age changes at midnight in your local timezone. Our calculator shows the exact time remaining until your next birthday, which is timezone-dependent.' },
      { question: 'What is the difference between chronological age and biological age?', answer: 'Chronological age is the time elapsed since birth (what our calculator computes). Biological age estimates health status based on biomarkers and lifestyle factors — it requires a medical assessment and is not computable from dates alone.' },
    ],
    relatedTools: ['bmi-calculator', 'unit-converter', 'percentage-calculator'],
  },
  'bmi-calculator': {
    sections: [
      {
        heading: 'BMI formula, limitations, and alternatives',
        paragraphs: [
          'BMI = weight(kg) / height(m)². For imperial: BMI = weight(lbs) / height(in)² × 703. The World Health Organization classifies BMI as underweight (<18.5), normal (18.5-24.9), overweight (25-29.9), and obese (≥30). These ranges were developed using predominantly European populations, and the cutoff points do not account for muscle mass, bone density, fat distribution, or ethnic differences. For example, Asian populations have higher health risks at lower BMI thresholds (23+ for overweight).',
          'BMI is a screening tool, not a diagnostic one. A bodybuilder with 10% body fat and high muscle mass may have a BMI of 30+ (classified as obese). Conversely, an older adult with low muscle mass may have a "normal" BMI while having dangerously high body fat percentage. For more accurate health assessments, combine BMI with waist circumference, body fat percentage (DEXA or caliper), and blood biomarkers.',
        ],
        tips: [
          'For athletes and muscular individuals, use body fat percentage instead of BMI. A DEXA scan or caliper measurement provides more actionable data than BMI alone.',
          'For children and teenagers, BMI percentiles (age- and sex-adjusted) are used instead of absolute BMI values. Our calculator supports pediatric BMI percentile calculation.',
        ],
      },
      {
        heading: 'Implementing BMI calculation in your app',
        paragraphs: [
          'If you are building a health or fitness application, the BMI implementation is straightforward but has several UX considerations. Always validate that height > 0 and weight > 0, and provide clear error messages for nonsensical inputs (like 1200 kg or 0.5 m). Use toFixed(1) for display (BMI is conventionally shown to one decimal place). Consider adding unit toggles (metric/imperial) with automatic conversion rather than separate input fields.',
          'For accessibility in health apps, express BMI results with appropriate color coding (green for normal, yellow for overweight, red for obese) but do not use color alone — also add text labels and icons. Never use alarmist language about weight classification; instead, frame results as "your BMI falls in the X range" and suggest consulting a healthcare provider for personalized assessment.',
        ],
      },
    ],
    faq: [
      { question: 'Is BMI accurate for all body types?', answer: 'No. BMI does not distinguish between muscle and fat, so muscular individuals may be misclassified as overweight/obese. It also does not account for fat distribution (visceral vs subcutaneous), which is a stronger health predictor than total body fat.' },
      { question: 'Why does the WHO use different BMI cutoffs for Asian populations?', answer: 'Studies show that Asian populations have higher body fat percentage and cardiovascular risk at lower BMI values. The WHO recommends lower thresholds: overweight at ≥23 and obese at ≥27.5 for Asian populations.' },
      { question: 'What is a healthy BMI for older adults?', answer: 'For adults over 65, a BMI of 24-27 is associated with the lowest mortality risk (the "obesity paradox"). A "normal" BMI of 18.5-24.9 may indicate frailty or muscle loss in older populations. Always consult a doctor for age-appropriate health targets.' },
    ],
    relatedTools: ['age-calculator', 'unit-converter', 'percentage-calculator'],
  },
  'discount-calculator': {
    sections: [
      {
        heading: 'Discount math for e-commerce development',
        paragraphs: [
          'When building e-commerce systems, discount calculation must handle: percentage discounts off the original price, fixed-amount discounts, buy-one-get-one (BOGO) deals, tiered discounts ("spend $100 save $20"), and stacking rules. Our calculator handles the first three scenarios. For percentage off, the formula is: final = original × (1 - discount%/100). For stackable discounts, the order of application matters — applying a 10% discount before a $5 coupon gives a different result than $5 off first, then 10% off if the coupon applies to the post-discount total.',
          'A common e-commerce bug: displaying the wrong "you save" amount after multiple discounts are applied. If a $100 item has 20% off ($80) and a $10 coupon ($70), the total saving is $30, not $20 + $10 (because the coupon applied to the already-discounted price). Our calculator shows each discount step so you can verify the stacking logic in your cart implementation.',
        ],
        tips: [
          'Test with edge cases: 0% discount, 100% discount (free), negative discounts (price increases), and discounts larger than the price (should result in $0 or an error depending on policy).',
          'For VAT/GST calculations, apply the discount before tax. Discounted subtotal × tax rate = tax amount. Applying tax to the original price and then discounting can result in incorrect tax reporting.',
        ],
      },
      {
        heading: 'Discount psychology and pricing strategy',
        paragraphs: [
          'The "anchoring effect" means a higher original price makes the discounted price seem more appealing. Our calculator shows the savings both as an amount and as a percentage — presenting both maximizes perceived value. For subscriptions, annual discounts are typically 15-25% and are presented as "save 20%" rather than "pay $X less per month" because the percentage feels more substantial.',
          'For clearance pricing, the formula for a profitable discount is: minimum_price = cost / (1 - desired_margin). If an item costs $50 and you want a 30% margin, the minimum price is $50 / 0.70 = $71.43. Our calculator helps with reverse discount calculation: given a final price and original price, what was the discount percentage?',
        ],
      },
    ],
    faq: [
      { question: 'How do I calculate the final price after a percentage discount?', answer: 'Final price = Original price × (1 - Discount percentage / 100). For example, $80 with 25% off = $80 × 0.75 = $60.' },
      { question: 'How are stacked discounts calculated?', answer: 'Stacked discounts are applied sequentially. First discount applies to the original price, then the second discount applies to the result. For example, $100 with 20% off then $10 off = $100 × 0.80 = $80, then $80 - $10 = $70. The total discount is $30, not $20 + $10.' },
      { question: 'What is a "triple discount" and why is it often misleading?', answer: 'Triple discounts (e.g., "50% off + 20% off + 10% off") sound like 80% off but are actually 64% off (1 × 0.5 × 0.8 × 0.9 = 0.36). This marketing tactic inflates perceived savings. Our calculator shows the true combined percentage.' },
    ],
    relatedTools: ['percentage-calculator', 'tip-calculator', 'loan-calculator'],
  },
  'tip-calculator': {
    sections: [
      {
        heading: 'Tip calculation conventions and math',
        paragraphs: [
          'The standard tip calculation in the US is: tip = bill × (tip_percentage / 100), with common rates of 15% (standard service), 18% (good service), and 20%+ (exceptional service). For splitting among multiple people: each_person = (bill + tip) / number_of_people. Our calculator handles both pre-tax and post-tax tipping — tipping on pretax amount is more common but tipping on the total (including tax) is simpler in group settings.',
          'For development of point-of-sale or expense apps, the tip calculation margin of error matters. Rounding to the nearest cent: if the bill is $47.53 and the tip is 15%, the exact tip is $7.1295, which rounds to $7.13. The per-person share of ($47.53 + $7.13) / 3 = $18.22 (not $18.220, which would be over-collection). Our calculator uses proper rounding at each step to avoid penny discrepancies.',
        ],
        tips: [
          'Round tip amounts to the nearest dollar for simplicity in cash payments — our "round up" option makes this automatic.',
          'For group dining, add the tip manually to the total before splitting to avoid confusion about who pays what share of the gratuity.',
        ],
      },
      {
        heading: 'Cultural differences and global tipping',
        paragraphs: [
          'Tipping customs vary widely by country. In Japan, tipping can be considered insulting — excellent service is the standard, not something extra paid for. In many European countries, a 5-10% service charge is included in the bill (servizio incluso in Italy, service compris in France), so additional tipping is optional. In the US, tips are the primary income for service workers because of the tipped minimum wage ($2.13/hour federal). Our calculator provides a country selector that suggests the appropriate tip percentage range and explains whether the listed price already includes service.',
          'When building travel or expense applications, implement locale-aware tip suggestions. The same app user may need 0% tip in Tokyo, 10% in Berlin, and 20% in New York. Store the tipping preference alongside the location data for automatic calculation. Our calculator\'s country-based presets demonstrate this pattern for your reference.',
        ],
      },
    ],
    faq: [
      { question: 'Should I tip on the pretax or post-tax amount?', answer: 'Tipping on the pretax amount is more common and fairer (the tax is not a service-provided item). However, many point-of-sale systems calculate tip suggestions on the post-tax total for simplicity. Our calculator supports both options.' },
      { question: 'How do I split a tip unevenly among a group?', answer: 'Our calculator supports custom splits — enter each person\'s share (e.g., Person 1 pays for 2 drinks, Person 2 pays for the meal). The tool calculates each person\'s contribution plus their proportionate share of the tip.' },
      { question: 'Why is 15% the standard tip in the US?', answer: 'The 15% standard dates to the 1930s when it was codified as the expected rate in hospitality guides. It has since risen to 18-20% in urban areas due to inflation and the stagnant tipped minimum wage. The cultural expectation continues to rise (some POS systems suggest 25-30% options).' },
    ],
    relatedTools: ['discount-calculator', 'percentage-calculator', 'loan-calculator'],
  },
  'pixels-to-inches': {
    sections: [
      {
        heading: 'What is a Pixels to Inches Converter?',
        paragraphs: [
          'A pixels to inches converter — sometimes called a pixel to inches converter, a pixel to inch conversion tool, or an inches to pixels converter — translates digital pixel dimensions into physical inch measurements based on the DPI (dots per inch) or PPI (pixels per inch) of your output device. To turn pixels into inches, divide by your DPI value: inches = pixels / DPI. Whether you need to convert pixels to inches for a print project, want to check pixel sizes in inches for a screen layout, or simply need to work between pixels and inches for a design, the math is always the same. But the real value of this tool lies in handling the variable DPI correctly — the same pixel count produces very different physical sizes at different resolutions. A 1080px-wide image is 11.25 inches wide at 96 DPI (standard screen), but only 3.6 inches at 300 DPI (standard print). This tool eliminates the confusion by letting you choose or customize the DPI setting.',
          'Whether you are converting pixels to inches or going the other way from inches to pixels, the converter works bidirectionally in the same interface — type in either unit and the matching value appears instantly. The result updates instantly as you type, with no button clicking required. The precision control lets you choose how many decimal places to display, and the Width × Height mode handles dimension pairs — perfect for converting full image or document dimensions at once.',
        ],
      },
      {
        heading: 'Why DPI matters in pixel-to-inch conversion',
        paragraphs: [
          'DPI (dots per inch) and PPI (pixels per inch) are often used interchangeably, but technically PPI refers to input (how many pixels per inch in an image) while DPI refers to output (how many dots per inch a printer lays down). For conversion purposes, they serve the same function: determining how many pixels to the inch your output will have. Whether you need to convert pixels in inches at a specific resolution, see an inch expressed in px, or do an inch to px conversion for a design spec, the DPI setting is the key variable. The key insight is that pixels have no fixed physical size — a pixel at 72 DPI is larger than a pixel at 300 DPI because the same digital information is spread across fewer or more dots per inch.',
          'Common DPI standards have evolved for different use cases: 72 DPI was the legacy Mac and early web standard (though actual screen resolutions vary widely). 96 DPI became the Windows screen standard and is the default for most modern web design. 150 DPI is a common draft-print resolution that balances quality and file size. 300 DPI is the standard for high-quality print output and is what most print shops require for crisp results. Understanding these standards helps you choose the right setting for your project.',
        ],
      },
      {
        heading: 'How to use this converter',
        paragraphs: [
          'Using the tool is straightforward: select your DPI from the presets or enter a custom value, then type either pixels or inches into the corresponding field. The converter instantly calculates the matching value in the other unit. The bidirectional sync means you can start with whichever measurement you have and immediately see the conversion. Use the swap button to quickly exchange the two values, or the copy button next to the result field to copy the inch value to your clipboard.',
          'For dimension pair conversion, toggle the Width × Height mode. This shows separate width and height inputs in both pixels and inches — all four fields are synchronized. This is especially useful for converting image or document dimensions like "1920 × 1080 pixels to inches" or working out what pixel size you need for a specific print dimension at a given DPI.',
        ],
      },
      {
        heading: 'Practical examples',
        paragraphs: [
          'Example 1: A web designer has a banner image that is 1200 pixels wide and needs to know its width in inches for a print brochure at 300 DPI. Setting DPI to 300 and entering 1200 in the pixels field shows the result: 4.000 inches. At the standard web resolution of 96 DPI, the same image would be 12.5 inches wide — a dramatic difference that illustrates why specifying DPI correctly is crucial.',
          'Example 2: A print designer is creating a business card that measures 3.5 × 2 inches. They need to know the pixel dimensions at 300 DPI for their design software. Entering 3.5 inches with DPI set to 300 gives 1050 pixels. The Width × Height mode lets them enter both 3.5 and 2 inches to get the full pixel dimensions (1050 × 600 pixels) in one view.',
          'Example 3: A photographer has a 24-megapixel image that measures 6000 × 4000 pixels. Using the Width × Height mode at 300 DPI, the image converts to 20 × 13.333 inches — perfect for determining what print sizes are possible without resampling.',
        ],
      },
      {
        heading: 'Worked examples: 1080 pixels and 1800 × 600 pixels',
        paragraphs: [
          'Here are two frequently-requested conversions that show how the same pixel values produce different inch results at screen vs print DPI.',
          '1080 pixels to inches: At 96 DPI, 1080 ÷ 96 = 11.25 inches. At 300 DPI, 1080 ÷ 300 = 3.6 inches. Try it in the converter by pasting the URL /tools/pixels-to-inches?px=1080&dpi=96 into your browser to load these values.',
          '1800 × 600 pixels to inches: This common banner dimension at 96 DPI converts to 18.75 × 6.25 inches (1800 ÷ 96 = 18.75 width, 600 ÷ 96 = 6.25 height). At 300 DPI it converts to 6 × 2 inches (1800 ÷ 300 = 6, 600 ÷ 300 = 2). Enable Width × Height mode and try it by pasting /tools/pixels-to-inches?wxh=true&w=1800&h=600&dpi=96 into your browser.',
        ],
      },
    ],
    faq: [
      { question: 'How many pixels to an inch?', answer: 'It depends on the DPI/PPI setting. At 96 DPI (standard Windows screen), 96 pixels = 1 inch. At 300 DPI (standard print quality), 300 pixels = 1 inch. The formula is: pixels per inch = DPI. So at custom DPI settings, the answer changes accordingly.' },
      { question: 'How to calculate pixels per inch?', answer: 'PPI = pixels / inches. For example, if an image is 3000 pixels wide and prints at 10 inches, the PPI is 3000 / 10 = 300 PPI. This is different from the conversion direction (inches = pixels / DPI) — our converter handles both.' },
      { question: 'How to convert pixels to inches?', answer: 'Divide the number of pixels by the DPI. For example, 1000 pixels ÷ 96 DPI = 10.42 inches. At 300 DPI, the same 1000 pixels would be 3.33 inches. Our converter does this calculation instantly.' },
      { question: 'What is the difference between DPI and PPI?', answer: 'PPI (pixels per inch) refers to the pixel density in a digital image. DPI (dots per inch) refers to the dot density in a printed output. They are often used interchangeably in conversion contexts because both serve as the scale factor between pixels and inches. For practical conversion purposes, they are equivalent.' },
      { question: 'What DPI should I use for web vs print?', answer: 'For web and screen use, 72 or 96 DPI is standard. For print, 300 DPI is the standard quality for most projects. Draft-quality prints use 150 DPI. Check with your printer or output device for the recommended resolution.' },
      { question: 'How many pixels to the inch?', answer: 'The same as pixels per inch — it depends on your DPI setting. At 96 DPI (standard screen resolution), there are 96 pixels to the inch. At 300 DPI (standard print quality), there are 300 pixels to the inch. Choose the DPI preset above that matches your use case to get the exact figure.' },
      { question: 'How many pixels to inches?', answer: 'This depends on both the pixel count and the DPI you are converting at. Use the formula inches = pixels ÷ DPI — for example, 960 pixels at 96 DPI equals 10 inches, while the same 960 pixels at 300 DPI equals 3.2 inches. Enter your pixel value and DPI above to convert instantly.' },
      { question: 'Is there a free pixel to inch converter online?', answer: 'Yes — the calculator on this page is a free, no-signup pixel to inch converter that works in both directions. Enter pixels to get inches, or inches to get pixels, at any DPI from 72 to 300 or a custom value.' },
    ],
    relatedTools: ['px-to-inches', 'inches-to-px', 'unit-converter'],
  },
  'px-to-inches': {
    sections: [
      {
        heading: 'What is PX to Inches conversion?',
        paragraphs: [
          'PX (pixels) to inches conversion is essential when moving designs from screen to print. Pixels are digital units that vary in physical size depending on the device — a pixel on a phone screen is much smaller than a pixel on a desktop monitor. The conversion factor is DPI (dots per inch), which tells you how many pixels fit into one physical inch. At the standard screen resolution of 96 DPI, 96 pixels equal 1 inch. For print at 300 DPI, 300 pixels equal 1 inch. This tool handles the math so you can focus on your design.',
          'The bidirectional nature of this converter means you are never locked into one direction. Type pixels to get inches, or inches to get pixels — whichever measurement you have, the tool shows the converted value instantly. The precision control lets you adjust how many decimal places are shown for inch values.',
        ],
      },
      {
        heading: 'When to use PX to Inches conversion',
        paragraphs: [
          'UX and UI designers frequently need px-to-inch conversions when preparing screen designs for print presentation or when specifying physical dimensions for signage and kiosk displays. A mobile mockup created at 375 × 812 pixels (iPhone standard) converts to roughly 3.9 × 8.46 inches at 96 DPI — useful for understanding how that design would look as a printed prototype.',
          'Print designers working with digital assets need to convert pixel-based images into inch dimensions for layout software like InDesign or QuarkXPress. Knowing the physical size of a raster image at a given DPI helps determine if it has sufficient resolution for the intended print size.',
        ],
      },
    ],
    faq: [
      { question: 'How do I convert px to inches?', answer: 'Divide the number of pixels by the DPI. For example, 600 px ÷ 300 DPI = 2 inches. Our tool does this instantly — just enter your pixel value and select the DPI.' },
      { question: 'What is 1920 px in inches at 96 DPI?', answer: '1920 px ÷ 96 DPI = 20 inches. This is the standard full HD screen width measured in inches at typical monitor resolution.' },
    ],
    relatedTools: ['pixels-to-inches', 'inches-to-px'],
  },
  'inches-to-px': {
    sections: [
      {
        heading: 'Converting inches to pixels',
        paragraphs: [
          'Inches to pixels conversion is the reverse of the more common pixels-to-inches calculation, and it is just as important for design and production workflows. The formula is: pixels = inches × DPI. For example, a standard US letter page is 8.5 × 11 inches. At 300 DPI, that converts to 2550 × 3300 pixels — the exact canvas size a print designer needs for a full-bleed letter-sized document.',
          'This converter makes inches-to-px conversion as simple as entering the inch value and selecting the DPI. The result updates instantly, and the Width × Height mode lets you convert full dimension pairs at once. This is particularly useful when setting up document sizes, creating digital canvases for print output, or determining screen dimensions from physical measurements.',
        ],
      },
      {
        heading: 'When inches to pixels is the right direction',
        paragraphs: [
          'Print designers who think in physical dimensions first — page sizes, margin widths, image dimensions — use inches-to-pixels conversion when setting up their digital workspace. Knowing that a 2-inch wide image at 300 DPI needs to be 600 pixels wide helps create correctly-sized assets from the start. Signage and large-format designers regularly convert physical dimensions to pixel requirements for their digital design tools.',
          'Web developers designing for specific screen sizes also benefit. If a client wants a web layout that mirrors a 10-inch tablet screen at roughly 200 PPI, the target width is about 2000 pixels. This physical-to-digital translation is essential for responsive design planning and device-targeted layouts.',
        ],
      },
    ],
    faq: [
      { question: 'How do I convert inches to pixels?', answer: 'Multiply the inch measurement by the DPI. For example, 8.5 inches × 300 DPI = 2550 pixels. Our converter handles this instantly.' },
      { question: 'How many pixels in an inch at 96 DPI?', answer: 'At 96 DPI, 1 inch = 96 pixels. This is the standard for most computer screens and web design.' },
    ],
    relatedTools: ['pixels-to-inches', 'px-to-inches'],
  },
  'slug-generator': {
    sections: [
      {
        heading: 'What is a URL slug?',
        paragraphs: [
          'A URL slug is the part of a web address that comes after the domain and identifies a specific page in human-readable form. In the URL yoursite.com/blog/how-to-bake-bread, the slug is "how-to-bake-bread" — everything after the last meaningful folder. Slugs are the part of a URL that both search engines and real people actually read, as opposed to the rest of the address, which is mostly fixed site structure.',
          'Slugs matter more than most people realize. They are a small but real ranking signal for SEO, they appear in search results (often bolded when they match the search query), and they are one of the first things a person glances at when deciding whether to click a result or share a link. A good slug generator tool helps you create these consistently without manually lowercasing, replacing spaces, and stripping special characters every time.',
          'This is also sometimes called a url slug generator, an SEO slug generator, or a text to slug converter — but no matter what you call it, the task is the same: taking a human-readable title or phrase and turning it into a clean, URL-safe string. Unlike many basic tools, this slug generator handles accented characters like "Café" → "cafe", removes emoji and symbols cleanly, and supports bulk conversion for when you have a whole list of titles to process.',
        ],
      },
      {
        heading: 'What makes a good SEO-friendly slug?',
        paragraphs: [
          'A well-crafted URL slug follows a few simple rules that make it both search-engine-friendly and human-readable. Google has stated explicitly that hyphens should be used as word separators in URLs — hyphens are treated as word separators, while underscores are not. This means "seo-friendly-url" is read as three separate words by search engines, but "seo_friendly_url" may be read as a single long string. The slug generator defaults to hyphens for this reason, with an underscore option available for systems or conventions that require it.',
          'Keep slugs short and descriptive — aim for 3-5 meaningful words, ideally under 60 characters. Shorter slugs are easier to read, remember, and share, and Google tends to display shorter URLs more fully in search results. Remove stop words (a, an, the, and, or, of, to, in, for) when they don\'t add meaning — "the-best-way-to-learn-python" becomes "best-way-learn-python" with no real loss of clarity. The toggle in this generator makes that optional since some contexts (like exact title matching) benefit from keeping the slug closer to the original.',
          'Avoid special characters, numbers without context, and dates or years that will become outdated. Stick to lowercase letters, numbers, and hyphens. Accented and non-ASCII characters (é, ñ, ü) should be transliterated to their closest plain-English equivalent rather than stripped or left as broken characters — this slug generator handles that automatically so "Café Münchën" becomes "cafe-munchen", not "caf-mnchn".',
        ],
      },
      {
        heading: 'How to generate a slug from a title',
        paragraphs: [
          'Generating an SEO-friendly slug from a title or phrase is straightforward with this tool. Start by pasting or typing your text into the input field — the slug updates instantly as you type, with no button click required. The live preview shows you exactly what the final slug will look like, including a URL preview that shows how it would appear in context on your domain.',
          'Adjust the options to match your needs. The separator defaults to hyphen (the SEO-recommended choice), but you can switch to underscore if your CMS or naming convention requires it. Toggle stop-word removal on or off — off by default for exact title matching, on for shorter keyword-focused slugs. Set a maximum length to enforce a character limit (default 60, matching common SEO guidance), and watch the live character counter change color as you approach or exceed the limit.',
          'Once the slug looks right, click the copy button to copy it to your clipboard. The tool also updates an aria-live region for screen readers so the result is accessible. For single titles, this whole process takes seconds — paste, review, copy, and move on.',
          'The term "generate slug from title" describes exactly what this tool does: you input a title or text string, and it outputs a URL-safe slug. Whether you call it a permalink generator, a slugify text online tool, or a convert title to url slug utility, the result is the same — a clean, hyphen-separated, lowercase slug ready for your URL.',
        ],
      },
      {
        heading: 'Bulk slug generation',
        paragraphs: [
          'Bulk slug generation is where this tool really stands out from basic slug generators. Most free slug converters only handle one string at a time — fine for occasional use, but painful when you are migrating a blog, importing a product catalog, or publishing a large content batch. This tool lets you switch to Bulk Mode and paste dozens or hundreds of titles at once, one per line, and get back a matching slug for each in the same order.',
          'A problem that only appears in bulk mode is duplicate slugs. If two different titles happen to produce the same slug — for example, "Best Pizza Recipe" and "Best Pizza Recipe!" both become "best-pizza-recipe" — you need unique slugs for each page. The tool detects this automatically and appends -2, -3, etc. to keep every slug unique. Duplicates are visually flagged so you can review them and confirm they still make sense before publishing.',
          'Use the Copy All button to copy the full list of generated slugs, one per line, ready to paste into a spreadsheet, CMS import field, or migration script. Combined with consistent option settings across the whole batch — same separator, same stop-word choice, same length limit — this turns a tedious manual process into a repeatable five-second operation.',
        ],
      },
    ],
    faq: [
      { question: 'What is a URL slug?', answer: 'A URL slug is the readable part of a web address that identifies a specific page — for example, in yoursite.com/blog/how-to-bake-bread, "how-to-bake-bread" is the slug. Good slugs are short, lowercase, hyphen-separated, and describe the page\'s content clearly.' },
      { question: 'How do I generate an SEO-friendly slug from a title?', answer: 'Paste your title or text into the generator above — it automatically lowercases the text, replaces spaces and special characters with hyphens, and removes anything that isn\'t URL-safe. You can also enable stop-word removal to strip words like "a," "the," and "and" for a shorter, more keyword-focused slug.' },
      { question: 'What\'s the ideal length for a URL slug?', answer: 'Most SEO guidance recommends keeping slugs under 60 characters and to 3-5 meaningful words. Shorter slugs are easier to read, share, and remember, and Google tends to display shorter URLs more fully in search results. Use the character limit and live counter in the tool above to stay within your target length.' },
      { question: 'Should I remove stop words from my slug?', answer: 'It depends on context, but for most blog posts and articles, removing stop words (a, an, the, and, of, to...) produces a shorter, more keyword-dense slug without losing meaning. Some sites prefer to keep the slug closer to the exact title for consistency — that\'s why this is an optional toggle rather than automatic.' },
      { question: 'Can I generate slugs for a whole list of titles at once?', answer: 'Yes — switch to Bulk Mode, paste one title per line, and the tool generates a matching slug for each line in the same order, automatically handling duplicates by appending a number if two titles would otherwise produce the same slug.' },
      { question: 'Does this tool handle accented characters and non-English text?', answer: 'Yes — accented and non-ASCII Latin characters (like é, ñ, ü) are automatically converted to their closest plain-English equivalent (e.g. "café" becomes "cafe") so the resulting slug stays fully URL-safe.' },
    ],
    relatedTools: ['url-encoder', 'word-counter'],
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

  // Use tool-specific guide content if available
  const customGuideContent = toolGuideContent[tool.slug]
  let guideSections: ToolGuideSection[] = []
  let relatedToolLinks: string[] = []

  if (customGuideContent) {
    guideSections = customGuideContent.sections
    relatedToolLinks = customGuideContent.relatedTools
  } else {
    // Fallback to generic guide sections for tools without custom content
    guideSections = [
      {
        heading: `Why use ${tool.name}?`,
        paragraphs: [
          `The ${tool.name} is built to help ${audience} ${useCase}. It works directly in your browser so you can process input quickly without installing extra software, creating an account, or waiting for a server response. The tool is ideal for fast troubleshooting, conversions, and content cleanup when you need reliable output instantly.`,
          `Because the interface is browser-based, your work stays available on desktop and mobile devices. You can use the tool while editing documents, reviewing code, or sharing examples with colleagues, which makes it a great fit for team workflows and solo projects alike.`,
          `This tool is especially useful when you want a polished result and immediate feedback. It removes repetitive manual steps and helps you keep your process moving from raw data to clean output in seconds.`,
        ],
      },
      {
        heading: 'How it works',
        paragraphs: [
          `Start by pasting or typing your input into the ${tool.name} panel. The tool analyzes the data, applies the correct transformation, and produces a readable result right away. You can then adjust any available settings or formatting options to fit your needs.`,
          `Most users find it helpful to begin with a real example and then update the input for their specific task. If you are working with structured data, make sure the input is complete and correctly formed so the tool can give you the best output.`,
          `Once the result is ready, use the copy or download controls to move the output into your editor, CMS, or development environment. The tool is designed to handle common formats cleanly and consistently, which helps reduce errors and save time.`,
        ],
      },
      {
        heading: 'Practical workflows',
        paragraphs: [
          `Use the ${tool.name} when you are preparing content, debugging files, or sharing examples in documentation. It is especially helpful for routine tasks that would otherwise require manual formatting or searching for a separate utility.`,
          `For example, you can use this tool to verify the structure of input data, compare expected output, or transform a value before pasting it into code or a web form. That makes it a powerful companion for developers, writers, and anyone who works with digital information.`,
          `Because the tool is part of an online toolkit, you can also combine it with other utilities such as encoders, converters, and calculators to complete longer workflows without switching apps.`,
        ],
      },
      {
        heading: 'Tips for best results',
        paragraphs: [
          `Give the tool clear input by avoiding extra whitespace, hidden formatting, or partially edited content. If you are working with code, data, or text, a clean starting point helps the tool deliver the right result faster.`,
          `Use the example section above to compare output against what you expect. That quick reference makes it easy to see whether the transformation matches your workflow, and it can also help you catch issues before copying the final output.`,
          `Finally, revisit the result and make small adjustments if needed. The ${tool.name} is designed to be flexible so you can refine the output and reuse it across documents, code snippets, or project notes.`,
        ],
      },
    ]
  }

  // Use custom FAQ from guide content if available, else use default
  const customFaq = customGuideContent?.faq ?? []

  // Use tool-specific howToUse steps if available
  const customHowToUse: Record<string, string[]> = {
    'pixels-to-inches': [
      'Choose a DPI/PPI preset (72, 96, 150, or 300) from the dropdown, or select Custom to enter any DPI value.',
      'Type a value into either the Pixels field or the Inches field — the other field updates instantly as you type.',
      'Use the swap button (⇄) to flip which value you\'re editing, or the copy icon next to each field to copy that value to your clipboard.',
      'Toggle "Width × Height mode" to convert full image dimensions (width and height) at once instead of a single value.',
      'Click any row in the Common Conversions Reference table to instantly load that pixel value into the calculator above.',
    ],
    'slug-generator': [
      'Type or paste a title, phrase, or text into the input field — the slug updates instantly as you type.',
      'Choose a separator: hyphen (-) for SEO-standard slugs, or underscore (_) if your system requires it.',
      'Toggle "Remove stop words" to strip common filler words (a, an, the, and, or, of, to) for shorter, keyword-focused slugs.',
      'Set a maximum length to enforce SEO-friendly slug length — the live counter shows current vs limit with color coding.',
      'Switch to Bulk Mode to generate slugs for multiple titles at once — paste one title per line and get all results with automatic de-duplication.',
    ],
  }

  // Build related tools list
  const relatedToolSlugs = customGuideContent?.relatedTools ?? []
  const relatedToolsList = relatedToolSlugs
    .map(slug => {
      const t = getToolBySlug(slug)
      if (!t) return null
      return { name: t.name, slug: t.slug, description: t.description }
    })
    .filter((t): t is { name: string; slug: string; description: string } => t !== null)

  return {
    purpose: `Use ${tool.name} to ${tool.description.toLowerCase()}.`,
    longDescription: `The ${tool.name} is a browser-based utility that helps ${audience} ${useCase}. It offers a clean, responsive interface with fast results delivered in the browser, so you can work without installing software or creating an account. The tool makes it easy to ${action} and then copy or export the result immediately for use in your project or workflow. Built for both beginners and advanced users, it saves time by removing manual steps and improving accuracy. You can use the tool on desktop and mobile devices, and the interface includes clear examples to help you verify output quickly. Whether you are preparing a document, troubleshooting data, or planning a project, ${tool.name} is designed to reduce friction and keep your work moving. This makes it a practical, dependable choice for anyone looking for a polished online utility.`,
    aboutBlurb: toolAboutBlurbs[tool.slug] ?? `${tool.name} is a browser-based utility for ${audience}. Use it to ${action} quickly and easily in your browser without installing software or creating an account.`,
    howToUse: customHowToUse[tool.slug] ?? [
      `Enter or paste your ${tool.name.toLowerCase()} input into the tool interface.`,
      `Adjust any available options for the result format, output style, or calculation settings.`,
      `Click the action button to ${action} and wait for the updated output.`,
      `Review the result, then copy or download the output for your next task.`,
    ],
    exampleInput: example.input,
    exampleOutput: example.output,
    guideSections,
    faq: customFaq.length > 0 ? customFaq : [
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
    relatedTools: relatedToolsList,
  }
}

export const tools: Tool[] = [
  // Developer Tools (12)
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Use our JSON formatter online to instantly format, validate, and beautify any JSON data. Paste minified JSON and get perfectly indented output with syntax error detection.',
    category: 'developer',
    icon: 'Braces',
    slug: 'json-formatter',
    keywords: ['json formatter online', 'json validator online', 'json beautifier', 'format json online', 'pretty print json', 'json', 'format', 'validate', 'minify'],
    featured: true,
    seoTitle: 'json formatter online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free JSON formatter online to instantly format, validate, and beautify any JSON data. Paste minified JSON and get perfectly indented output with syntax error detection. No signup required.',
    h1: 'JSON Formatter Online — Free JSON Validator & Beautifier',
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Use our JWT decoder online to instantly decode any JWT token. Inspect headers, payloads, and claims safely in your browser with this free JWT token decoder.',
    category: 'developer',
    icon: 'Lock',
    slug: 'jwt-decoder',
    keywords: ['jwt decoder online', 'decode jwt token', 'jwt token decoder', 'jwt decode online free', 'online jwt decoder', 'jwt', 'token', 'decode', 'auth'],
    featured: true,
    seoTitle: 'jwt decoder online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free JWT decoder online to instantly decode any JWT token. Inspect headers, payloads, claims and expiration dates. 100% browser-based — your tokens never leave your device. No signup required.',
    h1: 'JWT Decoder Online — Free JWT Token Decoder & Inspector',
  },

  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Use our regex tester online to test, debug, and validate regular expressions with live matching. This free regular expression tester helps you build perfect patterns instantly.',
    category: 'developer',
    icon: 'Search',
    slug: 'regex-tester',
    keywords: ['regex tester online', 'regular expression tester', 'test regex online', 'regex checker', 'regex validator', 'regex', 'regexp', 'pattern', 'test'],
    seoTitle: 'regex tester online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free regex tester online to build, test, and validate regular expressions with real-time matching and highlighting. Supports global, case-insensitive, and multiline flags. No signup required.',
    h1: 'Regex Tester Online — Free Regular Expression Tester & Checker',
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Use our SQL formatter online to instantly beautify and format any SQL query. This free SQL formatter supports MySQL, PostgreSQL, and more with clean indentation.',
    category: 'developer',
    icon: 'Database',
    slug: 'sql-formatter',
    keywords: ['sql formatter online', 'sql beautifier online', 'format sql query online', 'sql pretty print', 'sql formatter free', 'sql', 'database', 'query', 'formatter'],
    seoTitle: 'sql formatter online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free SQL formatter online to instantly beautify and format messy SQL queries. Supports MySQL, PostgreSQL, and more. Get clean, properly indented output. No signup required.',
    h1: 'SQL Formatter Online — Free SQL Beautifier & Query Formatter',
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Use our Base64 decode online tool to instantly decode any Base64 string or encode text to Base64. This free Base64 encoder decoder handles all your conversion needs.',
    category: 'developer',
    icon: 'Binary',
    slug: 'base64-encoder',
    keywords: ['base64 decode online', 'base64 encode online', 'base64 encoder decoder', 'decode base64 string', 'base64 converter', 'base64', 'encode', 'decode'],
    seoTitle: 'base64 decode online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free Base64 decode online tool to instantly decode Base64 strings or encode text. This Base64 encoder decoder is browser-based and works instantly. No signup required.',
    h1: 'Base64 Decode Online — Free Base64 Encoder Decoder & Converter',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Use our URL encode online tool to instantly encode special characters for safe URLs and query parameters. This free URL encoding tool also decodes percent-encoded strings.',
    category: 'developer',
    icon: 'Link',
    slug: 'url-encoder',
    keywords: ['url encode online', 'url decoder online', 'encode url online', 'url encoding tool', 'url decoder encoder', 'url', 'encode', 'decode', 'uri'],
    seoTitle: 'url encode online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free URL encode online tool to instantly encode special characters for URLs and query parameters or decode percent-encoded strings back to readable text. No signup required.',
    h1: 'URL Encode Online — Free URL Encoder Decoder & Encoding Tool',
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Use our MD5 hash generator online to instantly create SHA256, SHA1, SHA512, and MD5 hashes. This free hash generator is browser-based and works offline.',
    category: 'developer',
    icon: 'Hash',
    slug: 'hash-generator',
    keywords: ['md5 hash generator online', 'sha256 generator online', 'sha1 hash online', 'generate md5 hash', 'hash generator free', 'hash', 'md5', 'sha256', 'crypto'],
    seoTitle: 'md5 hash generator online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free MD5 hash generator online to create SHA256, SHA1, SHA512, and MD5 hashes instantly. Browser-based — your data never leaves your device. No signup required.',
    h1: 'MD5 Hash Generator Online — Free SHA256 SHA1 SHA512 Generator',
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Use our HEX to RGB converter online to instantly convert between HEX, RGB, and HSL color codes. This free color code converter is perfect for web designers.',
    category: 'developer',
    icon: 'Palette',
    slug: 'color-converter',
    keywords: ['hex to rgb converter', 'rgb to hex converter', 'hsl to rgb converter', 'hex color converter', 'color code converter', 'color', 'hex', 'rgb', 'hsl', 'convert'],
    seoTitle: 'hex to rgb converter — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free HEX to RGB converter online to instantly convert between HEX, RGB, and HSL color formats. Perfect for web designers and developers. No signup required.',
    h1: 'HEX to RGB Converter Online — Free Color Code Converter & Translator',
  },
  {
    id: 'code-minifier',
    name: 'Code Minifier',
    description: 'Use our JavaScript minifier online to instantly minify JS, CSS, and HTML code. This free JS minifier reduces file sizes and speeds up your website.',
    category: 'developer',
    icon: 'Zap',
    slug: 'code-minifier',
    keywords: ['javascript minifier online', 'css minifier online', 'html minifier online', 'minify js online', 'js minifier free', 'minify', 'css', 'javascript', 'html'],
    seoTitle: 'javascript minifier online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free JavaScript minifier online to instantly minify JS, CSS, and HTML. Reduce file sizes by up to 70% and speed up your website. Browser-based, no signup required.',
    h1: 'JavaScript Minifier Online — Free JS CSS HTML Minifier Tool',
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Use our diff checker online to instantly compare two texts and find differences. This free text diff tool highlights additions, deletions, and changes side by side.',
    category: 'developer',
    icon: 'GitCompare',
    slug: 'diff-checker',
    keywords: ['diff checker online', 'text diff tool', 'compare two texts online', 'find differences in text', 'text comparison tool', 'diff', 'compare', 'text', 'changes'],
    seoTitle: 'diff checker online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free diff checker online to instantly compare two texts side by side. This text diff tool highlights every difference — perfect for code review and document comparison. No signup required.',
    h1: 'Diff Checker Online — Free Text Comparison & Diff Tool',
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Use our XML formatter online to instantly format, beautify, and validate any XML document. This free XML validator catches syntax errors and pretty prints your data.',
    category: 'developer',
    icon: 'Code',
    slug: 'xml-formatter',
    keywords: ['xml formatter online', 'xml validator online', 'xml beautifier', 'format xml online', 'xml pretty print', 'xml', 'format', 'validate', 'beautify'],
    seoTitle: 'xml formatter online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free XML formatter online to instantly format, beautify, and validate any XML document. Proper indentation with syntax error detection. Browser-based, no signup required.',
    h1: 'XML Formatter Online — Free XML Beautifier & Validator Tool',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Use our UUID generator online to instantly generate random UUID v4 and v1 identifiers. This free GUID generator creates unique IDs for databases and development.',
    category: 'developer',
    icon: 'Id',
    slug: 'uuid-generator',
    keywords: ['uuid generator online', 'generate uuid online', 'guid generator', 'generate guid', 'uuid generator', 'guid uuid generator', 'generating guid', 'guid generator online', 'random uuid generator', 'uuid v4 generator', 'uuid', 'generate', 'identifier'],
    seoTitle: 'uuid generator online — Free GUID & UUID Generator v4 | OnlineFreeTools',
    seoDescription: 'Use our free UUID GUID generator online to create random UUID v4, v1, and GUID identifiers. Perfect for database keys, test data, and distributed systems. Bulk generate too. No signup required.',
    h1: 'UUID Generator Online — Free GUID & UUID v4 Generator Tool',
  },

  // Document & Media Tools (7)
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Use our word counter online to instantly count words, characters, sentences, and paragraphs in any text. This free character counter is perfect for essays and social media.',
    category: 'document',
    icon: 'FileText',
    slug: 'word-counter',
    keywords: ['word counter online', 'character counter online', 'count words in text', 'word count tool', 'letter counter online', 'word', 'count', 'character', 'reading time'],
    seoTitle: 'word counter online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free word counter online to instantly count words, characters, sentences, and paragraphs. Perfect for essays, articles, and social media posts with reading time estimates. No signup required.',
    h1: 'Word Counter Online — Free Character Counter & Word Count Tool',
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Use our free QR code generator to create custom QR codes for URLs, text, and more. This QR code maker online tool lets you download QR codes as PNG or SVG.',
    category: 'document',
    icon: 'QrCode',
    slug: 'qr-code-generator',
    keywords: ['qr code generator free', 'qr code maker online', 'create qr code free', 'free qr code generator', 'qr code creator', 'qr', 'code', 'barcode', 'generate'],
    seoTitle: 'qr code generator free — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free QR code generator to create custom QR codes for URLs, text, email, and phone numbers. Download as PNG or SVG with no watermarks. No signup required.',
    h1: 'Free QR Code Generator — Online QR Code Maker & Creator Tool',
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Use our Markdown editor online to write and preview Markdown in real-time with live HTML rendering. This free MD editor lets you export as HTML instantly.',
    category: 'document',
    icon: 'NotebookPen',
    slug: 'markdown-editor',
    keywords: ['markdown editor online', 'markdown to html converter', 'online markdown viewer', 'markdown preview tool', 'md editor', 'markdown', 'editor', 'preview'],
    seoTitle: 'markdown editor online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free Markdown editor online with live preview. Write in Markdown and instantly see rendered HTML output. Export as HTML or copy formatted content. No signup required.',
    h1: 'Markdown Editor Online — Free Live Preview MD Editor & HTML Converter',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Use our image compressor online to reduce image file size without losing quality. This free tool compresses JPEG, PNG, and WebP images instantly in your browser.',
    category: 'document',
    icon: 'Images',
    slug: 'image-compressor',
    keywords: ['image compressor online', 'compress image online free', 'reduce image file size', 'jpeg compressor online', 'png compressor', 'image', 'compress', 'optimize', 'resize'],
    featured: true,
    seoTitle: 'image compressor online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free image compressor online to reduce JPEG, PNG, and WebP file sizes without losing quality. Instant compression in your browser with no upload limits. No signup required.',
    h1: 'Image Compressor Online — Free JPEG PNG Compressor & Optimizer',
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
    description: 'Use our unit converter online to instantly convert between length, weight, volume, temperature, and more. This free measurement unit converter is perfect for students.',
    category: 'calculator',
    icon: 'Ruler',
    slug: 'unit-converter',
    keywords: ['unit converter online', 'measurement unit converter', 'length converter online', 'weight converter online', 'metric converter', 'unit', 'convert', 'length', 'weight', 'temperature'],
    seoTitle: 'unit converter online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free unit converter online to instantly convert between length, weight, volume, temperature, and more. Fast and accurate conversions for students and professionals. No signup required.',
    h1: 'Unit Converter Online — Free Measurement & Metric Converter Tool',
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Use our loan calculator online to calculate monthly payments, total interest, and amortization schedules. This free personal loan calculator helps you plan any loan.',
    category: 'calculator',
    icon: 'DollarSign',
    slug: 'loan-calculator',
    keywords: ['loan calculator online', 'personal loan calculator', 'emi calculator', 'loan payment calculator', 'loan interest calculator', 'loan', 'calculate', 'payment', 'interest'],
    seoTitle: 'loan calculator online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free loan calculator online to estimate monthly payments, total interest, and full amortization schedules for any loan amount, rate, and term. No signup required.',
    h1: 'Loan Calculator Online — Free Personal Loan & EMI Calculator',
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Use our percentage calculator online to instantly calculate percentages, increases, decreases, and ratios. This free percent calculator handles all your percentage math.',
    category: 'calculator',
    icon: 'Percent',
    slug: 'percentage-calculator',
    keywords: ['percentage calculator', 'percent calculator online', 'calculate percentage of a number', 'what percent of', 'percentage calculator', 'percent calculator'],
    seoTitle: 'percentage calculator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free percentage calculator online to instantly find percentage increases, decreases, ratios, and reverse values. Fast and accurate for shopping, tips, and business. No signup required.',
    h1: 'Percentage Calculator Online — Free Percent Calculator Tool',
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Use our mortgage calculator to instantly estimate monthly payments, compare loan options, and view amortization schedules. This free home loan calculator helps you plan.',
    category: 'calculator',
    icon: 'Home',
    slug: 'mortgage-calculator',
    keywords: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment calculator', 'mortgage payment estimator', 'mortgage', 'calculate', 'loan', 'payment'],
    seoTitle: 'mortgage calculator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free mortgage calculator to estimate monthly payments, compare loan options, and view full amortization schedules. Plan your home purchase with confidence. No signup required.',
    h1: 'Mortgage Calculator Online — Free Home Loan & Payment Estimator',
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Use our age calculator to instantly find your exact age in years, months, and days from your date of birth. This free age calculator from date of birth works instantly.',
    category: 'calculator',
    icon: 'Calendar',
    slug: 'age-calculator',
    keywords: ['age calculator', 'age calculator from date of birth', 'how old am i calculator', 'birthday age calculator', 'age', 'date', 'calculate', 'birthday'],
    seoTitle: 'age calculator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free age calculator to instantly calculate your exact age in years, months, and days from your date of birth. Find out how old you are or calculate time between dates. No signup required.',
    h1: 'Age Calculator Online — Free Age from Date of Birth Calculator',
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Use our BMI calculator to instantly calculate your Body Mass Index using metric or imperial units. This free body mass index calculator shows your health category and ideal weight range.',
    category: 'calculator',
    icon: 'Activity',
    slug: 'bmi-calculator',
    keywords: ['bmi calculator', 'body mass index calculator', 'bmi calculator for men', 'bmi calculator for women', 'bmi chart', 'bmi', 'health', 'weight', 'height'],
    seoTitle: 'bmi calculator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free BMI calculator to instantly calculate your Body Mass Index using metric or imperial units. Find out if you\'re underweight, healthy, or overweight with ideal weight range. No signup required.',
    h1: 'BMI Calculator Online — Free Body Mass Index Calculator Tool',
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Use our discount calculator to instantly calculate sale prices, savings, and final costs. This free percent off calculator handles percentage or fixed amount discounts.',
    category: 'calculator',
    icon: 'Tag',
    slug: 'discount-calculator',
    keywords: ['discount calculator', 'percent off calculator', 'sale price calculator', 'discount price calculator', 'percentage discount', 'discount', 'sale', 'price', 'calculate'],
    seoTitle: 'discount calculator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free discount calculator to instantly find sale prices and savings. Calculate percentage off or fixed amount discounts and see exactly what you save. Perfect for shopping. No signup required.',
    h1: 'Discount Calculator Online — Free Percent Off & Sale Price Calculator',
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Use our tip calculator to instantly calculate tip amounts, split bills, and per-person totals. This free gratuity calculator helps you decide how much to tip at restaurants.',
    category: 'calculator',
    icon: 'Wallet',
    slug: 'tip-calculator',
    keywords: ['tip calculator', 'gratuity calculator', 'how much to tip calculator', 'restaurant tip calculator', 'tip amount', 'tip', 'bill', 'split', 'calculate'],
    seoTitle: 'tip calculator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free tip calculator to instantly calculate tip amounts, split bills among friends, and see per-person totals. Perfect for restaurants, taxis, and group dining. No signup required.',
    h1: 'Tip Calculator Online — Free Gratuity & Restaurant Tip Calculator',
  },

  // Pixels to Inches Converter Cluster (6)
  {
    id: 'pixels-to-inches',
    name: 'Pixels to Inches Converter',
    description: 'Instantly convert between pixels and inches with support for 72, 96, 150, 300 DPI and custom resolution. Free bidirectional converter for print, web, and design.',
    category: 'calculator',
    icon: 'Ruler',
    slug: 'pixels-to-inches',
    keywords: ['pixels to inches', 'px to inches converter', 'pixels to inches calculator', 'convert pixels to inches', 'pixel to inch converter', 'pixels to inches online', 'pixels to the inch', 'convert pixels in inches', 'pixels and inches', 'inch in px', 'inch to px', 'pixel sizes in inches', 'pixel to inches converter', 'pixel to inch', 'pixel to inch conversion', 'inches to pixels converter', 'pixels to inches converter', 'pixels', 'inches', 'dpi', 'converter', 'print', 'resolution'],
    featured: true,
    seoTitle: 'pixels to inches — Free Online Converter | OnlineFreeTools',
    seoDescription: 'Use our free pixels to inches converter to instantly convert between px and inches. Supports 72, 96, 150, 300 DPI with custom resolution. No signup required.',
    h1: 'Pixels to Inches Converter — Free PX to Inches Calculator',
  },
  {
    id: 'px-to-inches',
    name: 'PX to Inches Converter',
    description: 'Convert px to inches instantly with our free online converter. Supports multiple DPI presets and custom resolution for accurate print and screen measurements.',
    category: 'calculator',
    icon: 'Maximize',
    slug: 'px-to-inches',
    keywords: ['px to inches', 'convert px to inches', 'px to inches converter', 'pixels to inches', 'px to in', 'pixels', 'inches', 'converter'],
    seoTitle: 'px to inches — Free Online Converter | OnlineFreeTools',
    seoDescription: 'Convert px to inches instantly with our free online converter. Supports 72, 96, 150, 300 DPI and custom resolution for accurate print and screen measurements. No signup required.',
    h1: 'PX to Inches Converter — Free Online Pixels to Inches Tool',
  },
  {
    id: 'inches-to-px',
    name: 'Inches to PX Converter',
    description: 'Convert inches to pixels (px) instantly with our free online converter. Supports any DPI setting for print design, digital art, and screen resolution.',
    category: 'calculator',
    icon: 'Minimize',
    slug: 'inches-to-px',
    keywords: ['inches to px', 'convert inches to pixels', 'inches to pixels converter', 'inch to px', 'inches to pixels calculator', 'inches', 'pixels', 'converter', 'dpi'],
    seoTitle: 'inches to px — Free Online Converter | OnlineFreeTools',
    seoDescription: 'Convert inches to pixels (px) instantly with our free online converter. Supports any DPI setting for print design, digital art, and screen resolution.',
    h1: 'Inches to PX Converter — Free Online Inches to Pixels Tool',
  },


  // Utility Tools (8)
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Use our password generator online to create strong, random, secure passwords instantly. This free random password generator lets you customize length and character types.',
    category: 'utility',
    icon: 'Key',
    slug: 'password-generator',
    keywords: ['password generator online', 'random password generator', 'strong password generator', 'secure password generator free', 'password', 'generate', 'secure', 'random'],
    seoTitle: 'password generator online — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free password generator online to create strong, random, and secure passwords with custom length and character sets. Browser-based — passwords never leave your device. No signup required.',
    h1: 'Password Generator Online — Free Random Strong Password Generator',
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
    description: 'Use our Morse code translator to instantly convert text to Morse code and decode Morse code back to text. This free Morse code decoder and generator is easy to use.',
    category: 'utility',
    icon: 'Radio',
    slug: 'morse-code-translator',
    keywords: ['morse code translator', 'text to morse code converter', 'morse code decoder', 'morse code generator', 'morse translator', 'morse', 'code', 'translate', 'text'],
    seoTitle: 'morse code translator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free Morse code translator to instantly convert text to Morse code or decode Morse code back to text. Learn telegraphy with this easy-to-use Morse code decoder and generator. No signup required.',
    h1: 'Morse Code Translator Online — Free Text to Morse Code Converter & Decoder',
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
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate SEO-friendly URL slugs from titles and text with bulk mode, stop-word removal, accent handling, and customizable options.',
    category: 'utility',
    icon: 'Link2',
    slug: 'slug-generator',
    keywords: ['slug generator', 'url slug generator', 'seo slug generator', 'text to slug converter', 'generate slug from title', 'string to slug', 'slugify text online', 'permalink generator', 'convert title to url slug'],
    featured: true,
    seoTitle: 'slug generator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free slug generator to instantly create SEO-friendly URL slugs from titles and text. Bulk mode, stop-word removal, accent handling, and live preview. No signup required.',
    h1: 'Slug Generator — Free SEO-Friendly URL Slug Tool',
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
