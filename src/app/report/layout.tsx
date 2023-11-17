import { AppLayout } from "@/components/AppLayout";

export default function ReportLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>; // layout is wrapped inside the AppLayout, where the actual layout and
  //styling details are defined
}
