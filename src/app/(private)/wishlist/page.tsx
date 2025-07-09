import Container from "@/components/common/Container";
import WishListitems from "@/components/pages/wishlistItems";
import { getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";

export default async function Wishlist() {
  return (
    <Container>
      <WishListitems />
    </Container>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName + " | Wishlist",
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
