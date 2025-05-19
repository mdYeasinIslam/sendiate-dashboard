// hooks/usePaginatedUsers.ts

export const usePaginatedUsers = <T>(
  users: T[] ,
  currentPage: number,
  itemsPerPage: number = 5
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return { paginatedUsers, totalPages };
};
