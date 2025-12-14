'use server';

import { fetcher } from '../../../utils/fetcher';

interface AddToWishlistParams {
  body: {
    product_id: number;
  };
}

export async function addToWishlist(
  params: AddToWishlistParams,
): Promise<{ success: boolean; message?: string }> {
  const res = await fetcher<{ success: boolean; message?: string }>({
    endpoint: '/wishlists/add',
    method: 'post',
    contentType: 'json',
    body: params.body,
  });
  return res.data;
}
