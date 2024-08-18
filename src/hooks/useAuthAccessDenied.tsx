"use client";

import React from "react";
import { useToast } from "./Toast/useToast";
import { useSearchParams } from "next/navigation";

export const useAuthAccessDenied = () => {
  const toast = useToast();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (searchParams.get("error") === "denied") {
      toast(
        "error",
        "Упс...",
        "У Вас немає доступу до панелі! Зверніться до адміністратора"
      );
    }
  }, [searchParams]);

  return <></>;
};
