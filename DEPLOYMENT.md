# Deployment Guide

Complete guide to deploy your Free Online Tools website.

## Pre-Deployment Checklist

- [ ] Set up Google AdSense account
- [ ] Obtain AdSense publisher ID
- [ ] Update domain in `.env.local`
- [ ] Review Privacy Policy page
- [ ] Review Terms of Service page
- [ ] Test all routes locally
- [ ] Build project successfully
- [ ] Set up domain and SSL certificate

## Environment Variables

Create `.env.local` file with:

```env
# AdSense Configuration
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Option 1: Vercel (Recommended)

### Step 1: Connect Repository

1. Push code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Step 2: Set Environment Variables

1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxx`
3. Add `NEXT_PUBLIC_BASE_URL=https://yourdomain.com`
4. Click Save

### Step 3: Configure Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for verification (usually 24 hours)

## Option 2: Self-Hosted (Node.js)

### Step 1: Build Project

```bash
pnpm build
```

### Step 2: Create Startup Script

Create `start.sh`:

```bash
#!/bin/bash
export NODE_ENV=production
npm start
```

### Step 3: Deploy to Server

```bash
# Using SSH
rsync -avz --delete ./ user@server:/path/to/app/

# Or use GitHub Actions, GitLab CI, etc.
```

### Step 4: Set Up Environment Variables

On server, create `.env.local`:

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxx
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Step 5: Set Up Process Manager

Using PM2:

```bash
npm install -g pm2

pm2 start "npm start" --name "free-tools"
pm2 save
pm2 startup
```

## Option 3: Docker Deployment

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

ENV NODE_ENV=production
CMD ["pnpm", "start"]
```

### Step 2: Build and Run

```bash
docker build -t free-tools:latest .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxx \
  -e NEXT_PUBLIC_BASE_URL=https://yourdomain.com \
  free-tools:latest
```

## Post-Deployment

### 1. Test the Site

- [ ] Homepage loads correctly
- [ ] All tool routes work
- [ ] Category pages display correctly
- [ ] Privacy page accessible
- [ ] Terms page accessible
- [ ] Contact form works
- [ ] AdSense ads load

### 2. Set Up Analytics

```bash
# In Google Analytics, set up:
1. Create new property for your domain
2. Copy GA tracking ID
3. Add to app/layout.tsx in the head
```

### 3. Submit to Google Search Console

1. Go to search.google.com/search-console
2. Add your domain
3. Verify ownership (choose method)
4. Submit sitemap: yourdomain.com/sitemap.xml
5. Submit robots.txt check

### 4. Submit to Google AdSense

1. Go to google.com/adsense
2. Add your domain
3. Follow verification steps
4. Wait for review (1-2 days)
5. Enable ads once approved

### 5. Set Up Monitoring

```bash
# Option 1: Vercel Analytics (automatic)
# Included with Vercel deployment

# Option 2: Google Analytics
# Add tracking in layout.tsx

# Option 3: Sentry (Error Tracking)
npm install @sentry/nextjs
# Configure in next.config.mjs
```

## Performance Optimization

### 1. Verify Build Output

```bash
pnpm build

# Check output:
# - Should see "✓ Compiled successfully"
# - Check page sizes
# - All routes should be dynamic or static as expected
```

### 2. Enable Caching

Update `next.config.mjs`:

```javascript
export default {
  // ... other config
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=3600' },
      ],
    },
    {
      source: '/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000' },
      ],
    },
  ],
}
```

### 3. Monitor Performance

- Use Lighthouse in Chrome DevTools
- Check Core Web Vitals
- Use PageSpeed Insights
- Monitor with Vercel Analytics

## SSL Certificate

### Vercel
- Automatic SSL provided

### Self-Hosted (Let's Encrypt)
```bash
sudo apt install certbot
sudo certbot certonly --webroot -w /path/to/public -d yourdomain.com
```

### Renewal
```bash
sudo certbot renew
```

## Backup & Recovery

### Backup Strategy

```bash
# Daily backups
0 2 * * * /usr/local/bin/backup-site.sh

# Script content:
#!/bin/bash
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/app/
aws s3 cp backup-$(date +%Y%m%d).tar.gz s3://your-bucket/
```

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf .next
rm -rf node_modules
pnpm install
pnpm build
```

### AdSense Ads Not Showing

1. Check publisher ID in .env.local
2. Check browser console for errors
3. Verify domain is approved by Google AdSense
4. Check ad blocker isn't blocking ads
5. Wait 24 hours after approval

### 404 Errors on Routes

1. Verify params handling in route files
2. Check that all route files are properly formatted
3. Rebuild and redeploy
4. Clear browser cache

### Slow Performance

1. Check server resources
2. Enable caching
3. Use Vercel Analytics to identify slow routes
4. Optimize images
5. Consider upgrading server plan

## Monitoring & Maintenance

### Daily
- Monitor error rates
- Check site accessibility
- Review analytics

### Weekly
- Review Google Search Console
- Check Google AdSense earnings
- Monitor uptime

### Monthly
- Update dependencies: `pnpm update`
- Review SEO metrics
- Optimize based on user behavior
- Backup data

## Contact & Support

For deployment issues:
1. Check Vercel/Server logs
2. Review error messages
3. Consult documentation
4. Check GitHub Issues
5. Contact hosting support

---

**Last Updated**: 2026-05-18
**Version**: 1.0.0
