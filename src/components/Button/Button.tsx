import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, className, onMouseEnter, onMouseLeave, onClick, disabled }: ButtonProps) {
  return (
    <button className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

