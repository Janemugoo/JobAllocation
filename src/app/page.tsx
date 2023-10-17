"use client";
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
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="p-4">
      <h1 >Welcome to the Dashboard</h1>
      
        <div className="flex justify-evenly p-4">
          <div className="w-1/4 border p-4">
            <h2 className="text-xl font-semibold mb-4">TO DO</h2>
            {/* I'll add TO DO tasks here */}
          </div>
          <div className="w-1/4 border p-4">
            <h2 className="text-xl font-semibold mb-4">IN PROGRESS</h2>
            {/* I'll add IN PROGRESS tasks here */}
          </div>
          <div className="w-1/4 border p-4">
            <h2 className="text-xl font-semibold mb-4">IN REVIEW</h2>
            {/* I'll add IN REVIEW tasks here */}
          </div>
          <div className="w-1/4 border p-4">
            <h2 className="text-xl font-semibold mb-4">COMPLETED</h2>
            {/* I'll add COMPLETED tasks here */}
          </div>
        </div>
      </div>
   
  );
}
