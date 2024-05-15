"use client";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EditProfile from "@/components/user/edit/profile-edit-card";

export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    console.log(userConvex);
    if (userConvex != null) return (
        <div>
            <EditProfile/>
        </div>
    );
}
