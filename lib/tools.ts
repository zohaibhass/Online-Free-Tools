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
  'cron-expression-generator': 'build cron expressions from plain English, visual selectors, or pasted expressions with live run-time preview',
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
  'cron-expression-generator': 'generate a cron expression',
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
  'text-to-html': 'Text to HTML converts plain text into a complete HTML document for web developers, content managers, and bloggers. Type or paste your text using simple conventions — lines starting with # become heading tags (h1 through h6 based on the number of hashes), and blank lines separate paragraphs into <p> tags. Click "Convert to HTML" to generate a full document with DOCTYPE, head, charset, and body markup. Copy the output to paste into your website, CMS, or email template. The tool handles paragraph separation and heading detection automatically, so you can quickly turn rough notes into publishable HTML without writing any markup by hand.',
  'unit-converter': 'Unit Converter handles conversions across length, weight, volume, and temperature for students, engineers, and international professionals. Quick, accurate conversions for homework, recipes, science projects, and working across measurement systems globally.',
  'loan-calculator': 'Loan Calculator helps borrowers, financial planners, and students understand monthly payments, total interest, and payoff schedules. Input loan amount, rate, and term to see exact payments and plan finances. Perfect for mortgages, car loans, and personal loans.',
  'percentage-calculator': 'Percentage Calculator quickly answers percentage questions for students, shoppers, and business professionals. Calculate what percent one number is of another, find percentage increases and decreases, compare values with ratios, and work backwards using reverse percentage calculations.',
  'mortgage-calculator': 'Mortgage Calculator helps homebuyers, real estate agents, and financial advisors estimate monthly payments, compare loan options, and review amortization details. See total interest paid, down payment impact, loan-to-value, and how extra payments can shorten your loan term.',
  'age-calculator': 'Age Calculator determines your exact age in years, months, and days from any date of birth. Simply select your birth date and click Calculate Age to see a precise breakdown. The calculator handles month-length differences and leap years correctly, so the result is always accurate. Whether you are planning a birthday celebration, filling out a form that asks for your age, or just curious how many days until a milestone, this tool gives you an instant answer without any signup or installation. It works entirely in your browser, so your birth date never leaves your device. Students, parents, and anyone who needs a quick age check will find this calculator fast and reliable.',
  'bmi-calculator': 'BMI Calculator computes your Body Mass Index using either metric (cm/kg) or imperial (ft/in/lbs) measurements. Select your unit system, adjust the height and weight sliders, and click Calculate BMI to see your result. The tool displays your BMI value, assigns a health category (Underweight, Normal weight, Overweight, or Obese), and shows your healthy weight range for your height. A detailed insights section explains what each BMI category means and includes all four classification ranges. Whether you are tracking fitness goals, filling out a health form, or just curious about your BMI, this calculator gives you a clear, instant answer. It works entirely in your browser with no data sent to any server.',
  'discount-calculator': 'Discount Calculator figures out final prices, savings amounts, and discounted costs for shoppers and sales staff. Choose between percentage-based or fixed-amount discounts, select your currency from over 150 options, and use the quick preset buttons (10%, 20%, 30%, 50%, 70%) for fast calculations. The tool shows the final price, total savings, and the original price side by side, and you can copy the breakdown to your clipboard. Whether you are comparing sale deals at the store, setting up a promotion for your shop, or just double-checking a checkout total, this calculator gives you an instant, accurate answer without any signup.',
  'tip-calculator': 'Tip Calculator splits bills and calculates tips instantly for diners, servers, and group payments. Enter your bill amount, choose a currency from over 150 options, and pick a tip percentage using the quick preset buttons (10%, 15%, 18%, 20%, 25%) or the slider for custom values. The calculator shows the tip amount, total bill, and per-person cost when splitting among multiple people. A "Copy Results" button lets you grab the breakdown for easy sharing. Whether you are splitting a dinner check with friends, figuring out gratuity at a restaurant, or handling group travel expenses, this tool gives you accurate results in seconds without any signup or app download.',
  'password-generator': 'Password Generator creates strong, random passwords with customizable length and character types. Adjust the slider to set a password length from 4 to 64 characters, then toggle checkboxes for uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and symbols (!@#$...). Click Generate Password to create a new random password, and Copy to save it to your clipboard. All generation happens in your browser — no password data is ever sent to a server. Whether you are securing a new online account, rotating credentials for a work system, or creating test data for development, this tool gives you a strong, unique password in seconds.',
  'random-name-generator': 'Random Name Generator produces full names by combining first and last names from a curated list. Use the slider to choose how many names to generate — from 1 up to 50 at a time. Click Generate Names to create a new batch instantly. Each result is a randomly paired first and last name, useful as placeholder data, character names for fiction, usernames for test accounts, or sample entries for database testing. The tool is simple and fast: no signup, no configuration beyond the count slider, and all processing happens in your browser. Regenerate as many times as you need until you find names that fit your project.',
  'todo-list': 'Todo List is a browser-based task manager for students, professionals, and anyone organizing their day. Add tasks with a priority level (high, medium, or low) and an optional due date, then check them off as you complete them. The list supports filtering by All Tasks, Active, or Completed, and you can edit task text inline or delete tasks you no longer need. A Clear Completed button removes finished items in one click. Your tasks persist in your browser`s localStorage, so they are still there when you return. No account or installation is required — just open the page and start organizing your priorities.',
  'timer-stopwatch': 'Timer & Stopwatch provides a dual-mode time tracker for productivity, workouts, cooking, and any activity that needs precise timing. Switch between Stopwatch mode (which counts up from zero) and Timer mode (which counts down from a duration you set with the slider, up to 3600 seconds). Use the Start/Pause button to control the clock and Reset to return to the starting value. The display shows hours, minutes, and seconds in a clear monospace font. Whether you are timing a presentation, tracking exercise intervals, or counting down for a recipe, this tool gives you reliable, instant timing right in your browser with no downloads or accounts needed.',
  'dice-roller': 'Dice Roller is a 3D animated dice tool for tabletop gamers, probability students, and game designers. Roll 1 to 5 dice at once with any standard polyhedral sides (d4 through d100), watch realistic 3D dice tumble and land, then see each die result and the total instantly. Roll history is saved in your browser so you can track previous rolls across sessions. The DND dice roller mode covers d20 checks and saving throws just as easily as classic d6 board game rolls.',
  'coin-flipper': 'Coin Flipper is a 3D animated coin toss tool for making decisions, settling disputes, or testing probability. Flip 1, 3, or 5 coins at once with a realistic 3D spin animation. Track your streak, view heads/tails percentages, and toggle to Yes/No mode for quick binary decisions. History and stats are saved in your browser across sessions. Perfect for games, choosing between options, and fair decision-making.',
  'morse-code-translator': 'Morse Code Translator encodes and decodes Morse code for history enthusiasts, amateur radio operators, and curious learners. Convert text to dots and dashes or vice versa. Great for learning telegraphy and experimenting with alternative communication.',
  'pixels-to-inches': 'Pixels to Inches Converter is the go-to tool for designers, print professionals, and anyone who needs to convert between pixel dimensions and physical inch measurements. Unlike many converters that assume a fixed DPI, this tool lets you choose from common presets (72 DPI for web, 96 DPI for Windows screens, 150 DPI for draft print, 300 DPI for print quality) or enter any custom DPI. The bidirectional converter updates instantly as you type, with a handy Width × Height mode for dimension pairs. Whether you are sizing images for print layout, calculating screen dimensions, or working on a design project that crosses between digital and physical media, this converter gives you accurate results in real time.',
  'px-to-inches': 'PX to Inches Converter is a focused tool for designers and developers who need quick, accurate conversions from pixels to physical inches. Perfect for translating screen mockups into print-ready dimensions, this converter supports all major DPI settings including web standard (96 DPI) and print quality (300 DPI). The instant bidirectional calculation means you can work in either direction without clicking swap buttons — just type and convert.',
  'inches-to-px': 'Inches to PX Converter is designed for users who think in physical measurements first and need to translate them into pixel dimensions. Print designers, signage creators, and layout artists use this tool to convert real-world inch measurements into precise pixel values for digital production. With support for any DPI setting, you get accurate pixel outputs for screen, web, and print workflows.',
  'slug-generator': 'Slug Generator is a modern URL slug creation tool for content creators, SEO specialists, and web developers who need clean, SEO-friendly slugs from titles and text. Unlike basic converters that only lowercase and hyphenate, this tool handles accented characters (like é, ñ, ü), strips stop words, controls slug length, and converts bulk lists of titles in one pass. Whether you are writing a blog post, migrating a site, or setting up product pages, you get precise, readable slugs that follow current SEO best practices — hyphens, lowercase, and free of special characters.',
  'cron-expression-generator': 'Cron Expression Generator helps developers, system administrators, and DevOps engineers build cron expressions without memorizing syntax. Type a schedule in plain English like "every day at 3am," build it visually with selectors, or paste an existing expression to translate and validate it. The tool supports both standard Unix cron (5-field) and Quartz cron (6-7 field) formats, shows the next 5 run times, and includes ready-to-use presets for common schedules. All processing happens in your browser — no data is sent to any server.',
  'unit-calculator': 'Unit Calculator is a straightforward online calculator for quick arithmetic. Enter any math expression using numbers and operators (+, -, *, /, parentheses), then hit the equals button to get an instant result. The on-screen number pad lets you build expressions by tapping digits and operators, or you can type directly into the input field. Use the Clear button to reset and start a new calculation. Whether you are computing a quick total, checking a formula, or solving a multi-step expression, this browser-based calculator gives you an answer in seconds without installing software or creating an account.',
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
    input: 'Roll 3d6',
    output: 'Die 1: 4\nDie 2: 5\nDie 3: 3\nTotal: 12',
  },
  'coin-flipper': {
    input: 'Flip 1 coin',
    output: 'Result: Heads\nHeads: 52% \u2022 Tails: 48%',
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
  'cron-expression-generator': {
    input: '0 3 * * *',
    output: 'Runs at 3:00 AM every day',
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
          'JWTs are widely used in modern web applications, especially in APIs and microservices architectures. They are part of the OAuth 2.0 and OpenID Connect standards, making them the de facto standard for authentication tokens across the internet. Popular platforms like Google, GitHub, and Auth0 use JWTs to manage user sessions and permissions. You can use a free online JWT decoder to decode JWT tokens and inspect their structure without any software installation.',
        ],
      },
      {
        heading: 'When should you use the JWT Decoder?',
        paragraphs: [
          'Use the JWT Decoder when you receive an authentication token and need to inspect its contents. Developers commonly receive JWTs in API responses after login. By decoding the token, you can verify that the correct user information, permissions, and expiration date are embedded in the token without needing to check a database.',
          'Backend developers use the JWT Decoder to troubleshoot authentication issues. If a user is getting denied access or experiencing permission problems, you can decode their JWT to see what roles or claims are assigned to their account, which helps identify configuration errors or permission conflicts.',
          'Security engineers use the JWT Decoder to audit tokens and ensure they contain expected data. By regularly decoding JWTs in your system, you can verify that no sensitive data is being exposed, tokens expire at appropriate times, and user permissions are correctly assigned.',
          'Frontend developers use this tool to debug authentication flows. When integrating login systems or third-party authentication providers (like Google or GitHub), decoding the JWT helps confirm that user data is being received and stored correctly.',
          'Token validation and testing: Use the decoder to verify that tokens issued by your authentication server include all required claims. If you are writing tests for your auth system, decoding sample tokens helps confirm they are generated correctly. Whether you need an online JWT decoder for quick checks or a dedicated JWT token decoder for regular auditing, this free tool covers all your needs.',
        ],
      },
      {
        heading: 'How to use the JWT Decoder',
        paragraphs: [
          'Step 1: Copy your JWT from the Authorization header, response payload, or local storage where it is stored. A complete JWT looks like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U (three parts separated by dots).',
          'Step 2: Paste the JWT into the decoder input field. This free online JWT decoder will immediately parse the three components (header, payload, and signature) and display them in readable JSON format.',
          'Step 3: Review the Header section to see the algorithm used for signing (typically HS256, RS256, or similar). This tells you how the token was cryptographically signed.',
          'Step 4: Examine the Payload section, which contains the claims (user data). This might include user ID, username, email, role, permissions, and the expiration time (exp claim). Verify that all expected fields are present and have correct values.',
          'Step 5: Note the Signature section. The decoder displays the signature but cannot verify it without access to the signing key (this is intentional for security). If you have the signing key, you can use other tools or libraries to verify the signature authenticity.',
          'Step 6: Check the expiration time. Look for the "exp" claim in the payload, which is a Unix timestamp indicating when the token expires. If the current time is after this timestamp, the token has expired and is no longer valid. Use this online JWT decoder to quickly inspect expiration and other claims.',
        ],
      },
      {
        heading: 'How to Validate a JWT Token',
        paragraphs: [
          'Validation goes beyond simply decoding a JWT token. While decoding lets you view the contents, validation confirms that the token is authentic, hasn\'t expired, and was issued by a trusted source. A proper JWT validation involves checking several critical fields in the payload.',
          'Check the expiration time (exp claim): This is the most common validation step. Every JWT should include an "exp" claim that specifies when the token expires. If the current Unix timestamp exceeds this value, the token is expired and should be rejected. Use the JWT decoder to view the exp claim in the payload section.',
          'Verify the issuer (iss claim): The "iss" claim identifies who issued the token. Your application should only accept tokens from known, trusted issuers. For example, if your app uses Google for authentication, verify that the iss matches Google\'s issuer URL.',
          'Validate the audience (aud claim): The "aud" claim specifies the intended recipient of the token. If your API is the audience, verify that the aud field matches your application\'s identifier. This prevents tokens intended for one service from being used on another.',
          'Check the not-before time (nbf claim): Some tokens include an "nbf" claim that specifies when the token becomes valid. If the current time is before this timestamp, the token should not be accepted yet.',
          'Signature verification: For complete validation, you need the signing key (secret or public key). The decoder displays the signature but cannot verify it without the key. In your application code, use a JWT library to verify the signature using the appropriate algorithm and key. Tokens with invalid signatures should always be rejected.',
          'By validating all these claims, you ensure that only authentic, authorized, and timely tokens access your application.',
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
    { question: 'How do I decode a JWT without sending it to a server?', answer: 'This JWT decoder runs entirely in your browser. The token is processed locally on your device and never transmitted to any server, keeping your authentication data private and secure.' },
    { question: 'Can I decode an expired JWT token?', answer: 'Yes, you can still decode an expired JWT token to inspect its contents. The decoder will show you the header, payload, and signature regardless of expiration status. Look for the "exp" claim to see the expiration timestamp.' },
    { question: 'What does the "alg" field mean in a JWT header?', answer: 'The "alg" (algorithm) field in the JWT header specifies the cryptographic algorithm used to sign the token, such as HS256, RS256, or ES256. This tells anyone verifying the token which algorithm to use. Never accept tokens with "alg: none" in production.' },
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
        heading: 'How to hash a file online',
        paragraphs: [
          'Switch to the File tab above, then click the upload area or drag a file into it. The tool reads the file entirely in your browser using the FileReader API, computes its SHA-256 hash with the Web Crypto API, and never sends the file to any server. This keeps the same "your data never leaves your device" guarantee as the text hashing mode.',
          'The most common use case for file hashing is verifying a downloaded file against a checksum published by the file source. After downloading software, an ISO image, or any important file, hash it with this tool and compare the result to the publisher-provided hash. If they match character-for-character, the file was not corrupted or tampered with during download.',
          'File names and sizes are displayed alongside the hash so you can confirm you hashed the right file. For very large files (over 100 MB), browser-based hashing may be slow or use significant memory — a warning will appear before processing begins.',
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
    { question: 'Can I hash a file, not just text?', answer: 'Yes — switch to File mode above, select or drag in a file, and the tool computes its hash directly in your browser without uploading it anywhere. This works well for verifying a downloaded file\'s checksum against one published by the file\'s source.' },
    { question: 'Can MD5 hashes be decrypted?', answer: 'No — MD5 and other hash functions are one-way by design; there\'s no mathematical way to reverse a hash back into its original input. Tools that claim to "decrypt" MD5 hashes are actually doing something different: they check the hash against a huge precomputed lookup table (sometimes called a rainbow table) of common passwords, dictionary words, or previously seen inputs. If your original input matches something in that table, the tool can show you the match — but this only works for common or weak inputs, not for genuinely random or unique data, and it isn\'t decryption in any real sense.' },
    { question: 'What is a "hash cracker" and does this tool include one?', answer: 'A hash cracker attempts to find an input that produces a given hash, typically by hashing huge lists of common passwords or dictionary words and checking for a match (or by brute-force guessing). This tool intentionally does not include cracking/lookup functionality — doing so would require a server-side database of precomputed hashes, which conflicts with this tool\'s fully browser-based, nothing-leaves-your-device design. This tool is built for generating and verifying hashes, not attempting to reverse them.' },
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
          'URL encoding (also called percent encoding or urlencode) is a method of encoding special characters in URLs so they can be safely transmitted over the internet. URLs can only contain certain characters from the ASCII character set, including letters, digits, and a few special characters like - . _ ~. Any other character, including spaces, accents, and symbols, must be encoded as a percent sign (%) followed by its hexadecimal ASCII value. For example, a space is encoded as %20, an ampersand (&) is %26, and a forward slash (/) is %2F.',
          'URL encoding is essential for query parameters, form submissions, and API calls. When you submit a form or click a link with parameters, the browser automatically encodes the values. However, if you are manually constructing URLs or working with APIs, understanding URL encoding helps you correctly format data.',
          'URL decoding is the reverse process: converting percent-encoded characters back to their original form. For example, %3Fquery%3Dvalue decodes to ?query=value. This tool handles both encoding and url decode, making it easy to work with URLs programmatically.',
        ],
      },
      {
        heading: 'When should you use the URL Encoder/Decoder?',
        paragraphs: [
          'Creating API query parameters: When building API requests with query strings, you must encode special characters in parameter values. For example, if a search query contains spaces or punctuation, encoding ensures the URL is valid.',
          'Sharing URLs with special characters: If you have a URL with spaces, accents, or other special characters, you can convert url to a safe, shareable format by encoding it — the result is a url encoded string safe to use in email or messaging apps where URL parsing might fail.',
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
    faq: [
      { question: 'What is the Random Name Generator used for?', answer: 'The Random Name Generator creates character names, team names, project codenames, and other creative names on demand. It is designed for writers building fiction characters, game developers populating worlds, and anyone who needs quick naming inspiration without the mental overhead of inventing names from scratch.' },
      { question: 'Do I need an account to use this tool?', answer: 'No, the Random Name Generator works entirely in your browser without requiring an account, login, or any personal information. You can start generating names immediately on any device with a web browser.' },
      { question: 'Can I generate names in different styles or themes?', answer: 'Yes, the tool supports different name styles and themes so you can tailor results to your project. Whether you need fantasy names for a medieval story, modern names for realistic fiction, or playful names for a game, the available options let you narrow down the tone and feel of the output.' },
      { question: 'How many names can I generate at once?', answer: 'You can generate multiple names in a single click and keep regenerating until you find names you like. There is no strict limit on how many times you can use the tool, so feel free to run it as many times as needed to find the perfect name.' },
      { question: 'Are the generated names unique every time?', answer: 'The tool uses randomized algorithms to produce different combinations each time you click generate. While it is possible to see similar names on rare occasions, the vast majority of outputs will be unique and fresh, giving you a wide pool of options to choose from.' },
      { question: 'Can I use generated names for commercial projects?', answer: 'Yes, the names produced by this tool are randomly generated and free to use for any purpose, including commercial projects, published writing, games, and branding. There are no licensing restrictions on the output.' },
      { question: 'Does the tool support first and last name combinations?', answer: 'Yes, the generator can produce both first names and last names, and it can combine them into full character names. This is especially useful for fiction writers and game designers who need complete names for their characters rather than just first names.' },
      { question: 'Is my data stored or tracked when I use this tool?', answer: 'No, all name generation happens locally in your browser. The tool does not store the names you generate or track your usage in any way. Your creative work remains private and is never sent to a server.' },
      { question: 'Can I use this for team names or group aliases?', answer: 'Absolutely. The Random Name Generator is great for creating team names, group aliases, guild names, or project codenames. The generated names are often catchy and memorable, making them a solid starting point for any collaborative naming exercise.' },
      { question: 'What if I do not like the names that are generated?', answer: 'Simply click the generate button again to get a fresh batch of names. You can regenerate as many times as you need. If you like a name but want to tweak it, use the generated result as a starting point and modify the spelling or combine elements from different names.' },
      { question: 'Can the tool generate names for non-English languages?', answer: 'The tool primarily focuses on English-friendly names, but many of the generated names have diverse cultural influences. For specialized foreign-language names, consider using the generated results as a phonetic starting point and adapting them to your desired language or setting.' },
      { question: 'How do I get the best results from the generator?', answer: 'Think about the context and tone you need before generating. If you are writing a fantasy novel, consider the setting and culture of your world. Generate several batches, mix and match elements from different results, and do not be afraid to modify the output slightly to better fit your project.' },
    ],
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
    faq: [
      { question: 'What is the Todo List tool?', answer: 'The Todo List is a simple, browser-based task manager that lets you add tasks, mark them complete, and organize your work by priority. It requires no account or installation, and it runs entirely in your browser so you can start managing tasks immediately.' },
      { question: 'Is my task data saved or private?', answer: 'All task data is stored locally in your browser and is never sent to any server. This means your tasks are completely private, but it also means the data will be lost if you clear your browser cache or switch to a different browser or device.' },
      { question: 'Can I use this tool on my phone?', answer: 'Yes, the Todo List is responsive and works on mobile browsers. You can add, check off, and manage tasks from your phone just as you would on a desktop, making it a handy option for on-the-go task management.' },
      { question: 'How do I organize tasks by priority?', answer: 'When adding or editing a task, use the priority option to label items as high, medium, or low priority. You can then arrange your list so that the most important tasks appear at the top, helping you focus on what matters most during your workday.' },
      { question: 'Can I set due dates or reminders?', answer: 'The Todo List focuses on simplicity and lightweight task tracking. While it does not include built-in due dates or reminders, you can combine it with the Timer & Stopwatch tool to set time-boxed work sessions for individual tasks.' },
      { question: 'Does the tool support categories or tags?', answer: 'The tool is designed for straightforward list management. You can use naming conventions or prefixes in your task descriptions to visually group related items. For more complex organization needs, consider exporting tasks to a dedicated project management tool.' },
      { question: 'What happens if I accidentally close the browser?', answer: 'Because your tasks are stored in the browser, they will still be there when you reopen the page as long as you have not cleared your browser data. Simply navigate back to the Todo List page and your tasks will reappear.' },
      { question: 'Can I share my todo list with others?', answer: 'The current version of the tool is designed for personal use and does not include built-in sharing features. To share tasks with collaborators, you can copy the list into a shared document, spreadsheet, or use the Markdown Editor to create a shareable task file.' },
      { question: 'Is there a limit to how many tasks I can add?', answer: 'There is no hard limit on the number of tasks you can create. However, keeping your list focused and manageable is a best practice. If your list grows very long, consider breaking it into sub-lists or archiving completed tasks to maintain clarity.' },
      { question: 'Can I reorder tasks after adding them?', answer: 'Yes, you can reorder tasks to reflect changing priorities. Drag or move items up and down the list so that your most urgent or important tasks are always visible at the top. This helps you stay focused on what needs attention first.' },
      { question: 'How is this different from a notes app?', answer: 'Unlike a general notes app, the Todo List is specifically designed for task management. It provides structured task entry, completion tracking, and priority organization, making it more effective for action-oriented workflows than freeform note-taking.' },
      { question: 'Can I use it for team projects?', answer: 'The tool works well for individual task tracking. For team projects, you can use it as a personal complement to your team workflow by tracking your individual action items. Copy team tasks from project management tools into the list for focused daily execution.' },
    ],
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
    faq: [
      { question: 'What is the Timer & Stopwatch tool?', answer: 'The Timer & Stopwatch is a dual-purpose browser tool that lets you count down from a set duration or measure elapsed time. It is designed for productivity, workouts, cooking, presentations, and any activity that benefits from precise, accessible timing without needing a separate app.' },
      { question: 'How does the Pomodoro timer work?', answer: 'The Pomodoro technique uses 25-minute work intervals followed by short 5-minute breaks. Set the timer for 25 minutes, work on a single task until the alarm sounds, then take a break. After completing several Pomodoros, take a longer break of 15 to 30 minutes to recharge before starting the next set.' },
      { question: 'Can I pause and resume the timer?', answer: 'Yes, both the countdown timer and the stopwatch support pause and resume. If you are interrupted during a work session, cooking, or workout, you can pause the timer and resume exactly where you left off without losing any elapsed time or resetting your countdown.' },
      { question: 'Does the tool play a sound when the timer ends?', answer: 'Yes, the tool includes optional sound alerts that notify you when the countdown reaches zero. Make sure your device volume is turned on so you can hear the alert even if you are not watching the screen closely.' },
      { question: 'Is my timing data stored or tracked?', answer: 'No, all timing data is processed in your browser and is not sent to any server. The tool does not log your sessions or store history, so your usage remains completely private.' },
      { question: 'Can I use the stopwatch for workouts?', answer: 'Absolutely. The stopwatch mode is ideal for timing exercise sets, laps, or entire workout sessions. Start the stopwatch when you begin an exercise and stop it when you finish to get an accurate duration for each round or session.' },
      { question: 'How accurate is the browser-based timer?', answer: 'Modern browsers provide highly accurate timing through the JavaScript timing API, which is accurate to the millisecond. For most personal and professional use cases, a browser-based timer is more than sufficient for measuring and controlling time intervals.' },
      { question: 'Does the timer keep running if I switch tabs?', answer: 'Yes, the timer continues running in the background even if you switch to another browser tab. The countdown or stopwatch will keep ticking, and the sound alert will play when the timer reaches zero regardless of which tab is active.' },
      { question: 'Can I set multiple timers at once?', answer: 'The current version supports one active timer or stopwatch at a time. If you need multiple concurrent timers, consider opening the tool in separate browser windows or tabs and running different countdowns independently.' },
      { question: 'What time formats are supported?', answer: 'The timer supports hours, minutes, and seconds, giving you flexibility for short tasks like cooking and long sessions like study blocks. You can set timers ranging from a few seconds to several hours depending on your needs.' },
      { question: 'Can I use it for cooking?', answer: 'Yes, the countdown timer is perfect for cooking. Set the timer for your recipe duration, and the tool will alert you when the time is up. It is especially useful for tracking baking times, boiling durations, or multi-step cooking processes.' },
      { question: 'Is there a lap function on the stopwatch?', answer: 'The stopwatch provides accurate elapsed time tracking. While lap splitting is not a core feature, you can note the elapsed time at key intervals manually. For detailed lap tracking, consider using the stopwatch alongside a simple notes tool.' },
    ],
  },

  'dice-roller': {
    sections: [
      {
        heading: 'What is a dice roller tool?',
        paragraphs: [
          'A dice roller is a 3D animated tool that simulates rolling one or more polyhedral dice with any standard number of sides \u2014 d4, d6, d8, d10, d12, d20, or d100. It is designed for tabletop gamers, probability students, and anyone who needs quick, fair random rolls without physical dice.',
          'The tool renders each die as a realistic 3D object that tumbles and lands on the correct face, so the roll feels visually satisfying and easy to read at a glance. You can roll up to 5 dice at once, and each die result is shown individually alongside the total.',
          'Roll history is saved locally in your browser, so you can review your last 10 rolls across sessions without needing to write anything down. Use the copy button to grab formatted results (e.g. "\uD83C\uDFB2 3d6 = 4 + 5 + 3 = 12") for pasting into chat, notes, or a VTT.',
        ],
      },
      {
        heading: 'When should you use the Dice Roller?',
        paragraphs: [
          'Use the dice roller during tabletop RPG sessions to resolve attacks, skill checks, saving throws, and other chance-based actions. The d20 button is one click away for D&D ability checks and saving throws.',
          'Use it for board games that require dice rolls, especially when you don\u2019t have the right physical dice available. The slider lets you set 1\u20135 dice and the button grid covers every standard polyhedral type.',
          'Use it for probability experiments, statistics homework, or math practice when you need repeated random rolls. The roll history makes it easy to collect and review multiple outcomes.',
          'Use it to make quick decisions when you want a fair random result with multiple weighted outcomes.',
        ],
      },
      {
        heading: 'How to use the Dice Roller',
        paragraphs: [
          'Step 1: Set the number of dice using the slider (1 to 5 dice).',
          'Step 2: Choose the number of sides by clicking one of the side buttons (d4, d6, d8, d10, d12, d20, or d100).',
          'Step 3: Click "Roll" and watch the 3D dice animate. Once they land, each die face shows its result and the total is displayed below.',
          'Step 4: Use the copy button to grab a formatted string of your results, or click clear to reset the display. Previous rolls appear in the history section below the controls.',
        ],
      },
      {
        heading: 'Gaming and probability tips',
        paragraphs: [
          'For D&D and other RPGs, select d20 for ability checks and attack rolls, d6 or d8 for damage, and d100 for percentile checks. All standard polyhedral dice types are available in one click.',
          'To simulate advantage or disadvantage, roll twice and take the higher or lower result accordingly. This tool can simulate those mechanics quickly.',
          'Use the roll history to track outcomes over multiple rounds. Seeing your last several rolls in one place helps with strategy and bookkeeping.',
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
    faq: [
      {
        question: 'Can I use this as a DND dice roller?',
        answer: 'Yes \u2014 select d20 from the sides button for ability checks, saving throws, and attack rolls, or roll multiple dice at once (e.g. 2d6 for damage) using the dice count slider. All standard D&D dice types (d4, d6, d8, d10, d12, d20, d100) are supported.',
      },
      {
        question: 'Does the dice animation affect the result?',
        answer: 'No. The 3D animation is purely visual. The random result is determined instantly by the browser\'s random number generator, and the dice faces are simply positioned to show that result after the animation completes.',
      },
      {
        question: 'Is my roll history saved?',
        answer: 'Yes. Your last 10 rolls are saved in your browser\'s local storage so you can review them across sessions. History is stored only on your device and is never sent to any server.',
      },
      {
        question: 'How do I copy my roll results?',
        answer: 'Click the copy button after rolling. It copies a formatted string like "\uD83C\uDFB2 3d6 = 4 + 5 + 3 = 12" to your clipboard, which you can paste into chat, notes, or a virtual tabletop.',
      },
      {
        question: 'Is this tool free?',
        answer: 'Yes. Dice Roller is free to use with no signup required.',
      },
    ],
  },

  'coin-flipper': {
    sections: [
      {
        heading: 'What is the Coin Flipper tool?',
        paragraphs: [
          'The Coin Flipper is a 3D animated tool that simulates a fair coin toss for making quick decisions, settling disputes, or testing probability. It generates either Heads or Tails with equal likelihood, just like a real coin flip, with a realistic 3D spin animation.',
          'Flip 1, 3, or 5 coins at once \u2014 useful for team selection, probability experiments, or group decisions where you need multiple independent flips in one action. The tool tracks your streak (consecutive same-result flips) and shows heads/tails percentages so you can see the distribution over time.',
          'Toggle to Yes/No mode to relabel the outcomes as "Yes" and "No" instead of "Heads" and "Tails", which is handy for quick binary decisions. Press the spacebar to flip without clicking. All stats, history, and your Yes/No preference are saved in your browser across sessions.',
        ],
      },
      {
        heading: 'When should you use the Coin Flipper?',
        paragraphs: [
          'Use it when you want a quick yes/no decision or need to choose between two equally valid options. Toggle to Yes/No mode for a visual match to the decision type.',
          'Use it for game mechanics that require a coin toss, such as determining the starting player or resolving binary outcomes. Flip multiple coins at once for faster setup.',
          'Use it for probability demonstrations or classroom activities that explore randomness and fairness. The percentage stats and streak tracker make distribution patterns easy to observe.',
          'Use it during meetings or group decisions when a neutral, impartial method is needed to break ties. Press spacebar to flip quickly without moving your hands from the keyboard.',
        ],
      },
      {
        heading: 'How to use the Coin Flipper',
        paragraphs: [
          'Step 1: Open the Coin Flipper in your browser. No preparation needed \u2014 just click the flip button or press spacebar.',
          'Step 2: Choose how many coins to flip (1, 3, or 5) using the coin count buttons, then click "Flip" or press spacebar. A 3D coin spins and lands on Heads or Tails.',
          'Step 3: View the result, your current streak, and the heads/tails percentage breakdown. Use the copy button to grab the result to your clipboard.',
          'Step 4: Repeat as often as needed. Each flip is independent with a 50/50 chance. Toggle "Switch to Yes/No Mode" to relabel outcomes as Yes/No instead of Heads/Tails.',
        ],
      },
      {
        heading: 'Fairness and probability',
        paragraphs: [
          'Each flip is independent, which means previous results do not affect future flips. The streak tracker shows your current consecutive run, but a streak of heads or tails is normal in random sequences.',
          'The percentage stats update in real time as you flip. Over many flips the distribution should approach 50/50, which is a good way to verify fairness in a classroom or experiment setting.',
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
    faq: [
      {
        question: 'Can I use this as a yes or no decision maker?',
        answer: 'Yes \u2014 click "Switch to Yes / No Mode" to relabel the outcomes as "Yes" and "No" instead of "Heads" and "Tails". The underlying random logic is identical, so it works perfectly for quick binary decisions.',
      },
      {
        question: 'Can I flip multiple coins at once?',
        answer: 'Yes \u2014 choose 1, 3, or 5 coins using the coin count buttons before flipping. All coins flip simultaneously, and each one lands independently on Heads or Tails.',
      },
      {
        question: 'What is the streak tracker?',
        answer: 'The streak tracker shows how many consecutive flips have landed on the same result (e.g. 5 heads in a row) and your all-time best streak. It updates automatically with each flip.',
      },
      {
        question: 'Are my flip stats saved?',
        answer: 'Yes. Your stats (heads/tails count), streak, history, and Yes/No preference are saved in your browser\'s local storage. They persist across sessions but are never sent to any server.',
      },
      {
        question: 'Is this tool free?',
        answer: 'Yes. Coin Flipper is free to use with no signup required.',
      },
    ],
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
    faq: [
      { question: 'What is the Morse Code Translator?', answer: 'The Morse Code Translator is a browser-based tool that converts plain text into Morse code and decodes Morse code back into readable text. It supports letters, numbers, and common punctuation, making it a versatile tool for learning telegraphy, building puzzles, and exploring alternative communication methods.' },
      { question: 'How do I encode text into Morse code?', answer: 'Type or paste your plain text into the input field and select the encode option. The tool will instantly convert your letters, numbers, and punctuation into the corresponding dot-and-dash patterns. You can then copy the Morse output for use in messages, art, or learning exercises.' },
      { question: 'How do I decode Morse code back to text?', answer: 'Paste your Morse code (dots and dashes) into the input field and choose the decode option. The tool will translate the patterns back into readable letters and numbers. Make sure your Morse code uses standard spacing between letters and words for the most accurate decoding.' },
      { question: 'Does the tool support numbers and punctuation?', answer: 'Yes, the translator handles the full standard Morse alphabet, which includes all 26 English letters, digits 0 through 9, and common punctuation marks such as periods, commas, and question marks. This ensures you can encode and decode complete messages, not just simple words.' },
      { question: 'Is Morse code still used today?', answer: 'Morse code remains in active use by amateur radio operators, maritime communication systems, and certain emergency signaling situations. It is also popular in hobbyist projects, escape rooms, educational demonstrations, and creative art installations where minimal, universal signaling is valued.' },
      { question: 'What is the standard spacing for Morse code?', answer: 'In standard Morse code, a short gap separates individual elements (dots and dashes) within a letter, a medium gap separates letters, and a longer gap separates words. Proper spacing is critical for accurate decoding, so make sure your Morse code input uses consistent gaps between letters and words.' },
      { question: 'Is this tool good for learning Morse code?', answer: 'Yes, the tool is an excellent learning aid. You can encode messages to study the dot-and-dash patterns for each letter, then practice decoding by hand before checking your answers. Regular use builds recognition speed and helps you internalize the Morse alphabet.' },
      { question: 'Can I use this for ham radio or amateur radio?', answer: 'Absolutely. The Morse Code Translator is a handy reference for ham radio operators who want to quickly encode or decode messages. It is also useful for practicing CW (continuous wave) communication and verifying transmissions during on-air practice sessions.' },
      { question: 'Is my message data kept private?', answer: 'Yes, all encoding and decoding happens entirely in your browser. No text or Morse code is sent to any external server, so your messages remain completely private. This makes it safe to use for personal notes, puzzles, or any sensitive content.' },
      { question: 'What is the SOS signal in Morse code?', answer: 'The universal distress signal SOS is represented in Morse code as three dots, three dashes, and three dots (... --- ...). This pattern was chosen for its simplicity and instant recognizability. You can use the translator to encode SOS and other emergency signals for educational purposes.' },
      { question: 'Can I use Morse code for creative projects?', answer: 'Morse code is popular for jewelry, tattoos, artwork, and secret messages in creative writing. Use the translator to convert your message into dots and dashes, then incorporate the pattern into your design. The tool makes it easy to experiment with different messages before finalizing your creative output.' },
      { question: 'How fast can I learn Morse code with this tool?', answer: 'Learning speed varies by individual, but consistent daily practice with the translator can help you recognize common letters within a few weeks. Start with the most frequent letters like E, T, A, N, and I, then gradually expand. Using the tool to encode and decode short messages regularly builds both recognition speed and muscle memory.' },
    ],
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
    faq: [
      { question: 'What is the Unit Calculator?', answer: 'The Unit Calculator is a browser-based tool that solves mathematical formulas involving units of measurement. It can convert between different measurement systems and compute values with physical dimensions, such as speed, force, density, and energy, all in a single step.' },
      { question: 'How is this different from the Unit Converter?', answer: 'The Unit Converter handles simple one-to-one conversions like inches to centimeters or pounds to kilograms. The Unit Calculator goes further by computing formulas that combine multiple variables with units, such as calculating speed from distance and time, or density from mass and volume.' },
      { question: 'Can I use it for physics homework?', answer: 'Yes, the Unit Calculator is ideal for physics and science problems that require unit-based formulas. It handles calculations for speed, force, energy, density, pressure, and more, automatically managing unit conversions so you can focus on understanding the concepts rather than manually converting values.' },
      { question: 'What unit systems does it support?', answer: 'The tool supports both metric and imperial measurement systems, including units for length, mass, volume, temperature, speed, force, and energy. You can mix systems in your calculations and the tool will handle the conversion to produce an accurate result in your desired output unit.' },
      { question: 'How do I enter formulas with units?', answer: 'Enter your values along with their unit abbreviations, such as "5 kg" or "10 m/s". The tool recognizes standard unit names and symbols. Be explicit about units in your input so the tool can parse and compute your formula correctly.' },
      { question: 'Can I convert between Celsius and Fahrenheit?', answer: 'Yes, the Unit Calculator supports temperature conversions between Celsius, Fahrenheit, and Kelvin. You can either use a simple temperature conversion or include temperature values as part of a larger formula that involves other physical quantities.' },
      { question: 'Is my calculation data private?', answer: 'Yes, all calculations are performed locally in your browser. Your input values and results are never transmitted to any server, making the tool safe to use for sensitive engineering data, proprietary formulas, or confidential academic work.' },
      { question: 'Can I use it for engineering calculations?', answer: 'Absolutely. The Unit Calculator handles the complex unit-based computations common in engineering, such as stress calculations, flow rates, electrical resistance with unit dimensions, and structural load analysis. It reduces manual conversion errors by combining computation and unit management.' },
      { question: 'What if I enter an incompatible unit combination?', answer: 'The tool will alert you if you attempt to combine units that are physically incompatible, such as adding length to mass. This built-in validation helps catch errors early and ensures your calculations produce meaningful, dimensionally consistent results.' },
      { question: 'Can I use it for recipe scaling and cooking?', answer: 'Yes, the tool is helpful for scaling recipes and converting cooking measurements. You can convert between cups and milliliters, ounces and grams, or Fahrenheit and Celsius, and even combine multiple conversions in a single calculation when adjusting ingredient quantities for different batch sizes.' },
      { question: 'How accurate are the conversion factors?', answer: 'The tool uses standard, widely accepted conversion factors defined by international measurement standards. For most practical and academic purposes, the accuracy is more than sufficient. Results are computed with high precision to minimize rounding errors in multi-step calculations.' },
      { question: 'Can I calculate speed from distance and time?', answer: 'Yes, that is one of the core use cases. Enter your distance value with its unit and your time value with its unit, and the tool will compute the speed in the appropriate unit. You can also convert the result to other speed units like mph, km/h, or m/s as needed.' },
      { question: 'Does the tool work offline?', answer: 'Because all computation happens in the browser using JavaScript, the tool can work offline once the page is loaded. As long as you have the page open, you can perform calculations without an active internet connection, making it useful in labs or fieldwork settings.' },
    ],
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
      {
        heading: 'How to use the Color Converter',
        paragraphs: [
          'Step 1: Enter a color value in any supported format — HEX (#3498db), RGB (rgb(52, 152, 219)), or HSL (hsl(204, 70%, 53%)). The tool auto-detects the input format and converts it to all other formats instantly.',
          'Step 2: Review the converted values displayed alongside the input. HEX is shown as a six-character hash code, RGB as three channel values (0-255), and HSL as hue (0-360 degrees), saturation (0-100%), and lightness (0-100%).',
          'Step 3: Use the color preview swatch to visually confirm that the converted values match your expected color. If the preview looks different, check for input errors such as swapped channels or incorrect hex digits.',
          'Step 4: Copy the value in your desired format using the copy button next to each output. Use HEX for CSS shorthand, RGB for JavaScript style properties, and HSL for programmatic color manipulation.',
          'Step 5: For building color schemes, convert your base brand color to HSL first, then adjust the hue value to find complementary, triadic, or analogous colors before converting back to HEX or RGB for use in your project.',
          'Step 6: If you have a named CSS color (like "tomato" or "cornflowerblue"), you can paste it directly to see its HEX, RGB, and HSL equivalents for use outside of CSS contexts.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Entering RGB values outside the 0-255 range. RGB channels must be integers between 0 and 255. Values like rgb(300, -10, 500) are invalid and will produce incorrect or unexpected results. Clamp each channel to the valid range before converting.',
          'Error: Confusing HSL saturation and lightness. Saturation and lightness both use percentage values from 0-100%, but they affect the color differently. Saturation controls color vividness (0% is gray, 100% is fully vivid), while lightness controls brightness (0% is black, 100% is white). Swapping them produces very different colors.',
          'Error: Omitting the hash symbol in HEX values. A valid HEX color must start with # (e.g., #ff5733, not ff5733). Without the hash, the tool may not recognize the input correctly.',
          'Error: Using shorthand HEX without full expansion. A three-character HEX like #f00 is valid, but some tools expect six characters (#ff0000). The converter handles both formats, but ensure consistency when copying values into your code.',
          'Error: Assuming round-trip conversion is always character-identical. Converting HEX to HSL and back to HEX may produce a 1-digit difference due to rounding. This is visually imperceptible but can matter in systems that compare color values as exact strings.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use HSL when building programmatic color schemes because hue rotations behave predictably — rotating hue by 180 degrees gives a complementary color, and rotating by 120 degrees gives a triadic color. This is much harder to do by manipulating hex values directly.',
          'For dark mode theming, convert your light-mode colors to HSL, keep the hue and saturation the same, and reduce the lightness value. This maintains the color identity while adapting to a darker palette.',
          'When matching a brand color, always verify the converted result in both HEX and RGB. A 1-digit hex difference (like #1a1a1a vs #1a1a1b) is imperceptible to the eye but can cause failures in visual regression testing tools.',
          'For accessibility, check the contrast ratio between your text color and background color after converting. WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.',
          'Keep your design system colors defined in one format (preferably HSL for manipulation) and convert to HEX or RGB only when outputting to CSS, Tailwind config, or other platform-specific formats.',
        ],
      },
    ],
    relatedTools: ['json-formatter', 'image-compressor'],
    faq: [
      { question: 'Why does #0000ff convert to hsl(240, 100%, 50%) but rgb(0, 0, 255) shows the same?', answer: 'They are mathematically identical. Hex #0000ff and rgb(0, 0, 255) both represent pure blue. HSL represents the same point in color space using different coordinates: hue 240 degrees (blue on the color wheel), 100% saturation, 50% lightness.' },
      { question: 'Can I lose color accuracy converting between formats?', answer: 'Hex uses 8-bit per channel (256 values), while HSL uses float percentages. Rounding during conversion can shift a channel by plus or minus 1. For brand-critical colors, keep the original format and convert only for delivery — our tool uses double-precision math to minimize error.' },
      { question: 'What is the CSS color() function and should I use it?', answer: 'The CSS color() function (e.g., color(display-p3 0.5 0.3 0.8)) lets you specify colors in any supported color space. It is useful for wide-gamut displays but has limited browser support. Convert to fallback hex or RGB for broader compatibility.' },
      { question: 'How do I convert a HEX color to RGB?', answer: 'Each pair of hex digits represents one RGB channel. For example, #3498db breaks into 34 (red = 52), 98 (green = 152), db (blue = 219). The tool does this conversion automatically when you enter a HEX value.' },
      { question: 'How do I convert RGB to HEX?', answer: 'Convert each RGB channel (0-255) to a two-digit hexadecimal value. For example, RGB(52, 152, 219) converts to #34 (52), #98 (152), #db (219), giving #3498db. The tool performs this conversion instantly.' },
      { question: 'What is the difference between HSL and HSV?', answer: 'HSL (Hue, Saturation, Lightness) uses lightness to control brightness, where 50% lightness is the purest color and both 0% and 100% are achromatic. HSV (Hue, Saturation, Value) uses value where 100% is the purest color and 0% is black. HSL is more intuitive for creating lighter and darker variants of a color.' },
      { question: 'Why do some hex colors look different on my screen?', answer: 'Screen calibration, color profiles (sRGB vs Display P3), and monitor quality all affect how colors appear. The same HEX value can look different on a phone, laptop, and desktop monitor. Use color profiles and ICC calibration for consistent color across devices.' },
      { question: 'Can I use this tool for Tailwind CSS colors?', answer: 'Yes, convert your Tailwind color values between formats as needed. Tailwind uses HEX by default in its config, but you can use HSL values for CSS custom properties and dynamic color generation in your component code.' },
      { question: 'How do I find a lighter version of a color?', answer: 'Convert the color to HSL, then increase the lightness value. For example, to make a color 20% lighter, add 20 to the lightness percentage (capped at 100%). Then convert back to HEX or RGB for use in your project.' },
      { question: 'What is a safe web color?', answer: 'The 216 "web-safe" colors are those formed by combinations of 00, 33, 66, 99, cc, and ff in each RGB channel. They guaranteed consistent display on old 8-bit monitors. Modern displays support millions of colors, so web-safe colors are largely historical, but knowing them helps with legacy support.' },
    ],
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
      {
        heading: 'How to use the Code Minifier',
        paragraphs: [
          'Step 1: Select the code type you want to minify — JavaScript, CSS, or HTML. The tool applies type-specific optimizations for each language.',
          'Step 2: Paste your code into the input area. The code can be formatted, indented, or already partially minified. The tool handles all input states.',
          'Step 3: Click the Minify button or wait for automatic processing. The tool strips comments, removes whitespace, shortens variable names (for JS), and applies other safe transformations.',
          'Step 4: Review the minified output and check the file size reduction percentage. This shows how much bandwidth and load time you are saving.',
          'Step 5: Copy the minified code using the copy button, then paste it into your production build, deployment pipeline, or inline script tag.',
          'Step 6: For JavaScript, keep a separate unminified version with source maps for debugging. Minified code without source maps produces unreadable stack traces in production error logs.',
          'Step 7: Test the minified code in your application to verify that functionality is preserved. While minification should be semantically transparent, edge cases with eval() or dynamic code generation may need attention.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Minifying code that uses eval() or Function(). These JavaScript features rely on readable source code at runtime. Minification can break them because variable names change. Avoid minifying files that use eval, or exclude those files from minification.',
          'Error: Not generating source maps. After minifying, stack traces point to minified line and column numbers, making debugging difficult. Always generate a .map file alongside minified code so your error tracking service can还原 readable traces.',
          'Error: Minifying code twice. Running minification on already-minified code can cause double-processing issues, such as double-escaping or broken string literals. Always minify from the original source.',
          'Error: Missing semicolons causing ASI issues. JavaScript minification removes newlines, relying on automatic semicolon insertion (ASI). If your code depends on ASI in ambiguous cases, add explicit semicolons before minifying to prevent runtime errors.',
          'Error: HTML minification breaking inline scripts. Aggressive HTML minification can remove whitespace inside inline script or style blocks, breaking code that depends on specific formatting. Use the tool carefully with HTML containing inline code blocks.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Always serve minified assets with gzip or brotli compression. Minification plus compression together typically reduces file sizes by 70-90%, far more than either technique alone.',
          'Use source maps in development and staging environments but consider whether to include them in production. Source maps expose your original code structure, so keep them private if your code is proprietary.',
          'Minify as the final step in your build pipeline. Run linting, testing, and tree-shaking first, then minify the verified output. This ensures you are minifying clean, tested code.',
          'For CSS, minification can merge duplicate rules and shorten color values (like converting #ff8800 to #f80). Review the output to ensure no visual regressions in your stylesheets.',
          'Consider using a bundler like esbuild, Vite, or Webpack for automated minification as part of your build process. This tool is ideal for one-off minification of standalone scripts, inline code, or bookmarklets.',
        ],
      },
    ],
    relatedTools: ['json-formatter', 'diff-checker', 'regex-tester'],
    faq: [
      { question: 'Does minification always break stack traces?', answer: 'Yes, if you do not publish source maps. Without source maps, errors point to the minified file (e.g., main.js:1:2345). Generate a .map file and upload it to your error tracking service (Sentry, Datadog) to restore readable stack traces.' },
      { question: 'Can I minify and obfuscate at the same time?', answer: 'Minification and obfuscation are separate goals. Minification reduces size; obfuscation intentionally makes code hard to reverse-engineer. Our tool focuses on safe size reduction. For obfuscation, use a dedicated tool that renames strings, inserts junk code, and applies control-flow flattening.' },
      { question: 'What is the difference between UglifyJS, Terser, and esbuild minification?', answer: 'Terser (fork of UglifyJS) supports ES6+ syntax and is the standard for Webpack 5. esbuild minifies 10-100x faster but applies fewer optimizations. Our tool uses Terser-style transformations for maximum compression while being compatible with modern JavaScript.' },
      { question: 'How much can minification reduce file size?', answer: 'Typical reduction is 30-70% depending on the code. JavaScript with many comments and whitespace sees the largest reduction. HTML and CSS typically see 20-40%. Combining minification with gzip/brotli compression can achieve 70-90% total reduction.' },
      { question: 'Is minified code slower to execute?', answer: 'No, minified code executes identically to unminified code. The JavaScript engine parses both into the same abstract syntax tree. The only difference is that minified code is faster to download over the network due to smaller file size.' },
      { question: 'Should I minify inline CSS and JavaScript?', answer: 'Minifying inline code in HTML is possible but be careful with script blocks that depend on specific formatting. For inline styles, minification is generally safe. For inline scripts, test thoroughly after minification to ensure no behavioral changes.' },
      { question: 'Can I minify JSX or TypeScript?', answer: 'Our tool minifies standard JavaScript, CSS, and HTML. For JSX or TypeScript, transpile to plain JavaScript first using Babel or the TypeScript compiler, then minify the output. Build tools like esbuild handle both transpilation and minification in one step.' },
      { question: 'What is tree-shaking and should I use it?', answer: 'Tree-shaking removes unused exports from JavaScript modules before minification. It reduces bundle size by eliminating dead code. Most modern bundlers (Webpack, Rollup, esbuild) support tree-shaking automatically when using ES module imports.' },
      { question: 'Does minification affect SEO?', answer: 'Indirectly, yes. Minified files load faster, and page speed is a Google ranking factor. Faster pages also improve user experience metrics like bounce rate and time on page, which can positively impact search rankings.' },
      { question: 'Is it safe to minify third-party libraries?', answer: 'It is safe to minify already-distributed libraries since they are often already minified. However, if you are importing a library as a module in a bundler, let the bundler handle minification to avoid conflicts with the library source maps.' },
    ],
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
      {
        heading: 'How to use the Diff Checker',
        paragraphs: [
          'Step 1: Paste the original text into the left panel (or "before" field). This can be a file, code snippet, configuration, or any text content you want to compare.',
          'Step 2: Paste the modified text into the right panel (or "after" field). This is the version you want to compare against the original.',
          'Step 3: The tool automatically highlights differences — removed lines in red, added lines in green, and modified content with inline character-level highlighting.',
          'Step 4: Switch between unified and split view depending on your preference. Unified view interleaves both versions with +/- markers; split view shows them side by side.',
          'Step 5: Use the whitespace toggle if differences seem unexpected. Trailing spaces, tabs, and line endings (CRLF vs LF) often cause false-positive differences that are not meaningful.',
          'Step 6: Copy the diff output for sharing with teammates, including in pull request descriptions, code review comments, or documentation.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Comparing files with different line endings. Windows uses CRLF while Unix uses LF. These appear as differences even though the content is identical. Convert both texts to the same line ending format before comparing.',
          'Error: False positives from trailing whitespace. Extra spaces at the end of lines show as changes but are invisible. Enable the "Show whitespace" option to identify these, or strip trailing whitespace before diffing.',
          'Error: Comparing minified code without formatting. Minified files show as one long changed line, making it hard to spot meaningful differences. Format both versions first using the Code Minifier or SQL Formatter before comparing.',
          'Error: Missing context for large diffs. When comparing very large files, the diff output can be overwhelming. Focus on specific sections by trimming both texts to the relevant portion before comparing.',
          'Error: Encoding differences causing false differences. Files saved with UTF-8 BOM vs without BOM, or different character encodings, may show as different even when content is the same. Ensure both texts use the same encoding.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use unified diff format when sharing changes with teammates. It includes 3 lines of context around each change, which helps reviewers understand the surrounding code without needing to see the full file.',
          'For configuration files like YAML or JSON, sort keys in both versions before diffing. This avoids false positives caused by key reordering that does not change the actual configuration values.',
          'Combine the diff checker with the Code Minifier for comparing minified assets. Format both versions first, diff to identify changes, then re-minify after making adjustments.',
          'When reviewing code changes, focus on the character-level diff within modified lines to catch subtle changes like variable renames, off-by-one errors, or accidental semicolon insertion.',
          'Use the diff output to generate commit messages. A clear diff shows exactly what changed, making it easy to write descriptive commit messages that document the purpose of each modification.',
        ],
      },
    ],
    relatedTools: ['json-formatter', 'xml-formatter', 'code-minifier'],
    faq: [
      { question: 'What is the difference between unified and split view?', answer: 'Unified view shows both versions interleaved with +/- markers (compact, good for small diffs). Split view shows old and new side-by-side (better for wide files or visual comparison). Our tool supports both.' },
      { question: 'Can I compare two JSON files structurally?', answer: 'For structural JSON comparison (ignoring key order), use the JSON Formatter tool first to normalize both files, then diff the normalized output. This avoids false positives from key reordering.' },
      { question: 'Why does the tool say everything is different when files seem identical?', answer: 'Check for trailing whitespace, different line endings (CRLF vs LF), or encoding differences (UTF-8 with/without BOM). Our tool highlights whitespace changes when you enable the "Show whitespace" toggle.' },
      { question: 'Can I compare code from different programming languages?', answer: 'Yes, the tool compares any text content regardless of language. However, it does not understand language syntax — it compares text character by character. Format both versions consistently before comparing for clearer results.' },
      { question: 'How do I compare files that are very large?', answer: 'For very large files (thousands of lines), the diff may be slow or overwhelming. Try comparing specific sections by copying only the relevant portions. For programmatic comparison of large files, consider using command-line diff tools like diff or git diff.' },
      { question: 'Does the tool support comparing images or binary files?', answer: 'No, this tool compares text only. For image comparison, you need specialized tools that can overlay or pixel-diff two images. Binary file comparison requires hex dump analysis tools.' },
      { question: 'What is character-level diff?', answer: 'Character-level diff highlights the specific characters that changed within a modified line. For example, if a variable was renamed from "userData" to "userInfo", the diff highlights just "Data" and "Info" rather than marking the entire line as changed.' },
      { question: 'Can I ignore certain types of changes?', answer: 'The tool provides a whitespace toggle to ignore trailing spaces and tabs. For more advanced filtering (ignoring comments, blank lines, or specific patterns), consider using command-line diff tools with custom ignore rules.' },
      { question: 'How do I share diff results with my team?', answer: 'Copy the diff output and paste it into your team communication tool, code review platform, or documentation. The formatted output preserves highlighting when pasted into tools that support colored text.' },
      { question: 'Is there a limit to the text size I can compare?', answer: 'The tool works best with texts up to about 100KB. Larger texts may slow down the comparison. For very large files, consider using command-line diff tools or splitting the content into smaller sections.' },
    ],
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
      {
        heading: 'How to use the XML Formatter',
        paragraphs: [
          'Step 1: Paste your XML document into the input area. This can be minified XML from an API response, a configuration file, or any raw XML content.',
          'Step 2: The tool parses the XML into a DOM tree and reports any structural errors with the exact line and column where the problem occurs, saving you from manual debugging.',
          'Step 3: Choose your formatting preferences — typically indentation size (2 or 4 spaces) and whether to preserve comments, CDATA sections, and processing instructions.',
          'Step 4: The formatted output displays with proper nesting, consistent indentation, and each element on its own line for maximum readability.',
          'Step 5: Use the minify toggle to compress formatted XML back into a single line for efficient storage or transmission without whitespace overhead.',
          'Step 6: Copy the formatted or minified output using the copy button for use in your configuration files, API integrations, or documentation.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Malformed XML with unclosed tags. XML is stricter than HTML — every opening tag must have a matching closing tag. The formatter reports the exact location of the mismatch so you can add the missing closing tag.',
          'Error: Unquoted attribute values. XML requires all attribute values to be enclosed in quotes (single or double). If you see parsing errors, check for attributes like width=100 that should be width="100".',
          'Error: Namespace prefixes without declarations. If your XML uses namespace prefixes like xmlns:soap or xsi:type, ensure every prefix has a corresponding xmlns declaration. Missing declarations cause "undefined namespace prefix" errors.',
          'Error: Multiple root elements. An XML document must have exactly one root element that contains all other elements. If you have two sibling elements at the top level, wrap them in a container element.',
          'Error: Entity references not defined. XML does not support HTML entities like &nbsp; by default. Define custom entities with <!ENTITY> declarations or use numeric character references like &#160; instead.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use 2-space indentation for XML to match common conventions in SOAP APIs, Android layouts, and Maven POM files. Use 4-space indentation for XSLT stylesheets and documentation-heavy XML.',
          'Format XML immediately when receiving it from external APIs or legacy systems. Reading properly formatted XML makes it much easier to identify structural issues, unexpected data, and namespace problems.',
          'When editing SVG files, format the XML first to verify correct nesting. A misplaced closing tag in SVG can cause the entire graphic to fail to render, and the error is nearly impossible to spot in minified SVG.',
          'Use the minify option before sending XML over the wire for production. Removing whitespace-only text nodes reduces payload size without affecting the logical structure or data content.',
          'For XSD schema validation, format the XML first to check well-formedness, then use a dedicated XML validator for schema-level validation. Well-formedness and validity are separate concerns.',
        ],
      },
    ],
    relatedTools: ['json-formatter', 'sql-formatter', 'diff-checker'],
    faq: [
      { question: 'Will my XML look different after formatting?', answer: 'Formatting only changes whitespace — it adds newlines and indentation between elements. Attribute order, namespace declarations, and CDATA sections are preserved exactly as written.' },
      { question: 'Does this tool validate against an XSD schema?', answer: 'No, the formatter checks well-formedness (correct nesting, matching tags, quoted attributes) but does not validate against a schema. Use a dedicated XML validator with XSD support for schema-level validation.' },
      { question: 'Can it handle very large XML files?', answer: 'Our tool processes files up to approximately 5 MB in the browser. For larger enterprise XML files (10+ MB), consider streaming XML parsers like SAX or StAX rather than loading the full DOM into memory.' },
      { question: 'What is the difference between XML and HTML?', answer: 'HTML is lenient — browsers auto-correct missing tags and handle errors gracefully. XML is strict — any well-formedness error causes parsing to fail. XML also supports attributes, namespaces, and schemas that HTML does not.' },
      { question: 'How do I format XML in VS Code?', answer: 'Install an XML extension (like Red Hat XML), then use Shift+Alt+F to format. Alternatively, paste your XML into this online tool for formatting without editor configuration.' },
      { question: 'Can I minify XML with this tool?', answer: 'Yes, toggle the minify option to strip whitespace-only text nodes and compress the XML into a compact single line. This reduces payload size without changing the logical structure.' },
      { question: 'How do I fix "not well-formed" XML errors?', answer: 'The error message includes the line and column of the problem. Common fixes include closing unclosed tags, quoting attribute values, ensuring a single root element, and defining entity references.' },
      { question: 'Does formatting change attribute order?', answer: 'No, the formatter preserves the original attribute order within each element. Only whitespace between elements is modified during formatting.' },
      { question: 'What are CDATA sections in XML?', answer: 'CDATA (Character Data) sections tell the XML parser to treat the enclosed text as literal data, not markup. They are used for content that contains characters like < or & that would otherwise be interpreted as XML syntax.' },
      { question: 'Can I use this tool for SVG files?', answer: 'Yes, SVG is XML-based, so the formatter works perfectly. Format SVG files to verify correct nesting and fix rendering issues caused by malformed markup.' },
    ],
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
      {
        heading: 'How to use the Word Counter',
        paragraphs: [
          'Step 1: Paste or type your text into the input area. The counter updates in real time as you type, so you can see metrics change as you write.',
          'Step 2: Review the word count, which includes total words and unique words. The tool uses Unicode-aware word segmentation that handles CJK characters and compound words correctly.',
          'Step 3: Check the character count — both with and without spaces. Characters without spaces is useful for translation cost estimates and social media character limits.',
          'Step 4: Review the sentence count and paragraph count to assess document structure. Shorter paragraphs and sentences improve readability on mobile devices.',
          'Step 5: Look at the reading time estimate, which assumes an average reading speed of 200-250 words per minute. Use this to plan content length for blog posts and presentations.',
          'Step 6: For SEO analysis, check the keyword density indicators to ensure your target keywords appear 1-3% of the time without keyword stuffing.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Including HTML tags in your text. The tool strips HTML tags before counting, but if you paste rendered content with visible tags, you may be counting markup instead of content. Paste the raw text or use a "strip HTML" step first.',
          'Error: Confusing word count with character count. Word count and character count serve different purposes. Word count matters for essays and articles; character count matters for social media posts, SMS messages, and meta descriptions.',
          'Error: Misunderstanding reading time estimates. The default assumes 200-250 words per minute for adult readers. Technical content, academic papers, and non-native language text read much slower — adjust your target word count accordingly.',
          'Error: Not accounting for CJK character counting. Chinese, Japanese, and Korean text counts differently — each character is typically one word. The tool handles this correctly, but be aware that "1000 words" means different things in English vs Chinese.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Paste your meta description into the counter to check its length. Google typically truncates descriptions after 155-160 characters, so keep your meta descriptions under that limit for best search result display.',
          'For blog posts, aim for 1500-2500 words for comprehensive coverage that ranks well in search engines. Shorter posts (500-800 words) work better for news updates and quick tips.',
          'Use the unique words metric to assess vocabulary diversity. If your unique word count is very low relative to total words, your content may be repetitive and benefit from synonyms or restructuring.',
          'For academic or technical writing, check readability scores alongside word count to ensure your content matches the target audience reading level.',
          'When editing, use the sentence count to identify run-on sentences. If your average sentence length exceeds 25 words, consider breaking complex sentences into shorter ones for better readability.',
        ],
      },
    ],
    relatedTools: ['markdown-editor', 'text-to-html', 'diff-checker'],
    faq: [
      { question: 'Does the counter include HTML tags in the count?', answer: 'No, the tool strips HTML tags before counting. Only visible text content is counted, so <p>Hello</p> counts as 1 word (5 characters), not 9 words.' },
      { question: 'How are hyphenated words counted?', answer: 'By default, hyphenated compounds (e.g., "well-known") are counted as one word. If you toggle the setting, they are split into individual words. This affects both word count and keyword density analysis.' },
      { question: 'Do emojis count as words?', answer: 'No, emojis are counted as characters but not as words. Each emoji counts as 2 characters (surrogate pair) or 1 character (single Unicode scalar), depending on the emoji.' },
      { question: 'How accurate is the reading time estimate?', answer: 'The estimate assumes an average adult reading speed of 200-250 words per minute. Actual reading speed varies by content complexity, reader familiarity with the topic, and whether the reader is scanning or reading in detail.' },
      { question: 'What is the difference between words and characters?', answer: 'Words are individual units of meaning separated by spaces. Characters include every letter, number, punctuation mark, and space. A 500-word essay might have 3000 characters including spaces.' },
      { question: 'How many words should a blog post have for SEO?', answer: 'There is no single answer, but comprehensive posts of 1500-2500 words tend to rank well for competitive keywords. Shorter posts (500-800 words) work for quick topics. Quality and relevance matter more than raw word count.' },
      { question: 'Does the tool count words in different languages?', answer: 'Yes, the counter uses Unicode-aware word segmentation that handles CJK characters (Chinese, Japanese, Korean) where each character is a word, as well as compound words in Germanic languages.' },
      { question: 'How many characters can I post on Twitter/X?', answer: 'Twitter allows 280 characters per tweet. Use the character count (without spaces) to ensure your tweet fits. For threads, each tweet must independently stay within the limit.' },
      { question: 'What is keyword density and why does it matter?', answer: 'Keyword density is the percentage of times a target keyword appears relative to total word count. A healthy density for SEO is 1-3%. Higher density may trigger keyword stuffing penalties from search engines.' },
      { question: 'Can I count words in a PDF?', answer: 'Copy the text from the PDF and paste it into the counter. Direct PDF upload is not supported, but you can use Ctrl+A to select all text in most PDF readers, then Ctrl+C to copy it.' },
    ],
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
      {
        heading: 'How to use the QR Code Generator',
        paragraphs: [
          'Step 1: Enter the content you want to encode — a URL, plain text, email address, phone number, or WiFi network details. The QR code updates as you type.',
          'Step 2: Choose the error correction level. Level M (15% recovery) is sufficient for digital use. Level H (30% recovery) is recommended for printed materials that may be damaged or partially obscured.',
          'Step 3: Customize the QR code appearance if desired — adjust foreground and background colors, add a center logo, or add a caption frame with a call-to-action label.',
          'Step 4: Preview the generated QR code to ensure it scans correctly. Test by scanning with your phone camera before printing or sharing.',
          'Step 5: Download the QR code in your preferred format. PNG is best for general use and social media. SVG is ideal for print materials that need to scale without losing quality.',
          'Step 6: Print or share the QR code. Ensure a quiet zone (white space) of at least 4 modules surrounds the code for reliable scanning.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: QR code too small to scan. The minimum recommended print size is 2cm x 2cm (approximately 0.8 inches). Codes smaller than this may not scan reliably, especially on low-resolution screens or printed materials.',
          'Error: Insufficient contrast between foreground and background. The dark modules must be noticeably darker than the light modules. A contrast ratio of at least 3:1 is recommended. Avoid light gray on white or similar low-contrast combinations.',
          'Error: Center logo too large. When adding a logo to the center of a QR code, the logo must not exceed the error correction capacity. At level H, you can use a larger logo (up to 30% of the code area). At level M, keep the logo small.',
          'Error: URL is too long. URLs longer than approximately 400 characters produce very dense QR codes that are harder to scan. Use a URL shortener for long links, or use level H error correction for better readability.',
          'Error: Placing QR code on busy backgrounds. QR codes on patterned or photographic backgrounds reduce scan reliability. Always place QR codes on solid, contrasting backgrounds.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use error correction level H for printed materials like business cards, flyers, and product labels where the code might get scratched or folded. The 30% recovery capacity ensures the code remains scannable even with damage.',
          'Always add a quiet zone of at least 4 modules of white space around the QR code. This is required by the QR code specification and ensures scanners can detect the code boundaries.',
          'Test your QR code at the actual print size before running a large print job. A code that scans perfectly on screen at 500px may fail when printed at 1cm.',
          'For marketing materials, add a text call-to-action above or below the QR code (like "Scan to visit our menu") to increase scan rates. The caption should be outside the quiet zone.',
          'Use SVG format for print materials that may be scaled to different sizes. SVG maintains sharp edges at any resolution, while PNG may become pixelated when enlarged.',
        ],
      },
    ],
    relatedTools: ['url-encoder', 'password-generator', 'json-to-csv'],
    faq: [
      { question: 'What is the maximum data I can encode in a QR code?', answer: 'QR codes support up to 7089 numeric digits, 4296 alphanumeric characters, or 2953 bytes of binary data (version 40, low error correction). For URLs, practical limits are 200-400 characters before the code becomes very dense.' },
      { question: 'Can I scan a QR code from a screenshot?', answer: 'Yes, most smartphone cameras can scan QR codes from screenshots, as long as the code is sharp and fills at least 25% of the image width. Avoid scaling down too much.' },
      { question: 'What is the difference between QR codes and barcodes?', answer: 'Barcodes store data in one dimension (horizontal lines) and hold approximately 20-25 characters. QR codes store data in two dimensions and hold much more data (up to approximately 3KB). QR codes also support error correction and can be scanned from any orientation.' },
      { question: 'Can I change the color of a QR code?', answer: 'Yes, you can customize foreground and background colors. The key constraint is maintaining sufficient contrast — dark modules must be noticeably darker than light modules for reliable scanning.' },
      { question: 'What is error correction in QR codes?', answer: 'Error correction allows QR codes to be read even when partially damaged or obscured. Level L recovers 7%, M recovers 15%, Q recovers 25%, and H recovers 30% of the data. Higher levels produce denser codes.' },
      { question: 'How do I add a logo to a QR code?', answer: 'Use the center image feature in the tool. The logo replaces some QR modules, which the error correction recovers. Keep the logo small (under 30% of the code area at level H) for reliable scanning.' },
      { question: 'Should I use PNG or SVG for my QR code?', answer: 'PNG is best for digital use (social media, websites, email). SVG is ideal for print materials because it scales to any size without losing quality. Use SVG for business cards, flyers, and signage.' },
      { question: 'Can a QR code contain a WiFi password?', answer: 'Yes, QR codes can encode WiFi credentials in the format: WIFI:T:WPA;S:networkname;P:password;;. Scan the code with your phone camera to connect to the network automatically.' },
      { question: 'Why won\'t my QR code scan?', answer: 'Common reasons include: insufficient contrast, code too small, code damaged or obscured, no quiet zone around the code, or poor lighting when scanning. Increase the error correction level and ensure adequate size and contrast.' },
      { question: 'Are QR codes free to use?', answer: 'Yes, the QR code standard is an open specification with no licensing fees. You can generate and use QR codes freely for any purpose, personal or commercial.' },
    ],
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
      {
        heading: 'How to use the Markdown Editor',
        paragraphs: [
          'Step 1: Type or paste your Markdown content into the editor panel on the left. The live preview on the right updates instantly as you type.',
          'Step 2: Use Markdown syntax to format your text — # for headings, ** for bold, * for italic, - or * for bullet lists, and ``` for code blocks with syntax highlighting.',
          'Step 3: Create tables using pipe characters (|) to separate columns and dashes (---) to create the header separator row. The preview renders the table with proper alignment.',
          'Step 4: Add links using [text](url) syntax and images using ![alt text](image-url) syntax. The preview shows clickable links and rendered images.',
          'Step 5: Use the word and character counts at the bottom to track document length while writing documentation or blog posts.',
          'Step 6: Export your content by copying the rendered HTML from the preview, or copy the raw Markdown for use in GitHub READMEs, documentation sites, or CMS platforms.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Missing blank lines before headings and lists. Many Markdown renderers require a blank line before headings (# Heading) and lists (- item) to properly detect block-level elements. Without the blank line, the heading may render as inline text.',
          'Error: Incorrect table formatting. Tables need a header row, a separator row with at least three dashes per column (---), and data rows. Missing the separator row causes the table to render as plain text.',
          'Error: Forgetting the space after heading markers. The syntax #Heading (no space) may not render as a heading in some parsers. Always use # Heading with a space after the hash marks.',
          'Error: Code blocks not rendering. Fenced code blocks require three backticks (```) on their own line to open and close. If the closing backticks are indented or missing, the code block extends to the end of the document.',
          'Error: Inline HTML being stripped. Some Markdown renderers strip inline HTML for security. If you need HTML elements like <details> or <video>, check that your target platform supports them.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use reference-style links ([text][ref] and [ref]: url) for documents with many links. This keeps the Markdown source cleaner and makes link URLs easier to update in one place.',
          'Add a blank line before headings and lists to ensure correct rendering across all Markdown parsers. This is the most common cause of formatting issues.',
          'Use fenced code blocks with language identifiers (```javascript, ```python) for syntax highlighting. This makes code examples much more readable in documentation.',
          'For long documents, use a table of contents generated from your headings. Many static site generators auto-generate TOCs, or you can create one manually with anchor links.',
          'When writing for GitHub, use GFM (GitHub Flavored Markdown) extensions like task lists ([x] completed, [ ] incomplete), tables, and strikethrough (~~deleted~~) for enhanced formatting.',
        ],
      },
    ],
    relatedTools: ['text-to-html', 'json-to-csv', 'diff-checker'],
    faq: [
      { question: 'Can I paste rich text and have it converted to Markdown?', answer: 'Yes, the editor accepts rich text pastes from Word, Google Docs, and web pages and attempts to convert them to Markdown. Complex formatting (tables with merged cells, nested lists) may lose fidelity — always review the conversion.' },
      { question: 'Does the editor support images?', answer: 'Yes, you can paste image URLs to generate Markdown image syntax, or upload local images (they are encoded as Base64 data URIs for the preview). For production, host images separately and reference their URLs.' },
      { question: 'How do I add a table of contents to my Markdown?', answer: 'Many renderers auto-generate TOCs from headings. For manual TOCs, use a tool like markdown-toc or write a simple script to extract ## and ### headings. Our editor can auto-generate a TOC from your document structure.' },
      { question: 'What is the difference between Markdown and HTML?', answer: 'Markdown is a lightweight markup language that is easier to write and read as plain text. HTML is a full markup language with more formatting options but is verbose. Markdown converts to HTML for web rendering.' },
      { question: 'Can I use Markdown for emails?', answer: 'Yes, many email clients and marketing platforms support Markdown. Some require a Markdown-to-HTML conversion step. For plain text emails, Markdown formatting like *bold* and _italic_ is still readable.' },
      { question: 'How do I create a footnote in Markdown?', answer: 'Standard Markdown does not support footnotes, but GitHub Flavored Markdown and extended parsers do. Use [^1] to create a footnote reference and [^1]: text at the bottom of the document for the footnote content.' },
      { question: 'Does the editor save my work?', answer: 'The editor preserves your content in the browser during the session. For permanent storage, copy your Markdown to a file or use the export options. Clearing browser data may remove unsaved content.' },
      { question: 'How do I add horizontal rules?', answer: 'Type three or more hyphens (---), asterisks (***), or underscores (___) on their own line to create a horizontal rule. This creates a visual separator between sections.' },
      { question: 'Can I nest lists in Markdown?', answer: 'Yes, indent list items by 2-4 spaces to create nested lists. For example, indent a - item under another - item to create a sub-bullet. The nesting level determines the indentation in the rendered output.' },
      { question: 'What Markdown extensions does the editor support?', answer: 'The editor supports GFM (GitHub Flavored Markdown) including tables, task lists, strikethrough, and fenced code blocks. Extended features like footnotes and math equations depend on the target platform.' },
    ],
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
      {
        heading: 'How to use the Text to Speech Tool',
        paragraphs: [
          'Step 1: Type or paste the text you want to convert into the input area. You can enter any length of text, from a single sentence to a full article.',
          'Step 2: Select a voice from the available options. Different voices are available depending on your browser and operating system. Chrome typically offers the widest selection.',
          'Step 3: Adjust the speaking rate and pitch using the sliders. A rate of 0.9-1.1 produces natural-sounding speech. Slower rates sound robotic, while faster rates may skip words.',
          'Step 4: Click the Play button to hear the spoken output. The browser synthesizes the audio in real time using the Web Speech API.',
          'Step 5: Use the Pause and Stop controls to manage playback. Pause to resume later, or Stop to start over from the beginning.',
          'Step 6: For long texts, split content into paragraphs and synthesize them sequentially, as browsers may pause or stop after extended synthesis sessions.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Voice sounds different across browsers. Each browser uses its own speech engine — Chrome uses Microsoft or Google voices, Firefox uses system voices, Safari uses macOS neural voices. Test in your target browser for accurate preview.',
          'Error: Browser stops playing mid-sentence. Long texts (1000+ words) may cause the browser to pause or stop synthesis. Split long content into smaller paragraphs and play them one at a time.',
          'Error: Acronyms pronounced incorrectly. The TTS engine may mispronounce acronyms like "API" or "NASA". Use the SSML mode to define pronunciation overrides, spelling out acronyms as individual letters when needed.',
          'Error: No voices available. If the voice list is empty, your browser may not support the Web Speech API, or no voices are installed. Chrome on desktop typically has the best voice support.',
          'Error: Audio quality varies by platform. Chrome on Windows uses 24kHz Microsoft voices (fast but less natural), while Safari on macOS uses higher-quality neural voices. The quality difference is inherent to each platform.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Set the speaking rate to 0.9-1.1 for the most natural-sounding speech. Rates below 0.8 sound robotic, and rates above 1.3 may cause the engine to skip words or produce garbled output.',
          'Use this tool to preview how your content sounds when read aloud. This helps identify awkward phrasing, run-on sentences, and abbreviations that need clarification for screen reader users.',
          'For accessibility testing, listen to your web content through TTS to identify issues that screen reader users will encounter. Check that ARIA labels and alt text sound natural when spoken.',
          'SSML (Speech Synthesis Markup Language) gives you fine control over pauses, emphasis, and pronunciation. Use <break time="500ms"/> for pauses and <emphasis> for stressed words.',
          'For production applications requiring consistent voice quality, consider cloud TTS services like Amazon Polly or Google Cloud Text-to-Speech, which offer neural voices with predictable quality across platforms.',
        ],
      },
    ],
    relatedTools: ['word-counter', 'markdown-editor', 'morse-code-translator'],
    faq: [
      { question: 'Why does the voice sound different on different browsers?', answer: 'Each browser/platform uses its own speech engine. Chrome uses Microsoft or Google voices depending on the OS, Firefox uses system voices, and Safari uses macOS voices. Results vary by platform.' },
      { question: 'Can I download the audio file?', answer: 'Our tool plays audio directly in the browser. For downloadable TTS audio files (MP3/WAV), use a server-side TTS API (like Google Cloud TTS or AWS Polly) that returns audio streams.' },
      { question: 'Does this work offline?', answer: 'The Web Speech API requires online access for most voices (they are streamed from the OS or cloud). Chrome caches some voices locally, but full offline TTS requires a downloaded voice pack on your device.' },
      { question: 'How many words can I convert at once?', answer: 'There is no strict limit, but browsers may stop synthesizing after several hundred words. For long texts, split content into paragraphs and play them sequentially for best results.' },
      { question: 'What languages are supported?', answer: 'Language support depends on your browser and OS. Chrome typically supports 20+ languages including English, Spanish, French, German, Chinese, Japanese, and many more. The available voices vary by platform.' },
      { question: 'Is the TTS output suitable for professional use?', answer: 'Browser-based TTS is good for previews, accessibility testing, and casual use. For professional voiceovers, audiobooks, or production content, use dedicated neural TTS services that offer studio-quality voices.' },
      { question: 'Can I control the pronunciation of specific words?', answer: 'Yes, using SSML (Speech Synthesis Markup Language). You can add phonetic pronunciations, spell out acronyms, and insert pauses. Our SSML mode supports these features for fine-grained control.' },
      { question: 'Does the tool work on mobile devices?', answer: 'Yes, the Web Speech API works on most modern mobile browsers. Voice quality varies by device — iOS devices tend to have higher-quality voices than some Android devices.' },
      { question: 'How do I make the voice sound more natural?', answer: 'Use a speaking rate between 0.9 and 1.1, add punctuation for natural pauses, and break long sentences into shorter ones. Punctuation like commas and periods affect where the engine pauses.' },
      { question: 'Can I use this for accessibility testing?', answer: 'Yes, TTS is excellent for testing how screen readers will read your content. Listen for mispronounced words, awkward phrasing, and missing context that could confuse visually impaired users.' },
    ],
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
      {
        heading: 'How to use the JSON to CSV Tool',
        paragraphs: [
          'Step 1: Paste your JSON data into the input area. The JSON should be an array of objects (like API response data) or a single object that can be flattened into a row.',
          'Step 2: The tool automatically detects the JSON structure and flattens nested objects using dot notation (e.g., "address.city" becomes a column header).',
          'Step 3: Preview the first few rows of the CSV output to verify that columns are correct and data is properly aligned before downloading.',
          'Step 4: Choose the delimiter if needed — comma for standard CSV, semicolon for European locale Excel compatibility, or tab for TSV format.',
          'Step 5: Download the CSV file using the download button, or copy the CSV text directly to paste into Excel, Google Sheets, or your data processing tool.',
          'Step 6: Open the CSV in your spreadsheet application and verify that all columns are present and data types are correct (numbers as numbers, not strings).',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: JSON is not an array of objects. The tool works best with JSON arrays like [{"name":"Alice"},{"name":"Bob"}]. A single object or deeply nested structure without a clear tabular shape may not convert correctly.',
          'Error: Inconsistent keys across objects. If some objects have keys that others do not, the CSV fills missing cells with empty values. Review the column list to ensure all expected fields are present.',
          'Error: Excel displays numbers as text. This happens when the CSV lacks a BOM (Byte Order Mark). Our tool outputs UTF-8 with BOM for Excel compatibility. If using another tool, add the BOM prefix.',
          'Error: Commas in data values breaking CSV format. Values containing commas must be enclosed in double quotes in CSV. Our tool follows RFC 4180 and quotes all cells properly to prevent this issue.',
          'Error: Nested arrays producing unexpected output. Arrays within JSON objects can expand to multiple rows or be stored as JSON strings. Choose the expand mode for one row per array element, or compact mode for a single cell.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Preview the first 5 rows before downloading the full CSV. This catches unexpected nesting, missing keys, or data type issues that would produce empty or incorrectly formatted columns.',
          'Use semicolon delimiters for European locale Excel installations where commas are used as decimal separators. Comma-delimited CSV may import incorrectly in these locales.',
          'For large JSON datasets (100,000+ objects), consider using a backend tool like jq or a streaming CSV parser. Browser-based conversion may slow down with very large datasets.',
          'After converting, open the CSV and verify that numbers are stored as numbers (not text strings) and dates are in a consistent format. Some spreadsheet applications auto-detect types during import.',
          'When converting API responses, save the raw JSON first, then convert to CSV. This preserves the original data for re-conversion if you need different column layouts or filtering.',
        ],
      },
    ],
    relatedTools: ['json-formatter', 'xml-formatter', 'diff-checker'],
    faq: [
      { question: 'Can I convert CSV back to JSON?', answer: 'Yes, our toolkit includes a CSV-to-JSON converter. The reverse conversion is simpler because CSV has no nesting — arrays and nested objects must be reconstructed from dot-notation headers.' },
      { question: 'What happens to null values in JSON?', answer: 'Null values in JSON become empty cells in CSV. If you need to preserve "null" as a literal string, toggle the option to keep nulls as text rather than empty cells.' },
      { question: 'Does the tool handle deeply nested JSON (5+ levels)?', answer: 'Yes, the flattening algorithm handles arbitrary depth. Column headers become very long (e.g., "user.profile.settings.notifications.email.enabled"), which may exceed Excel column-width limits. Consider using the compact array mode for deeply nested structures.' },
      { question: 'How do I handle JSON arrays inside objects?', answer: 'Arrays can expand to multiple rows (one per element, repeating parent data) or be stored as JSON strings in a single cell. Choose the mode that fits your analysis needs.' },
      { question: 'What CSV encoding does the tool use?', answer: 'The tool outputs UTF-8 with BOM, which Excel for Windows correctly detects. Without the BOM, Excel may interpret UTF-8 text as Windows-1252, mangling special characters.' },
      { question: 'Can I filter which columns to include in the CSV?', answer: 'After conversion, you can remove unwanted columns in your spreadsheet application. For selective conversion, pre-filter the JSON to include only the keys you need.' },
      { question: 'What is the maximum file size for conversion?', answer: 'The tool handles JSON up to approximately 10MB reliably in the browser. Larger files may cause memory issues. For production ETL pipelines, use backend tools for large datasets.' },
      { question: 'How do I convert a single JSON object to CSV?', answer: 'Wrap the object in an array: [{your-object}]. The tool converts each array element to one CSV row, so a single-object array produces a CSV with one data row and headers.' },
      { question: 'Does the tool support JSON Lines (JSONL) format?', answer: 'The tool is designed for standard JSON arrays. For JSON Lines (one JSON object per line), convert to a JSON array first by wrapping the content in [ and ] and adding commas between objects.' },
      { question: 'Can I choose the column order in the CSV?', answer: 'The tool uses the key order from the first JSON object to determine column order. To change column order, reorder the keys in the first object of the JSON array before converting.' },
    ],
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
      {
        heading: 'How to use the Text to HTML Tool',
        paragraphs: [
          'Step 1: Paste your plain text into the input area. The tool detects paragraphs, headings, lists, and other structural elements from common plain-text conventions.',
          'Step 2: Choose whether to generate body-level HTML (paragraphs, headings, lists) or a full HTML document with DOCTYPE, html, head, and body tags.',
          'Step 3: Enable or disable options like smart quotes (converting straight quotes to curly quotes), link detection (auto-creating mailto: and https:// links), and HTML preservation for mixed content.',
          'Step 4: Review the generated HTML output in the preview panel. The tool applies semantic HTML with proper heading hierarchy and accessibility attributes.',
          'Step 5: Copy the HTML output using the copy button, then paste it into your website, CMS, email template, or documentation.',
          'Step 6: Test the HTML in your target environment to ensure formatting renders correctly across different browsers and email clients.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Input contains hidden formatting markers. Text copied from email clients or word processors may contain invisible characters like zero-width spaces and soft hyphens. The tool strips these, but review the output for visual artifacts.',
          'Error: Not understanding line break behavior. A single newline within a paragraph becomes a <br> (or is ignored), while double newlines create a new paragraph (<p>). Format your input with double newlines between paragraphs.',
          'Error: HTML injection in user-generated content. If converting user text to HTML, the tool sanitizes malicious input by encoding angle brackets and ampersands. Never render user-generated HTML without server-side sanitization.',
          'Error: Missing DOCTYPE declaration. If you select "body content only" mode, the output lacks a DOCTYPE. For standalone HTML pages, enable "Full document" mode to include the complete document structure.',
          'Error: Email client compatibility issues. Different email clients render HTML differently. Test the generated HTML in multiple email clients (Gmail, Outlook, Apple Mail) to ensure consistent display.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Enable smart quotes conversion to turn straight quotes into curly quotes for more professional-looking HTML output. This is especially useful for blog posts and articles.',
          'Use semantic HTML elements (h1-h6, p, ul, ol, blockquote) instead of generic divs. Semantic HTML improves accessibility, SEO, and document structure.',
          'For email templates, keep the HTML simple and avoid advanced CSS. Many email clients strip <style> tags and inline CSS properties. Use table-based layouts for maximum compatibility.',
          'When converting content from a CMS, enable "Preserve HTML" mode to keep existing tags while formatting the plain text portions around them.',
          'For accessibility, ensure the generated HTML includes proper heading hierarchy (h1 before h2 before h3) and alt text placeholders for any detected image references.',
        ],
      },
    ],
    relatedTools: ['markdown-editor', 'json-formatter', 'url-encoder'],
    faq: [
      { question: 'Can I preserve existing HTML tags in the input?', answer: 'Yes, toggle "Preserve HTML" mode to keep existing tags and format only the plain text portions. Use this when editing partial HTML documents or CMS content blocks.' },
      { question: 'Does the tool generate a full HTML document or just body content?', answer: 'By default, it generates body-level HTML (paragraphs, headings, lists). Toggle "Full document" to wrap the output in <!DOCTYPE html>, <html>, <head>, and <body> tags with a configurable title.' },
      { question: 'How are email addresses handled?', answer: 'Detected email addresses are converted to mailto: links. The tool offers optional obfuscation (ROT13 or HTML entity encoding) to reduce spam harvesting while remaining clickable for users.' },
      { question: 'Can I convert Markdown to HTML instead?', answer: 'Yes, the Markdown Editor tool converts Markdown syntax to rendered HTML with a live preview. Use Markdown for more control over formatting than plain text conversion provides.' },
      { question: 'Is the generated HTML accessible?', answer: 'The tool generates semantic HTML with proper heading hierarchy, ARIA labels for navigation structures, and alt text placeholders. For full accessibility, add meaningful alt text and ARIA descriptions manually.' },
      { question: 'How do I add CSS styling to the generated HTML?', answer: 'Add a <style> block in the <head> section (in full document mode) or link to an external stylesheet. For inline styling, add style attributes to individual elements.' },
      { question: 'Can I convert text to HTML for WordPress?', answer: 'Yes, paste the generated HTML into the WordPress HTML editor (not the visual editor) to preserve the formatting. WordPress will render the semantic HTML correctly.' },
      { question: 'Does the tool handle code blocks?', answer: 'Yes, the tool detects indented text or text between fence markers and wraps it in <pre><code> tags for proper code formatting with whitespace preservation.' },
      { question: 'How do I convert plain text to HTML for an email?', answer: 'Paste your email text, select body content mode, and copy the output. For email, keep the HTML simple and test in multiple clients. Many email clients require inline CSS for styling.' },
      { question: 'What is the difference between <br> and <p> tags?', answer: '<br> creates a line break within the same paragraph (single newline). <p> creates a new paragraph with spacing above and below (double newline). Use <p> for distinct blocks of content.' },
    ],
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
      {
        heading: 'How to use the Unit Converter',
        paragraphs: [
          'Step 1: Select the measurement category — Length, Weight, Volume, Temperature, Speed, Time, or Data Storage. Each category contains the relevant units for that type of measurement.',
          'Step 2: Enter the value you want to convert in the "From" field and select the source unit from the dropdown.',
          'Step 3: Select the target unit in the "To" field. The conversion result updates instantly as you type.',
          'Step 4: For temperature conversions, be aware that the relationship between Fahrenheit, Celsius, and Kelvin involves both scaling and offset — the conversion is not a simple multiplication.',
          'Step 5: Check the precision of the result. The tool defaults to 10 significant figures but can be adjusted. For everyday use, 4 decimal places is usually sufficient.',
          'Step 6: Copy the result using the copy button for use in your homework, recipe, engineering calculation, or documentation.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Confusing volume and weight units. Cups, tablespoons, and liters are volume units, not weight. A cup of flour weighs differently than a cup of water. Use the appropriate category for your conversion.',
          'Error: Using the wrong temperature formula. Temperature conversions are not simple multiplications. Fahrenheit to Celsius requires: T(C) = (T(F) - 32) x 5/9. The tool handles this correctly, but understanding the formula prevents errors.',
          'Error: Mixing SI and imperial prefixes. Do not combine metric prefixes (milli-, centi-, kilo-) with imperial units. Convert to a base unit first, then apply the prefix.',
          'Error: Assuming data storage conversions are consistent. Hard drive manufacturers use decimal (1 KB = 1000 bytes), while operating systems use binary (1 KiB = 1024 bytes). The tool lets you choose which convention to use.',
          'Error: Rounding too early in multi-step calculations. Keep full precision during intermediate conversions and round only the final result to avoid accumulated rounding errors.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For cooking conversions, remember that volume and weight are different. A cup of water weighs approximately 237 grams, but a cup of flour weighs approximately 125 grams. Use a kitchen scale for accuracy.',
          'When converting currency, use a dedicated currency converter with live exchange rates. This unit converter uses fixed conversion factors suitable for physical units only.',
          'For engineering work, set the precision to 15 decimal places to leverage the full accuracy of IEEE 754 double-precision floating-point arithmetic.',
          'Common cross-system conversions: miles to kilometers (x1.609), pounds to kilograms (x0.4536), inches to centimeters (x2.54). Memorize these for quick mental estimates.',
          'For scientific notation, the tool handles very large and very small numbers. Use SI prefixes (nano, micro, milli, kilo, mega) to make numbers more readable.',
        ],
      },
    ],
    relatedTools: ['unit-calculator', 'percentage-calculator', 'bmi-calculator'],
    faq: [
      { question: 'Why does 1 foot equal 30.48 cm but 1 cm equals 0.032808399 feet?', answer: '1 foot is exactly 30.48 cm by international agreement. The reverse conversion (1/30.48) produces a repeating decimal. Our tool shows the floating-point result with your chosen precision.' },
      { question: 'Do you support currency conversion?', answer: 'No, currency conversion requires live exchange rates. Our converter handles physical units (length, mass, volume, temperature, speed, time, data) with fixed conversion factors.' },
      { question: 'What is the difference between a metric ton and a US ton?', answer: 'A metric ton (tonne) is 1000 kg. A US short ton is 907.185 kg (2000 lbs). A UK long ton is 1016.047 kg (2240 lbs). Our converter supports all three.' },
      { question: 'How do I convert Celsius to Fahrenheit?', answer: 'Use the formula: F = C x 9/5 + 32. For example, 25C = 25 x 1.8 + 32 = 77F. The tool handles this conversion automatically.' },
      { question: 'What is the difference between mass and weight?', answer: 'Mass is the amount of matter in an object (measured in kilograms). Weight is the force of gravity on that mass (measured in newtons). On Earth, we colloquially use "weight" to mean mass, but they are different concepts.' },
      { question: 'How many bytes in a gigabyte?', answer: 'It depends on the convention. Decimal: 1 GB = 1,000,000,000 bytes (used by hard drive manufacturers). Binary: 1 GiB = 1,073,741,824 bytes (used by operating systems). The tool supports both.' },
      { question: 'Can I convert between metric and imperial?', answer: 'Yes, the converter supports cross-system conversions like miles to kilometers, pounds to kilograms, and inches to centimeters. Select the source and target units from different systems.' },
      { question: 'How precise are the conversions?', answer: 'The tool uses IEEE 754 double-precision floating-point arithmetic with configurable output precision (default 10 significant figures). Conversion factors are exact where international standards define them.' },
      { question: 'What is absolute zero in different temperature scales?', answer: 'Absolute zero is 0 Kelvin, -273.15 degrees Celsius, and -459.67 degrees Fahrenheit. It is the lowest possible temperature where all molecular motion ceases.' },
      { question: 'How do I convert speed units?', answer: 'Select the Speed category, then choose your source and target units (mph, km/h, m/s, knots, etc.). Common conversions: mph to km/h (x1.609), m/s to km/h (x3.6).' },
    ],
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
      {
        heading: 'How to use the Loan Calculator',
        paragraphs: [
          'Step 1: Enter the loan amount (principal) — the total amount you plan to borrow. This is the starting balance before any interest is applied.',
          'Step 2: Enter the annual interest rate (APR). This is the yearly cost of borrowing expressed as a percentage. For example, 5.5% means you pay $5.50 per year for every $100 borrowed.',
          'Step 3: Enter the loan term in years. Common terms are 5 years for auto loans, 15 or 30 years for mortgages, and 2-5 years for personal loans.',
          'Step 4: Review the monthly payment, total interest, and total cost. The calculator shows how much of each payment goes toward principal vs interest.',
          'Step 5: Explore the full amortization schedule to see the principal and interest breakdown for every payment over the life of the loan.',
          'Step 6: Add extra monthly payments to see how much interest you save and how many months early you pay off the loan. Even small extra payments can save thousands.',
          'Step 7: Compare different scenarios by adjusting the rate, term, or principal to find the loan structure that fits your budget.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Confusing APR with interest rate. The interest rate determines your monthly payment. APR includes additional fees (origination, closing costs) and reflects the true cost of borrowing. Always compare APR when evaluating loan offers.',
          'Error: Ignoring the total interest paid. A lower monthly payment usually means a longer term and more total interest. A 30-year mortgage at 6% costs almost as much in interest as the principal itself.',
          'Error: Not accounting for PMI. If your down payment is less than 20% on a mortgage, Private Mortgage Insurance adds to your monthly cost. Include PMI in your calculations for an accurate payment estimate.',
          'Error: Assuming fixed and variable rates behave the same. Variable-rate loans (ARMs) start lower but can increase significantly. Always stress-test your budget against the maximum possible rate.',
          'Error: Forgetting about property taxes and insurance. A mortgage payment is more than principal and interest — PITI (Principal, Interest, Taxes, Insurance) is the true monthly cost of homeownership.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Add extra principal payments to see how much interest you save. Even $50 per month extra on a 30-year mortgage can save thousands of dollars and shorten the term by several years.',
          'Compare APR, not just interest rate, when evaluating loan offers from different lenders. APR includes fees and gives a more complete picture of the loan cost.',
          'Make bi-weekly payments (half the monthly amount every 2 weeks) to effectively make 13 full payments per year instead of 12. This can shorten a 30-year mortgage by 4-5 years.',
          'Use the amortization schedule to find your break-even point for refinancing. If the monthly savings from refinancing exceed the closing costs within a reasonable timeframe, refinancing may be worthwhile.',
          'For adjustable-rate mortgages, calculate your payment at the maximum possible rate to ensure you can afford the worst-case scenario before committing to the loan.',
        ],
      },
    ],
    relatedTools: ['mortgage-calculator', 'percentage-calculator', 'unit-calculator'],
    faq: [
      { question: 'What is the difference between APR and interest rate?', answer: 'The interest rate is the cost of borrowing the principal. APR includes the interest rate plus fees (origination, points, closing costs), giving a more complete picture of the loan cost. APR is always greater than or equal to the interest rate.' },
      { question: 'How does extra payment frequency affect total interest?', answer: 'Making bi-weekly payments (half the monthly payment every 2 weeks) results in 26 half-payments = 13 full payments per year, which is one extra payment annually. This can shorten a 30-year mortgage by 4-5 years and save tens of thousands in interest.' },
      { question: 'What is negative amortization?', answer: 'Negative amortization occurs when the monthly payment is less than the interest due. The unpaid interest is added to the principal, causing the loan balance to grow over time. It is prohibited for most residential mortgages in the US under Dodd-Frank.' },
      { question: 'How do I calculate monthly loan payments?', answer: 'The formula is M = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the principal, r is the monthly interest rate, and n is the total number of payments. Our calculator does this automatically.' },
      { question: 'Should I choose a 15-year or 30-year mortgage?', answer: 'A 15-year mortgage has higher monthly payments but saves significantly in total interest. A 30-year mortgage has lower payments for more flexibility. Choose based on your monthly budget and long-term financial goals.' },
      { question: 'What is a loan origination fee?', answer: 'An origination fee is charged by the lender for processing the loan, typically 0.5-1% of the loan amount. It is included in the APR calculation, not the interest rate.' },
      { question: 'How does my credit score affect my interest rate?', answer: 'Higher credit scores typically qualify for lower interest rates. The difference between a 650 and 750 credit score can mean 0.5-1% lower rate, which significantly reduces total interest over the loan term.' },
      { question: 'What is a balloon payment?', answer: 'A balloon payment is a large lump sum due at the end of a loan term. Some loans have low monthly payments but require the full remaining balance to be paid at the end. This is risky if you cannot refinance or sell the asset.' },
      { question: 'Can I pay off my loan early?', answer: 'Most loans allow early payoff, but some have prepayment penalties. Check your loan agreement. Paying off early saves significant interest, especially on long-term loans like mortgages.' },
      { question: 'What is the 28/36 rule for mortgage affordability?', answer: 'The 28/36 rule states that your housing costs (PITI) should not exceed 28% of gross monthly income, and total debt payments should not exceed 36%. This helps ensure you can comfortably afford your mortgage.' },
    ],
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
      {
        heading: 'How to use the Percentage Calculator',
        paragraphs: [
          'Step 1: Select the type of percentage calculation you need — "What is X% of Y?", "X is what percent of Y?", "Percentage increase/decrease", or "Reverse percentage".',
          'Step 2: Enter the known values in the input fields. The calculator updates the result instantly as you type.',
          'Step 3: For "What is X% of Y?", enter the percentage and the base number. For example, enter 15 and 200 to find that 15% of 200 is 30.',
          'Step 4: For "X is what percent of Y?", enter the part and the whole. For example, enter 30 and 200 to find that 30 is 15% of 200.',
          'Step 5: For percentage increase or decrease, enter the original value and the new value. The tool shows both the absolute difference and the relative percentage change.',
          'Step 6: For reverse percentage, enter the result after the percentage was applied and the percentage itself. The tool calculates the original value before the percentage was applied.',
          'Step 7: Copy the result for use in your report, shopping calculation, or data analysis.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Confusing percentage points with percent change. If a rate goes from 2% to 3%, that is a 1 percentage point increase but a 50% relative increase. These are different metrics and should not be used interchangeably.',
          'Error: Using the wrong base for percentage change. The formula is (new - original) / original x 100. If you reverse the order (original - new) / new, you get the wrong percentage. Always divide by the original value.',
          'Error: Assuming a 50% decrease undoes a 50% increase. A 50% increase from 100 gives 150. A 50% decrease from 150 gives 75, not 100. The base changes with each operation.',
          'Error: Rounding too early in multi-step calculations. Keep full precision during intermediate steps and round only the final result. Rounding each step introduces cumulative error.',
          'Error: Not understanding that percentages can exceed 100%. A 200% increase means the new value is triple the original. Percentages are not limited to 0-100% in calculations.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For reverse percentage calculations (finding the original before a percentage was applied), use the formula: original = result / (1 + percentage/100). Our calculator has a dedicated mode for this.',
          'When computing tax amounts, apply the discount before tax. Discounted subtotal x tax rate = tax amount. This ensures you pay tax on the reduced price, not the original.',
          'For quick mental estimates: 10% is move the decimal one place left, 5% is half of 10%, 1% is move the decimal two places left. These shortcuts help verify calculator results.',
          'In business reporting, always include both the percentage change and the absolute numbers. "Sales increased 50%" sounds impressive but may mean only 1 additional unit if the base was 2.',
          'For financial calculations, use banker rounding (round half to even) to minimize cumulative bias. This is the IEEE 754 standard used in accounting and financial software.',
        ],
      },
    ],
    relatedTools: ['discount-calculator', 'tip-calculator', 'loan-calculator'],
    faq: [
      { question: 'How do I calculate a percentage of a percentage?', answer: 'Multiply the percentages: 20% of 50% = 0.20 x 0.50 = 0.10 = 10%. This is common when calculating tax on a discounted price (pay sales tax on the discounted amount).' },
      { question: 'What is the difference between percentage and percentage point?', answer: 'A percentage point is the arithmetic difference between two percentages. If a rate rises from 4% to 6%, that is a 2 percentage point increase. The relative increase is 50% (2/4 x 100). Percentage points describe the absolute difference.' },
      { question: 'When are percentages misleading?', answer: 'Percentages can be misleading when the base is small. "100% increase" from 1 to 2 sounds dramatic but represents only 1 additional unit. Always report the absolute values alongside percentages for context.' },
      { question: 'How do I calculate a 20% tip?', answer: 'Multiply the bill by 0.20. For quick mental math, move the decimal one place left to find 10%, then double it. For a $50 bill: 10% = $5, 20% = $10.' },
      { question: 'How do I find what percent one number is of another?', answer: 'Divide the part by the whole and multiply by 100. For example, 30 out of 200: 30 / 200 x 100 = 15%. Our calculator does this in the "X is what percent of Y?" mode.' },
      { question: 'What is a compound percentage increase?', answer: 'A compound increase applies the percentage to the new value each period. For example, 10% growth per year means year 2 is 10% more than year 1, not the original. The formula is: final = original x (1 + rate)^periods.' },
      { question: 'How do I calculate percentage decrease?', answer: 'Use the formula: decrease % = (original - new) / original x 100. For example, from 200 to 150: (200 - 150) / 200 x 100 = 25% decrease.' },
      { question: 'Can percentages be negative?', answer: 'Yes, a negative percentage indicates a decrease. For example, -5% means a 5% reduction from the original value. This is common in financial reporting for losses or declines.' },
      { question: 'How do I calculate a weighted average percentage?', answer: 'Multiply each percentage by its weight, sum the results, and divide by the total weight. For example, if 60% of students scored 80% and 40% scored 90%, the weighted average is (0.6 x 80 + 0.4 x 90) = 84%.' },
      { question: 'What is the difference between simple and compound interest percentages?', answer: 'Simple interest applies the percentage to the original amount each period. Compound interest applies the percentage to the growing balance (principal + accumulated interest). Compound interest grows faster over time.' },
    ],
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
      {
        heading: 'How to use the Mortgage Calculator',
        paragraphs: [
          'Step 1: Enter the home price or total loan amount. If you are making a down payment, enter the home price separately and the down payment amount or percentage.',
          'Step 2: Enter the down payment. A 20% down payment avoids Private Mortgage Insurance (PMI). Lower down payments are possible but add PMI to your monthly cost.',
          'Step 3: Enter the interest rate (APR). Check current rates from multiple lenders — even a 0.25% difference significantly impacts total interest over 30 years.',
          'Step 4: Select the loan term — 30-year fixed is most common, 15-year fixed saves substantial interest, and adjustable-rate (ARM) options start lower but carry risk.',
          'Step 5: Enter property tax rate, homeowner insurance, and HOA fees if applicable. These are part of your true monthly housing cost (PITI).',
          'Step 6: Review the monthly payment breakdown showing principal, interest, taxes, insurance, and PMI. Compare different scenarios using the side-by-side comparison feature.',
          'Step 7: Examine the amortization schedule to see how much of each payment goes to interest vs principal over the life of the loan.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Ignoring PMI costs. If your down payment is less than 20%, PMI adds 0.5-1.5% of the loan amount annually to your payment. PMI drops off automatically at 78% loan-to-value, but factor it into your budget.',
          'Error: Only looking at principal and interest. The true monthly cost includes taxes, insurance, and HOA fees. A $1500 P&I payment can become $2200+ with all components included.',
          'Error: Not comparing total interest paid. A 30-year mortgage at 6% on a $300,000 loan costs approximately $347,000 in interest — more than the principal itself. Compare this to a 15-year term.',
          'Error: Forgetting about closing costs. Closing costs are typically 2-5% of the loan amount. On a $300,000 loan, that is $6,000-$15,000 in upfront costs that affect your break-even calculation.',
          'Error: Assuming the lowest rate is always best. Discount points (prepaid interest) reduce the rate but cost money upfront. Calculate the break-even period to see if buying points makes financial sense for your situation.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use the amortization table to find your break-even point for refinancing. If the monthly savings from a lower rate exceed closing costs within the time you plan to stay in the home, refinancing is worthwhile.',
          'Include HOA fees in your monthly budget even though they are not part of the mortgage payment. HOA fees can range from $100 to $500+ per month and affect your total housing cost.',
          'Compare at least three scenarios: 30-year fixed, 15-year fixed, and a 5/1 ARM. This gives you a complete picture of payment options and total costs for different loan structures.',
          'For first-time buyers, explore FHA loans (3.5% down) and conventional loans with 3% down. Compare the total cost including PMI against saving for a 20% down payment.',
          'Factor in property tax increases over time. Property taxes typically increase 2-3% annually, which increases your monthly payment even with a fixed-rate mortgage.',
        ],
      },
    ],
    relatedTools: ['loan-calculator', 'percentage-calculator', 'unit-calculator'],
    faq: [
      { question: 'What is the debt-to-income ratio and how does it affect me?', answer: 'DTI is your total monthly debt payments (including the new mortgage PITI) divided by your gross monthly income. Lenders typically require a DTI below 43% (FHA) or 36% (conventional). Use our DTI calculator to check your ratios before applying.' },
      { question: 'Should I put 20% down?', answer: '20% down avoids PMI and may get a better rate, but it is not always necessary. FHA loans require as little as 3.5% down, and conventional loans allow 3% down for first-time buyers. Compare the monthly cost of PMI against the years of saving to reach 20%.' },
      { question: 'What is escrow and how does it work?', answer: 'Escrow is an account managed by the lender that collects property taxes and insurance premiums as part of your monthly payment. The lender pays these bills on your behalf. This ensures taxes and insurance are always paid but also means higher monthly payments.' },
      { question: 'What is the difference between a fixed-rate and adjustable-rate mortgage?', answer: 'A fixed-rate mortgage keeps the same interest rate for the entire loan term, providing predictable payments. An ARM starts with a lower rate that adjusts periodically based on market conditions, which can increase your payment over time.' },
      { question: 'How much house can I afford?', answer: 'A common guideline is the 28/36 rule: housing costs should not exceed 28% of gross monthly income, and total debt should not exceed 36%. Use the calculator to test different home prices against your income and debt levels.' },
      { question: 'What are mortgage points?', answer: 'Points are prepaid interest paid at closing to reduce your interest rate. One point costs 1% of the loan amount and typically reduces the rate by 0.25%. The break-even period determines if buying points saves money over time.' },
      { question: 'How does refinancing work?', answer: 'Refinancing replaces your existing mortgage with a new loan, typically at a lower interest rate. You pay closing costs again but can save significantly if the rate reduction exceeds the costs within the time you plan to stay in the home.' },
      { question: 'What is the difference between pre-qualification and pre-approval?', answer: 'Pre-qualification is an estimate of how much you might borrow based on self-reported information. Pre-approval involves a credit check and documentation review, giving you a specific loan amount you are approved for. Sellers prefer pre-approved buyers.' },
      { question: 'How does my credit score affect my mortgage rate?', answer: 'Higher credit scores qualify for lower rates. The difference between a 660 and 760 score can mean 0.5-1% lower rate, which saves tens of thousands over 30 years. Improve your score before applying for the best rate.' },
      { question: 'What is private mortgage insurance (PMI)?', answer: 'PMI protects the lender if you default on the loan. It is required when your down payment is less than 20%. PMI typically costs 0.5-1.5% of the loan amount annually and can be removed once you reach 20% equity.' },
    ],
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
      {
        heading: 'How to use the Age Calculator',
        paragraphs: [
          'Step 1: Enter the date of birth in the birth date field. You can use the date picker or type the date in MM/DD/YYYY format.',
          'Step 2: Enter the "as of" date — this defaults to today but can be set to any future or past date to calculate age at a specific point in time.',
          'Step 3: The calculator instantly displays the exact age in years, months, and days. It also shows the total days since birth for reference.',
          'Step 4: For leap year birthdays (February 29), the tool shows both the legal age (using jurisdiction-specific rules) and the exact days alive.',
          'Step 5: Use the age-at-date feature for legal forms — calculate exactly how old someone will be on a future date like a contract signing or travel date.',
          'Step 6: Review the next birthday countdown to see the exact time remaining until the person turns a year older.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Subtracting birth year from current year without checking if the birthday has occurred yet. If today is March 2026 and the birthdate is May 1990, the person is 35, not 36. The calculator handles this correctly.',
          'Error: Forgetting about leap years. Someone born on February 29 in a leap year has a legal birthday of February 28 or March 1 in non-leap years, depending on jurisdiction. The tool accounts for this.',
          'Error: Mixing up date formats. Different countries use DD/MM/YYYY, MM/DD/YYYY, or YYYY-MM-DD. Ensure you enter dates in the format the tool expects to avoid incorrect calculations.',
          'Error: Ignoring timezone differences. If someone is born just before midnight in one timezone and the current time is just after midnight in another, the calendar date may differ. The tool uses the browser local timezone by default.',
          'Error: Using age for legal purposes without jurisdiction-specific rules. Age for drinking, voting, and contracts varies by country and state. The tool calculates chronological age; verify legal age requirements separately.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'Use the "age at specific date" feature for legal forms — calculate exactly how old someone will be on a future date like contract signing, travel date, or eligibility cutoff.',
          'For international applications, specify the jurisdiction timezone to get legally correct age. A person in Tokyo may be "one day older" than someone born at the same UTC moment in New York.',
          'When calculating age for forms that require "age as of today", use the current date default. For forms with a specific cutoff date (like school enrollment), set the as-of date to the enrollment deadline.',
          'Remember that age calculations are timezone-dependent. The same birth moment produces different calendar dates depending on the timezone, which affects the calculated age.',
          'For database queries, compute age in application code rather than SQL for better timezone handling. SQL date functions may not account for timezone differences correctly.',
        ],
      },
    ],
    relatedTools: ['bmi-calculator', 'unit-converter', 'percentage-calculator'],
    faq: [
      { question: 'How do I calculate age if born on February 29?', answer: 'For legal purposes, most jurisdictions consider the birthday to be March 1 in non-leap years (the day after February 28). Our calculator shows both the legal age (using the jurisdiction rule) and the exact days since birth for reference.' },
      { question: 'Why does my age change at different times on my birthday?', answer: 'Your legal age changes at midnight in your local timezone. Our calculator shows the exact time remaining until your next birthday, which is timezone-dependent.' },
      { question: 'What is the difference between chronological age and biological age?', answer: 'Chronological age is the time elapsed since birth (what our calculator computes). Biological age estimates health status based on biomarkers and lifestyle factors — it requires a medical assessment and is not computable from dates alone.' },
      { question: 'How do I calculate age in Excel?', answer: 'Use the formula =DATEDIF(birthdate, TODAY(), "Y") for years, or =DATEDIF(birthdate, TODAY(), "YM") for remaining months. For a more detailed result, combine multiple DATEDIF calls.' },
      { question: 'Can I calculate age from just a year of birth?', answer: 'Yes, but the result is approximate. Without the exact birth date, the calculator assumes January 1 as the birth date, which may be off by up to 364 days.' },
      { question: 'How do I calculate the number of days between two dates?', answer: 'Enter the start date as the birth date and the end date as the "as of" date. The calculator shows total days along with years, months, and days breakdown.' },
      { question: 'Is the age calculation affected by daylight saving time?', answer: 'DST transitions can shift the clock by one hour, but this rarely affects age calculation unless the birth occurred exactly during a DST transition. The tool uses the local timezone consistently.' },
      { question: 'How do I calculate age for school enrollment?', answer: 'Set the "as of" date to the school enrollment deadline or cutoff date. Many schools have specific age requirements by a certain date (like September 1), and the calculator helps verify eligibility.' },
      { question: 'What is the age of consent in different states?', answer: 'Age of consent varies by jurisdiction (typically 16-18 in the US). This calculator computes chronological age only — always verify legal requirements with the specific jurisdiction for compliance.' },
      { question: 'How accurate is the age calculation?', answer: 'The calculator uses the browser local timezone and JavaScript Date objects for precision. For most purposes, the result is accurate to the day. Timezone edge cases near midnight may produce a 1-day difference.' },
    ],
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
      {
        heading: 'How to use the BMI Calculator',
        paragraphs: [
          'Step 1: Select your preferred unit system — metric (kilograms and centimeters) or imperial (pounds and inches). Toggle between them to match the measurements you have.',
          'Step 2: Enter your weight. In metric mode, enter kilograms. In imperial mode, enter pounds. The tool accepts decimal values for precision.',
          'Step 3: Enter your height. In metric mode, enter centimeters. In imperial mode, enter inches. The tool automatically converts between systems if needed.',
          'Step 4: Review your BMI result, which is displayed as a number with one decimal place (e.g., 24.5). The classification (underweight, normal, overweight, obese) is shown alongside.',
          'Step 5: Read the color-coded health range indicator. Green indicates normal range, yellow indicates overweight, and red indicates obese ranges, with clear text labels.',
          'Step 6: Use the result as a starting point for health discussions with your doctor. BMI is a screening tool, not a diagnosis — always combine it with other health indicators.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Using BMI for athletes or muscular individuals. BMI does not distinguish between muscle and fat. A bodybuilder at 10% body fat may register as obese. Use body fat percentage for more accurate assessment of muscular people.',
          'Error: Using adult BMI categories for children and teens. Children and adolescents require age- and sex-adjusted BMI percentiles. A BMI of 25 in a 10-year-old has a completely different meaning than in a 40-year-old.',
          'Error: Ignoring waist circumference. BMI does not indicate where fat is stored. Visceral fat (around organs) is more dangerous than subcutaneous fat. Measure waist circumference alongside BMI for a more complete health picture.',
          'Error: Relying on BMI alone for health decisions. BMI is a screening tool, not a diagnostic one. It should be combined with blood pressure, cholesterol, blood sugar, and other biomarkers for meaningful health assessment.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For the most accurate weight, measure yourself in the morning before eating or drinking. Weight can fluctuate 2-5 pounds throughout the day due to food, water, and activity.',
          'Track BMI trends over time rather than focusing on a single measurement. A gradual upward or downward trend is more meaningful than day-to-day fluctuations.',
          'Combine BMI with waist circumference measurement. For men, a waist over 40 inches indicates increased health risk. For women, the threshold is 35 inches.',
          'For children and teenagers, use age- and sex-specific BMI percentile charts from the CDC. A child BMI between the 5th and 85th percentile is considered healthy.',
          'Consider using additional body composition metrics like body fat percentage, waist-to-hip ratio, or waist-to-height ratio alongside BMI for a more complete health picture.',
        ],
      },
    ],
    relatedTools: ['age-calculator', 'unit-converter', 'percentage-calculator'],
    faq: [
      { question: 'Is BMI accurate for all body types?', answer: 'No. BMI does not distinguish between muscle and fat, so muscular individuals may be misclassified as overweight/obese. It also does not account for fat distribution (visceral vs subcutaneous), which is a stronger health predictor than total body fat.' },
      { question: 'Why does the WHO use different BMI cutoffs for Asian populations?', answer: 'Studies show that Asian populations have higher body fat percentage and cardiovascular risk at lower BMI values. The WHO recommends lower thresholds: overweight at 23+ and obese at 27.5+ for Asian populations.' },
      { question: 'What is a healthy BMI for older adults?', answer: 'For adults over 65, a BMI of 24-27 is associated with the lowest mortality risk (the "obesity paradox"). A "normal" BMI of 18.5-24.9 may indicate frailty or muscle loss in older populations. Always consult a doctor for age-appropriate health targets.' },
      { question: 'How do I calculate BMI?', answer: 'BMI = weight(kg) / height(m) squared. For imperial: BMI = weight(lbs) / height(in) squared x 703. Our calculator does this automatically when you enter your height and weight.' },
      { question: 'What is the difference between BMI and body fat percentage?', answer: 'BMI is a ratio of weight to height that estimates body fatness. Body fat percentage directly measures the proportion of fat in your body. Body fat percentage is more accurate but requires specialized equipment to measure.' },
      { question: 'Can BMI be wrong for pregnant women?', answer: 'Yes, BMI is not designed for pregnant women because pregnancy naturally increases weight. Healthcare providers use pre-pregnancy BMI to guide weight gain recommendations during pregnancy.' },
      { question: 'What BMI is considered obese?', answer: 'A BMI of 30 or above is classified as obese by the WHO. Obesity is further divided into Class I (30-34.9), Class II (35-39.9), and Class III (40+), each with increasing health risk.' },
      { question: 'Does BMI account for age and gender?', answer: 'Standard BMI does not account for age or gender, which is one of its limitations. Children use age- and sex-adjusted BMI percentiles. For adults, waist circumference and body fat percentage can provide gender-specific health insights.' },
      { question: 'How often should I check my BMI?', answer: 'For most adults, checking BMI monthly or quarterly provides useful trend data. Daily fluctuations are mostly due to water retention and are not meaningful. Focus on long-term trends rather than daily changes.' },
      { question: 'What should I do if my BMI is high?', answer: 'Consult a healthcare provider for personalized advice. Generally, increasing physical activity, eating a balanced diet, and reducing processed food intake can help manage weight. BMI is a starting point, not a diagnosis.' },
    ],
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
      {
        heading: 'How to use the Discount Calculator',
        paragraphs: [
          'Step 1: Enter the original price of the item in the price field. This is the retail or list price before any discount is applied.',
          'Step 2: Choose the discount type — percentage off (like 25% off) or fixed amount off (like $10 off). Select the appropriate option.',
          'Step 3: Enter the discount value. For percentage discounts, enter the percentage (e.g., 25 for 25%). For fixed discounts, enter the dollar amount.',
          'Step 4: The calculator instantly shows the discounted price and the amount you save. Both values update as you change the inputs.',
          'Step 5: For stacked discounts, apply them sequentially — enter the first discount, get the new price, then enter that as the original for the second discount.',
          'Step 6: Use the reverse calculation mode to determine what percentage discount was applied if you know the original and final prices.',
          'Step 7: Copy the results for use in your shopping comparison, pricing analysis, or e-commerce testing.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Adding multiple discounts together. A 20% discount plus a $10 coupon is not simply additive — the second discount applies to the already-reduced price, not the original.',
          'Error: Confusing "percent off" with "percent of". "25% off $80" means you save $20 and pay $60. "25% of $80" means you pay $20. These are different calculations.',
          'Error: Thinking triple discounts are additive. "50% off + 20% off + 10% off" sounds like 80% off but is actually 64% off (1 x 0.5 x 0.8 x 0.9 = 0.36). Each discount multiplies the remaining amount.',
          'Error: Not accounting for tax. Discounts apply to the subtotal before tax. The final price includes tax on the discounted amount, which may differ from your expectation.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For online shopping, calculate the final price including shipping and tax to understand the true total cost. A "20% off" deal may be offset by high shipping fees.',
          'When comparing deals, calculate the effective discount percentage for stacked offers. "50% off + 20% off" is really 60% off, not 70% off.',
          'For e-commerce testing, verify that your cart system applies discounts in the correct order. The order of application (percentage first vs dollar first) affects the final price.',
          'Use the reverse calculation mode when you see a sale price but not the original discount percentage. Enter both prices to find out the exact percentage saved.',
        ],
      },
    ],
    relatedTools: ['percentage-calculator', 'tip-calculator', 'loan-calculator'],
    faq: [
      { question: 'How do I calculate the final price after a percentage discount?', answer: 'Final price = Original price x (1 - Discount percentage / 100). For example, $80 with 25% off = $80 x 0.75 = $60.' },
      { question: 'How are stacked discounts calculated?', answer: 'Stacked discounts are applied sequentially. First discount applies to the original price, then the second discount applies to the result. For example, $100 with 20% off then $10 off = $100 x 0.80 = $80, then $80 - $10 = $70. The total discount is $30, not $20 + $10.' },
      { question: 'What is a "triple discount" and why is it often misleading?', answer: 'Triple discounts (e.g., "50% off + 20% off + 10% off") sound like 80% off but are actually 64% off (1 x 0.5 x 0.8 x 0.9 = 0.36). This marketing tactic inflates perceived savings. Our calculator shows the true combined percentage.' },
      { question: 'How do I calculate the original price from a discounted price?', answer: 'Original price = Discounted price / (1 - Discount percentage / 100). For example, if you paid $60 after a 25% discount: $60 / 0.75 = $80 original price.' },
      { question: 'Does the discount apply before or after tax?', answer: 'Discounts typically apply to the subtotal before tax. You pay tax on the discounted amount. For example, $80 item with 25% off = $60, then tax on $60, not $80.' },
      { question: 'What is the difference between percentage off and fixed amount off?', answer: 'Percentage off reduces the price by a proportion (e.g., 20% of $100 = $20 savings). Fixed amount off reduces by a specific dollar value (e.g., $15 off $100 = $85). Percentage off saves more on expensive items.' },
      { question: 'How do I calculate the discount percentage from prices?', answer: 'Discount % = (Original - Final) / Original x 100. For example, from $100 to $75: ($100 - $75) / $100 x 100 = 25% discount.' },
      { question: 'Can I use this for bulk pricing discounts?', answer: 'Yes, enter the full retail price and the bulk discount percentage. For tiered discounts (different rates at different quantities), calculate each tier separately.' },
      { question: 'How do BOGO (Buy One Get One) deals work?', answer: 'BOGO is effectively a 50% discount when you buy two items — you pay full price for one and get the second free. Our calculator handles this as a percentage discount equal to 50% off the combined price of two items.' },
      { question: 'What is a loss-leader discount?', answer: 'A loss-leader is sold below cost to attract customers. If an item costs $50 and sells for $35, the loss is $15 (30% below cost). This is a pricing strategy, not a sustainable discount.' },
    ],
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
      {
        heading: 'How to use the Tip Calculator',
        paragraphs: [
          'Step 1: Enter your total bill amount before tax. This is your subtotal from the receipt or menu total.',
          'Step 2: Select the service level or enter a custom tip percentage. The calculator offers presets for 15%, 18%, and 20% based on common US tipping standards.',
          'Step 3: Choose whether to calculate the tip on the pre-tax or post-tax amount. Pre-tax is considered the standard in most tipping etiquette guides.',
          'Step 4: Enter the number of people splitting the bill if dining in a group. The calculator divides the total (bill + tip) evenly among all participants.',
          'Step 5: Review the breakdown showing the tip amount, the total with tip, and the per-person share. All values update instantly as you adjust inputs.',
          'Step 6: Use the round-up option to round the tip to the nearest dollar for simpler cash payments or to leave a slightly more generous tip.',
          'Step 7: Copy the final amounts for expense tracking, splitting apps, or group payment coordination.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Tipping on the post-tax total. While technically acceptable, tipping on tax inflates the gratuity unnecessarily. Calculate tip on the pre-tax subtotal for a fairer and more standard approach.',
          'Error: Splitting the tip equally when items are unequal. If one person ordered an expensive steak and another ordered a salad, equal splitting disadvantages the salad eater. Use the custom split feature to allocate portions fairly.',
          'Error: Using outdated tip percentages. The 15% standard is now considered the minimum for acceptable service. 18-20% is the norm in most US urban areas. Update your mental benchmarks accordingly.',
          'Error: Forgetting to tip on drinks when dining out. If you order drinks at the bar before sitting at a table, the bartender expects a tip on those items separately from the dinner tip.',
          'Error: Rounding down instead of up when using round-up. If the tip comes to $7.20, rounding down to $7 reduces the gratuity. The round-up option correctly goes to $8 for a more generous tip.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For casual dining (counter service, takeout), 10-15% is acceptable. For full-service sit-down restaurants, aim for 18-20%. For exceptional service, 25%+ shows appreciation.',
          'When splitting checks with friends, calculate tip on each person\'s individual subtotal rather than the combined total — this gives each person exactly the right tip percentage for their portion.',
          'For large parties (6+), many US restaurants automatically add an 18-20% gratuity. Check your bill before adding an additional tip to avoid double-tipping.',
          'Use the pre-tax total as your tip base. This is the standard etiquette recommendation and avoids tipping on government-collected tax, which is not part of the service value.',
          'When in doubt about the local tipping custom while traveling, ask locals or check a tipping guide. Over-tipping is rarely offensive, but under-tipping can be considered rude in cultures where tipping is expected.',
        ],
      },
    ],
    faq: [
      { question: 'Should I tip on the pretax or post-tax amount?', answer: 'Tipping on the pretax amount is more common and fairer (the tax is not a service-provided item). However, many point-of-sale systems calculate tip suggestions on the post-tax total for simplicity. Our calculator supports both options.' },
      { question: 'How do I split a tip unevenly among a group?', answer: 'Our calculator supports custom splits — enter each person\'s share (e.g., Person 1 pays for 2 drinks, Person 2 pays for the meal). The tool calculates each person\'s contribution plus their proportionate share of the tip.' },
      { question: 'Why is 15% the standard tip in the US?', answer: 'The 15% standard dates to the 1930s when it was codified as the expected rate in hospitality guides. It has since risen to 18-20% in urban areas due to inflation and the stagnant tipped minimum wage. The cultural expectation continues to rise (some POS systems suggest 25-30% options).' },
      { question: 'How much should I tip for delivery?', answer: 'For food delivery, 15-20% of the order total is standard, with a minimum of $3-5 for small orders. For large or heavy deliveries, consider tipping 20-25% since delivery drivers use their own vehicle and gas.' },
      { question: 'How much tip should I leave for a haircut?', answer: 'For hairstylists, 15-20% of the service cost is standard. For a $50 haircut, a $7.50-$10 tip is appropriate. For exceptional service or a complex style, 20% or more is generous.' },
      { question: 'Do I need to tip at a coffee shop?', answer: 'At counter-service coffee shops, a $1-2 tip or rounding up the total is appreciated but not always expected. For specialty coffee with complex drinks, 15-20% is a kind gesture.' },
      { question: 'How much should I tip a taxi or rideshare driver?', answer: 'For taxis, 15-20% of the fare is standard. For rideshare services like Uber or Lyft, 15-20% is also appropriate, especially for longer rides or helpful drivers who assist with luggage.' },
      { question: 'Is it rude to not tip in the US?', answer: 'In the US, where tipped workers earn a lower minimum wage ($2.13/hour federal), tipping is considered a social obligation rather than optional. Not tipping for table service is widely considered rude. For counter service, tipping is appreciated but less expected.' },
      { question: 'How do I calculate tip in other countries?', answer: 'Tipping norms vary widely. In Japan, tipping is not customary and can be seen as rude. In the UK, 10-12.5% is standard. In Australia, rounding up or 10% is appreciated. Our calculator provides country-based presets for common destinations.' },
      { question: 'Can I use this calculator for non-restaurant tips?', answer: 'Yes, the calculator works for any tipping scenario — haircuts, spa services, hotel housekeeping, valet parking, moving crews, and more. Just enter the service cost and select the appropriate tip percentage for that service type.' },
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
          'UX and UI designers frequently need px-to-inch conversions when preparing screen designs for print presentation or when specifying physical dimensions for signage and kiosk displays. A mobile mockup created at 375 x 812 pixels (iPhone standard) converts to roughly 3.9 x 8.46 inches at 96 DPI — useful for understanding how that design would look as a printed prototype.',
          'Print designers working with digital assets need to convert pixel-based images into inch dimensions for layout software like InDesign or QuarkXPress. Knowing the physical size of a raster image at a given DPI helps determine if it has sufficient resolution for the intended print size.',
        ],
      },
      {
        heading: 'How to use the PX to Inches Converter',
        paragraphs: [
          'Step 1: Select the DPI preset that matches your use case — 72 DPI for legacy web, 96 DPI for standard screens, 150 DPI for draft print, or 300 DPI for high-quality print.',
          'Step 2: Enter the pixel value in the PX input field. The inches result updates instantly as you type.',
          'Step 3: Toggle Width x Height mode if you need to convert both dimensions of an image or document at once. All four fields (width and height in both px and inches) stay synchronized.',
          'Step 4: Use the swap button to quickly convert in the opposite direction (inches to pixels) without re-entering values.',
          'Step 5: Copy the inch value using the copy button next to the result field for pasting into your design software or specifications.',
          'Step 6: For custom DPI settings not in the presets, select Custom and enter your specific DPI value. The converter handles any resolution.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Using 72 DPI for print. 72 DPI is a legacy screen standard and produces poor-quality print output. Always use 300 DPI for professional print results.',
          'Error: Not accounting for the actual screen DPI. Modern screens (Retina, 4K) have much higher DPI than the standard 96. A 1920px image on a 4K screen (approximately 192 DPI) is physically smaller than on a 1080p screen (96 DPI).',
          'Error: Assuming pixels are a fixed physical size. Pixels have no inherent physical size — their physical dimension depends entirely on the DPI of the output device. The same 100px image is 1.04 inches at 96 DPI but only 0.33 inches at 300 DPI.',
          'Error: Mixing up px-to-inches with inches-to-px. The two directions use inverse formulas. px to inches divides by DPI; inches to px multiplies by DPI. Use the correct direction for your need.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For web design, use 96 DPI as the baseline. Most CSS px units correspond to 1/96 of an inch at the standard browser zoom level.',
          'When preparing images for print, always verify the inch dimensions at 300 DPI before finalizing your layout. An image that looks perfect on screen may be too small for the intended print size.',
          'Use the reference table of common conversions to quickly look up standard sizes without calculating. This is especially useful for standard paper sizes and screen resolutions.',
          'For responsive web design, remember that CSS pixels and physical inches differ across devices. A 10-inch physical measurement corresponds to different pixel counts on different screens.',
        ],
      },
    ],
    faq: [
      { question: 'How do I convert px to inches?', answer: 'Divide the number of pixels by the DPI. For example, 600 px divided by 300 DPI = 2 inches. Our tool does this instantly — just enter your pixel value and select the DPI.' },
      { question: 'What is 1920 px in inches at 96 DPI?', answer: '1920 px divided by 96 DPI = 20 inches. This is the standard full HD screen width measured in inches at typical monitor resolution.' },
      { question: 'What DPI should I use for screen design?', answer: 'Use 96 DPI for standard Windows screens and web design. Use 72 DPI for legacy Mac standard. Use 300 DPI for print quality. The DPI depends on the output medium.' },
      { question: 'How many pixels is a standard business card?', answer: 'A standard US business card (3.5 x 2 inches) at 300 DPI is 1050 x 600 pixels. At 96 DPI it is 336 x 192 pixels, which is too low for print quality.' },
      { question: 'What is the difference between DPI and PPI?', answer: 'PPI (pixels per inch) refers to pixel density in a digital image. DPI (dots per inch) refers to dot density in printed output. For conversion purposes they are equivalent.' },
      { question: 'Can I use this tool for print design?', answer: 'Yes, set the DPI to 300 for print-quality conversions. This gives you the pixel dimensions needed for print layouts in InDesign, Illustrator, or Photoshop.' },
      { question: 'How do I convert a photo dimension from px to inches?', answer: 'Enter the pixel width or height and set DPI to 300 for print or 96 for screen. The tool shows the physical inch dimension. Use Width x Height mode for both dimensions at once.' },
      { question: 'Why do my images look small when printed?', answer: 'If your image has low pixel count at 300 DPI, the physical print size is small. For example, 600 pixels at 300 DPI is only 2 inches. You need more pixels for larger print sizes.' },
      { question: 'Is 72 DPI good enough for web?', answer: 'Yes, 72 DPI (or 96 DPI for Windows) is standard for web images. Screens display at their native resolution, so the DPI setting mainly affects how image dimensions are interpreted for layout.' },
      { question: 'How do I resize an image for print?', answer: 'Convert the pixel dimensions to inches at 300 DPI using this tool. If the inch result is smaller than your target print size, the image needs upscaling or a lower-resolution print.' },
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
      {
        heading: 'How to use the Inches to PX Converter',
        paragraphs: [
          'Step 1: Select the DPI preset that matches your output target — 96 DPI for standard screens, 150 DPI for draft print, or 300 DPI for high-quality print.',
          'Step 2: Enter the inch value in the Inches input field. The pixel result updates instantly as you type.',
          'Step 3: Toggle Width x Height mode to convert both width and height dimensions at once. This is ideal for setting up canvas sizes in Photoshop, Illustrator, or Figma.',
          'Step 4: Use the swap button to convert in the opposite direction (pixels to inches) without re-entering values.',
          'Step 5: Copy the pixel value using the copy button for pasting into your design software, CSS, or canvas configuration.',
          'Step 6: For custom DPI values, select Custom and enter your specific resolution. The tool calculates accurate pixel values for any DPI.',
        ],
      },
      {
        heading: 'Common mistakes and how to fix them',
        paragraphs: [
          'Error: Using the wrong DPI for the target medium. Screen design uses 96 DPI, print uses 300 DPI. Using 96 DPI for print produces pixelated output because the pixel count is too low for the physical size.',
          'Error: Not rounding pixel values appropriately. Pixel values are integers — you cannot have 1050.5 pixels. The tool rounds to the nearest whole pixel, but verify the result makes sense for your layout grid.',
          'Error: Forgetting that pixel dimensions affect file size. Doubling the DPI quadruples the total pixel count (and file size) because both width and height double. A 300 DPI version of a 300 DPI image is 4x larger.',
          'Error: Assuming all screens have the same DPI. A 10-inch measurement corresponds to 960 pixels on a 96 DPI screen but 1920 pixels on a 192 DPI Retina display. Always specify the target DPI.',
        ],
      },
      {
        heading: 'Tips and best practices',
        paragraphs: [
          'For standard US letter documents at 300 DPI, use 2550 x 3300 pixels as the canvas size. This is the exact pixel dimension needed for a full-bleed letter-sized print document.',
          'When setting up web images, convert the desired physical display size to pixels at 96 DPI. A 5-inch wide web image should be 480 pixels wide.',
          'For large-format printing (posters, banners), 150 DPI is usually sufficient because viewing distance is greater. Calculate the pixel dimensions at 150 DPI rather than 300 DPI to keep file sizes manageable.',
          'Use the Width x Height mode when creating canvas dimensions for design tools. Enter the physical document size in inches and get the exact pixel dimensions for your digital workspace.',
        ],
      },
    ],
    relatedTools: ['pixels-to-inches', 'px-to-inches', 'unit-converter'],
    faq: [
      { question: 'How many pixels in an inch at 96 DPI?', answer: 'At 96 DPI, 1 inch = 96 pixels. This is the standard for most computer screens and web design.' },
      { question: 'What is the pixel size of an A4 page at 300 DPI?', answer: 'An A4 page (8.27 x 11.69 inches) at 300 DPI is 2481 x 3508 pixels. This is the standard canvas size for A4 print documents.' },
      { question: 'How do I set up a canvas for print in Photoshop?', answer: 'Use this tool to convert your document size in inches to pixels at 300 DPI. Enter the pixel values in the New Document dialog in Photoshop with resolution set to 300 PPI.' },
      { question: 'What DPI should I use for web images?', answer: 'Use 96 DPI for standard web images. Modern high-DPI (Retina) screens display at 2x or 3x resolution, but CSS pixels remain at 96 DPI for layout purposes.' },
      { question: 'How many pixels is a 4x6 photo at 300 DPI?', answer: 'A 4x6 inch photo at 300 DPI is 1200 x 1800 pixels. This is the standard resolution for high-quality photo prints.' },
      { question: 'Can I convert fractional inches?', answer: 'Yes, enter decimal inches like 8.5 or 11.69. The tool calculates the exact pixel value and rounds to the nearest whole pixel.' },
      { question: 'How do I convert inches to pixels for CSS?', answer: 'CSS uses 96 DPI by default. To convert inches to CSS pixels, multiply by 96. For example, 2 inches = 192 CSS pixels. However, physical inches on screen depend on the device DPI.' },
      { question: 'What is the pixel size of a business card?', answer: 'A standard US business card (3.5 x 2 inches) at 300 DPI is 1050 x 600 pixels. At 96 DPI it is 336 x 192 pixels, which is too low for print quality.' },
      { question: 'How do I calculate banner dimensions in pixels?', answer: 'Measure the banner in inches, then multiply width and height by the target DPI. For a 36x24 inch banner at 150 DPI, the pixel dimensions are 5400 x 3600 pixels.' },
      { question: 'How do I convert inches to pixels for Figma?', answer: 'In Figma, set up your frame in inches by entering the pixel equivalent. At 96 DPI, a 10-inch frame should be 960 pixels wide. Figma works in pixels, so use this tool to get the correct pixel values for your physical document dimensions.' },
    ],
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
  'cron-expression-generator': {
    sections: [
      {
        heading: 'What is a cron expression?',
        paragraphs: [
          'A cron expression is a compact string of five or more space-separated fields that defines a recurring schedule. The standard format used by most Unix-like systems has five fields: minute, hour, day of month, month, and day of week. For example, the expression "0 3 * * *" means "at 3:00 AM every day," while "*/15 * * * *" means "every 15 minutes."',
          'Cron expressions are the universal language of scheduled tasks on servers. Whether you are running a nightly backup, a periodic data sync, a health check, or a report generator, the schedule is almost always expressed as a cron expression. They appear in Linux crontab files, CI/CD pipeline configurations (GitHub Actions, GitLab CI), cloud schedulers (AWS EventBridge, Google Cloud Scheduler), Kubernetes CronJobs, and application-level job queues.',
          'Despite their compact format, cron expressions can be intimidating at first because the fields are positional and use special characters like asterisks, commas, hyphens, and slashes. A cron expression generator helps you build these schedules without memorizing the syntax — type your schedule in plain English, select values visually, or paste an existing expression and let the tool translate it back into plain text.',
        ],
      },
      {
        heading: 'How to generate a cron expression',
        paragraphs: [
          'This cron expression generator offers three ways to build your schedule, and all three are live-linked — change any input and the expression updates automatically.',
          'Natural language input: Type your schedule in plain English, like "every day at 3am," "every 15 minutes," or "every monday at 9:30am," and the tool parses it into a valid cron expression. This is the fastest way to generate a cron expression when you know what you want but do not want to count fields or remember which position corresponds to which unit. The tool supports a wide range of common patterns including daily, hourly, weekly, monthly, and yearly schedules with optional start times.',
          'Visual builder: Use the dropdown selectors for minute, hour, day of month, month, and day of week to build an expression by choosing values for each field. Every change immediately updates the resulting expression. If Quartz mode is active, the builder adds a seconds field at the start and an optional year field at the end, letting you build six- or seven-field Quartz expressions the same way.',
          'Paste and translate: If you already have a cron expression and want to understand what it means, paste it into the translate area. The tool validates the expression, shows a plain-English description of what schedule it represents, and displays the next five actual run times so you can see the schedule in action.',
          'Once built, the expression appears in the generated output with a copy button, a human-readable description, and a live preview of the next execution times, so you can confirm the schedule matches your intent before deploying it.',
        ],
      },
      {
        heading: 'Standard cron vs Quartz cron',
        paragraphs: [
          'Standard Unix cron uses exactly five fields: minute, hour, day of month, month, and day of week. This is the format used by the traditional Linux crontab command, as well as CI/CD platforms (GitHub Actions, GitLab CI) and most cloud scheduling services. Standard cron cannot schedule anything more granular than one minute — there is no seconds field.',
          'Quartz cron, used by the Quartz Scheduler library in Java applications (including Spring Boot\'s @Scheduled annotation), extends the format with two additional fields: seconds at the beginning, and an optional year at the end. A Quartz expression looks like "0 0 3 ? * MON-FRI" — six fields total, or seven if a year is specified. The question mark (?) in Quartz replaces the asterisk (*) and means "no specific value," particularly important because Quartz does not allow both day-of-month and day-of-week to have specific values simultaneously; one must always be "?."',
          'This tool includes a format toggle that switches between Standard and Quartz modes. When you toggle, the visual builder adjusts to show or hide the extra fields, the validation rules change to match the selected format, and the expression is generated according to the correct syntax. This coverage directly supports the "quartz cron expression generator" use case without requiring a separate tool or page.',
          'Besides the field count, the day-of-week numbering also differs: standard cron typically uses 0-6 with Sunday as 0 (or sometimes 7), while Quartz uses 1-7 with Sunday as 1. The tool\'s visual builder adjusts the dropdown labels depending on which mode is active, so you always see the correct values for the format you are targeting.',
        ],
      },
      {
        heading: 'Common cron schedule patterns',
        paragraphs: [
          'Certain cron schedules come up so often that they are worth memorizing — or using the presets built into this tool. The most common pattern is likely daily at midnight, expressed as "0 0 * * *" in standard cron. This runs once per day at the stroke of midnight according to the server\'s local timezone, making it the standard choice for nightly batch jobs, backups, and daily report generation.',
          'For recurring tasks within a day, interval-based expressions are the most useful. "*/15 * * * *" runs every 15 minutes, making it a common polling interval for lightweight health checks and data sync jobs. "*/5 * * * *" runs every 5 minutes for more frequent updates, while "0 * * * *" runs once per hour at the top of the hour. The tool\'s preset buttons let you generate any of these common schedules with a single click.',
          'Weekday-only schedules are another frequent need. "0 9 * * 1-5" runs at 9:00 AM Monday through Friday — a typical pattern for business-hours automation like morning reports, email digests, or integration syncs that should not fire on weekends. The tool\'s "Weekdays only" preset generates this expression instantly.',
          'Monthly and weekly patterns follow the same logic but target different fields. "0 0 1 * *" runs at midnight on the 1st of every month — ideal for monthly billing cycles, account resets, or archival jobs. "0 0 * * 0" runs at midnight every Sunday, making it a natural weekly schedule. Use the presets or the visual builder to create custom variations of any of these patterns.',
        ],
      },
    ],
    faq: [
      { question: 'What is a cron expression?', answer: 'A cron expression is a compact string used to define a recurring schedule, most commonly for automated tasks on Unix-like systems. The standard format has five fields — minute, hour, day of month, month, and day of week — separated by spaces, e.g. "0 3 * * *" means "at 3:00 AM every day."' },
      { question: 'How do I generate a cron expression?', answer: 'Use the tool above in whichever way is easiest for you: type a plain-English schedule like "every day at 3am," build it visually using the minute/hour/day selectors, or paste an existing cron expression to see its human-readable meaning and validate it.' },
      { question: 'What\'s the difference between standard cron and Quartz cron?', answer: 'Standard (Unix/Vixie) cron uses five fields: minute, hour, day-of-month, month, day-of-week. Quartz cron (used in Java scheduling, including Spring) adds a seconds field at the start and an optional year field at the end, for six or seven fields total, and handles day-of-week numbering slightly differently. Use the format toggle above to switch between the two.' },
      { question: 'How do I schedule a job to run every 15 minutes?', answer: 'The standard cron expression is "*/15 * * * *" — this runs at minute 0, 15, 30, and 45 of every hour. Use the "every 15 minutes" preset above to generate this instantly, or type "every 15 minutes" into the natural language input.' },
      { question: 'What timezone does a cron expression use?', answer: 'Cron jobs run according to the local timezone of the system executing them, not any timezone specified in the expression itself (standard cron doesn\'t include timezone information). If your server and your own timezone differ, double-check the server\'s system time before relying on a schedule matching your expectations.' },
      { question: 'How do I generate a cron expression in JavaScript?', answer: 'Most Node.js scheduling libraries (like node-cron or node-schedule) accept a standard cron expression string directly — generate the expression using the tool above, then pass it as a string to your scheduling library\'s configuration.' },
    ],
    relatedTools: ['json-formatter', 'hash-generator', 'uuid-generator'],
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
    'json-formatter': [
      'Paste your JSON into the left input panel, or click "Upload file" to load a .json file. Drag-and-drop also works.',
      'The tool validates your JSON instantly — green "Valid JSON" badge appears when valid, or a red error with line and column number when invalid.',
      'Switch between Text view (side-by-side input/output), Tree view (collapsible tree), or Table view (grid for arrays of objects) using the top tabs.',
      'Use the toolbar buttons to Format, Sort keys alphabetically, change indentation (2 spaces, 4 spaces, or Minified), or Escape/Unescape JSON strings.',
      'Copy the formatted output with the Copy button, or click Download to save it as formatted.json. Click "Load sample" to try with example data.',
    ],
    'jwt-decoder': [
      'Paste your JWT token into the input field — the tool decodes it automatically as you type, splitting header, payload, and signature.',
      'Review the color-coded Segments display: pink for header, purple for payload, and teal for signature.',
      'Check the status banner at the top — it shows whether the token is currently valid, expired, or not yet valid based on exp and nbf claims.',
      'Inspect individual claims in the Header and Payload panels. Standard claims like exp, iat, and iss include human-readable timestamps and explanations.',
      'Click "Copy JSON" on any segment panel, or "Export JSON" to download the full decoded structure as a JSON file. Use "Load sample" to try a demo token.',
    ],
    'hash-generator': [
      'Click the "Text" tab and enter your text in the input field, or switch to the "File" tab to hash a file.',
      'Click "Generate Hashes" — the tool produces both an MD5 hash and a SHA-256 hash of your input text.',
      'For file hashing, click the upload area or drag-and-drop any file. The SHA-256 hash is computed entirely in your browser.',
      'Click the "Copy" button next to any hash result to copy it to your clipboard.',
      'Note: the MD5 implementation is a simplified checksum for text — for production security use the SHA-256 result instead.',
    ],
    'image-compressor': [
      'Click "Choose Images" or drag-and-drop one or more images (JPG, PNG, WebP) into the upload area.',
      'Select a quality preset (Web, Email, Max, or Tiny) or use the Quality slider to set a custom value from 10 to 100%.',
      'Choose an output format: JPEG, PNG, or WebP. Optionally enter max width/height to resize, and toggle "Strip metadata (EXIF)" to remove private data.',
      'Click the "Compress" button to process all uploaded images. Use the "Side by Side" view toggle to compare original vs compressed.',
      'Download individual compressed images with the download icon, or click "Download All" to save every compressed image at once.',
    ],
    'base64-encoder': [
      'Click "Encode" or "Decode" to choose your conversion mode.',
      'Paste or type your text into the left input panel (for encoding) or paste a Base64 string (for decoding).',
      'The output appears instantly in the right panel as you type — no button click required.',
      'Click "Copy" to copy the output to your clipboard, or "Clear" to reset both panels.',
      'If you see an error, the input is invalid for the selected mode — check that you are pasting valid Base64 when in decode mode.',
    ],
    'regex-tester': [
      'Type your regular expression pattern into the "Regex Pattern" field (without the slashes).',
      'Enter or paste the test text you want to match against in the "Test Text" area.',
      'Click "Test Pattern" to run the regex against your text with the global flag applied.',
      'View all matches listed below with the match count shown in the label.',
      'If you see an error, your regex pattern has a syntax issue — check your parentheses, quantifiers, and character classes.',
    ],
    'color-converter': [
      'Use the color picker or type a HEX value directly to select a color. The preview updates instantly.',
      'On the Convert tab, enter values in HEX, RGB, or HSL input fields to convert between formats. All output formats update automatically.',
      'Click the Sliders tab to fine-tune individual R, G, B, H, S, L, and Alpha channel values with range sliders.',
      'Switch to the Harmony tab to see complementary, triadic, analogous, split-complementary, and tetradic color palettes based on your selected color.',
      'Use the Contrast tab to check WCAG AA and AAA compliance against a custom background color. Click any swatch or format row to copy it.',
    ],
    'uuid-generator': [
      'Set the "Number of UUIDs" field to choose how many identifiers to generate (1 to 1000).',
      'Choose between Lowercase (default v4 format) or Uppercase using the format toggle buttons.',
      'Click "Generate" to create new UUID v4 identifiers. They appear in the output textarea.',
      'Click "Copy All" to copy all generated UUIDs to your clipboard (one per line), or "Clear" to reset.',
      'UUID v4 uses random values — each identifier follows the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.',
    ],
    'code-minifier': [
      'Click "JAVASCRIPT", "CSS", or "HTML" to select which language to minify.',
      'Paste your code into the left "Original Code" panel, or click "Upload" to load a .js, .css, or .html file.',
      'Click "Minify Code" to strip comments, remove whitespace, and compress the code.',
      'The right panel shows the minified output with byte count and percentage savings displayed below.',
      'Click "Copy" to copy the minified code, or "Download" to save it as minified.js, minified.css, or minified.html.',
    ],
    'diff-checker': [
      'Paste or type your original text into the "Text 1 (Original)" panel on the left.',
      'Paste or type your modified text into the "Text 2 (Modified)" panel on the right. You can also upload .txt files.',
      'Toggle "Ignore Whitespace" on or off — when on, leading/trailing spaces are ignored during comparison.',
      'Click "Compare Side-by-Side" to view the diff. Added lines are green, removed lines are red, and changed lines highlight word-level differences.',
      'Review the stats cards showing Added, Removed, and Changed line counts. Click any line to scroll the opposite panel to the same position.',
    ],
    'sql-formatter': [
      'Paste your SQL query into the input field on the left side of the tool.',
      'Toggle "Uppercase Keywords" to automatically convert SQL keywords like SELECT, FROM, and WHERE to uppercase.',
      'Click "Format SQL" to beautify your query with proper indentation and line breaks.',
      'Use "Copy" to copy the formatted SQL to your clipboard, or "Download" to save it as a .sql file.',
      'Click "Clear" to reset the input and start fresh. The tool shows an error if your SQL has syntax issues.',
    ],
    'url-encoder': [
      'Click "Encode" or "Decode" to choose your conversion direction.',
      'Paste or type your URL or text into the left input panel — for encoding, enter the raw text; for decoding, enter the percent-encoded string.',
      'The output appears instantly in the right panel as you type.',
      'Click "Copy" next to either result to copy the encoded or decoded string to your clipboard.',
      'If you see an error, the input is invalid for the selected mode — check that you are pasting valid percent-encoded text when in decode mode.',
    ],
    'xml-formatter': [
      'Paste your XML document into the text area.',
      'Click "Format XML" to beautify the document with proper 2-space indentation and line breaks.',
      'The tool validates your XML using a DOMParser and displays an error message if the document is malformed.',
      'Click "Copy" to copy the formatted XML output to your clipboard.',
      'Use the formatted output for documentation, data exchange, or pasting into configuration files.',
    ],
    'word-counter': [
      'Type or paste your text into the text area.',
      'View live statistics below the text area: Words, Characters, Characters (no spaces), Sentences, Paragraphs, and Reading Time.',
      'Reading time is calculated at 200 words per minute — useful for planning articles and blog posts.',
      'All counts update in real time as you type, so no button click is needed.',
      'Use the tool to meet word limits for essays, social media posts, and content optimization.',
    ],
    'qr-code-generator': [
      'Type or paste the text, URL, or contact information you want to encode into the input field.',
      'Click "Generate QR Code" to create a scannable QR code image from your input.',
      'The generated QR code appears as a PNG image that you can preview on screen.',
      'Click "Download" to save the QR code as a PNG file to your device.',
      'Use the QR code on print materials, websites, or share it digitally for quick scanning.',
    ],
    'markdown-editor': [
      'Type Markdown in the left editor panel, or use the toolbar buttons (#, ##, Bold, Italic, Link, Code, List) to insert formatting.',
      'The right Preview panel renders your Markdown in real time as you type.',
      'Use the toolbar buttons to quickly insert heading, bold, italic, link, code block, or list syntax.',
      'The preview shows headings, lists, and inline formatting — ideal for writing blog posts, documentation, or README files.',
      'Copy the Markdown text from the editor to paste into GitHub, blogs, or other Markdown-compatible platforms.',
    ],
    'unit-converter': [
      'Select a category from the grid: Length, Weight, Temperature, Area, Volume, Speed, Time, Energy, Pressure, or Data.',
      'Choose the "From" unit and "To" unit from the dropdown menus.',
      'Type a numeric value into the "From" input field — the converted result appears instantly in the "To" field.',
      'Click the swap button (⇄) to reverse the conversion direction.',
      'Click the copy icon next to the result to copy the converted value to your clipboard.',
    ],
    'loan-calculator': [
      'Adjust the Loan Amount slider or type a value to set your principal (from $50,000 to $2,000,000).',
      'Set the Annual Interest Rate using the slider (from 0% to 15%).',
      'Choose a Loan Term between 5 and 40 years using the slider.',
      'Optionally enter an Extra Monthly Payment amount to see how extra payments shorten your payoff timeline.',
      'Review the results panel for Monthly Payment, Total Interest, Payoff Summary, and Breakdown. Click "Copy Summary" to save the results.',
    ],
    'percentage-calculator': [
      'Select an operation type from the six tabs: X% of Y, Increase by %, Decrease by %, % Difference, Reverse %, or X is Y% of?',
      'Enter the required values into the input fields — each operation type has different inputs with clear labels.',
      'Use the percentage slider for quick adjustment, or click the quick preset buttons (5%, 10%, 15%, etc.) for common values.',
      'Click "Calculate" to see the result with the formula and an optional step-by-step breakdown.',
      'Click "Copy" to copy the result, and expand "History" to review and reuse your previous calculations.',
    ],
    'mortgage-calculator': [
      'Select your currency from the searchable dropdown — supports over 150 world currencies.',
      'Set the Home Price using the slider or type a value directly.',
      'Adjust the Down Payment amount — quick preset buttons (5%, 10%, 20%, 25%) are available, and a warning appears if under 20%.',
      'Set the Interest Rate and choose a Loan Term (10, 15, 20, or 30 years).',
      'Click "Calculate" to see Monthly Payment, Loan Amount, Total Interest, Total Cost, Loan-to-Value ratio, Payoff Accelerator, and the full amortization schedule.',
    ],
    'morse-code-translator': [
      'Click "Text to Morse" or "Morse to Text" to select your conversion direction.',
      'Type or paste your text into the input textarea — for text-to-morse, enter plain text; for morse-to-text, enter dots and dashes separated by spaces.',
      'Click "Convert" to translate between text and Morse code.',
      'The result appears in the output panel below — click "Copy" to save it to your clipboard.',
      'The tool maps A-Z, 0-9, and basic punctuation (. and ,). Unrecognized characters are replaced with a question mark.',
    ],
    'json-to-csv': [
      'Paste a JSON array of objects into the text area — each object should have the same keys.',
      'Click "Convert to CSV" to parse the JSON and generate comma-separated output.',
      'The tool extracts headers from the first object and handles commas and quotes in string values automatically.',
      'Review the CSV output in the preview area below.',
      'Click "Copy" to copy the CSV to your clipboard, or "Download" to save it as data.csv.',
    ],
    'coin-flipper': [
      'Choose how many coins to flip: 1, 3, or 5 using the selector buttons.',
      'Click "Flip N Coins" or press the spacebar to start the 3D flip animation.',
      'Toggle "Yes/No Mode" to replace Heads/Tails labels with Yes/No for binary decisions.',
      'View your streak stats (current and best), heads/tails percentages, and flip history — all saved in your browser.',
      'Click "Flip 10x" for rapid multi-flip, or "Copy Result" to save the outcome to your clipboard.',
    ],
    'unit-calculator': [
      'Type a math expression using numbers and operators (+, -, *, /) and parentheses directly into the input area.',
      'Or use the on-screen number pad buttons to build your expression by tapping digits and operators.',
      'Click the "=" button (or the equals button on the pad) to evaluate the expression.',
      'The result appears below the expression display.',
      'Click "Clear" to reset the calculator and start a new calculation.',
    ],
    'timer-stopwatch': [
      'Click "Stopwatch" or "Timer" to switch between modes.',
      'In Stopwatch mode, click "Start" to begin counting up from zero, "Pause" to pause, and "Reset" to return to 00:00:00.',
      'In Timer mode, adjust the duration slider (1 to 3600 seconds) before starting, then click "Start Timer" to count down.',
      'The display shows hours, minutes, and seconds in HH:MM:SS format.',
      'Click "Reset" at any time to return the clock to its starting value.',
    ],
    'text-to-speech': [
      'Type or paste your text into the textarea, or click "Upload .txt" to load a text file.',
      'Select a voice from the Voice dropdown — available voices depend on your browser and operating system.',
      'Adjust the Speed slider (0.5x to 2x) and Pitch slider (0.5 to 2.0) to customize the speech output.',
      'Click "Speak" to play the text as speech, "Pause" to pause, and "Stop" to cancel playback.',
      'Click "Record" to capture the audio output, then "Download Recording (.webm)" to save the audio file.',
    ],
    'dice-roller': [
      'Use the slider to choose how many dice to roll (1 to 5 dice).',
      'Select the die type by clicking a sides button: d4, d6, d8, d10, d12, d20, or d100.',
      'Click "Roll N dSides" to roll the dice and watch the 3D animation.',
      'View each individual die result and the total sum displayed below the dice.',
      'Roll history is saved in your browser — review recent rolls below the controls. Click "Copy" to save the result.',
    ],
    'text-to-html': [
      'Type or paste your plain text into the input textarea.',
      'Use lines starting with # for headings (# for h1, ## for h2, etc.) — blank lines separate paragraphs.',
      'Click "Convert to HTML" to generate a full HTML document with DOCTYPE, head, charset, and body markup.',
      'The output includes properly nested heading and paragraph tags based on your formatting.',
      'Click "Copy" to copy the complete HTML to your clipboard for pasting into your website or CMS.',
    ],
    'todo-list': [
      'Type a task description into the input field and press Enter or click "Add Task".',
      'Set a priority level (High, Medium, or Low) and an optional due date before adding the task.',
      'Click the checkbox next to a task to mark it as complete, or click the edit icon to change its text.',
      'Use the "All Tasks", "Active", and "Completed" filter buttons to view specific task subsets.',
      'Click "Clear Completed" to remove all finished tasks. Your tasks persist in your browser via localStorage.',
    ],
    'random-name-generator': [
      'Adjust the slider to choose how many names to generate (1 to 50 at a time).',
      'Click "Generate Names" to create a new batch of random full names.',
      'Each result is a randomly paired first name and last name from the curated list.',
      'Regenerate as many times as you need until you find names that fit your project.',
      'Use generated names as placeholder data, character names, usernames, or test database entries.',
    ],
    'password-generator': [
      'Adjust the Length slider to set password length from 4 to 64 characters.',
      'Toggle checkboxes for character types: Uppercase (A-Z), Lowercase (a-z), Numbers (0-9), and Symbols (!@#$...).',
      'Click "Generate Password" to create a new random password based on your selected options.',
      'The generated password appears in the read-only input field above the controls.',
      'Click the Copy button next to the password field to save it to your clipboard.',
    ],
    'age-calculator': [
      'Select your date of birth using the date picker input.',
      'Click "Calculate Age" to compute your exact age from the selected birth date.',
      'The result displays your age broken down into Years, Months, and Days.',
      'The calculator handles month-length differences and leap years for accurate results.',
      'All calculations happen in your browser — your birth date never leaves your device.',
    ],
    'bmi-calculator': [
      'Select your unit system: Metric (cm/kg) or Imperial (ft/in/lbs).',
      'Adjust the Height slider (and Inches slider if using Imperial) to set your height.',
      'Adjust the Weight slider to set your weight.',
      'Click "Calculate BMI" to compute your Body Mass Index and health category.',
      'Review your BMI value, category (Underweight/Normal/Overweight/Obese), healthy weight range, and expand "Show Detailed Health Insights" for classification details.',
    ],
    'discount-calculator': [
      'Select your currency from the searchable dropdown — supports over 150 world currencies.',
      'Enter the Original Price in the input field.',
      'Choose Discount Type: Percentage (%) or Fixed Amount, then set the discount value.',
      'Use the Quick Discounts buttons (10%, 20%, 30%, 50%, 70%) for common discount presets.',
      'Click "Calculate Discount" to see the Final Price, total savings amount, and savings percentage. Click "Copy" to save the breakdown.',
    ],
    'tip-calculator': [
      'Select your currency from the searchable dropdown — supports over 150 world currencies.',
      'Enter the Bill Amount in the input field.',
      'Set the Number of People splitting the bill.',
      'Choose a Tip Percentage using the quick preset buttons (10%, 15%, 18%, 20%, 25%) or the slider for a custom value.',
      'View the Tip Amount, Total Bill, and Per Person cost instantly. Click "Copy Results" to save the breakdown to your clipboard.',
    ],
    'cron-expression-generator': [
      'Choose a format: "Standard (5-field)" for Unix cron or "Quartz (6-7 field)" for Java/Spring scheduling.',
      'Use the "Visual Builder" tab to build expressions by selecting minute, hour, day-of-month, month, and day-of-week from dropdowns.',
      'Switch to the "Natural Language" tab and type a schedule in plain English like "every day at 3am" — click Parse to generate the expression.',
      'Or use the "Paste & Translate" tab to paste an existing cron expression and see its human-readable description and next 5 run times.',
      'Click a Quick Preset button (Every minute, Daily at midnight, Weekdays only, etc.) to generate common schedules instantly. Click "Copy" to save the expression.',
    ],
    'px-to-inches': [
      'Choose a DPI/PPI preset (72, 96, 150, or 300) from the dropdown, or select Custom to enter any DPI value.',
      'Type a pixel value into the Pixels field — the Inches field updates instantly as you type.',
      'Use the swap button (⇄) to flip which value you are editing, or the copy icon to copy a value to your clipboard.',
      'Toggle "Width x Height mode" to convert full image dimensions at once instead of a single value.',
      'Click any row in the Common Conversions Reference table to load that pixel value into the calculator.',
    ],
    'inches-to-px': [
      'Choose a DPI/PPI preset (72, 96, 150, or 300) from the dropdown, or select Custom to enter any DPI value.',
      'Type an inch value into the Inches field — the Pixels field updates instantly as you type.',
      'Use the swap button (⇄) to flip which value you are editing, or the copy icon to copy a value to your clipboard.',
      'Toggle "Width x Height mode" to convert full image dimensions at once instead of a single value.',
      'Click any row in the Common Conversions Reference table to load that inch value into the calculator.',
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
    keywords: ['jwt decoder online', 'decode jwt token', 'jwt token decoder', 'jwt decode online free', 'online jwt decoder', 'jwt', 'token', 'decode', 'auth', 'jwt validator', 'jwt inspector', 'json web token decoder', 'jwt token parser', 'jwt claims viewer', 'jwt debugger'],
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
    keywords: ['url encode online', 'url decoder online', 'encode url online', 'url encoding tool', 'url decoder encoder', 'url', 'encode', 'decode', 'uri', 'urlencode', 'convert url', 'url encoded', 'url decode', 'url encoder', 'decode url'],
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
    keywords: ['md5 hash generator online', 'sha256 generator online', 'sha1 hash online', 'generate md5 hash', 'hash generator free', 'hash', 'md5', 'sha256', 'crypto', 'md5 file', 'hash a file online', 'file checksum', 'md5 decryption', 'hash cracker'],
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
    description: 'Convert text to speech with voice selection, speed and pitch controls, and recording. Upload .txt files and download your recording as a webm audio file.',
    category: 'document',
    icon: 'Volume2',
    slug: 'text-to-speech',
    keywords: ['text to speech online', 'text to voice converter', 'tts online free', 'text to audio', 'speech', 'voice', 'audio', 'tts'],
    seoTitle: 'text to speech online — Free TTS Converter | OnlineFreeTools',
    seoDescription: 'Use our free text to speech converter online. Choose a voice, adjust speed and pitch, then speak or record your text. Download recordings as webm files. No signup required.',
    h1: 'Text to Speech Online — Free TTS Voice Converter & Recorder',
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON array data to CSV format instantly. Paste your JSON array and get comma-separated output ready for Excel, Google Sheets, or any spreadsheet app.',
    category: 'document',
    icon: 'FileJson',
    slug: 'json-to-csv',
    keywords: ['json to csv converter', 'convert json to csv online', 'json array to csv', 'json to spreadsheet', 'json', 'csv', 'convert', 'export', 'spreadsheet'],
    seoTitle: 'json to csv converter — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free JSON to CSV converter to instantly convert JSON array data into spreadsheet-ready CSV format. Download or copy your results. No signup required.',
    h1: 'JSON to CSV Converter — Free Online JSON Array to Spreadsheet Tool',
  },
  {
    id: 'text-to-html',
    name: 'Text to HTML',
    description: 'Convert plain text to clean HTML markup instantly. Supports headings with # syntax and paragraph breaks. Generates a full HTML document ready to paste into your project.',
    category: 'document',
    icon: 'Code2',
    slug: 'text-to-html',
    keywords: ['text to html converter', 'convert text to html online', 'plain text to html', 'text to markup', 'html', 'text', 'convert', 'markup'],
    seoTitle: 'text to html converter — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free text to HTML converter to instantly transform plain text into clean HTML markup. Supports headings and paragraphs with full document output. No signup required.',
    h1: 'Text to HTML Converter — Free Plain Text to HTML Markup Tool',
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
    description: 'Generate random full names by combining first and last names from a curated list. Choose how many names to generate with a slider from 1 to 50.',
    category: 'utility',
    icon: 'Users',
    slug: 'random-name-generator',
    keywords: ['random name generator', 'generate random names', 'character name generator', 'fake name generator', 'random', 'name', 'generate', 'character', 'fiction'],
    seoTitle: 'random name generator — Free Online Name Generator | OnlineFreeTools',
    seoDescription: 'Use our free random name generator to create random full names instantly. Generate 1 to 50 names at once for characters, projects, or test data. No signup required.',
    h1: 'Random Name Generator — Free Online Character & Project Name Tool',
  },
  {
    id: 'todo-list',
    name: 'Todo List',
    description: 'Manage tasks with priorities and due dates. Add, edit, complete, and filter your tasks. Priority levels include high, medium, and low. Data persists in your browser.',
    category: 'utility',
    icon: 'CheckSquare',
    slug: 'todo-list',
    keywords: ['todo list online', 'task manager online', 'free to do list', 'online checklist', 'todo', 'task', 'list', 'manage', 'priority'],
    seoTitle: 'todo list online — Free Task Manager | OnlineFreeTools',
    seoDescription: 'Use our free online todo list to manage tasks with priorities and due dates. Add, edit, complete, and filter tasks. Data persists in your browser. No signup required.',
    h1: 'Todo List Online — Free Task Manager with Priorities & Due Dates',
  },
  {
    id: 'timer-stopwatch',
    name: 'Timer & Stopwatch',
    description: 'Use a timer or stopwatch with start, pause, and reset controls. Switch between countdown timer with a duration slider and a stopwatch that counts up from zero.',
    category: 'utility',
    icon: 'Clock',
    slug: 'timer-stopwatch',
    keywords: ['online timer', 'stopwatch online', 'countdown timer', 'timer with alarm', 'timer', 'stopwatch', 'time', 'alert', 'countdown'],
    seoTitle: 'online timer and stopwatch — Free Countdown Timer | OnlineFreeTools',
    seoDescription: 'Use our free online timer and stopwatch. Switch between countdown timer and stopwatch mode with start, pause, and reset controls. No signup required.',
    h1: 'Online Timer & Stopwatch — Free Countdown Timer Tool',
  },
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    description: 'Roll 1 to 5 dice with 3D animation. Choose from d4, d6, d8, d10, d12, d20, or d100 sides. Roll history is saved in your browser so you can track previous results.',
    category: 'utility',
    icon: 'Dices',
    slug: 'dice-roller',
    keywords: ['dice roller online', 'd20 roller', 'dnd dice roller', 'roll dice online', 'dice', 'roll', 'random', 'game', 'dnd', 'polyhedral'],
    seoTitle: 'dice roller online — Free D20 & DND Dice Roller | OnlineFreeTools',
    seoDescription: 'Use our free online dice roller with 3D animation. Roll 1-5 dice with d4, d6, d8, d10, d12, d20, or d100 sides. Roll history saved in your browser. No signup required.',
    h1: 'Dice Roller Online — Free 3D Animated DND Dice Roller',
  },
  {
    id: 'coin-flipper',
    name: 'Coin Flipper',
    description: 'Flip 1, 3, or 5 coins with 3D animation. Track heads/tails streaks, view percentage stats, and toggle Yes/No mode for binary decisions. History saved in your browser.',
    category: 'utility',
    icon: 'Circle',
    slug: 'coin-flipper',
    keywords: ['coin flipper online', 'virtual coin toss', 'flip a coin', 'heads or tails', 'coin', 'flip', 'random', 'toss', 'yes no', 'decision maker'],
    seoTitle: 'coin flipper online — Free Virtual Coin Toss | OnlineFreeTools',
    seoDescription: 'Use our free online coin flipper with 3D animation. Flip 1, 3, or 5 coins, track streaks, and view heads/tails stats. Toggle Yes/No mode. No signup required.',
    h1: 'Coin Flipper Online — Free Virtual Coin Toss with 3D Animation',
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
    description: 'Calculate arithmetic expressions instantly with this free online calculator. Enter math expressions using addition, subtraction, multiplication, and division to get instant results.',
    category: 'utility',
    icon: 'Calculator',
    slug: 'unit-calculator',
    keywords: ['online calculator', 'math calculator', 'arithmetic calculator', 'expression calculator', 'calculate', 'formula', 'math', 'compute'],
    seoTitle: 'online calculator — Free Math Calculator | OnlineFreeTools',
    seoDescription: 'Use our free online calculator to instantly compute arithmetic expressions. Enter math formulas with addition, subtraction, multiplication, and division. No signup required.',
    h1: 'Online Calculator — Free Arithmetic Expression Calculator',
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
  {
    id: 'cron-expression-generator',
    name: 'Cron Expression Generator',
    description: 'Use our free cron expression generator to instantly build any cron schedule. Generate cron expressions from plain English, visual selectors, or paste to translate. Standard and Quartz format support.',
    category: 'developer',
    icon: 'Clock',
    slug: 'cron-expression-generator',
    keywords: ['cron expression generator', 'cron job expression generator', 'generate cron expression', 'quartz cron expression generator', 'cron job calculator', 'cron schedule format', 'cron translator', 'cron', 'schedule', 'scheduler', 'crontab', 'cron job'],
    featured: true,
    seoTitle: 'cron expression generator — Free Online Tool | OnlineFreeTools',
    seoDescription: 'Use our free cron expression generator to instantly build any cron schedule. Type plain English like "every day at 3am," build visually with selectors, or paste to translate. Supports standard and Quartz cron. No signup required.',
    h1: 'Cron Expression Generator — Free Cron Job Schedule Builder',
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
