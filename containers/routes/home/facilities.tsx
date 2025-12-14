'use client';

import { cn } from '@/utils/cn';
import { Gift, Headphones, RotateCcw, Truck } from 'lucide-react';

export const Facilities = () => {
  const data = [
    {
      icon: Truck,
      title: 'ارسال اکسپرس',
      description:
        'تحویل سریع و مطمئن در کمترین زمان ممکن با پیگیری لحظه‌به‌لحظه مرسوله تا مقصد',
    },
    {
      icon: Gift,
      title: 'تخفیفات و جوایز',
      description:
        'بهره‌مندی از تخفیفات انحصاری، امتیازدهی و جوایز ویژه برای اعضای باشگاه مشتریان',
    },
    {
      icon: RotateCcw,
      title: 'مرجوعی کالا',
      description:
        'گارانتی بازگشت ۷ روزه کالا با شرایط آسان و پشتیبانی کامل از حقوق مصرف‌کننده',
    },
    {
      icon: Headphones,
      title: 'پشتیبانی 24/7',
      description:
        'دسترسی دائمی به تیم پشتیبانی متخصص از طریق تمامی کانال‌های ارتباطی در هر ساعت از شبانه‌روز',
    },
  ];

  return (
    <div
      className="w-full py-6 sm:py-8 bg-gray-50 rounded-lg container"
      dir="rtl"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
          خدمات ویژه ما
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
          با بهره‌مندی از استانداردهای بین‌المللی و پشتیبانی حرفه‌ای، تجربه‌ای
          مطمئن و بی‌نظیر از خرید را برای شما فراهم می‌کنیم
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={cn(
                  'bg-white border border-gray-100 p-3 sm:p-6 group',
                  'rounded-lg sm:rounded-xl',
                  'hover:border-gray-300 transition-all duration-300',
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-3 sm:mb-4 p-2 sm:p-3 bg-white rounded-lg border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
                    <div className="absolute inset-1 rounded border border-primary/20 group-hover:border-primary/40 transition-all duration-300"></div>
                    <div className="relative w-full h-full z-10 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-lg font-medium sm:font-bold text-gray-900 mb-0 sm:mb-2 leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 leading-relaxed hidden sm:block">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
