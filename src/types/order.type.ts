export interface ICoupon {
  name: string;
  code: string;
  discount: number;
  discountType: "percentage" | "flat";
  expiryDate: string;
  isActive: boolean;
  limit: number;
  totalUsed: number;
}
