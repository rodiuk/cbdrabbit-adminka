import { getAllUsers } from "@/libs/api/user.api";
import { IPageProps } from "@/types/interfaces/app.interface";
import { UsersPageContent } from "./-components/UsersPageContent";

export default async function Users(props: IPageProps) {
  const { searchParams } = props;

  const { users, pagination } = await getAllUsers(
    searchParams?.page,
    searchParams?.limit,
    searchParams?.search,
    searchParams?.status,
    searchParams?.role
  );

  const hasFilters = Object.values(searchParams).some((param) => !!param);

  return (
    <UsersPageContent
      users={users}
      pagination={pagination}
      isSearch={hasFilters}
    />
  );
}
