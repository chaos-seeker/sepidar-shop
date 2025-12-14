import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { cn } from '@/utils/cn';
import { PropsWithChildren } from 'react';
import BaseLayout from '@/containers/layouts/base';
import Providers from './providers';

const iransansx = localFont({
  src: '../public/fonts/iransansx/IRANSansXV.woff2',
  variable: '--font-iransans',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'سپیدار شاپ',
};

export default async function RootLayout(props: PropsWithChildren) {
  return (
    <html dir="rtl" lang="fa">
      <body className={cn(iransansx.className)}>
        <Providers>
          <BaseLayout>{props.children}</BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
