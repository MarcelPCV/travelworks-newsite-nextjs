/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrites replace simple proxy rewrites (formerly middleware)
  async rewrites() {
    return [
      {
        source: '/au',
        destination: '/en-au',
      },
    ];
  },
};

module.exports = nextConfig;
