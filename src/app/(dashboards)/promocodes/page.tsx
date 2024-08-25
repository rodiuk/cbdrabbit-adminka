import { getAllPromoCodes } from "@/libs/api/promocodes.api";
import { IPageProps } from "@/types/interfaces/app.interface";
import { PromoCodesPageContent } from "./-components/PromoCodesPageContent";

export default async function Promocodes(props: IPageProps) {
  const { searchParams } = props;

  const { promocodes, pagination } = await getAllPromoCodes(
    searchParams?.page,
    searchParams?.limit,
    searchParams?.search,
    searchParams?.type,
    searchParams?.status
  );

  const hasFilters = Object.values(searchParams).some((param) => !!param);

  return (
    <PromoCodesPageContent
      promcodes={promocodes}
      pagination={pagination}
      isSearch={hasFilters}
    />
  );
}
