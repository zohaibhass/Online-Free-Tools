# Free Online Tools - SEO-Optimized Tools Website

A comprehensive, production-ready website featuring 30+ free online tools for developers, content creators, and productivity enthusiasts. Fully optimized for Google AdSense monetization.

## Features

### 30+ Tools Across 4 Categories

**Developer Tools (12)**
- JSON Formatter - Format, validate, and minify JSON
- JWT Decoder - Decode and validate JWT tokens
- Regex Tester - Test regular expressions
- SQL Formatter - Format SQL queries
- Base64 Encoder/Decoder - Encode and decode Base64
- URL Encoder/Decoder - Handle URL encoding
- Hash Generator - Generate MD5, SHA1, SHA256
- Code Minifier - Minify CSS, JS, HTML
- Diff Checker - Compare texts
- XML Formatter - Format XML documents
- UUID Generator - Generate UUIDs
- And more...

**Document & Media Tools (8)**
- Image Compressor - Compress images
- QR Code Generator - Generate QR codes
- Word Counter - Count words and characters
- PDF Merger - Merge PDF files
- Markdown Editor - Write and preview Markdown
- Text to HTML Converter - Convert text to HTML
- Text to Speech - Convert text to audio
- Screenshot Tool - Capture screenshots

**Calculators & Conversions (8)**
- Unit Converter - Convert measurements
- Loan Calculator - Calculate loans
- Mortgage Calculator - Mortgage calculations
- Percentage Calculator - Percentage math
- Tip Calculator - Calculate tips
- Age Calculator - Calculate age
- BMI Calculator - Body mass index
- Discount Calculator - Calculate discounts

**Utilities (6)**
- Password Generator - Generate secure passwords
- Random Name Generator - Generate random names
- Timer & Stopwatch - Time management
- Dice Roller - Roll dice
- Coin Flipper - Flip coins
- Todo List - Task management

## Technical Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Client-side only (no backend required)
- **Deployment**: Vercel or any Node.js host

## SEO Optimizations

- ✅ Comprehensive metadata and Open Graph tags
- ✅ JSON-LD structured data
- ✅ Sitemap.xml and robots.txt
- ✅ Proper heading hierarchy
- ✅ Canonical URLs
- ✅ Mobile responsive design
- ✅ Fast loading performance
- ✅ Category pages for better indexing
- ✅ Internal linking structure
- ✅ Meta descriptions for all pages

## Google AdSense Integration

The site is fully ready for Google AdSense monetization with:
- 5 ad placement zones
- Responsive ad formats
- Easy configuration with publisher ID
- Privacy and Terms pages for compliance

## Getting Started

### Installation

```bash
# Clone or download the project
cd free-online-tools

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Add your AdSense publisher ID to .env.local
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://yoursite.com
```

### Development

```bash
# Start development server
pnpm dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
free-online-tools/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage
│   ├── tools/
│   │   ├── page.tsx        # All tools browse page
│   │   └── [slug]/
│   │       └── page.tsx    # Individual tool pages
│   ├── category/
│   │   └── [id]/
│   │       └── page.tsx    # Category pages
│   ├── privacy/
│   ├── terms/
│   ├── contact/
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   ├── ToolCard.tsx        # Tool card component
│   ├── ToolLayout.tsx      # Tool page layout
│   ├── AdSenseAd.tsx       # AdSense ad component
│   └── tools/              # Individual tool implementations
├── lib/
│   ├── tools.ts            # Tools database and utilities
│   └── seo.ts              # SEO utility functions
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── package.json
```

## Adding New Tools

### 1. Add Tool to Database

Edit `lib/tools.ts` and add to the `TOOLS` array:

```typescript
{
  id: 'new-tool-id',
  name: 'New Tool Name',
  description: 'Tool description',
  category: 'developer',
  slug: 'new-tool',
  icon: '🔧',
  featured: false,
}
```

### 2. Create Tool Component

Create `components/tools/NewToolTool.tsx`:

```typescript
'use client'

import { useState } from 'react'

export function NewToolTool() {
  const [input, setInput] = useState('')

  return (
    <div className="space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input..."
        className="w-full h-64 p-4 border rounded-lg font-mono text-sm"
      />
      {/* Tool UI here */}
    </div>
  )
}
```

### 3. Add to Page Router

Edit `app/tools/[slug]/page.tsx` and add to `toolComponents`:

```typescript
import { NewToolTool } from '@/components/tools/NewToolTool'

const toolComponents: Record<string, React.ReactNode> = {
  'new-tool': <NewToolTool />,
  // ... other tools
}
```

## Testing

Run tests for the application:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

Test files are located in `__tests__/` directory.

## Performance Optimizations

- Client-side processing for instant results
- No external API calls needed
- Optimized bundle size
- Image optimization
- Code splitting
- Lazy loading of components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
@theme inline {
  --primary: #0066ff;
  --secondary: #f0f0f0;
  /* ... more colors */
}
```

### Logo

Replace the "T" logo in `components/Header.tsx` with your own.

### Domain

Update `NEXT_PUBLIC_BASE_URL` in `.env.local` with your domain.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The project works on any platform that supports Node.js:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku
- etc.

## Google AdSense Setup

1. Get your publisher ID from Google AdSense
2. Add to `.env.local`: `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxx`
3. The site will automatically display ads
4. Make sure you have Privacy Policy and Terms of Service pages (included)
5. Submit your site to Google AdSense for approval

## SEO Tips

1. Update homepage content with your brand
2. Add your domain to Google Search Console
3. Add XML sitemap to Google Search Console
4. Optimize tool descriptions for keywords
5. Build backlinks to your domain
6. Use Google Analytics for traffic tracking
7. Monitor search rankings with SEO tools

## License

MIT License - feel free to use and modify

## Support

For issues or questions, please open an issue on GitHub or contact support.

---

Built with Next.js 16, TypeScript, and Tailwind CSS.
Ready for Google AdSense monetization.
