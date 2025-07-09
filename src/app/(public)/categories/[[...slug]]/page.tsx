import Container from "@/components/common/Container";
import CategoriesLayout from "@/components/pages/categories/CategoriesLayout";
import React from "react";
import { getCategory, getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === undefined) {
    return notFound();
  }

  return (
    <Container>
      <CategoriesLayout slug={params.slug} />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  if (params.slug === undefined) {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }

  const data = await getGlobalData();
  const { slug } = params;

  const last = slug[slug.length - 1];
  return {
    title: last.toLocaleUpperCase() + " | " + data?.shopName || "",
    description: data?.description || "",
  };
}
