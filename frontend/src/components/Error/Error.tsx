import Button from "../../components/Button/Button";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong className="font-bold ml-2">خطا:</strong>
      <span className="block sm:inline">{message}</span>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-red-700 hover:text-red-900"
        >
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
