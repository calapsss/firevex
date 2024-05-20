"use client"
import {
    Button
} from  "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from '@/convex/_generated/dataModel';
import {
    TrashIcon,
    Wrench
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import MemberSettings from "./member-settings"


export function TeamTable({teamId} : {teamId: string}) {
    const teamRoster = useQuery(api.functions.members.getTeamMembers, {teamId: teamId as Id<"teams">})
    const kickMember = useMutation(api.functions.members.deleteMember)
    console.log(teamRoster)
    if (teamRoster ) return (
       <>
        

      <Table>
        <TableCaption>The Team Roster</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamRoster.map((member) => (
            <TableRow key={member._id}>
              <TableCell className="font-medium</TableRow>">{`${member.user?.firstName} ${member.user?.lastName}`}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>@{member.user?.username}</TableCell>
              <TableCell className="text-right">
                <div className="flex flex-row gap-3 justify-end">
                    <MemberSettings member={member} />
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="text-xs" variant="outline"> <TrashIcon className="w-4 h-4" />  </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <h2 className="text-lg font-bold">Kick Member</h2>
                        </DialogHeader>
                          <p>Are you sure you want to kick {member.user?.firstName} {member.user?.lastName} from the team?</p>
                          <Button onClick={async () => await kickMember({
                            userId: member.user?._id as Id<"users">,
                            teamId: teamId as Id<"teams">
                          })}>Yes</Button>
                      </DialogContent>
                    </Dialog>
                </div>        
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Members</TableCell>
            <TableCell className="text-right">{teamRoster.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </>
    )
  }
  