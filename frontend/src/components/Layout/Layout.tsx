import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface ButtonProps {
  children: ReactNode;
}

export default function Layout({ children }: ButtonProps) {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  );
}