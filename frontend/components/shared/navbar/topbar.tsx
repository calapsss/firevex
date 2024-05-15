"use client"
import Link from "next/link";
import gititLogo, { LogoDash } from "../logo/logo"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
    
import { AuthContext } from "@/providers/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Logo from "../logo/logo";
import { useConvexAuth } from "convex/react";
import useUserConvexData from "@/hooks/useUserConvexData";
import { useEffect, useState } from "react";
import { Package2Icon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function NavBar(){
    const auth = getAuth();
    const [avatar, setAvatar] = useState("/assets/avatar/avatar.png");
    const {isAuthenticated} = useConvexAuth();
    const convexUser = useUserConvexData();

    const router = useRouter();
    const logout = async () => {
        try {
          signOut(auth)
        } catch (error) {
          
        } finally {
          router.push("/")

        }
      };
      console.log("convexUser", convexUser )
      useEffect(() => {
            convexUser.then((user) => {
                  // Code to run when the convexUser promise is fulfilled
                  if (!user && isAuthenticated){
                        router.push("/onboarding")
                  }
                  if(user?.avatarUrl){
                        setAvatar(user.avatarUrl)
                  }
            });
      }, [convexUser, isAuthenticated]);
     

    
if(!isAuthenticated) return ( <>
      <div className="navbar ">
            <nav className="navbar-container">
                 <div className="md:pb-2 w-full mt-2 pb-2">
                      <LogoDash />
                 </div>
                 <div className="ml-auto max-md:pt-4 items-center">
                      {
                        !isAuthenticated &&(
                            <>
                                <Button className="primary-button max-md:h-8">
                                      <Link href="/sign-in" >
                                            Sign In
                                      </Link>
                                </Button>
                            </>
                        )
                      }
                      {isAuthenticated && (
                            <>
                                 <Button className="primary-button max-md:h-8" onClick={logout}>
                                            Sign Out
                                 </Button>
                            </>
                      )}
                 </div>

            </nav>
      </div>
 </>)

if (isAuthenticated) return (
      <>
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input className="pl-8 bg-white dark:bg-gray-950" placeholder="Search..." type="search" />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src={avatar}
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </>
)
}