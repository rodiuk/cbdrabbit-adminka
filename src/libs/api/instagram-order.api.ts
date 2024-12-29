"use server";

import { revalidatePath } from "next/cache";
import { MediaType, OrderStatus } from "@prisma/client";
import prismaClient from "@/libs/client/prisma.client";
import {
  ICreateInstagramOrder,
  IUpdateInstagramOrder,
} from "@/types/interfaces/instagramOrder.interface";

export const getInstagramOrdersList = async (
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
          trackingNumber: {
            contains: search,
          },
        }),
      ...(minPrice && { totalSum: { gte: minPrice } }),
      ...(maxPrice && { totalSum: { lte: maxPrice } }),
      ...(startDate && { createdAt: { gte: new Date(startDate) } }),
      ...(endDate && { createdAt: { lte: new Date(endDate) } }),
    };

    const total = await prismaClient.instagramOrder.count({
      where: searchFilter,
    });
    const totalPage = Math.ceil(total / limit);
    const currentPage = page > totalPage ? totalPage : page;

    const orders = await prismaClient.instagramOrder.findMany({
      where: searchFilter,
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

export const getSendedInstagramOrders = async () => {
  try {
    const orders = await prismaClient.instagramOrder.findMany({
      where: {
        status: "SENDED",
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

export const addOrUpdateTrackingNumberToInstagramOrder = async (
  orderId: string,
  trackingNumber: string,
  path?: string
) => {
  try {
    const order = await prismaClient.instagramOrder.update({
      where: {
        id: orderId,
      },
      data: {
        status: "SENDED",
        trackingNumber: trackingNumber,
      },
    });

    revalidatePath(path ? path : "/instagram-orders");

    return order;
  } catch (error) {
    throw error;
  }
};

export const changeInstagramOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  path?: string
) => {
  try {
    const order = await prismaClient.instagramOrder.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    revalidatePath(path ? path : "/instagram-orders");

    return order;
  } catch (error) {
    throw error;
  }
};

export const getFullInstagramOrderById = async (orderId: string) => {
  try {
    const order = await prismaClient.instagramOrder.findUnique({
      where: {
        id: orderId,
      },
      include: {
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
        attachmentUrls: true,
      },
    });

    return order;
  } catch (error) {
    throw error;
  }
};

export const updatePaymentLink = async (
  orderId: string,
  paymentLink: string,
  paymentId: string
) => {
  try {
    const order = await prismaClient.instagramOrder.update({
      where: {
        id: orderId,
      },
      data: {
        paymentLink,
        paymentId,
      },
    });

    revalidatePath("/instagram-orders");

    return order;
  } catch (error) {
    throw error;
  }
};

export const updateManagerInstagramOrder = async (
  orderId: string,
  data: IUpdateInstagramOrder,
  path?: string
) => {
  try {
    const order = await prismaClient.instagramOrder.update({
      where: {
        id: orderId,
      },
      data: {
        status: data.status,
        comment: data.comment,
        customerAddress: data.customerAddress,
        customerInitials: data.customerInitials,
        customerNickname: data.customerNickname,
        customerPhone: data.customerPhone,
        attachmentUrl: data.attachmentUrl,
        ...(data?.trackingNumber?.length && {
          customerEmail: data.trackingNumber,
        }),
        orderItems: {
          updateMany: data.orderItems?.map((item) => ({
            where: {
              productId: item.productId,
            },
            data: {
              quantity: item.quantity,
            },
          })),
        },
      },
    });

    revalidatePath(path ? path : "/instagram-orders");
    return order;
  } catch (error) {
    throw error;
  }
};

export const addInstagramOrderImage = async (
  orderId: string,
  url: string,
  type: MediaType
) => {
  try {
    const order = await prismaClient.instagramOrder.update({
      where: {
        id: orderId,
      },
      data: {
        attachmentUrls: {
          create: {
            mediaPath: url,
            type: type,
          },
        },
      },
      select: {
        attachmentUrls: true,
      },
    });

    revalidatePath("/instagram-orders");
    return order;
  } catch (error) {
    throw error;
  }
};

export const deleteInstagramOrderImage = async (imageId: string) => {
  try {
    await prismaClient.instagramMedia.delete({
      where: {
        id: imageId,
      },
    });

    revalidatePath("/instagram-orders");
  } catch (error) {
    throw error;
  }
};

export const deleteInstagramOrder = async (orderId: string, path?: string) => {
  try {
    await prismaClient.instagramOrder.delete({
      where: {
        id: orderId,
      },
    });

    revalidatePath(path ? path : "/instagram-orders");
  } catch (error) {
    throw error;
  }
};

export const createInstagramOrder = async (data: ICreateInstagramOrder) => {
  const { orderItems, attachmentUrl, ...rest } = data;
  try {
    const order = await prismaClient.instagramOrder.create({
      data: {
        ...rest,

        ...(attachmentUrl && {
          attachmentUrl,
        }),

        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });

    revalidatePath("/instagram-orders");
    return order;
  } catch (error) {
    throw error;
  }
};
