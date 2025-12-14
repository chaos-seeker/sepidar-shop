import { getCart } from './actions/global/get-cart';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const guestToken = request.cookies.get('guest_token');
  if (!guestToken) {
    const cart = await getCart();
    if (cart.cart.guest_token) {
      response.cookies.set('token-guest', cart.cart.guest_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Infinity,
        path: '/',
        sameSite: 'lax',
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
