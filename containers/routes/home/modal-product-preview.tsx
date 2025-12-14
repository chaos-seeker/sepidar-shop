'use client';

import { getProductSlider } from '@/actions/routes/home/get-product-slider';
import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/format';
import { ChevronLeft, ChevronRight, Heart, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ModalProductPreviewProps {
  product: Awaited<ReturnType<typeof getProductSlider>>['data'][0] | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalProductPreview = (props: ModalProductPreviewProps) => {
  const getUniqueAttributes = (
    variations: Awaited<
      ReturnType<typeof getProductSlider>
    >['data'][0]['variations'],
  ) => {
    if (!variations) return [];
    const attributesMap = new Map();
    variations.forEach((variation) => {
      const attribute = variation.attribute;
      if (attribute && !attributesMap.has(attribute.slug)) {
        attributesMap.set(attribute.slug, {
          slug: attribute.slug,
          name: attribute.name,
        });
      }
    });
    return Array.from(attributesMap.values());
  };
  const getAttributeValues = (
    variations: Awaited<
      ReturnType<typeof getProductSlider>
    >['data'][0]['variations'],
    attributeSlug: string,
  ) => {
    if (!variations) return [];
    const valuesMap = new Map();
    variations
      .filter((v) => v.attribute.slug === attributeSlug)
      .forEach((v) => {
        if (!valuesMap.has(v.id)) {
          valuesMap.set(v.id, {
            id: v.id,
            value: v.value,
            meta: v.meta,
          });
        }
      });
    return Array.from(valuesMap.values());
  };
  const getDiscountPercent = (
    product: Awaited<ReturnType<typeof getProductSlider>>['data'][0],
  ): number | null => {
    if (product.product_type === 'simple' && product.sale_price) {
      if (product.price > product.sale_price) {
        return Math.round(
          ((product.price - product.sale_price) / product.price) * 100,
        );
      }
    }
    if (
      product.product_type === 'variable' &&
      product.max_price &&
      product.min_price &&
      Number(product.max_price) > Number(product.min_price)
    ) {
      return Math.round(
        ((Number(product.max_price) - Number(product.min_price)) /
          Number(product.max_price)) *
          100,
      );
    }

    return null;
  };
  const getCashbackAmount = (
    product: Awaited<ReturnType<typeof getProductSlider>>['data'][0],
  ): number | null => {
    if (!product.cashback) return null;
    if (product.cashback_type === 'percentage') {
      const price =
        product.sale_price && product.price > product.sale_price
          ? product.sale_price
          : product.price;
      return (Number(price) * Number(product.cashback)) / 100;
    }
    return Number(product.cashback);
  };
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    if (props.isOpen && props.product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [props.isOpen, props.product]);

  if (!props.isOpen || !props.product) return null;

  const attributes = getUniqueAttributes(props.product.variations);
  const galleryImages = props.product.gallery || [];
  const allImages = [props.product.image, ...galleryImages].filter(Boolean);
  const currentImageIndex = Math.min(
    selectedImageIndex >= allImages.length ? 0 : selectedImageIndex,
    allImages.length - 1,
  );
  const selectedImage = allImages[currentImageIndex];
  const discountPercent = getDiscountPercent(props.product);
  const cashbackAmount = getCashbackAmount(props.product);
  const rating = Math.round(props.product.ratings || 0);
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : allImages.length - 1,
    );
  };
  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < allImages.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <div
      key={props.product.id}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={props.onClose}
    >
      <div
        className="bg-white rounded-lg max-w-[800px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <span className="text-gray-600 font-semibold">پیش‌نمایش محصول</span>
          <button
            onClick={props.onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="relative aspect-square rounded overflow-hidden border group">
              <Image
                src={selectedImage}
                alt={props.product.name}
                fill
                className="object-cover"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </>
              )}
              {discountPercent && (
                <div className="absolute top-2 left-2 bg-primary text-white text-sm font-bold py-1 px-2 rounded">
                  {discountPercent}٪
                </div>
              )}
              {allImages.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'relative w-16 h-16 rounded border overflow-hidden shrink-0 transition-all',
                      currentImageIndex === index
                        ? 'border-2 border-primary'
                        : 'border-gray-300 hover:border-gray-400',
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${props.product?.name} - تصویر ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-bold text-gray-600">
                {props.product?.name}
              </h1>
              <button
                className={cn(
                  'p-2 rounded-full transition-all hover:bg-gray-100',
                  props.product?.in_wishlist ? 'text-red-500' : 'text-gray-600',
                )}
                title={
                  props.product?.in_wishlist
                    ? 'حذف از علاقه‌مندی‌ها'
                    : 'افزودن به علاقه‌مندی‌ها'
                }
              >
                <Heart
                  className={cn(
                    'w-5 h-5',
                    props.product?.in_wishlist && 'fill-red-500',
                  )}
                />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-row-reverse">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'w-5 h-5',
                      star <= rating
                        ? 'text-primary fill-primary/80'
                        : 'text-gray-300',
                    )}
                  />
                ))}
              </div>
              <span className="text-gray-600 flex gap-x-1">
                {formatPrice(5)} /{' '}
                {formatPrice((props.product?.ratings || 0).toFixed(1))} (
                {formatPrice(props.product?.total_reviews || 0)} نظر)
              </span>
            </div>

            {props.product?.product_type === 'simple' && (
              <div className="flex items-center gap-2">
                {props.product?.sale_price &&
                  props.product?.price > props.product?.sale_price && (
                    <span className="text-gray-400 text-sm line-through">
                      {formatPrice(props.product?.price)}
                    </span>
                  )}
                <span className="font-bold text-primary text-xl">
                  {formatPrice(
                    props.product?.sale_price &&
                      props.product?.price > props.product?.sale_price
                      ? props.product?.sale_price
                      : props.product?.price,
                  )}
                  <span className="text-sm font-normal mr-1">تومان</span>
                </span>
              </div>
            )}

            {props.product.product_type === 'variable' && (
              <div className="flex items-center gap-2">
                {props.product.min_price && props.product.max_price ? (
                  props.product.min_price !== props.product.max_price ? (
                    <span className="font-bold text-primary text-xl">
                      {formatPrice(props.product.min_price)} -{' '}
                      {formatPrice(props.product.max_price)}
                      <span className="text-sm font-normal mr-1">تومان</span>
                    </span>
                  ) : (
                    <span className="font-bold text-primary text-xl">
                      {formatPrice(props.product.min_price)}
                      <span className="text-sm font-normal mr-1">تومان</span>
                    </span>
                  )
                ) : (
                  <span className="text-gray-400">قیمت نامشخص</span>
                )}
              </div>
            )}

            {cashbackAmount && cashbackAmount > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">کش‌بک:</span>
                  <span className="font-bold text-green-600">
                    {formatPrice(cashbackAmount)} تومان
                  </span>
                  {props.product.cashback_type === 'percentage' &&
                    props.product.cashback && (
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                        ({props.product.cashback}٪)
                      </span>
                    )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-sm',
                  props.product.quantity > 0
                    ? 'text-green-600'
                    : 'text-red-600',
                )}
              >
                {props.product.quantity > 0 ? 'موجود در انبار' : 'ناموجود'}
              </span>
              {props.product.quantity > 0 && (
                <span className="text-xs text-gray-500">
                  ({props.product.quantity} عدد)
                </span>
              )}
            </div>

            {props.product.short_description && (
              <div className="text-gray-600 text-sm leading-relaxed line-clamp-5">
                {props.product.short_description}
              </div>
            )}

            {attributes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-600">ویژگی‌ها:</h3>
                {attributes.map((attribute) => {
                  const values = getAttributeValues(
                    props.product?.variations || [],
                    attribute.slug,
                  );
                  const isColor = attribute.slug === 'رنگ';

                  return (
                    <div
                      key={attribute.slug}
                      className="flex items-center gap-3"
                    >
                      <span className="text-sm text-gray-600">
                        {attribute.name}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {values.map((value) =>
                          isColor && value.meta ? (
                            <div
                              key={value.id}
                              className="w-6 h-6 rounded border border-gray-300 shadow-sm"
                              style={{ backgroundColor: value.meta }}
                              title={value.value}
                            />
                          ) : (
                            <span
                              key={value.id}
                              className="text-xs px-2 py-1 border border-gray-300 rounded bg-white"
                            >
                              {value.value}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <Link
              href={`/products/${props.product.slug}`}
              onClick={props.onClose}
              className="flex w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors text-center justify-center"
            >
              مشاهده جزئیات کامل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
