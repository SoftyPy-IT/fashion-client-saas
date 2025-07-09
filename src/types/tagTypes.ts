/* eslint-disable no-unused-vars */
export type TagType =
  | "categories"
  | "brands"
  | "products"
  | "attributes"
  | "barcode"
  | "gallery-images"
  | "gallery-folder"
  | "storefront"
  | "offers"
  | "units"
  | "tax"
  | "suppliers"
  | "sections"
  | "reviews"
  | "orders"
  | "profile"
  | "combos"
  | "blogs";

export enum TAG_TYPES {
  CATEGORIES = "categories",
  BRANDS = "brands",
  PRODUCTS = "products",
  ATTRIBUTES = "attributes",
  BARCODE = "barcode",
  GALLERY_IMAGES = "gallery-images",
  GALLERY_FOLDER = "gallery-folder",
  STOREFRONT = "storefront",
  OFFERS = "offers",
  UNITS = "units",
  TAXES = "tax",
  SUPPLIERS = "suppliers",
  SECTIONS = "sections",
  REVIEWS = "reviews",
  ORDERS = "orders",
  PROFILE = "profile",
  COMBOS = "combos",
  BLOGS = "blogs",
}

export const tagTypesArray: TagType[] = Object.values(TAG_TYPES) as TagType[];
