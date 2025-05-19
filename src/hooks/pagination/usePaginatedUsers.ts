// hooks/usePaginatedUsers.ts
import { UserType } from "@/type/usersType";

export const usePaginatedUsers = (
  users: UserType[],
  currentPage: number,
  itemsPerPage: number = 5
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return { paginatedUsers, totalPages };
};
