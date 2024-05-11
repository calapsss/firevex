"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import OnboardingForm from "@/components/user/onboarding/onboarding-form";
import { useToast } from "@/components/ui/use-toast";
import useUserConvexData from "@/hooks/useUserConvexData";

export default function OnboardingCard(){
    const { user }: any = AuthContext();
    const { toast } = useToast();
    const [startedOnboarding, setStartedOnboarding] = useState(false);
    const [onboarded, setOnboarded] = useState(false);
    const router = useRouter();
    // Redirection if not logged in
    useEffect(() => {
        if (!user.isLogin) {
            router.push("/sign-in");
        }
    }, [user.isLogin, router]);
    // Using the custom hook
    const userConvex = useUserConvexData();
    
    useEffect(() => {
        if (userConvex != null) {
          toast({
              title: "You are already Onboarded!",
              description: `Let's continue adding details to your profile.`,
          });
          router.push("/");
          setOnboarded(true);
        } else if (!userConvex) {
          toast({
              title: "You are not Onboarded!",
              description: `Let's Start making your profile.`,
          });
          setStartedOnboarding(true);
        }
    }, [userConvex]);
    return(
        <>
            <Card className="w-80 p-5">
                
                {!onboarded && user.isLogin &&
                <>
                    <CardTitle>Onboarding</CardTitle>
                    <CardDescription>Complete your profile</CardDescription>
                    <OnboardingForm user={{ user_id: user.user?.uid, email: user.user?.email }}/>
                </>
                }

                {/* TODO: add form for adding interests */}
                {/*
                    {onboarded && 
                <>
                    <CardDescription>Tell Us more about your interests!</CardDescription>
                    
                </>
                } */}
            </Card>
            
        </>
    )
}