"use client"
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
import type {Topic} from "@/convex/functions/topic"
import {
    Eye
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useState } from "react"

interface Props {
  topic: Topic,
}


export default function TopicCard({topic} : Props){

    if(topic != null) return (
        <>
            <Card className="w-full">
                <CardHeader className="flex">
                    <CardTitle>{topic.name}</CardTitle>
                    <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={topic.creator?.avatarUrl || "/assets/avatar/avatar.png"} alt="@gitit" />
                        <AvatarFallback>GG</AvatarFallback>
                    </Avatar>
                    <CardDescription>by @{topic.creator?.username }</CardDescription>
                    </div>   
                </CardHeader>
                <CardContent>
                 <CardDescription className="text-md">{topic.description}</CardDescription>   
                </CardContent>
                <CardFooter>
                    <div>
                        <Button> <Eye /> View </Button>
                    </div>
                </CardFooter>
            </Card>
        
        </>
    )


}