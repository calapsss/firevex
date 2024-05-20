"use client"
import { api } from "@/convex/_generated/api"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useMutation, useQuery } from "convex/react"

import { Button } from "@/components/ui/button"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"

export default function InviteCode(
    {teamId}:{teamId: string}
){
    const [idle, setIdle] = useState(true)
    const [inviteCode, setInviteCode] = useState<string>("")
    const createInvite = useMutation(api.functions.invites.create)

    async function handleInvite(){
        const code =  await createInvite({
            teamId: teamId as Id<"teams">
        })
        setInviteCode(code)
        setIdle(false)
    }


    return (
        <Dialog>
            <DialogTrigger  asChild>
                <Button> Invite Member</Button>   
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite Member</DialogTitle>
                    <DialogDescription>Invite a member to your team by sharing this code or link</DialogDescription>
                </DialogHeader>
                {idle &&
                <div className="flex flex-col items-center">
                    <Button className="mt-4" onClick={handleInvite} >Create Code</Button>
                </div>
                }
                {
                    !idle && 
                    <div className="flex flex-col items-center">
                        <div>
                            <p className="text-2xl font-bold">{inviteCode}</p>
                        </div>
                        <Button className="mt-4" onClick={
                            () => {
                                navigator.clipboard.writeText(inviteCode);
                            }
                        }>
                            Copy
                        </Button>
                    </div>
                }
            </DialogContent>
        </Dialog>           
    )
}