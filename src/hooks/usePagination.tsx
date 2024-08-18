"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const usePagination = () => {
  const router = useRouter();

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", (newPage + 1).toString());

    router.push(url.toString());
  };

  return { onChangePage };
};
