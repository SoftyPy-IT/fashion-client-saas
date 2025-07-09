import Container from "@/components/common/Container";
import TrackOrder from "@/components/pages/TrackOrder";
import { getGlobalData } from "@/utils/getGlobalData";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <Container>
      <TrackOrder />
    </Container>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Track Order",
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
