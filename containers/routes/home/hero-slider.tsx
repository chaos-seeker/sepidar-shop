"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getSettings } from "@/actions/global/get-settings";
import Link from "next/link";

interface HeroSliderProps {
  data: Awaited<ReturnType<typeof getSettings>>["options"]["sliders"];
}

export const HeroSlider = (props: HeroSliderProps) => {
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full aspect-27/8 container group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".hero-slider-prev",
          prevEl: ".hero-slider-next",
        }}
        pagination={{
          clickable: true,
          bulletClass: "hero-slider-bullet",
          bulletActiveClass: "hero-slider-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full rounded-xl overflow-hidden"
        onInit={(swiper) => {
          if (paginationRef.current) {
            swiper.pagination.el = paginationRef.current;
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }
        }}
      >
        {props.data?.map((slide) => (
          <SwiperSlide key={slide.img}>
            <Link href={"/"} className="block w-full h-full cursor-pointer">
              <Image
                src={`${process.env.NEXT_PUBLIC_File_URL}/${slide.img}`}
                alt="اسلاید"
                fill
                className="object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
        <div
          ref={paginationRef}
          className="hero-slider-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        ></div>
      </Swiper>
      <div className="hero-slider-prev absolute left-9 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
          <ChevronLeft className="size-6" />
        </div>
      </div>
      <div className="hero-slider-next absolute right-9 top-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300">
          <ChevronRight className="size-6" />
        </div>
      </div>
      <style jsx global>{`
        .hero-slider-pagination {
          bottom: 16px !important;
          display: flex !important;
          gap: 4px !important;
          justify-content: center !important;
          align-items: center !important;
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 10 !important;
        }

        .hero-slider-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.4) !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          display: inline-block !important;
          opacity: 1 !important;
          margin: 0 2px !important;
        }

        .hero-slider-bullet-active {
          width: 24px !important;
          height: 8px !important;
          background: white !important;
          border-radius: 4px !important;
        }
      `}</style>
    </section>
  );
};
