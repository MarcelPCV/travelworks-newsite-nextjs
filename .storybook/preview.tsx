import type { Preview } from '@storybook/nextjs-vite';
import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

import enUsMessages from '../messages/en-US.json';
import '../app/globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en-US" messages={enUsMessages} timeZone="UTC">
        <div className={`${poppins.variable} font-sans`}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;