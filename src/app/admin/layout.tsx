import { AppLayout } from "@/components/AppLayout";
import { Guard } from "@/components/Gaurd";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // layout is wrapped inside the AppLayout, where the actual layout and
  //styling details are defined
}
