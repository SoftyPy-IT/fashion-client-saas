import { Skeleton } from "@heroui/react";
import Container from "@/components/common/Container";
import React from "react";

export default function AuthLoading() {
  return (
    <Container>
      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-[480px] py-10 lg:py-20">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Skeleton className="w-full h-8 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="mt-4 w-full h-8 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="mt-4 w-full h-8 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="mt-4 w-full h-8 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="mt-4 w-full h-8 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>
    </Container>
  );
}
