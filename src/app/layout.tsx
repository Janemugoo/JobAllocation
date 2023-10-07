"use client"
import "./globals.css";
import "../constants/firebase";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Guard } from "@/components/Gaurd";
import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles';
const theme= createTheme({
  palette:{
    primary: {
      main:"#211E46",
      light:"#211E46"
    },
    secondary:{
      main: "#6E6189"
    }
  }
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Guard>
        <html lang="en">
          <body className=" h-full text-sm  ">
            <AppLayout>{children}</AppLayout>
          </body>
        </html>
      </Guard>
    </ThemeProvider>
  );
}
