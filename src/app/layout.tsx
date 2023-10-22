"use client";
import "./globals.css";
import "../constants/firebase";
import { Guard } from "@/components/Gaurd";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#211E46",
      light: "#211E46",
    },
    secondary: {
      main: "#6E6189",
    },
  },
});
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
