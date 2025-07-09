import Container from "@/components/common/Container";
import ProductsPageLayout from "@/components/pages/products/ProductsPageLayout";
import React from "react";
import { getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";

export default async function ProductsPage() {
  return (
    <Container>
      <ProductsPageLayout />
    </Container>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Products",
    description: data?.description || "",
    openGraph: {
      images: [
        {
          url: data?.logo || "",
          alt: data?.shopName || "",
        },
      ],
    },
  };
}
