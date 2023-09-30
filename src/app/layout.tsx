import "./globals.css";
import "../constants/firebase";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Guard } from "@/components/Gaurd";
import { AppLayout } from "@/components/AppLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Guard>
      <html lang="en">
        <body className=" h-full text-sm  ">
        
          <AppLayout>{children}</AppLayout>
        </body>
      </html>
    </Guard>
  );
}
