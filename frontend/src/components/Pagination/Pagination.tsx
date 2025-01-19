import Button from "@/components/Button/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
      >
        قبلی
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-md ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
      >
        بعدی
      </Button>
    </div>
  );
}
