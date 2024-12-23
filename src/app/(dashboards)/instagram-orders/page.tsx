import { IPageProps } from "@/types/interfaces/app.interface";
import { InstagramOrdersPageContent } from "./-components/OrdersPageContent";
import { getInstagramOrdersList } from "@/libs/api/instagram-order.api";

export default async function InstagramOrders(props: IPageProps) {
  const { searchParams } = props;

  const { orders, pagination } = await getInstagramOrdersList(
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
    <InstagramOrdersPageContent
      orders={orders}
      pagination={pagination}
      isSearch={hasFilters}
    />
  );
}
