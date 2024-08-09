import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className=" bg-purple--primary mr-1 rounded-lg transition-all hover:bg-purple--secondary absolute">
      {children}
    </button>
  );
}
