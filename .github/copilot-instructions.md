# Copilot instructions for this repository

Purpose
- Help Copilot sessions and automated agents understand this repo's structure, build steps, and conventions so future edits are accurate and avoid common pitfalls.

1) Build, test, and lint commands
- Dev server: npm run dev
- Build (production): npm run build
- Start production server: npm run start
- Lint (project): npm run lint
- Lint a single file: npm run lint -- <path/to/file>
- Node/Next info: next@16.2.6, react@19.2.4 (see package.json for full deps)
- Tests: No test runner is configured. If tests are added, include a single-test script in package.json (examples):
  - jest single: "jest -t \"<pattern>\""
  - vitest single: "vitest -t \"<pattern>\""

2) High-level architecture
- Next.js (App Router) project using the /app directory. Root layout: app/layout.tsx (contains <html> and <body> — only this layout should render them).
- Internationalization: Per-locale route segments exist (examples: app/ca-fr, app/ca-en, app/au-en). A dedicated /en route is used for the English prefix.
- Locale messages: JSON files live in /messages (found: en-US.json, ca-en.json, ca-fr.json, au-en.json). Messages are intended to be loaded server-side by next-intl.
- next-intl is installed and intended to be integrated via NextIntlProvider at the root to provide messages and set <html lang=...> dynamically.
- Styling and fonts: Tailwind CSS + next/font used. Fonts are set up in app/layout.tsx (Geist + Geist_Mono).
- Keep SSR deterministic: avoid Date.now(), Math.random(), or client-only locale formatting in server components.

3) Key conventions and repo-specific rules
- Single root html/body: NEVER render <html> or <body> in nested layouts/components. Only app/layout.tsx should contain those tags — nested layouts must return children only.
- Locale message filenames: Use locale-like identifiers (e.g., en-US.json, ca-en.json). Keep minimal keys when adding new locale files (e.g., title, nav.home) to avoid build-time failures.
- Route-type consistency: Adding layouts in new route segments can trigger type-check or runtime errors. Prefer server-only page components for simple locale pages unless layout logic is required.
- Avoid branching on typeof window in server components. Use client components when runtime detection is required.
- next-intl usage: Provide messages server-side (NextIntlProvider) and prefer useTranslations in components rather than ad-hoc client-side lookups.

4) Files and locations worth checking
- app/layout.tsx (fonts, root lang/class, html/body)
- app/page.tsx and per-locale pages under app/*
- messages/*.json (locale message content)
- package.json (scripts, next and dependency versions)
- AGENTS.md (root) — contains agent conventions to review before launching sub-agents

5) Agent / workflow notes
- Before changing layouts, run a build (npm run build) locally to catch route-type and hydration issues.
- When adding locale files or route segments: add a minimal messages JSON, then run build to confirm no hydration/runtime errors.
- If you see hydration mismatches, check for duplicated <html>/<body> tags or runtime-dependent server output.

6) Other AI/assistant configs to check
- AGENTS.md (present)
- No CLAUDE.md, .cursorrules, .windsurfrules, AIDER_CONVENTIONS.md detected — if added, include any agent-specific rules here.

MCP servers (optional)
- If you'd like, configuration can be added for Playwright (end-to-end testing across locales) or a headless browser for visual regression testing. Specify which tool to configure and preferred test targets.

If any section needs refinement or you want this file expanded to include examples (linter rules, specific next-intl integration snippets, or Playwright setup), say which area to expand and it will be updated.
