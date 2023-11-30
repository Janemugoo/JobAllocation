"use client";
import "./globals.css";
import "../constants/firebase";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/constants/theme";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className="h-screen w-full text-sm bg-white">
        <ThemeProvider theme={theme}>
            <>{children}</>
        </ThemeProvider>
      </body>
    </html>
  );
}
