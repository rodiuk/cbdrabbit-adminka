import { Address, Loyalty, Prisma } from "@prisma/client";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
}

export interface IUser extends IUserData {
  id: string;

  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserData {
  email: string;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  totalOrdersAmount: number;
}

export interface ICreateUser {
  email: string;
  phoneNumber: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface IUserProfile extends IUser {
  loyalty: Loyalty | null;
  address: Address | null;
}

export interface IUserCheckoutForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface IUpdateDeliveryInfo {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  npDepartment?: string;
  npDeliveryType?: string;
  city?: string;
}
