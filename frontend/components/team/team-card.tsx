"use client"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Button
} from "@/components/ui/button"
import type {Team} from "@/convex/functions/teams"
import {
    Eye
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useState } from "react"
interface Props {
  team: Team,
}


export default function TeamCard({team} : Props){

    if(team != null) return (
        <>
            <Card className="w-full flex flex-col justify-between">
                <CardHeader className="flex">
                    <CardTitle>{team.name}</CardTitle>
                    <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={team.creator?.avatarUrl || "/assets/avatar/avatar.png"} alt="@gitit" />
                        <AvatarFallback>GG</AvatarFallback>
                    </Avatar>
                    <CardDescription>by @{team.creator?.username }</CardDescription>
                    </div>   
                </CardHeader>
                <CardContent>
                 <CardDescription className="text-md">{team.description}</CardDescription>   
                </CardContent>
                <CardFooter>
                    <Link href={`/teams/${team._id}`}>
                        <Button> <Eye /> View </Button>
                    </Link>
                </CardFooter>
            </Card>
        
        </>
    )


}