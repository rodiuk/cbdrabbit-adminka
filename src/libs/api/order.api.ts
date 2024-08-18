"use server";

import prismaClient from "@/libs/client/prisma.client";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getOrdersList = async (page = 1, limit = 15) => {
  try {
    const skip = (page - 1) * limit;

    const total = await prismaClient.order.count();
    const totalPage = Math.ceil(total / limit);
    const currentPage = page > totalPage ? totalPage : page;

    const orders = await prismaClient.order.findMany({
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
