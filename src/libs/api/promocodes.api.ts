"use server";

import prismaClient from "@/libs/client/prisma.client";
import {
  ICreatePromoCode,
  IUpdatePromoCode,
} from "@/types/interfaces/promocodes.interface";
import { Promocode } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getAllPromoCodes = async (
  page = 1,
  limit = 15,
  search?: string,
  type?: string,
  status?: string
) => {
  try {
    const skip = (page - 1) * limit;

    const currentStatus =
      status === "active" ? true : status === "disabled" ? false : undefined;
    const isFixedPrice = type === "fixed";
    const isPercent = type === "percent";

    const searchFilter: any = {
      ...(search && { code: { contains: search } }),
      ...(currentStatus !== undefined && { iasActive: currentStatus }),
      ...(isPercent && { percentDiscount: { gt: 0 } }),
      ...(isFixedPrice && { newPrice: { gt: 0 } }),
    };

    const total = await prismaClient.promocode.count({
      where: searchFilter,
    });

    const totalPage = Math.ceil(total / limit);
    const currentPage = page > totalPage ? totalPage : page;

    const promocodes = await prismaClient.promocode.findMany({
      where: searchFilter,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    return {
      promocodes,
      pagination: {
        total,
        totalPage,
        currentPage,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const createPromoCode = async (data: ICreatePromoCode) => {
  try {
    const promocode = await prismaClient.promocode.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/promocodes");
    return promocode;
  } catch (error) {
    throw error;
  }
};

export const updatePromoCode = async (id: string, data: IUpdatePromoCode) => {
  try {
    const promocode = await prismaClient.promocode.update({
      where: {
        id,
      },
      data: {
        iasActive: !!data?.iasActive,
        ...(data?.code && { code: data.code }),
        ...(data?.percentDiscount && { percentDiscount: data.percentDiscount }),
        ...(data?.newPrice && { newPrice: data.newPrice }),
      },
    });

    revalidatePath("/promocodes");
    return promocode;
  } catch (error) {
    throw error;
  }
};

export const deletePromoCode = async (id: string) => {
  try {
    const promocode = await prismaClient.promocode.delete({
      where: {
        id,
      },
    });

    revalidatePath("/promocodes");
    return promocode;
  } catch (error) {
    throw error;
  }
};
