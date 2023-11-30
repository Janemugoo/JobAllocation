import { AppLayout } from "@/components/AppLayout";
import { Guard } from "@/components/Gaurd";

export default function ManagerLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Guard><AppLayout>{children}</AppLayout></Guard>; // layout is wrapped inside the AppLayout, where the actual layout and
  //styling details are defined
}
