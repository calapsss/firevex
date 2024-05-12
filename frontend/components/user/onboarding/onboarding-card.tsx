"use client";

import {
  Card,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import ProfileForm from "@/components/user/forms/profile-form";


export default function OnboardingCard(){
  return(
        <>
          <Card className="w-80 p-5">
            <CardTitle>Onboarding</CardTitle>
            <CardDescription>Complete your profile</CardDescription>
            <ProfileForm formAction='onboarding' />
          </Card>
        </>
    )
}