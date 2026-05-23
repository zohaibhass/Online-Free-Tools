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

export interface ToolGuideSection {
  heading: string
  paragraphs: string[]
}

export interface ToolDetails {
  purpose: string
  longDescription: string
  howToUse: string[]
  exampleInput: string
  exampleOutput: string
  guideSections: ToolGuideSection[]
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

// Comprehensive tool-specific guide content (500+ words for priority tools)
const toolGuideContent: Record<string, { sections: ToolGuideSection[]; relatedTools: string[] }> = {
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
    guideSections,
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
