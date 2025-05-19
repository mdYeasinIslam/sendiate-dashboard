// hooks/usePaginatedUsers.ts

export const usePaginatedUsers = <T>(
  data: T[] ,
  currentPage: number,
  itemsPerPage: number = 5
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedUsers = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return { paginatedUsers, totalPages };
};
