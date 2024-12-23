import React from "react";
import { Product } from "@prisma/client";
import { getAllActiveProducts } from "@/libs/api/products.api";
import { ICreateInstagramOrderItemFull } from "@/types/interfaces/instagramOrder.interface";

export const useProductsOptions = (
  selectedOrders: ICreateInstagramOrderItemFull[]
) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async function fetch() {
      try {
        setIsLoading(true);
        const products = await getAllActiveProducts();
        if (products) {
          setProducts(products);
        }
      } catch (error) {
        console.error("Error in fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("selectedOrders", selectedOrders);

  const options = React.useMemo(() => {
    return products
      .filter(
        (product) =>
          !selectedOrders?.some((order) => order.product?.id === product.id)
      )
      .map((product) => ({
        value: product.id,
        label: product.productName,
      }));
  }, [products, selectedOrders]);

  return {
    isLoading,
    options,
    products,
  };
};
