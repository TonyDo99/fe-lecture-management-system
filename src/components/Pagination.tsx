"use client";
import { Button } from "antd";

const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
}: {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}) => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange?.(i + 1)}
            className={`px-2 rounded-sm ${
              currentPage === i + 1 ? "bg-lamaSky" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 5 && <span>...</span>}
        {totalPages > 5 && (
          <button
            onClick={() => onPageChange?.(totalPages)}
            className={`px-2 rounded-sm ${
              currentPage === totalPages ? "bg-lamaSky" : ""
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>
      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
