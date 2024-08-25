"use server";

import { nanoid } from "nanoid";
import { compare, hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "@/libs/client/prisma.client";
import { ICreateUser, IUserData } from "@/types/interfaces/user.interface";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (
  page = 1,
  limit = 15,
  search?: string,
  status?: string,
  role?: string
) => {
  try {
    const skip = (page - 1) * limit;

    const searchFilters = {
      ...(search && {
        OR: [
          {
            email: {
              contains: search,
            },
          },
          {
            firstName: {
              contains: search,
            },
          },
          {
            lastName: {
              contains: search,
            },
          },
        ],
      }),
      ...(status && {
        isActive: status === "active" ? true : false,
      }),
      ...(role && {
        role: { equals: role },
      }),
    };

    const total = await prisma.user.count({
      where: searchFilters,
    });
    const totalPage = Math.ceil(total / limit);
    const currentPage = page > totalPage ? totalPage : page;

    const users = await prisma.user.findMany({
      where: searchFilters,
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        isActive: true,
        totalOrdersAmount: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
    });

    return {
      users,
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

export const updateUserRole = async (
  userId: string,
  role: string,
  path?: string
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    revalidatePath(path ? path : "/users");
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (
  userId: string,
  select?: Prisma.UserSelect
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      ...(!!select && { select }),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const checkIsUserExistByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user?.id;
  } catch (error) {
    throw error;
  }
};

export const createGoogleUser = async (
  userData: Pick<IUserData, "email" | "firstName" | "lastName">
) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        isVerified: true,
        loyalty: {
          create: {
            percentDiscount: 2,
          },
        },
        address: {
          create: {},
        },
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        totalOrdersAmount: true,
        password: true,
        address: true,
        loyalty: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  userData: ICreateUser,
  isVerified?: boolean
) => {
  try {
    if (!userData?.password) return { error: "Password is required" };

    const hashPassword = await hash(userData.password, 10);
    userData.password = hashPassword;

    const user = await prisma.$transaction(async () => {
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (isUserExist) return isUserExist;

      const code = nanoid(16);

      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashPassword,
          ...(!!userData?.firstName && { firstName: userData.firstName }),
          ...(!!userData?.lastName && { lastName: userData.lastName }),
          verifiedCode: code,
          isVerified: isVerified ? true : false,
          loyalty: { create: { percentDiscount: 2 } },
          ...(userData?.phoneNumber?.length > 0 && {
            address: {
              create: {
                phoneNumber: userData.phoneNumber,
              },
            },
          }),
        },
      });

      return user;
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (
  userId: string,
  newPassword: string,
  currentPassword: string
) => {
  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user || !user?.password) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await compare(currentPassword, user.password);

      if (!isPasswordMatch) return { error: "Current password is incorrect" };

      const hashNewPassword = await hash(newPassword, 10);

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return updatedUser;
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

export const createPassword = async (userId: string, newPassword: string) => {
  try {
    const transaction = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const hashNewPassword = await hash(newPassword, 10);

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      });

      return updatedUser;
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

export const isAccountActivated = async (userEmail: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        isActive: true,
      },
    });

    return user?.isActive ?? false;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (userId: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/users");
  } catch (error) {
    throw error;
  }
};

export const changeUserAccess = async (userId: string, status: boolean) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: status,
      },
    });

    revalidatePath("/users");
  } catch (error) {
    throw error;
  }
};
