import React from "react";
import { createUrlForCheckout } from "@/libs/api/mono.api";

export const useGeneratePaymentLink = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const generate = async (orderId: string) => {
    try {
      setIsLoading(true);
      await createUrlForCheckout(orderId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading };
};
