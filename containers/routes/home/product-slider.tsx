'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ModalProductPreview } from './modal-product-preview';
import { getProductSlider } from '@/actions/routes/home/get-product-slider';
import { formatPrice } from '@/utils/format';
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IProductSliderProps {
  data: Awaited<ReturnType<typeof getProductSlider>>;
  title: 'جدید ترین ها' | 'پر فروش ترین ها';
}

const ProductSlider = (props: IProductSliderProps) => {
  const products = props.data?.data || [];
  const [selectedProduct, setSelectedProduct] = useState<
    IProductSliderProps['data']['data'][0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePreviewClick = (
    e: React.MouseEvent,
    product: IProductSliderProps['data']['data'][0],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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

  return (
    <>
      <style>{`
        .product-swiper .swiper-pagination-bullet {
          background: var(--color-primary);
          opacity: 0.3;
        }

        .product-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .product-card .product-overlay {
          opacity: 0;
          transition: opacity 0.3s;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .slider-group:hover .product-swiper-prev,
        .slider-group:hover .product-swiper-next {
          opacity: 1;
        }
      `}</style>
      <section className="relative w-full container slider-group" dir="rtl">
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
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView={2}
                slidesPerGroup={2}
                navigation={{
                  nextEl: '.product-swiper-prev',
                  prevEl: '.product-swiper-next',
                }}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
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
                {products.map((product) => {
                  const discountPercent = getDiscountPercent(product);
                  const sizes = getSizes(product);

                  return (
                    <SwiperSlide key={product.id}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="product-card group flex flex-col h-full border rounded-lg hover:border-primary duration-300 bg-white overflow-hidden cursor-pointer"
                      >
                        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                          <div className="product-overlay absolute inset-0 bg-black/20 flex items-center justify-center gap-3 z-20 pointer-events-none">
                            <button
                              type="button"
                              onClick={(e) => handlePreviewClick(e, product)}
                              className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 border border-transparent hover:border-primary pointer-events-auto"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 border border-transparent hover:border-primary pointer-events-auto"
                            >
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                          {discountPercent && (
                            <div className="absolute top-2 left-2 bg-primary text-white text-sm font-bold py-1 px-2 rounded-lg z-10">
                              {discountPercent}٪
                            </div>
                          )}
                          {product.quantity === 0 && (
                            <div className="absolute top-2 right-2 bg-gray-500 text-white text-sm font-bold py-1 px-2 rounded-lg z-10">
                              تمام شد
                            </div>
                          )}
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
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
                            {product.name}
                          </h3>
                          {product.short_description && (
                            <p className="text-gray-500 text-xs text-right line-clamp-2 leading-relaxed">
                              {product.short_description}
                            </p>
                          )}
                          {product.product_type === 'simple' && (
                            <div className="flex flex-col items-start">
                              {product.sale_price &&
                                product.price > product.sale_price && (
                                  <span className="text-gray-400 text-xs line-through">
                                    {formatPrice(product.price)} تومان
                                  </span>
                                )}
                              <span className="font-bold text-primary text-base">
                                {formatPrice(
                                  product.sale_price &&
                                    product.price > product.sale_price
                                    ? product.sale_price
                                    : product.price,
                                )}{' '}
                                <span className="text-xs font-normal">
                                  تومان
                                </span>
                              </span>
                            </div>
                          )}
                          {product.product_type === 'variable' && (
                            <div className="flex flex-col items-start">
                              {product.min_price && product.max_price ? (
                                product.min_price !== product.max_price ? (
                                  <span className="font-bold text-primary text-base">
                                    {formatPrice(product.min_price)} -{' '}
                                    {formatPrice(product.max_price)}{' '}
                                    <span className="text-xs font-normal">
                                      تومان
                                    </span>
                                  </span>
                                ) : (
                                  <span className="font-bold text-primary text-base">
                                    {formatPrice(product.min_price)}{' '}
                                    <span className="text-xs font-normal">
                                      تومان
                                    </span>
                                  </span>
                                )
                              ) : (
                                <span className="text-gray-400">
                                  قیمت نامشخص
                                </span>
                              )}
                            </div>
                          )}
                          {sizes.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-gray-500">
                                سایز:
                              </span>
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
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="product-swiper-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 slider-group:hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
                  <ChevronLeft className="size-6" />
                </div>
              </div>
              <div className="product-swiper-next absolute -right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 slider-group:hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
                  <ChevronRight className="size-6" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              محصولی یافت نشد
            </div>
          )}
        </div>
      </section>
      <ModalProductPreview
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProductSlider;
