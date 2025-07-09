import OrderSuccess from "@/components/pages/checkout/OrderSuccess";
import { URLProps } from "@/types";
import { getGlobalData } from "@/utils/getGlobalData";
import { Metadata } from "next";
import React from "react";

export default function SuccessOrderPage({ params }: URLProps) {
  return (
    <div>
      <OrderSuccess id={params.id} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Order Success",
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
