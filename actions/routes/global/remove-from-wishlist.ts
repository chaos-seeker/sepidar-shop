'use server';

import { fetcher } from '../../../utils/fetcher';

interface RemoveFromWishlistParams {
  body: {
    product_id: number;
  };
}

export async function removeFromWishlist(
  params: RemoveFromWishlistParams,
): Promise<{ success: boolean; message?: string }> {
  const res = await fetcher<{ success: boolean; message?: string }>({
    endpoint: '/wishlists/remove',
    method: 'post',
    contentType: 'json',
    body: params.body,
  });
  return res.data;
}
