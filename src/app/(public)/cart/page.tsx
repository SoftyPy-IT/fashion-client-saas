import CartPage from "@/components/Cart/CartPage";
import Container from "@/components/common/Container";

import { getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";

export default async function Cart() {
  return (
    <Container>
      <div className="mx-auto w-full pt-16 pb-24 relative top-10 mt-10  my-5">
        <CartPage />
      </div>
    </Container>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Cart",
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
