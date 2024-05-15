"use client";
import SignInForm from "@/components/auth/sign-in-form"
import SignUpForm from "@/components/auth/sign-up-form"
import {
  Card,
  CardDescription,
  CardTitle,
} from '../ui/card';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { useConvexAuth } from "convex/react";

export default function AuthCard(){
    const [showSignIn, setSignIn]= useState(true)
    const {isAuthenticated} = useConvexAuth();
    function onShowSignUp(){
      setSignIn(!showSignIn)
    }
    
    const router = useRouter();
    if(isAuthenticated ){
        router.push("/")
    }
    
    return(
        <>
            <Card className="w-80 p-5">
                {showSignIn && (<>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
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