import { getAllUsers } from "@/libs/api/user.api";
import { UsersTable } from "./-components/UsersTable";
import { IPageProps } from "@/types/interfaces/app.interface";

export default async function Users(props: IPageProps) {
  const { searchParams } = props;

  const { users, pagination } = await getAllUsers(
    searchParams?.page,
    searchParams?.limit
  );

  return <UsersTable users={users} pagination={pagination} />;
}
