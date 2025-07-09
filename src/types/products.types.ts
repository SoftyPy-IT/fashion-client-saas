export type ICategory = {
  _id: string;
  category_priority: number;
  name: string;
  description: string;
  image: string;
  products: string[];
};
export type IProductUnit = {
  _id: string;
  unit_code: string;
  name: string;
};

export type IProductTax = {
  type: "Percentage" | "Fixed";
  rate: number;
  name: string;
  code: string;
};

export interface IProduct {
  _id: string;
  name: string;
  size_chart: string;
  code: string;
  slug: string;
  barcodeSymbology: string;
  brand: string;
  category: ICategory;
  subCategory: ICategory;
  mainCategory: ICategory;
  productUnit: IProductUnit;
  defaultSaleUnit: IProductUnit;
  defaultPurchaseUnit: IProductUnit;
  productCost: number;
  price: number;
  productTax: IProductTax;
  taxMethod: "Exclusive" | "Inclusive" | "No Tax";
  description: string;
  short_description: string;
  thumbnail: string;
  images: string[];
  supplier: string;
  discount_price: number;
  tags: string[];
  stock: number;
  quantity: number;
  is_available: boolean;
  is_featured: boolean;
  is_active: boolean;
  total_sale: number;
  rating: number;

  reviews: {
    rating: number;
    user: string;
    comment: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  variants: {
    name: string;
    values: {
      name: string;
      value: string;
      _id: string;
    }[];
  }[];
  hasVariants: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
}

export interface IProductVariant {
  name: string;
  values: {
    name: string;
    value: string;
    _id: string;
  }[];
}
[];
