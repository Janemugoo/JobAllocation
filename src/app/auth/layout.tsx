import "../globals.css";
import "../../constants/firebase";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en">
      <body className="">
        <div>{children}</div>
       
      </body>
    </html>
  );
}
