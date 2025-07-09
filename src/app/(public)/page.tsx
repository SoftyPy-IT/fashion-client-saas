import CategoriesSection from "@/components/pages/home/CategoriesSection";
import DealsOffer from "@/components/pages/home/DealsOffer";
import DynamicSection from "@/components/pages/home/DynamicSection";
import FeatureProducts from "@/components/pages/home/FeatureProducts";
import NewsSection from "@/components/pages/home/NewsSection";
import Slider from "@/components/pages/home/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CategoriesSection />
      {/* <FeatureProducts /> */}
      {/* <DealsOffer /> */}
      <DynamicSection />
      <NewsSection />
    </>
  );
}
