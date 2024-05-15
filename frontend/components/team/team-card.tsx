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
import type {Team} from "@/convex/functions/teams.ts"
import {
    Eye
} from "lucide-react"

interface Props {
  team: Team,
}


export default function TeamCard({team} : Props){
    return (
        <>
            <Card className="w-full">
                <CardHeader className="grid grid-flow-row-dense grid-cols-5">
                    <div className="col-span-4">
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>by @{team.creator.username}</CardDescription>
                
                    </div>
                    
                    <Button classname="text-xs"> <Eye /> View </Button>
            
                    
                </CardHeader>
                
            </Card>
        
        </>
    )


}