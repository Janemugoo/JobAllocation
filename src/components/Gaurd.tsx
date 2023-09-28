"use client"
import { useRouter } from "next/navigation";
import { Children, ReactNode } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "@/constants/firebase";

interface GuardProps {
  children: JSX.Element;
}
export function Guard({ children }: GuardProps) {
  const auth = getAuth(app);
  const router = useRouter(); //helps us to navigate from one page to another

  const [user, loading, error] = useIdToken(auth); //updates the user activities

  // if (loading) {
  //   return (
  //     <div>
  //       <p>Initialising User...</p>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: Sorry something went wrong </p>
  //     </div>
  //   );
  // }

  if (user) {
    router.push("/");
  }
  return <>{children}</>;
  //when a user is valid the are redirected to the dashboard
  //when a user is not valid they are redirected to the log in page
  
}
