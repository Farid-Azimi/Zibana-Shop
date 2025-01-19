interface SpinnerProps {
  size?: number;
  color?: string;
  speed?: string;
}

export default function Spinner({
  size = 32,
  color = "purple-500",
  speed = "spin",
}: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent border-${color} border-solid rounded-full animate-${speed}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
