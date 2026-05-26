---
name: nextjs
description: Next.js 15 standards for this project
---

# Next.js 15 Development Standards

## General Rules

- Use Next.js 15 App Router only
- Use TypeScript everywhere
- Prefer async Server Components
- Use functional React components
- Use Tailwind CSS for styling
- Use absolute imports with `@/`
- Keep components small and reusable
- Prefer composition over prop drilling

## Routing

- Use the App Router structure
- Use route groups when needed
- Keep layouts reusable
- Use loading.tsx and error.tsx properly
- Use dynamic metadata for SEO

## Data Fetching

- Prefer server-side fetching
- Use Server Actions when possible
- Avoid unnecessary client components
- Use React cache when appropriate
- Validate external data

Preferred:
- async page components
- server actions
- route handlers

Avoid:
- excessive useEffect fetching
- unnecessary API calls

## Client Components

Only use "use client" when needed:
- forms
- browser APIs
- animations
- interactive UI

Do not turn entire pages into client components unnecessarily.

## Styling

- Use Tailwind CSS
- Use responsive utilities
- Prefer utility classes over custom CSS
- Keep spacing consistent
- Use cn() helper for conditional classes

Avoid inline styles.

## Forms

- Use React Hook Form
- Use Zod validation
- Show accessible error messages
- Validate on both client and server

## Database

- Use Prisma ORM
- Keep schema modular
- Use typed queries
- Avoid raw SQL unless necessary

## Authentication

- Use Clerk authentication
- Protect server routes
- Use middleware when necessary
- Never expose secrets in client components
- Always validate sessions in server actions

## Internationalization

- Use next-intl
- Keep messages in locale files
- Never hardcode user-facing text
- Support locale-based routing
- Ensure SEO metadata is localized

## Performance

- Optimize images
- Prefer Server Components
- Minimize bundle size
- Lazy load heavy components
- Avoid unnecessary re-renders

## SEO

- Use proper metadata
- Use canonical URLs
- Use semantic HTML
- Optimize Open Graph tags
- Generate dynamic localized metadata

## Code Style

- Use clear naming
- Avoid deeply nested logic
- Keep files organized
- Prefer early returns
- Write self-documenting code

## Project Stack

This project uses:
- Next.js 15
- App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- Clerk Auth
- next-intl
- Vercel deployment

## Global Rule

Always generate code compatible with this stack and follow the patterns above.