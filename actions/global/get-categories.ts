'use server';

import { fetcher } from '@/utils/fetcher';

interface IResponse {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  image: string;
  parent: number | null;
  children: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    image: string;
    parent: number | null;
    description?: string;
  }[];
  description?: string;
}

export async function getCategories(): Promise<IResponse[]> {
  const res = await fetcher<{ categories: IResponse[] }>({
    endpoint: '/products/category-hierarchy',
    method: 'get',
    contentType: 'json',
  });
  return res.data.categories;
}
