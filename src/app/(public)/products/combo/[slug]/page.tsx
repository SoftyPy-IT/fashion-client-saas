import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/common/Container";
import ComboDetailsLayout from "@/components/pages/products/ComboDetailsLayout";
import { ParamsProps } from "@/types";
import React from "react";
import { getServerSession } from "next-auth/next";

export default async function ProductDetailsPage({ params }: ParamsProps) {
  const session = await getServerSession(authOptions);

  return (
    <Container>
      <ComboDetailsLayout slug={params.slug} session={session} />
    </Container>
  );
}
