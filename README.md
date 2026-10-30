This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Analytics consent

PostHog is initialized only after c15t has resolved the visitor's consent and the
measurement category is allowed. Withdrawing measurement consent stops PostHog
capture; cookieless capture is disabled as well. Visitors can reopen their
preferences through Privacy Settings in the footer.

Google Analytics (G-R82T2VWRR5) and Google Tag Manager (GTM-WPWFTW8H)
load only after c15t allows measurement. Google Consent Mode maps measurement to
analytics storage and marketing to advertising consent. The published GTM
container currently supplies Microsoft Clarity project z5bmx5lajm; Clarity's
Consent V2 receives the same category decisions before the container loads.
c15t reloads the page when a consent category is revoked, after the tags receive
the updated decision. No Google or Clarity tags load when measurement is denied.

Keep the Clarity tag in GTM, and do not add another GA4 tag for this measurement
ID there, or visits will be counted twice. The container is gated by measurement
consent, so tags added to it must also respect their own consent requirements.
For GA4 client-side navigation tracking, enable enhanced measurement's page
changes based on browser history in the GA4 web stream.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
