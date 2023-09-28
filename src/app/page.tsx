"use client"
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "@/constants/firebase";
import { useRouter } from "next/navigation";
export default function Home() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };
  const router = useRouter();
  if (!user) return router.push("/auth");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
              
      </div>
    </main>
  );
}
