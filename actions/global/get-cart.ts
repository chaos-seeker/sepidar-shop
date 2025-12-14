'use server';

import { fetcher } from '@/utils/fetcher';

export interface IResponse {
  cart: {
    id: number;
    user_id: number;
    subtotal: string;
    discount_total: string;
    shipping_cost: string;
    shipping_discount: string;
    total: string;
    campaign_id: number | null;
    campaign_code: string | null;
    campaign_discount: string;
    campaign_cashback: string;
    campaign_reward_type: string | null;
    campaign_applied_at: string | null;
    created_at: string;
    updated_at: string;
    shipping_id: number | null;
    address_id: number | null;
    delivery_name: string | null;
    delivery_phone: string | null;
    guest_token: string | null;
    wallet_used: number;
    wallet_used_amount: number;
    tax_total: string;
    items: {
      id: number;
      cart_id: number;
      product_id: number;
      variation_option_id: number;
      quantity: number;
      unit_price: string;
      total_price: string;
      discount_amount: string;
      final_price: string;
      created_at: string;
      updated_at: string;
      tax_amount: string;
      is_gift: number;
      product: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        type_id: number | null;
        price: number | null;
        shop_id: number | null;
        sale_price: number | null;
        language: string;
        min_price: number;
        max_price: number;
        sku: string | null;
        quantity: number;
        sold_quantity: number;
        in_stock: boolean;
        is_taxable: boolean;
        in_flash_sale: number;
        shipping_class_id: number | null;
        status: string;
        visibility: string;
        product_type: string;
        unit: string;
        height: any;
        width: any;
        length: any;
        image: string | null;
        video: any[];
        gallery: string[];
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
        author_id: number | null;
        manufacturer_id: number | null;
        is_digital: boolean;
        is_external: boolean;
        external_product_url: string | null;
        external_product_button_text: string | null;
        blocked_dates: any;
        barcode: string | null;
        festival_price: number | null;
        cashback: number | null;
        cashback_type: string | null;
        is_package: boolean;
        seo: {
          meta_title: string | null;
          canonical_url: string | null;
          meta_description: string | null;
        };
        tax_id: number | null;
        short_description: string | null;
        package_items: any;
        ratings: number;
        total_reviews: number;
        rating_count: any[];
        my_review: any[];
        in_wishlist: boolean;
        blocked_dates_parsed: any[];
        translated_languages: string[];
        warehouse_stock: number;
        available_quantity: string;
      };
      variation_option?: {
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
        options: {
          name: string;
          value: string;
          attribute_id: number;
          attribute_value_id: number;
        }[];
        product_id: number;
        digital_file_tracker: string | null;
        created_at: string;
        updated_at: string;
        is_digital: number;
        blocked_dates: string[] | null;
      } | null;
    }[];
    shipping: any | null;
    address: {
      id: number;
      title: string;
      type: string;
      default: number;
      address: {
        street_address: string;
        city: string;
        state: string;
        country: string;
        zip: string;
      };
      location: any;
      customer_id: number;
      created_at: string;
      updated_at: string;
    } | null;
    campaign: {
      id: number;
      campaign_type: string;
      purchase_type: string;
      title: string;
      description: string | null;
      image: string | null;
      icon: string | null;
      target_customers: string | null;
      start_date: string;
      end_date: string;
      is_staged: number;
      max_uses: number | null;
      conditions: any;
      notification_channels: string | null;
      is_active: number;
      max_uses_per_user: number | null;
      max_total_uses: number | null;
      discount_ceiling: number | null;
      priority: number;
      test_group: string | null;
      created_at: string;
      updated_at: string;
      coin_price: number | null;
      customer_category_ids: string | null;
      product_ids: string | null;
      shop_id: string | null;
      stages: any;
      product_category_id: number;
      apply_type: string;
      count_consumption: string;
      rewardSchema: string;
      discount_type: string;
      products_type: string;
      campaign_code: string;
      customer_level_id: string | null;
      rfm_teg_id: string | null;
      min_purchase: string | null;
      coupon: number;
      festival: number;
      combine: number;
      level_discounts: number;
      purchase_count: number | null;
      user_id: number | null;
    } | null;
  };
}

export async function getCart(): Promise<IResponse> {
  const res = await fetcher<IResponse>({
    endpoint: '/cart',
    method: 'get',
    contentType: 'json',
  });
  return res.data;
}
