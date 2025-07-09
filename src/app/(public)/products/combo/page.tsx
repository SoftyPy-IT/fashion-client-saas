import Container from "@/components/common/Container";
import React from "react";
import { getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";
import ComboPageLayout from "@/components/pages/products/ComboPageLayout";

export default async function ComboProductsPage() {
  return (
    <Container>
      <ComboPageLayout />
    </Container>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Combo Products",
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
