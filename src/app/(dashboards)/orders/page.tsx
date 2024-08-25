import { getOrdersList } from "@/libs/api/order.api";
import { IPageProps } from "@/types/interfaces/app.interface";
import { OrdersPageContent } from "./-components/OrdersPageContent";

export default async function Orders(props: IPageProps) {
  const { searchParams } = props;

  const { orders, pagination } = await getOrdersList(
    searchParams?.page,
    searchParams?.limit,
    searchParams?.search,
    searchParams?.status,
    +searchParams?.minPrice,
    +searchParams?.maxPrice,
    searchParams?.startDate,
    searchParams?.endDate
  );

  const hasFilters = Object.values(searchParams).some((param) => !!param);

  return (
    <OrdersPageContent
      orders={orders}
      pagination={pagination}
      isSearch={hasFilters}
    />
  );
}
