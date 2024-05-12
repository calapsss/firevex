"use client";

import {
  Card,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import ProfileForm from "@/components/user/forms/profile-form";


export default function EditProfile(){
  return(
        <>
          <Card className="max-w-lg p-5">
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Edit your profile</CardDescription>
            <ProfileForm formAction='edit-profile' />
          </Card>
        </>
    )
}