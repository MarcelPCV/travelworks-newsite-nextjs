import type { Metadata } from 'next';
import { Geist_Mono, Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { getSiteUrl } from './lib/get-site-url';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'TravelWorks',
  description: 'Travel agency software',
  icons: {
    icon: [
      {
        url: '/icons/images/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icons/images/icon-270x270.png',
        sizes: '270x270',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/icons/images/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R82T2VWRR5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R82T2VWRR5');`}
        </Script>
      </body>
    </html>
  );
}
