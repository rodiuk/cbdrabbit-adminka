import { OrderStatus } from "@prisma/client";

export const orderStatusList = [
  { title: "Створено", value: OrderStatus.CREATED },
  { title: "Оплачено", value: OrderStatus.PAID },
  { title: "Укомплектовано", value: OrderStatus.COMPLETED },
  { title: "Передано до НП", value: OrderStatus.SENDED },
  { title: "Відмінено", value: OrderStatus.CANCELED },
  { title: "Доставлено у відділення", value: OrderStatus.DELIVERED },
  { title: "Отримано", value: OrderStatus.SUCCESS },
];
