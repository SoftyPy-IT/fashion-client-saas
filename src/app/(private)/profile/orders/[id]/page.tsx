import OrderDetails from "@/components/pages/profile/orders/OrderDetails";
import { URLProps } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

export default function OrderPage({ params }: URLProps) {
  if (!params.id) return notFound();
  return (
    <div>
      <OrderDetails id={params.id} />
    </div>
  );
}
