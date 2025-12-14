'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { getProductSlider } from '@/actions/routes/home/get-product-slider';
import { cn } from '@/utils/cn';
import { formatPrice } from '@/utils/format';
import { ChevronLeft, ChevronRight, Eye, Heart, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IProductSliderProps {
  data: Awaited<ReturnType<typeof getProductSlider>>;
  title: 'جدید ترین ها' | 'پر فروش ترین ها';
}

export const ProductSlider = (props: IProductSliderProps) => {
  const products = props.data?.data || [];
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [products]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const hasEnoughSlides = products.length > 2;

  return (
    <>
      <style>{`
        .product-card .product-overlay {
          opacity: 0;
          transition: opacity 0.3s;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .product-slider-prev.swiper-button-disabled,
        .product-slider-next.swiper-button-disabled {
          display: none !important;
        }
      `}</style>
      <section
        className="relative w-full container slider-group group"
        dir="rtl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-primary font-bold">{props.title}</h2>
            <Link
              href="/products"
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors"
            >
              مشاهده همه
              <ChevronLeft size={16} />
            </Link>
          </div>
          {products.length > 0 ? (
            <div className="relative">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={2}
                slidesPerGroup={2}
                navigation={{
                  nextEl: '.product-slider-prev',
                  prevEl: '.product-slider-next',
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                  768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                  },
                }}
                className="product-swiper"
                dir="rtl"
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {hasEnoughSlides && (
                <>
                  <div
                    className="product-slider-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer border rounded-full border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={handleNext}
                    style={{ display: isEnd ? 'none' : 'block' }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
                      <ChevronLeft className="size-6 stroke-primary" />
                    </div>
                  </div>
                  <div
                    className="product-slider-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer border rounded-full border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={handlePrev}
                    style={{ display: isBeginning ? 'none' : 'block' }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
                      <ChevronRight className="size-6 stroke-primary" />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              محصولی یافت نشد
            </div>
          )}
        </div>
      </section>
    </>
  );
};

interface ProductProps {
  product: Awaited<ReturnType<typeof getProductSlider>>['data'][0];
}

const Product = (props: ProductProps): React.ReactElement => {
  const getDiscountPercent = (
    product: IProductSliderProps['data']['data'][0],
  ) => {
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
  const getSizes = (product: IProductSliderProps['data']['data'][0]) => {
    if (!product.variations) return [];
    const sizeMap = new Map();
    product.variations.forEach((variation) => {
      if (
        variation.attribute.slug === 'سایز' ||
        variation.attribute.slug === 'size'
      ) {
        if (!sizeMap.has(variation.value)) {
          sizeMap.set(variation.value, variation.value);
        }
      }
    });
    return Array.from(sizeMap.values()).slice(0, 3);
  };
  const discountPercent = getDiscountPercent(props.product);
  const sizes = getSizes(props.product);

  return (
    <Link
      href={`/products/${props.product.slug}`}
      className="product-card group flex flex-col h-full border rounded-lg hover:border-primary duration-300 bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <div className="product-overlay absolute inset-0 bg-black/20 flex items-center justify-center gap-3 z-20 pointer-events-none">
          <ModalProductPreviewBtn product={props.product} />
          <AddToWishListBtn product={props.product} />
        </div>
        {discountPercent && (
          <div className="absolute top-2 left-2 bg-primary text-white text-sm font-bold py-1 px-2 rounded-lg z-10">
            {discountPercent}٪
          </div>
        )}
        {props.product.quantity === 0 && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white text-sm font-bold py-1 px-2 rounded-lg z-10">
            تمام شد
          </div>
        )}
        {props.product.image ? (
          <Image
            src={props.product.image}
            alt={props.product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">بدون تصویر</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-semibold text-base text-right line-clamp-2">
          {props.product.name}
        </h3>
        {props.product.short_description && (
          <p className="text-gray-500 text-xs text-right line-clamp-2 leading-relaxed">
            {props.product.short_description}
          </p>
        )}
        {props.product.product_type === 'simple' && (
          <div className="flex flex-col items-start">
            {props.product.sale_price &&
              props.product.price > props.product.sale_price && (
                <span className="text-gray-400 text-xs line-through">
                  {formatPrice(props.product.price)} تومان
                </span>
              )}
            <span className="font-bold text-primary text-base">
              {formatPrice(
                props.product.sale_price &&
                  props.product.price > props.product.sale_price
                  ? props.product.sale_price
                  : props.product.price,
              )}{' '}
              <span className="text-xs font-normal">تومان</span>
            </span>
          </div>
        )}
        {props.product.product_type === 'variable' && (
          <div className="flex flex-col items-start">
            {props.product.min_price && props.product.max_price ? (
              props.product.min_price !== props.product.max_price ? (
                <span className="font-bold text-primary text-base">
                  {formatPrice(props.product.min_price)} -{' '}
                  {formatPrice(props.product.max_price)}{' '}
                  <span className="text-xs font-normal">تومان</span>
                </span>
              ) : (
                <span className="font-bold text-primary text-base">
                  {formatPrice(props.product.min_price)}{' '}
                  <span className="text-xs font-normal">تومان</span>
                </span>
              )
            ) : (
              <span className="text-gray-400">قیمت نامشخص</span>
            )}
          </div>
        )}
        {sizes.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">سایز:</span>
            <div className="flex gap-1">
              {sizes.map((size, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 border border-gray-200 rounded-md bg-gray-50"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

interface AddToWishListBtnProps {
  product: Awaited<ReturnType<typeof getProductSlider>>['data'][0];
}

const AddToWishListBtn = (props: AddToWishListBtnProps): React.ReactElement => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Add to wishlist logic here
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 border border-transparent hover:border-primary pointer-events-auto"
    >
      <Heart className="w-5 h-5" />
    </button>
  );
};

interface ModalProductPreviewBtnProps {
  product: Awaited<ReturnType<typeof getProductSlider>>['data'][0];
}

const ModalProductPreviewBtn = (
  props: ModalProductPreviewBtnProps,
): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };
  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const modalElement = isOpen ? (
    <div
      key={props.product.id}
      className={`fixed inset-0 bg-black/50 z-9999 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className={`bg-white rounded-lg max-w-[800px] w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <span className="text-gray-600 font-semibold">پیش‌نمایش محصول</span>
          <button
            onClick={handleClose}
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
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
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
              <div
                className="flex gap-2 overflow-x-auto pb-2 justify-center"
                dir="ltr"
              >
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
              onClick={handleClose}
              className="flex w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors text-center justify-center"
            >
              مشاهده جزئیات کامل
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 border border-transparent hover:border-primary pointer-events-auto"
      >
        <Eye className="w-5 h-5" />
      </button>
      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(modalElement, document.body)}
    </>
  );
};
