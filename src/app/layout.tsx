"use client";
import "./globals.css";
import "../constants/firebase";
import { Guard } from "@/components/Gaurd";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/constants/theme";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-full text-sm">
        <ThemeProvider theme={theme}>
          <Guard>
            <>{children}</>
          </Guard>
        </ThemeProvider>
      </body>
    </html>
  );
}
