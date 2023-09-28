import "./globals.css";
import "../constants/firebase";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Guard } from "@/components/Gaurd";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <Guard>
      <html lang="en">
        <body className="grid" > {/** */}

        </body>
      </html>
    </Guard>
  );
}
