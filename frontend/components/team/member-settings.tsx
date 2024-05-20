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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { set, z } from "zod"
  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import {
    TrashIcon,
    Wrench
} from "lucide-react"
import { TeamMembers } from "@/convex/functions/members"

import { toast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog"
const formSchema = z.object({
    role: z.string().min(3).max(20),
    })

export default function MemberSettings({member} : {member: TeamMembers}){
    
    const updateMember = useMutation(api.functions.members.updateRole)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "Member"
        },
      })
 
      const onSubmit = async (values: z.infer<typeof formSchema>) => {      
        try {
            const response = await updateMember({
            userId: member.userId,
            teamId: member.teamId,
            role: values.role
            })
            console.log(response)
            toast({
                title: `We have saved your updates! `,
                description: `Updated ${member.user?.firstName} ${member.user?.lastName} to ${values.role} `,
              })
        }
        catch (error) {
            console.error(error)
        }
    }
  

     return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="text-xs" variant="outline"> <Wrench className="w-4 h-4" /> </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Member Settings</DialogTitle>
                    <DialogDescription>Change the role of this member</DialogDescription>
                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
                                    <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                <FormItem>
                                <FormLabel>Visibility</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Visibility" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                
                                <FormMessage />
                                </FormItem>
                                )}
                            />
                        <DialogClose>

                        
                        <Button type="submit">Save</Button>
                        </DialogClose>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )

}
