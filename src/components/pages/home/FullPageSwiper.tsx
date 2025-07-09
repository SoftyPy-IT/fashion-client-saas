"use client";

import Preloader from "@/components/common/Preloader";
import TopHeader from "@/components/shared/TopHeader";
import { useGetAllSectionsQuery } from "@/redux/features/storefront/storefront.api";
import {
  ISection,
  SectionStatus,
  SectionStyle,
  SectionType,
} from "@/types/storefront.types";
import React from "react";
import BannerCarouselSection from "./DynamicCarouselSection";
import BannerGridSection from "./DynamicGridSection";
import ProductCarouselSection from "./ProductCarouselS";
import Slider from "./Slider";

const FullPageSections: React.FC = () => {
  const { data: sectionsData, isLoading } = useGetAllSectionsQuery(undefined);

  if (isLoading) return <Preloader />;

  const renderSectionContent = (section: ISection) => {
    if (section.status === SectionStatus.Inactive) return null;

    if (section.type === SectionType.Banner) {
      return section.style === SectionStyle.Carousel ? (
        <BannerCarouselSection section={section} />
      ) : (
        <BannerGridSection section={section} />
      );
    }

    if (section.type === SectionType.Product) {
      return <ProductCarouselSection section={section} />;
    }

    return null;
  };

  return (
    <>
      <TopHeader />
      <Slider />
    </>
  );
};

export default FullPageSections;
