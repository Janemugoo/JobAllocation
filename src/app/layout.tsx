"use client";
import "./globals.css";
import "../constants/firebase";
import { Guard } from "@/components/Gaurd";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/constants/theme";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()

  useEffect(() => {
    const twoFactor =  localStorage.getItem('is2factor')
    if(!twoFactor) router.push('/auth/2factor')
  })

  
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
