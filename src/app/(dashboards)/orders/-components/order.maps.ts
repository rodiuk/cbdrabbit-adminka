import { OrderStatus } from "@prisma/client";

export const orderStatusList = [
  { title: "Створено", value: OrderStatus.CREATED },
  { title: "Оплачено", value: OrderStatus.PAID },
  { title: "Укомплектовано", value: OrderStatus.COMPLETED },
  { title: "Відправлено", value: OrderStatus.SENDED },
  { title: "Відмінено", value: OrderStatus.CANCELED },
  { title: "Доставлено", value: OrderStatus.DELIVERED },
];
