import { IProduct } from "./products.types";

export interface ISlider {
  _id: string;
  image: string;
  title: string;
  subTitle: string;
  link: string;
}

export interface IStorefront {
  shopName: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    facebook: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  pages: {
    aboutUs: string;
    termsAndConditions: string;
    privacyPolicy: string;
    refundPolicy: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  logo: string;
  sliders: ISlider[];
}

export interface IOffers {
  _id: string;
  title: string;
  subTitle: string;
  startDate: Date;
  endDate: Date;
  products: IProduct[];
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export enum SectionType {
  Product = "product",
  Banner = "banner",
}

export enum SectionStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum SectionStyle {
  Grid = "grid",
  Carousel = "carousel",
}

export interface IImage {
  desktop: string[];
  mobile: string[];
}

export interface ISection {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  images: IImage;
  products: IProduct[];
  type: SectionType;
  status: SectionStatus;
  style: SectionStyle;
  row: number;
}
