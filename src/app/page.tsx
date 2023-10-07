"use client"
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "@/constants/firebase";
import { useRouter } from "next/navigation";
import TaskPanel from "@/components/Accordion";
export default function Home() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };
  const router = useRouter();
  if (!user) return null;
  return (
    <div>Welcome to the Dashboard </div>
  );
}
