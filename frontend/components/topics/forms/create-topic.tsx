"use client"
import React, { useEffect } from "react"
import { useState, ChangeEvent } from "react";
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation, useConvexAuth } from "convex/react"
import { useRouter } from "next/navigation";
import { isBase64Image } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import  { AuthContext } from "@/providers/AuthProvider";
import { on } from "events";
import { toast } from "@/components/ui/use-toast";
import {handleAvatarUpload} from "@/lib/actions/user.aws.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Id } from "@/convex/_generated/dataModel"
import { Team } from "@/convex/functions/teams";
import { UserTeams } from "@/convex/functions/members";


const formSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(500),
  teamId: z.string()
  //Deal with tags later
})

type formAction = "create-topic" | "edit-topic";

interface TopicForm {
  formAction: formAction,
  topicId?: Id<"topics">,
  teamId?:  Id<"teams"> }

export default function TopicForm({formAction, teamId, topicId} : TopicForm) {
    const [isLoading, setIsLoading] = useState(false);
    const createTopic = useMutation(api.functions.topics.create);
    const updateTopic = useMutation(api.functions.topics.update);
    const userTeams = useQuery(api.functions.members.getUserTeams);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
                name: "Your Team",
                description: "Add your team's description",
                teamId: "Select Team"
            },
    });
    console.log("User Teams", userTeams);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {      
        try {
          setIsLoading(true);
          if (formAction == "create-topic" && teamId) {
            await createTopic({
                  name: values.name,
                  description: values.description,
                  teamId: values.teamId as Id<"teams">
            });
            setIsLoading(false)
            toast({
              title: `Congrats on your new topic`,
              description: `We have successfully added ${values.name} to your topics`
            })
          }

          if (formAction == "edit-topic"  && topicId) {
            await updateTopic({
                topicId: topicId,
                data: {                
                    name: values.name, 
                    description: values.description,
                }
                
            });
            setIsLoading(false)
            toast({
              title: `We have updated your topic! `,
              description: `We have successfully updated your topic: ${values.name}`
            })
          }
          
          
        } catch (error: any) {
          const regex = /Uncaught Error:\s*(.*)/;
          const matches = error.message.match(regex);
          
          toast({
            title: "Uh Oh! Error creating user",
            description: matches ? matches[1] : error.message,
            variant: "destructive"
          })

        }
        


     
    };

    if (userTeams?.length ?? 0 > 0) return(
      <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2 ">
                    <FormLabel >Topic Name</FormLabel>
                    <FormControl>
                      <Input className="max-w-sm"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                        control = {form.control}
                        name="teamId"
                        render = {({field}) => (
                            <>
                                <FormLabel>
                                    Team
                                </FormLabel>
                                <Select onValueChange={async (value) => {
                                        form.setValue("teamId", value);
                                    }} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an Event" />
                                            <SelectContent className="bg-white">
                                              {userTeams?.map((team: UserTeams) => (                
                                                    <SelectItem key={team.teamId as string} value={team.teamId as string}>
                                                        {team.team?.name as string}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                            </>

                            )}
                    />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel >Description</FormLabel>
                    <FormControl>
                      <Textarea className="max-w-sm"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              

              
              <Button type="submit" >Submit</Button>
            </form>
          </Form>
          </>
    )
}