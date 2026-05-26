/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrites replace simple middleware rewrites
  async rewrites() {
    return [
      {
        source: '/au',
        destination: '/au-en',
      },
    ];
  },
};

module.exports = nextConfig;
