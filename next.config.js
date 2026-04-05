/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Ensure environment variables are available in API routes
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_PORT: process.env.EMAIL_PORT,
  },
  // Reload on env changes
  experimental: {
    // Enable environment variable reloading
    serverComponentsExternalPackages: ['nodemailer'],
  },
}

module.exports = nextConfig