"use client";

import SignInForm from "@/components/auth/sign-in-form"
import SignUpForm from "@/components/auth/sign-up-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Button } from "../ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { set } from "react-hook-form";
import { toast } from "../ui/use-toast";


export default function AuthCard(){
    const [showSignIn, setSignIn]= useState(true)
    const {user}:any = AuthContext();
    const router = useRouter();
    const [ user_id, setUserId] = useState("");
    const user_convex = useQuery(api.functions.users.getUser, {userId: user_id });
   
    function onShowSignUp(){
      setSignIn(!showSignIn)
    }
    useEffect(() => {
        if (user.isLogin) {
          if(!user.user.emailVerified){
            router.push("/verify");
          }else{
            setUserId(user.user.uid);
            if(!user_convex){
              toast({
                title: "You are not Onboarded!",
                description: `Let's Start making your profile.`,
            })
              router.push("/onboarding");
            }
          }
        } 
      }, [user]); 
    useEffect(() => {
        if (user_convex) {
          toast({
              title: `Welcome back ${user_convex.FirstName}!`,
              description: `Let's continue learning!`,
          })
          router.push("/");
        }
    }, [user_convex]);
   
    
    
    
    return(
        <>
            <Card className="w-80 p-5">
                {showSignIn && (<>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your quantaIQ account</CardDescription>
                    <SignInForm/>
                    <p className="text-sm">
                        Not a member?{" "}
                        <Button variant="link" onClick={onShowSignUp}>
                            Sign up instead.
                        </Button>
                    </p>
                </>)}

                {!showSignIn && (<>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Start to learn different</CardDescription>
                    <SignUpForm/>
                    <p className="text-sm">
                        Already a member?{" "}
                        <Button variant="link" onClick={onShowSignUp}>
                            Login instead.
                        </Button>
                    </p>
                </>)}
            </Card>
        </>

        
    )
}