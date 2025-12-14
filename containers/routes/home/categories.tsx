'use client';

import 'swiper/css';
import { getCategories } from '@/actions/global/get-categories';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CategoriesProps {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export const Categories = (props: CategoriesProps) => {
  return (
    <section className="relative w-full container group" dir="rtl">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
      >
        {props.categories?.map((category) => (
          <SwiperSlide key={category.id} style={{ width: 'fit-content' }}>
            <div className="flex flex-col items-center group-hover:opacity-90 hover:opacity-100! transition-opacity duration-300 h-full w-fit">
              <Link
                href={`/products?categories=${JSON.stringify([category.id])}`}
                className="block border-gray-300 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative rounded-full overflow-hidden border-2 hover:border-primary transition-all duration-300 active:scale-95 bg-gray-100"
              >
                <Image
                  src={
                    category.icon
                      ? `${process.env.NEXT_PUBLIC_File_URL}/${category.icon}`
                      : category.image
                  }
                  alt={category.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                  draggable={false}
                />
              </Link>
              <span className="text-sm md:text-base lg:text-lg text-center font-medium text-primary mt-2 line-clamp-2 max-w-[90px] sm:max-w-[100px] md:max-w-[110px]">
                {category.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
