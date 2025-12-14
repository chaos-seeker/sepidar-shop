'use server';

import { fetcher } from '../../../utils/fetcher';

interface CheckWishlistParams {
  path: number; // productId
}

export async function checkWishlist(
  params: CheckWishlistParams,
): Promise<{ exists: boolean }> {
  const res = await fetcher<{ exists: boolean }>({
    endpoint: '/wishlists/in_wishlist',
    method: 'get',
    contentType: 'json',
    path: params.path.toString(),
  });
  return res.data;
}
