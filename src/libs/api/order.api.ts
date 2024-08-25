"use server";

import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import prismaClient from "@/libs/client/prisma.client";
import { IOrderUpdatePayload } from "@/types/interfaces/order.interface";

export const getOrdersList = async (
  page = 1,
  limit = 15,
  search?: string,
  status?: string,
  minPrice?: number,
  maxPrice?: number,
  startDate?: string,
  endDate?: string
) => {
  try {
    const skip = (page - 1) * limit;

    const checkId =
      typeof Number(search) === "number" && search?.length !== 14
        ? Number(search)
        : undefined;

    const searchFilter: any = {
      ...(checkId && { checkId: { equals: checkId } }),
      ...(status && { status: { equals: status } }),
      ...(search?.length &&
        !checkId && {
          deliveryInfo: {
            trackingNumber: {
              contains: search,
            },
          },
        }),
      ...(minPrice && { totalSum: { gte: minPrice } }),
      ...(maxPrice && { totalSum: { lte: maxPrice } }),
      ...(startDate && { createdAt: { gte: new Date(startDate) } }),
      ...(endDate && { createdAt: { lte: new Date(endDate) } }),
    };

    const total = await prismaClient.order.count({
      where: searchFilter,
    });
    const totalPage = Math.ceil(total / limit);
    const currentPage = page > totalPage ? totalPage : page;

    const orders = await prismaClient.order.findMany({
      where: searchFilter,
      include: {
        user: true,
        deliveryInfo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const paidOrders = orders?.filter((order) => order.status === "PAID");
    const unpaidOrders = orders?.filter((order) => order.status !== "PAID");

    const sortedOrders = [...paidOrders, ...unpaidOrders];

    return {
      orders: sortedOrders,
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

export const getSendedOrders = async () => {
  try {
    const orders = await prismaClient.order.findMany({
      where: {
        status: "SENDED",
      },
      include: {
        user: true,
        deliveryInfo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

export const addOrUpdateTrackingNumberToOrder = async (
  orderId: string,
  trackingNumber: string,
  path?: string
) => {
  try {
    const order = await prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "SENDED",
        deliveryInfo: {
          upsert: {
            create: {
              trackingNumber,
            },
            update: {
              trackingNumber,
            },
          },
        },
      },
    });

    revalidatePath(path ? path : "/orders");

    return order;
  } catch (error) {
    throw error;
  }
};

export const changeOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  path?: string
) => {
  try {
    const order = await prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    revalidatePath(path ? path : "/orders");

    return order;
  } catch (error) {
    throw error;
  }
};

export const getFullOrderById = async (orderId: string) => {
  try {
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: {
          include: {
            address: true,
            loyalty: true,
          },
        },
        deliveryInfo: true,
        promocode: true,
        orderItems: {
          include: {
            product: {
              include: {
                properties: {
                  include: {
                    image: true,
                  },
                },
                images: true,
              },
            },
          },
        },
      },
    });

    return order;
  } catch (error) {
    throw error;
  }
};

export const updateManagerOrder = async (
  orderId: string,
  data: IOrderUpdatePayload,
  path?: string
) => {
  try {
    const order = await prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: data.status,
        ...(!!data?.serviceComment?.length && {
          serviceComment: data.serviceComment,
        }),
      },
    });

    if (data?.trackingNumber) {
      await prismaClient.deliveryInfo.upsert({
        where: {
          orderId,
        },
        create: {
          orderId,
          trackingNumber: data.trackingNumber,
        },
        update: {
          trackingNumber: data.trackingNumber,
        },
      });
    }

    revalidatePath(path ? path : "/orders");
    return order;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (orderId: string, path?: string) => {
  try {
    await prismaClient.order.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath(path ? path : "/orders");
  } catch (error) {
    throw error;
  }
};
