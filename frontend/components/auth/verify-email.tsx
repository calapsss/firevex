"use client";

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
import {sendEmailVerification } from "firebase/auth";

export default function VerifyEmail(){
    const [sentVerification, setSentVerification]= useState(true)
    const [initTimer, setInitTimer]= useState(60)
    const {user}:any = AuthContext();
    const router = useRouter();
    async function handleClick(){
        setSentVerification(true)
        await sendEmailVerification(user.user);
        setInitTimer(60)
    }
    useEffect(() => {
        const checkEmailVerification = () => {
            user.user.reload().then(() => {
                if (user.user.emailVerified) {
                    clearInterval(verificationCheckInterval);
                    router.push("/onboarding");
                }
            });
        };

        const verificationCheckInterval = setInterval(checkEmailVerification, 5000); // Check every 5 seconds

        return () => clearInterval(verificationCheckInterval);
    }, []);


    useEffect(() => {
        if (initTimer > 0) {
            setTimeout(() => {
                setInitTimer(initTimer - 1)
            }, 1000)
        } else {
            setSentVerification(false)
        }
    }, [initTimer])

    
    useEffect(() => {
        if (user.isLogin && user.user.emailVerified) {
          router.push("/");
        }
      }, [user, router]); 
      
    return(
        <>
            <Card className="w-80 p-5">
                <CardTitle>Verify Email</CardTitle>
                <CardDescription>Check your email to verify your account</CardDescription>
                {(initTimer > 0) && (
                    <div className="text-center mt-5 mb-5">
                        <p>Verification email sent! Refresh once verified or try again in:</p>
                        <p className="text-5xl">{initTimer}s</p>
                    </div>
                )}
                <p className="text-xs mb-3">Didn&apos;t receive the email?  </p>
                <Button className="hover:text-black hover:bg-secondary" onClick={handleClick} disabled={sentVerification}>Resend Verification</Button>
                
            </Card>
        </>
    )
}