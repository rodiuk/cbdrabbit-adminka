import { IUser, IUserProfile } from "./user.interface";
import {
  Image,
  OrderItem,
  OrderStatus,
  Product,
  Promocode,
  Property,
} from "@prisma/client";

export interface IOrder {
  id: string;
  checkId: number;
  totalSum: number;
  itemPrice: number;
  comment?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  lang?: string | null;
  firstOrder?: boolean | null;
  serviceComment?: string | null;

  status?: OrderStatus | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderForList extends IOrder {
  user: IUser;
  deliveryInfo?: IDeliveryInfo | null;
}

export interface IDeliveryInfo {
  id: string;
  deliveryId?: string | null;
  trackingNumber?: string | null;
  deliveryStatus?: string | null;
  deliveryStatusCode?: string | null;
  deliveryCost?: string | null;
  deliveryCreateTime?: string | null;
  deliveryEstimateTime?: string | null;
  deliveryPayedKeeping?: string | null;
  isFreeDelivery?: boolean | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderFull extends IOrder {
  user: IUserProfile;
  deliveryInfo?: IDeliveryInfo | null;
  promocode?: Promocode | null;
  orderItems: IOrderItem[];
}

export interface IOrderItem extends OrderItem {
  product: IProduct;
}

export interface IProduct extends Product {
  images: Image[];
  properties: Property[];
}

export interface IOrderUpdatePayload {
  trackingNumber?: string | null;
  status: OrderStatus;
  serviceComment?: string | null;
}
