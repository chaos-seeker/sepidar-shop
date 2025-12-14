"use client";

import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/actions/global/get-settings";

interface TwiceImageProps {
  settings: Awaited<ReturnType<typeof getSettings>>;
  bannerType: "top" | "bottom";
}


export const TwiceImage = (props: TwiceImageProps) => {
  const base64Placeholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
  const getBannersFromType = () => {
    switch (props.bannerType) {
      case "top":
        return props.settings?.options?.bannerTop;
      case "bottom":
      default:
        return props.settings?.options?.bannerMiddle;
    }
  };

  const banners = getBannersFromType();

  const getBestBanners = () => {
    if (!banners || !Array.isArray(banners) || banners.length === 0) {
      return [];
    }

    const activeBanners = banners
      .filter((banner) => banner.status === "active")
      .map((banner) => ({
        ...banner,
        priority: banner.priority || 0,
      }))
      .filter((banner) => !isNaN(banner.priority));

    if (activeBanners.length === 0) {
      return [];
    }

    const sortedBanners = activeBanners.sort((a, b) => a.priority - b.priority);
    return sortedBanners.slice(0, 2);
  };

  const bestBanners = getBestBanners();

  if (bestBanners.length === 0) {
    return null;
  }

  const hasTwoBanners = bestBanners.length >= 2;
  const showMaintenance =
    !hasTwoBanners &&
    props.bannerType === "bottom" &&
    props.settings?.options?.maintenance?.aboutUsTitle;

  const getImageSrc = (image: string) => {
    if (!image || typeof image !== "string" || image.trim() === "") {
      return base64Placeholder;
    }

    if (image.startsWith("public/")) {
      return `${process.env.NEXT_PUBLIC_File_URL}/${image.replace(
        "public/",
        ""
      )}`;
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${process.env.NEXT_PUBLIC_File_URL}/${image}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = base64Placeholder;
  };

  return (
    <section className={`w-full container`} dir="rtl">
      <div
        className={`w-full ${
          hasTwoBanners ? "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" : ""
        }`}
      >
        {bestBanners.map((banner, index) => {
          const imageSrc = getImageSrc(banner.images || "");
          const href = banner.link || "#";
          const isExternal = banner.link?.startsWith("http");
          const isRightPriority = banner.priority === 1;

          const imageContent = (
            <div className="relative aspect-8/3 rounded-lg overflow-hidden group w-full">
              <Image
                src={imageSrc}
                alt={banner.title || `Banner ${banner.priority || index + 1}`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                quality={85}
                onError={handleImageError}
              />

              {index === 0 &&
                showMaintenance &&
                props.settings?.options?.maintenance && (
                  <div className="absolute inset-0 flex items-center justify-start">
                    <div className="h-full w-full md:w-3/4 lg:w-1/2 flex items-center p-4 md:p-8 bg-gradient-to-l from-black/70 via-black/50 to-transparent rounded-r">
                      <div className="text-white max-w-2xl">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                          {props.settings.options.maintenance.aboutUsTitle}
                        </h2>
                        <div className="relative">
                          <p className="text-xs sm:text-sm md:text-base leading-relaxed hidden md:block">
                            {props.settings.options.maintenance.aboutUsDescription}
                          </p>
                          <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 md:hidden">
                            {props.settings.options.maintenance.aboutUsDescription
                              ?.split("\n")
                              .slice(1)
                              .join("\n")}
                          </p>
                        </div>
                        <button className="mt-3 md:mt-4 px-4 py-1.5 sm:px-5 sm:py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors text-sm sm:text-base cursor-pointer">
                          بیشتر بخوانید
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              {!(index === 0 && showMaintenance) && banner.title && (
                <div
                  className={`absolute inset-0 bg-black/10 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isRightPriority ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="text-white font-medium text-sm px-2 py-1 bg-primary w-fit rounded m-1">
                    {banner.title}
                  </span>
                </div>
              )}
            </div>
          );

          if (!banner.link) {
            return <div key={banner.priority || index}>{imageContent}</div>;
          }

          if (isExternal) {
            return (
              <a
                key={banner.priority || index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {imageContent}
              </a>
            );
          }

          return (
            <Link key={banner.priority || index} href={href} className="block">
              {imageContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
