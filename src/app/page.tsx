import MarqueeText from '@/components/common/MarqueeText';
import FeaturedCategory from '@/components/home/FeaturedCategory';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanners from '@/components/home/PromoBanners';
import EnclosureGadget from '@/components/home/EnclosureGadget';
import AboutContent from '@/components/home/AboutContent';
import BestSellingTable from '@/components/home/BestSellingTable';
import BentoSlider from '@/components/header/BentoSlider';


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <BentoSlider />
      <MarqueeText />
      <FeaturedCategory />
      <FeaturedProducts />
       <PromoBanners />
       <EnclosureGadget />
       <AboutContent />
       <BestSellingTable />
    </main>
  );
}