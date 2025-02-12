/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  env: {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
};

export default nextConfig; 