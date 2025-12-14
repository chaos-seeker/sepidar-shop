'use server';

import { cookies } from 'next/headers';

export const setGuestToken = async (guestToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set('guest_token', guestToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: Infinity,
    path: '/',
  });
};
