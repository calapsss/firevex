"use client";

import OnboardingCard from "@/components/user/onboarding/onboarding-card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { toast } = useToast();
    const userConvex = useQuery(api.functions.users.getUser);
    console.log(userConvex);
    const router = useRouter();

    useEffect(() => {
        
        if (userConvex != null) {
          toast({
              title: "You are already Onboarded!",
              description: `Let's continue adding details to your profile.`,
          });
          router.push("/");
        } else if (!userConvex) {
          toast({
              title: "You are not Onboarded!",
              description: `Let's Start making your profile.`,
          });
        }
    }, [userConvex, toast, router]);
    if (userConvex == null) return (
        <div className="form-page-container flex flex-col">
        
        <OnboardingCard/>
        
        
        </div>
    );
}
