import type { Metadata } from 'next';
import { Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { getSiteUrl } from './lib/get-site-url';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),

  title: 'TravelWorks',
  description: 'Travel agency software',
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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
