"use server";

import { fetcher } from "@/utils/fetcher";

interface IResponse {
  data: Array<{
    id: number;
    name: string;
    slug: string;
    type_id?: number;
    sold_quantity: number;
    shipping_calss_id?: string | null;
    visibility?: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    blocked_dates?: string[] | string | null;
    type: {
      id: number;
      name: string;
      settings: {
        isHome: boolean;
        layoutType: string;
        productCard: string;
      };
      slug: string;
      language?: string;
      icon?: string;
      promotional_sliders?: Array<{
        id: number;
        original: string;
        thumbnail: string;
      }>;
      created_at?: string;
      updated_at?: string;
      translated_languages?: string[];
      logo: string | null;
    };
    language?: string;
    translated_languages?: string[];
    product_type: string;
    categories?: Array<{
      id: number;
      name: string;
      slug: string;
      language: string;
      icon: null;
      image: string;
      details: string;
      parent: null;
      type_id: number;
      created_at: string;
      updated_at: string;
      deleted_at: null;
      parent_id: null;
      translated_languages: string[];
      pivot: {
        product_id: number;
        category_id: number;
      };
    }>;
    tags?: Array<{
      id: number;
      name: string;
      slug: string;
      logo: string | null;
    }>;
    metas?: string;
    digital_file?: string | null;
    variations?: Array<{
      id: number;
      slug: string;
      name: string;
      attribute_id: number;
      value: string;
      language: string;
      meta: string;
      created_at: string;
      updated_at: string;
      translated_languages: string[];
      pivot: {
        product_id: number;
        attribute_value_id: number;
      };
      attribute: {
        id: number;
        slug: string;
        language: string;
        name: string;
        shop_id: number;
        created_at: string;
        updated_at: string;
        translated_languages: string[];
      };
    }>;
    variation_options?: Array<{
      id: number;
      title: string;
      image: string | null;
      price: number | string;
      sale_price: number | string;
      language: string;
      quantity: number;
      sold_quantity: number;
      is_disable: number;
      sku: string;
      options: Array<{
        name: string;
        value: string;
        attribute_id: number;
        attribute_value_id: number;
      }>;
      product_id: number;
      digital_file_tracker: string | null;
      created_at: string;
      updated_at: string;
      is_digital: number;
      blocked_dates: string[] | null;
    }>;
    shop_id?: number;
    shop: {
      id: number;
      owner_id: number;
      name: string;
      slug: string;
      description: string;
      cover_image: {
        id: number | string;
        original: string;
        file_name: string;
        thumbnail: string;
      };
      logo: {
        id: number | string;
        original: string;
        file_name: string;
        thumbnail: string;
      };
      is_active: number;
      address: {
        zip: string;
        city: string;
        state: string;
        country: string;
        street_address: string;
      };
      language?: string;
      settings: {
        contact: string;
        socials: string[];
        website: string;
        location: any[];
        notifications: {
          email: string | null;
        };
      };
      notifications: any;
      created_at: string;
      updated_at: string;
    };
    author_id?: number;
    manufacturer_id?: number;
    related_products?: Array<{
      id: number;
      name: string;
      slug: string;
      type_id?: number;
      sold_quantity: number;
      shipping_calss_id?: string | null;
      visibility?: string;
      deleted_at: string;
      created_at: string;
      updated_at: string;
      blocked_dates?: string[] | string | null;
      type: {
        id: number;
        name: string;
        settings: {
          isHome: boolean;
          layoutType: string;
          productCard: string;
        };
        slug: string;
        language?: string;
        icon?: string;
        promotional_sliders?: Array<{
          id: number;
          original: string;
          thumbnail: string;
        }>;
        created_at?: string;
        updated_at?: string;
        translated_languages?: string[];
        logo: string | null;
      };
      language?: string;
      translated_languages?: string[];
      product_type: string;
      categories?: Array<{
        id: number;
        name: string;
        slug: string;
        language: string;
        icon: null;
        image: string;
        details: string;
        parent: null;
        type_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: null;
        parent_id: null;
        translated_languages: string[];
        pivot: {
          product_id: number;
          category_id: number;
        };
      }>;
      tags?: Array<{
        id: number;
        name: string;
        slug: string;
        logo: string | null;
      }>;
      metas?: string;
      digital_file?: string | null;
      variations?: Array<{
        id: number;
        slug: string;
        name: string;
        attribute_id: number;
        value: string;
        language: string;
        meta: string;
        created_at: string;
        updated_at: string;
        translated_languages: string[];
        pivot: {
          product_id: number;
          attribute_value_id: number;
        };
        attribute: {
          id: number;
          slug: string;
          language: string;
          name: string;
          shop_id: number;
          created_at: string;
          updated_at: string;
          translated_languages: string[];
        };
      }>;
      variation_options?: Array<{
        id: number;
        title: string;
        image: string | null;
        price: number | string;
        sale_price: number | string;
        language: string;
        quantity: number;
        sold_quantity: number;
        is_disable: number;
        sku: string;
        options: Array<{
          name: string;
          value: string;
          attribute_id: number;
          attribute_value_id: number;
        }>;
        product_id: number;
        digital_file_tracker: string | null;
        created_at: string;
        updated_at: string;
        is_digital: number;
        blocked_dates: string[] | null;
      }>;
      shop_id?: number;
      shop: {
        id: number;
        owner_id: number;
        name: string;
        slug: string;
        description: string;
        cover_image: {
          id: number | string;
          original: string;
          file_name: string;
          thumbnail: string;
        };
        logo: {
          id: number | string;
          original: string;
          file_name: string;
          thumbnail: string;
        };
        is_active: number;
        address: {
          zip: string;
          city: string;
          state: string;
          country: string;
          street_address: string;
        };
        language?: string;
        settings: {
          contact: string;
          socials: string[];
          website: string;
          location: any[];
          notifications: {
            email: string | null;
          };
        };
        notifications: any;
        created_at: string;
        updated_at: string;
      };
      author_id?: number;
      manufacturer_id?: number;
      related_products?: any[];
      description: string | null;
      short_description?: string | null;
      in_stock?: number;
      is_taxable?: number;
      is_digital?: number;
      is_external?: number;
      external_product_url?: string;
      external_product_button_text?: string;
      colors?: string[];
      sale_price: number;
      cashback?: number | string;
      cashback_type?: string;
      max_price: string | number;
      min_price: string | number;
      ratings?: number;
      total_reviews?: number;
      rating_count?: number[];
      in_wishlist?: boolean;
      my_review?: string;
      sku: string | number;
      sizes?: string[];
      gallery?: string[];
      image: string;
      video?: string;
      status: string;
      price: number;
      height?: string;
      length?: string;
      width?: string;
      quantity: number;
      unit: string;
      in_flash_sale: number;
    }>;
    description: string | null;
    short_description?: string | null;
    in_stock?: number;
    is_taxable?: number;
    is_digital?: number;
    is_external?: number;
    external_product_url?: string;
    external_product_button_text?: string;
    colors?: string[];
    sale_price: number;
    cashback?: number | string;
    cashback_type?: string;
    max_price: string | number;
    min_price: string | number;
    ratings?: number;
    total_reviews?: number;
    rating_count?: number[];
    in_wishlist?: boolean;
    my_review?: string;
    sku: string | number;
    sizes?: string[];
    gallery?: string[];
    image: string;
    video?: string;
    status: string;
    price: number;
    height?: string;
    length?: string;
    width?: string;
    quantity: number;
    unit: string;
    in_flash_sale: number;
    similarProducts?: Array<{
      id: number;
      name: string;
      slug: string;
      type_id?: number;
      sold_quantity: number;
      shipping_calss_id?: string | null;
      visibility?: string;
      deleted_at: string;
      created_at: string;
      updated_at: string;
      blocked_dates?: string[] | string | null;
      type: {
        id: number;
        name: string;
        settings: {
          isHome: boolean;
          layoutType: string;
          productCard: string;
        };
        slug: string;
        language?: string;
        icon?: string;
        promotional_sliders?: Array<{
          id: number;
          original: string;
          thumbnail: string;
        }>;
        created_at?: string;
        updated_at?: string;
        translated_languages?: string[];
        logo: string | null;
      };
      language?: string;
      translated_languages?: string[];
      product_type: string;
      categories?: Array<{
        id: number;
        name: string;
        slug: string;
        language: string;
        icon: null;
        image: string;
        details: string;
        parent: null;
        type_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: null;
        parent_id: null;
        translated_languages: string[];
        pivot: {
          product_id: number;
          category_id: number;
        };
      }>;
      tags?: Array<{
        id: number;
        name: string;
        slug: string;
        logo: string | null;
      }>;
      metas?: string;
      digital_file?: string | null;
      variations?: Array<{
        id: number;
        slug: string;
        name: string;
        attribute_id: number;
        value: string;
        language: string;
        meta: string;
        created_at: string;
        updated_at: string;
        translated_languages: string[];
        pivot: {
          product_id: number;
          attribute_value_id: number;
        };
        attribute: {
          id: number;
          slug: string;
          language: string;
          name: string;
          shop_id: number;
          created_at: string;
          updated_at: string;
          translated_languages: string[];
        };
      }>;
      variation_options?: Array<{
        id: number;
        title: string;
        image: string | null;
        price: number | string;
        sale_price: number | string;
        language: string;
        quantity: number;
        sold_quantity: number;
        is_disable: number;
        sku: string;
        options: Array<{
          name: string;
          value: string;
          attribute_id: number;
          attribute_value_id: number;
        }>;
        product_id: number;
        digital_file_tracker: string | null;
        created_at: string;
        updated_at: string;
        is_digital: number;
        blocked_dates: string[] | null;
      }>;
      shop_id?: number;
      shop: {
        id: number;
        owner_id: number;
        name: string;
        slug: string;
        description: string;
        cover_image: {
          id: number | string;
          original: string;
          file_name: string;
          thumbnail: string;
        };
        logo: {
          id: number | string;
          original: string;
          file_name: string;
          thumbnail: string;
        };
        is_active: number;
        address: {
          zip: string;
          city: string;
          state: string;
          country: string;
          street_address: string;
        };
        language?: string;
        settings: {
          contact: string;
          socials: string[];
          website: string;
          location: any[];
          notifications: {
            email: string | null;
          };
        };
        notifications: any;
        created_at: string;
        updated_at: string;
      };
      author_id?: number;
      manufacturer_id?: number;
      related_products?: any[];
      description: string | null;
      short_description?: string | null;
      in_stock?: number;
      is_taxable?: number;
      is_digital?: number;
      is_external?: number;
      external_product_url?: string;
      external_product_button_text?: string;
      colors?: string[];
      sale_price: number;
      cashback?: number | string;
      cashback_type?: string;
      max_price: string | number;
      min_price: string | number;
      ratings?: number;
      total_reviews?: number;
      rating_count?: number[];
      in_wishlist?: boolean;
      my_review?: string;
      sku: string | number;
      sizes?: string[];
      gallery?: string[];
      image: string;
      video?: string;
      status: string;
      price: number;
      height?: string;
      length?: string;
      width?: string;
      quantity: number;
      unit: string;
      in_flash_sale: number;
    }>;
  }>;
  current_page: number;
  from: number;
  to: number;
  last_page: number;
  path: string;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page_url: string | null;
  first_page_url: string | null;
  total: number;
}

interface IParams {
  query: {
    limit: number;
    sort: string;
  };
}

export async function getProductSlider(params: IParams) {
  const res = await fetcher<IResponse>({
    endpoint: "/products",
    method: "get",
    contentType: "json",
    query: params.query,
  });
  return res.data;
}
