import './globals.css';
import Providers from './providers';
import { getCart } from '@/actions/global/get-cart';
import { setGuestToken } from '@/actions/global/set-guest-token';
import BaseLayout from '@/containers/layouts/base';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

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
  const cart = await getCart();
  setGuestToken(cart.cart.guest_token!);

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
