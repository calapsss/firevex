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
import type {Topic} from "@/convex/functions/topics"
import {
    Eye
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useState } from "react"

interface Props {
  topic: Topic,
}


export default function TopicCard({topic} : Props){
    console.log(topic)
    if(topic != null) return (
        <>
            <Card className="w-full flex flex-col justify-between">
                <CardHeader className="flex">
                    <CardTitle>{topic.name}</CardTitle>
                    <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={topic.user?.avatarUrl || "/assets/avatar/avatar.png"} alt="@gitit" />
                        <AvatarFallback>GG</AvatarFallback>
                    </Avatar>
                    <CardDescription>by @{topic.user?.username } in {topic.team?.name}</CardDescription>
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