"use client"
import { useRouter } from "next/navigation";
import { Children, ReactNode, useEffect } from "react";
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



  useEffect(() => {
    const twoFactor =  localStorage.getItem('is2factor')
      if(user === null) {
        router.push('/auth')
      }
      if(twoFactor){
        router.push('/')
      }
  }, [loading, router, user])


  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div>
        <p>Error: Sorry something went wrong </p>
      </div>
    );
  }

  return <>{children}</>;
}
