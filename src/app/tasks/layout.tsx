import { AppLayout } from "@/components/AppLayout";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
