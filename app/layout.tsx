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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WPWFTW8H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WPWFTW8H');`}
        </Script>
      </body>
    </html>
  );
}
