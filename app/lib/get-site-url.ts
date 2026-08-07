// app/lib/get-site-url.ts

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}
