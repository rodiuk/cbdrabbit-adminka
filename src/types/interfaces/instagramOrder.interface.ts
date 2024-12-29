import {
  Image,
  OrderItem,
  Product,
  Property,
  InstagramOrder,
  OrderStatus,
  InstagramMedia,
} from "@prisma/client";

export interface ICreateInstagramOrder {
  totalSum: number;
  itemPrice: number;
  comment?: string | null;

  paymentId?: string;
  attachmentUrl?: string | null;
  attachmentUrls?: InstagramMedia[] | null;

  customerNickname?: string | null;
  customerInitials?: string | null;
  customerPhone?: string | null;
  customerAddress?: string | null;

  orderItems: ICreateOrderItem[];
}

export interface ICreateInstagramOrderItemFull {
  id: string;
  product: Product | null;
  quantity: number;
}

export interface ICreateOrderItem {
  productId: string;
  quantity: number;
}

export interface IInstagramOrderFull extends InstagramOrder {
  attachmentUrls: InstagramMedia[];
  orderItems: IOrderItem[];
}

export interface IOrderItem extends OrderItem {
  product: IProduct;
}

export interface IProduct extends Product {
  images: Image[];
  properties: Property[];
}

export interface IUpdateInstagramOrder {
  status?: OrderStatus;
  comment?: string | null;
  itemPrice?: number;
  trackingNumber?: string | null;

  attachmentUrl?: string | null;
  attachmentUrls?: string[] | null;

  customerNickname?: string | null;
  customerInitials?: string | null;
  customerPhone?: string | null;
  customerAddress?: string | null;
  orderItems?: ICreateOrderItem[];
}
