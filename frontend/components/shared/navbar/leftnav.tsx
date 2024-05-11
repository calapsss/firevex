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



function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const auth = getAuth();
    const {user}:any = AuthContext();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };


    if (user.isLogin) {return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive =
                    (pathname?.includes(link.route) && link.route.length > 1) ||
                    pathname === link.route ;
                    
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link  ${isActive && "bg-primary text-white text-light-1 font-bold"} text-gray-700`}
                            >
                            <Image
                                src={isActive ? link.imgURL.replace(".svg", "-white.svg") : link.imgURL}
                                alt = {link.label}
                                width = {24}
                                height = {24}
                            /> 
                            <p className = " max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    )}
                )}
            </div>

            <div className="mt-10 px-6">
                
                        <div className="flex cursor-pointer gap-4 p-4" onClick={logout}>
                            <Image
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />
                            <p className="text-gray-300 max-lg:hidden"> Logout </p>
                        </div>
                
            </div>
        </section>

    )}
}

export default LeftSidebar;