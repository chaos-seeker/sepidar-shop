import { getCategories } from '@/actions/global/get-categories';
import { getSettings } from '@/actions/global/get-settings';
import { getProductSlider } from '@/actions/routes/home/get-product-slider';
import { ScrollAnimation } from '@/components/scroll-animation';
import { Categories } from '@/containers/routes/home/categories';
import { Facilities } from '@/containers/routes/home/facilities';
import { HeroSlider } from '@/containers/routes/home/hero-slider';
import { ProductSlider } from '@/containers/routes/home/product-slider';
import { TwiceImage } from '@/containers/routes/home/twice-image';

export default async function Page() {
  const [settings, categories, latestProducts, bestSellingProducts] =
    await Promise.all([
      getSettings({ query: { language: 'fa' } }),
      getCategories(),
      getProductSlider({ query: { limit: 10, sort: 'newest' } }),
      getProductSlider({ query: { limit: 10, sort: 'best_selling' } }),
    ]);

  return (
    <>
      <HeroSlider data={settings?.options?.sliders} />
      <ScrollAnimation>
        <Categories categories={categories} />
      </ScrollAnimation>
      <ScrollAnimation>
        <ProductSlider data={latestProducts} title="جدید ترین ها" />
      </ScrollAnimation>
      <ScrollAnimation>
        <TwiceImage settings={settings} bannerType="top" />
      </ScrollAnimation>
      <ScrollAnimation>
        <ProductSlider data={bestSellingProducts} title="پر فروش ترین ها" />
      </ScrollAnimation>
      <ScrollAnimation>
        <TwiceImage settings={settings} bannerType="bottom" />
      </ScrollAnimation>
      <ScrollAnimation>
        <Facilities />
      </ScrollAnimation>
    </>
  );
}
