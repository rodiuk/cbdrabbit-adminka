export interface IPageProps {
  params: { [key: string]: string };
  searchParams: ISearchParams;
}

export interface ISearchParams {
  page: number;
  limit: number;
  search: string;
  type: string;
  status: string;
}

export interface IPagination {
  total: number;
  totalPage: number;
  currentPage: number;
}
