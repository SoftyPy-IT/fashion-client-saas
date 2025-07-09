import Container from "@/components/common/Container";
import BlogDetailsLayout from "@/components/pages/home/BlogDetailsLayout";
import { baseURL } from "@/redux/api/baseApi";
import { ParamsProps } from "@/types";
import { getBlog, getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";

export default function BlogDetailsPage({ params }: ParamsProps) {
  return (
    <Container>
      <BlogDetailsLayout params={params} />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { slug } = params;
    const shopData = await getGlobalData();
    const data = await getBlog(slug);

    if (!data) {
      return {
        title: shopData?.shopName || "Blog Details",
        description: shopData?.description || "Blog Details",
      };
    }

    return {
      title: data?.title || "Blog Details",
      description: data?.meta_description || "Blog Details",
      openGraph: {
        type: "website",
        title: data?.title || "Blog Details",
        description: data?.meta_description || "Blog Details",
        images: [
          {
            url: data?.thumbnail || `${baseURL}/images/default.png`,
            alt: data?.title || "Blog Details",
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
