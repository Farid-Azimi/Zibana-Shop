import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  disabled?: boolean;
}

export default function Button({ children, className, type, onMouseEnter, onMouseLeave, onClick, disabled }: ButtonProps) {
  return (
    <button className={className} type={type} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

