"use client";

import { sidebarLinks } from "../../../constants/";
import { AuthContext } from "../../../providers/AuthProvider";
import { auth } from "../../../services/firebase";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter} from 'next/navigation'
import React from "react";
import { useEffect } from "react";
import Logo, { LogoDash } from "../logo/logo";
import { useConvexAuth } from "convex/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeIcon, LineChartIcon, LogOutIcon, MessageSquareIcon, PenBoxIcon, UsersIcon } from "lucide-react";



function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const auth = getAuth();
    const {user}:any = AuthContext();
    const {isAuthenticated} = useConvexAuth();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };


    if (user.isLogin) {return (
        <div className="w-48">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full min-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <LogoDash />
                    </div>
                    <Links pathname={pathname} />
                    <Upgrade />

                </div>
            </div>
        </div>

    )}
}

export default LeftSidebar;


function Upgrade(){
    return (
        
            <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        
    )
}

export function Links({ pathname }: { pathname: string }){
    return (
        <>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                            pathname === "/" ? "bg-gray-100 text-gray-800" : ""
                        }`}
                        href="/"
                    >
                        <HomeIcon className="h-4 w-4" />
                        Home
                    </Link>
                    <Link
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                            pathname === "/teams" ? "bg-gray-100 text-gray-800" : ""
                        }`}
                        href="/teams"
                    >
                        <UsersIcon className="h-4 w-4" />
                        Teams
                    </Link>
                    <Link
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 ${
                            pathname === "/topics" ? "bg-gray-100 text-gray-800" : ""
                        }`}
                        href="/topics"
                    >
                        <MessageSquareIcon className="h-4 w-4" />
                        Topics
                    </Link>
                    <Link
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                            pathname === "/content" ? "bg-gray-100 text-gray-800" : ""
                        }`}
                        href="/content"
                    >
                        <PenBoxIcon className="h-4 w-4" />
                        Content
                    </Link>
                    <Link
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                            pathname === "/analytics" ? "bg-gray-100 text-gray-800" : ""
                        }`}
                        href="/analytics"
                    >
                        <LineChartIcon className="h-4 w-4" />
                        Analytics
                    </Link>
                </nav>
            </div>
        </>
    );
}