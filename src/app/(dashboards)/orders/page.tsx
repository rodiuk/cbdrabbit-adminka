import { getOrdersList } from "@/libs/api/order.api";
import { OrdersTable } from "./-components/OrdersTable";
import { IPageProps } from "@/types/interfaces/app.interface";

export default async function Orders(props: IPageProps) {
  const { orders, pagination } = await getOrdersList(props?.searchParams?.page);

  return <OrdersTable orders={orders} pagination={pagination} />;
}
