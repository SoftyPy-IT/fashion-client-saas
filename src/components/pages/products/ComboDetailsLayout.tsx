"use client";

import Preloader from "@/components/common/Preloader";
import { useGetComboProductDetailsQuery } from "@/redux/features/products/combo.api";
import { IProduct } from "@/types/products.types";
import ComboProductOverview from "./ComboProductOverview";
import RelatedProducts from "./RelatedProducts";

interface IParams {
  slug: string;
  session: any;
}

const ComboDetailsLayout = ({ slug, session }: IParams) => {
  const { data, isLoading } = useGetComboProductDetailsQuery(slug) as any;

  const product = data as IProduct;
  const items = data?.items as IProduct[];

  if (isLoading) return <Preloader />;
  return (
    <div className="container mx-auto px-4">
      <ComboProductOverview
        product={product}
        items={items}
        isLoading={isLoading}
        session={session}
      />
      {/* <RelatedProducts
        products={
          items?.map((item: IProduct) => ({
            ...item,
            category: item.category?.name as unknown as string,
            mainCategory: item.mainCategory?.name as unknown as string,
            subCategory: item.subCategory?.name as unknown as string,
          })) || []
        }
        isLoading={isLoading}
        key={product._id}
      /> */}
    </div>
  );
};

export default ComboDetailsLayout;
