"use server";

import prismaClient from "@/libs/client/prisma.client";

export const getAllActiveProducts = async () => {
  try {
    const products = await prismaClient.product.findMany({
      where: {
        isStock: true,
        locale: "uk",
      },
    });

    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductPrice = async () => {
  try {
    const product = await prismaClient.product.findFirst({
      where: {
        isStock: true,
        locale: "uk",
      },
    });

    if (!product) {
      return null;
    }

    return product.price;
  } catch (error) {
    throw error;
  }
};
