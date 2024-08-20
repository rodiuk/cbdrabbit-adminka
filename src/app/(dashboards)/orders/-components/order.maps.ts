import { OrderStatus } from "@prisma/client";

export const orderStatusList = [
  { title: "Доставлено", value: OrderStatus.DELIVERED },
  { title: "Відмінено", value: OrderStatus.CANCELED },
  { title: "Створено", value: OrderStatus.CREATED },
  { title: "Оплачено", value: OrderStatus.PAID },
  { title: "Укомплектовано", value: OrderStatus.COMPLETED },
  { title: "Відправлено", value: OrderStatus.SENDED },
];
