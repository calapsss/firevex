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


const formSchema = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(500),
  visibility: z.string().min(3)
})

type formAction = "create-team" | "edit-team";

interface TeamForm {
  formAction: formAction,
  teamId?:  Id<"teams"> }

export default function TeamForm({formAction, teamId} : TeamForm) {
    const [isLoading, setIsLoading] = useState(false);
    const createTeam = useMutation(api.functions.teams.create);
    const updateTeam = useMutation(api.functions.teams.update);
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "Your Team",
          description: "Add your team's description",
          visibility: "public"
      },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {      
        try {
          setIsLoading(true);
          if (formAction == "create-team") {
            await createTeam({
                  name: values.name,
                  description: values.description,
                  visibility: values.visibility
            });
            setIsLoading(false)
            toast({
              title: `Congrats on your new Team`,
              description: `We have successfully added ${values.name} to your teams`
            })
          }

          if (formAction == "edit-team" && teamId) {
            await updateTeam({
                teamId: teamId,
                name: values.name, 
                description: values.description,
                visibility: values.visibility
            });
            setIsLoading(false)
            toast({
              title: `We have updated your team! `,
              description: `We have successfully updated your team: ${values.name}`
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

    return(
      <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2 ">
                    <FormLabel >Team Name</FormLabel>
                    <FormControl>
                      <Input className="max-w-sm"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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

              <FormField
                control={form.control}
                name="visibility"
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
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
  
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