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
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from '@/convex/_generated/dataModel';
import {
    TrashIcon,
    Wrench
} from "lucide-react"


export function TeamTable({teamId} : {teamId: string}) {
    const teamRoster = useQuery(api.functions.members.getTeamMembers, {teamId: teamId as Id<"teams">})
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
                    <Button size="sm" className="text-xs" variant="outline"> <Wrench className="w-4 h-4" />  </Button>
                    <Button size="sm" className="text-xs" variant="outline"> <TrashIcon className="w-4 h-4" />  </Button>
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
  