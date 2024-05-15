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


const formSchema = z.object({
  username: z.string().min(3).max(20).refine(value => !/\s/.test(value), {
    message: "Username must not contain spaces"
  }),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  avatarUrl: z.string(),
  role: z.string(),
  bio: z.string().max(200).optional(),
})
const defaultAvatar = "/assets/avatar/avatar.png";

type formAction = "onboarding" | "edit-profile";

interface ProfileForm {
  formAction: formAction,
}

export default function ProfileForm({formAction} : ProfileForm) {
    const [isLoading, setIsLoading] = useState(false);
    const userConvex = useQuery(api.functions.users.getUser);
    const createUser = useMutation(api.functions.users.createUser);
    const updateUser = useMutation(api.functions.users.updateUser);
    
    const { user } : any = AuthContext();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          username: userConvex?.username ||  "",
          firstName: userConvex?.firstName || "",
          lastName: userConvex?.lastName ||  "",
          avatarUrl: userConvex?.avatarUrl || defaultAvatar,
          role: userConvex?.role ||  "Student",
          bio: userConvex?.bio || "",
      },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {      
        try {
          setIsLoading(true);
          const avatarUrl = await handleAvatarUpload(values.avatarUrl, user.user.uid);
          if (formAction == "onboarding") {
            await createUser({
              data: {
                  username: values.username,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: user.user.email, //Email from props
                  role: values.role,
                  onboarded: true,
                  bio: values.bio,
                  avatarUrl:  avatarUrl as string,
                }
            });
            setIsLoading(false)
            toast({
              title: `Welcome ${values.firstName}`,
              description: "We have successfully onboarded you"
            })
          }

          if (formAction == "edit-profile") {
            await updateUser({
              data: {
                  username: values.username,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: user.user.email, //Email from props
                  role: values.role,
                  onboarded: true,
                  bio: values.bio,
                  avatarUrl:  avatarUrl as string,
                }
            });
            setIsLoading(false)
            toast({
              title: `We have updated  @${values.username}`,
              description: "We have successfully updated your profile"
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
    
    const handleImage = (
      e: ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
    ) => {
      //
      e.preventDefault();
      const reader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        //setFiles(Array.from(e.target.files));

        if (!file.type.includes("image") || file.type === "image/svg+xml") {
          alert("Invalid file. Please select an image file.");
          return;
        }

        reader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          fieldChange(imageDataUrl);
        };

        reader.readAsDataURL(file);
      }

    };

    return(
      <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-5 pr-5 pl-5">
            <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center gap-3">
                    
                    <FormControl className='text-base-semibold text-gray-200 w-full'>
                        <div className="flex flex-row items-center gap-2">
                        <div className='flex flex-col mt-5'>
                            {field.value ? (
                            <Avatar className="w-20 h-20">
                              <AvatarImage src={field.value} alt="@gitit" />
                              <AvatarFallback>GG</AvatarFallback>
                            </Avatar>
                            ) : (
                            <Avatar  className="w-20 h-20">
                              <AvatarImage src={"/assets/avatar/avatar.png"} alt="@gitit" />
                              <AvatarFallback>GG</AvatarFallback>
                            </Avatar>
                            )}
                        </div>
                          <Input
                          type='file'
                          accept='image/*'
                          placeholder='Add profile photo'
                          className='text-xs items-center mt-2'
                          onChange={(e) => handleImage(e, field.onChange)}
                          />
                          <FormMessage />
                        </div>
                    </FormControl>
                    
                    </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2 ">
                    <FormLabel >Username</FormLabel>
                    <FormControl>
                      <Input className="max-w-sm"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:flex-row flex flex-col md:space-x-4 space-y-2 md:space-y-0">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel >First Name</FormLabel>
                    <FormControl>
                      <Input className="max-w-sm"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Last Name</FormLabel>
                    <FormControl>
                      <Input className="max-w-sm"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                </div>
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Creator">Creator</SelectItem>
                    </SelectContent>
                  </Select>
  
                  <FormMessage />
                </FormItem>
                )}
              />
              

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel >Bio</FormLabel>
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