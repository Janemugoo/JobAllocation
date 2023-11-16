import "../globals.css";
import "../../constants/firebase";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
  
}
