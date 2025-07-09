import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/common/Container";
import ProductDetailsLayout from "@/components/pages/products/ProductDetailsLayout";
import { ParamsProps } from "@/types";
import { getGlobalData, getProducts } from "@/utils/getGlobalData";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";

export default async function ProductDetailsPage({ params }: ParamsProps) {
  const session = await getServerSession(authOptions);

  return (
    <Container>
      <ProductDetailsLayout slug={params.slug} session={session} />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const data = await getGlobalData();
    const product = await getProducts(params.slug);

    if (!product) {
      return {
        title: data?.shopName || "Shop",
        description: data?.description || "",
      };
    }

    return {
      title: `${product.name} | ${data?.shopName || ""}`.trim(),
      description: product.meta_description || data?.description || "",
      openGraph: {
        type: "website",
        title: product.name || "",
        description: product.meta_description || data?.description || "",
        images: [
          {
            url: product.thumbnail || `${data?.logo || ""}`,
            alt: product.name || data?.shopName || "",
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Product Details",
      description: "",
    };
  }
}
