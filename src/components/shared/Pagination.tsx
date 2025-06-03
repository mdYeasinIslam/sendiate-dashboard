type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setPageForPagination: React.Dispatch<React.SetStateAction<number>>
};

export function Pagination({ currentPage, totalPages, onPageChange,setPageForPagination}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => setPageForPagination(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded hover:bg-gray-100 text-gray-500"
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setPageForPagination(page)}
            className={`w-8 h-8 rounded-full ${
              page === currentPage
                ? "bg-green-100 text-green-600 font-semibold"
                : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => setPageForPagination(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded hover:bg-gray-100 text-gray-500"
      >
        &gt;
      </button>
    </div>
  );
}
