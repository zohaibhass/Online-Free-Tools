/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/tools/pixels-to-the-inch',
        destination: '/tools/pixels-to-inches',
        permanent: true,
      },
      {
        source: '/tools/convert-pixels-in-inches',
        destination: '/tools/pixels-to-inches',
        permanent: true,
      },
      {
        source: '/tools/pixels-and-inches',
        destination: '/tools/pixels-to-inches',
        permanent: true,
      },
      {
        source: '/tools/px-to-inches',
        destination: '/tools/pixels-to-inches',
        permanent: true,
      },
      {
        source: '/tools/inches-to-px',
        destination: '/tools/pixels-to-inches',
        permanent: true,
      },
      {
        source: '/tools/unit-calculator',
        destination: '/tools/unit-converter',
        permanent: true,
      },
      {
        source: '/blog/what-is-jwt-token',
        destination: '/blog/what-is-a-jwt-token',
        permanent: true,
      },
      {
        source: '/blog/base64-encoding-explained',
        destination: '/blog/what-is-base64-encoding',
        permanent: true,
      },
      {
        source: '/blog/md5-vs-sha256',
        destination: '/blog/sha256-vs-md5',
        permanent: true,
      },
      {
        source: '/blog/image-compression-guide',
        destination: '/blog/how-to-compress-images-for-web',
        permanent: true,
      },
      {
        source: '/blog/regex-guide-beginners',
        destination: '/blog/what-is-regex',
        permanent: true,
      },
      {
        source: '/blog/what-is-a-healthy-bmi-for-men',
        destination: '/blog/bmi-chart-men-women',
        permanent: true,
      },
      {
        source: '/blog/what-is-a-healthy-bmi-for-women',
        destination: '/blog/bmi-chart-men-women',
        permanent: true,
      },
      {
        source: '/blog/healthy-weight-by-height',
        destination: '/blog/bmi-chart-by-height',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ]
  },
}

export default nextConfig
