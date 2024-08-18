export interface IPageProps {
  params: { [key: string]: string };
  searchParams: ISearchParams;
}

export interface ISearchParams {
  page: number;
  limit: number;
}

export interface IPagination {
  total: number;
  totalPage: number;
  currentPage: number;
}
