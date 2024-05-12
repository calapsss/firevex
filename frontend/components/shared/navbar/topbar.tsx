"use client"
import Link from "next/link";
import gititLogo from "../logo/logo"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

import { AuthContext } from "@/providers/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Logo from "../logo/logo";
import { useConvexAuth } from "convex/react";
import useUserConvexData from "@/hooks/useUserConvexData";
import { useEffect } from "react";
export default function NavBar(){
    const auth = getAuth();
    const {isAuthenticated} = useConvexAuth();
    const convexUser = useUserConvexData();
    const router = useRouter();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };
      console.log("convexUser", convexUser )
      useEffect(() => {
            convexUser.then((user) => {
                  // Code to run when the convexUser promise is fulfilled
                  if (!user && isAuthenticated){
                        router.push("/onboarding")
                  }
            });
      }, [convexUser, isAuthenticated]);
     

    
return ( <>
      <div className="navbar ">
            <nav className="navbar-container">
                 <div className="md:pb-2 w-full mt-2 pb-2">
                      <Logo />
                 </div>
                 <div className="ml-auto max-md:pt-4 items-center">
                      {
                        !isAuthenticated &&(
                            <>
                                <Button className="primary-button max-md:h-8">
                                      <Link href="/sign-in" >
                                            Sign In
                                      </Link>
                                </Button>
                            </>
                        )
                      }
                      {isAuthenticated && (
                            <>
                                 <Button className="primary-button max-md:h-8" onClick={logout}>
                                            Sign Out
                                 </Button>
                            </>
                      )}
                 </div>

            </nav>
      </div>
 </>)
}