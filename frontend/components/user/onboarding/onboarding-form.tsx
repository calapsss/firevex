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
import { useQuery, useMutation } from "convex/react"
import { useRouter } from "next/navigation";
import { isBase64Image } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { AuthContext } from "@/providers/AuthProvider";
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
  Username: z.string().min(3).max(20),
  FirstName: z.string().min(3).max(20),
  LastName: z.string().min(3).max(20),
  AvatarURL: z.string().url(),
  Role: z.enum(["Teacher", "Student"]),
  Bio: z.string().max(200).optional(),
})

interface Props {
  user: {
      user_id: string,
      email: string,
  };
}

const defaultAvatar = "/assets/avatar/avatar.png";
export default function OnboardingForm({user} : Props) {
    const [isLoading, setIsLoading] = useState(false);
    //console.log("Form", user);
    const router = useRouter();
    const createUser = useMutation(api.functions.users.createUser);
   
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          Username: "",
          FirstName: "",
          LastName: "",
          AvatarURL: defaultAvatar,
          Role: "Student",
          Bio: "",
      },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      

        try {
          setIsLoading(true);
          
          const avatarUrl = await handleAvatarUpload(values.AvatarURL, user.user_id);
          
          const userCreated = await createUser({
            data: {
                UserID: user.user_id, //uid from props
                Username: values.Username,
                FirstName: values.FirstName,
                LastName: values.LastName,
                Email: user.email, //Email from props
                Role: values.Role,
                Onboarded: false,
                Bio: values.Bio,
                AvatarURL:  avatarUrl as string,
              }
              });
          
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
                name="AvatarURL"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-center gap-3">
                    <FormLabel className='flex flex-col mt-5'>
                        {field.value ? (
                        <Avatar className="w-full h-auto">
                          <AvatarImage src={field.value} alt="@gitit" />
                          <AvatarFallback>GG</AvatarFallback>
                        </Avatar>
                        ) : (
                        <Avatar  className="w-full h-auto">
                          <AvatarImage src={"/assets/avatar/avatar.png"} alt="@gitit" />
                          <AvatarFallback>GG</AvatarFallback>
                        </Avatar>
                        )}
                    </FormLabel>
                    <FormControl className='text-base-semibold text-gray-200 w-full'>
                        <>
                        
                          <Input
                          type='file'
                          accept='image/*'
                          placeholder='Add profile photo'
                          className='text-xs'
                          onChange={(e) => handleImage(e, field.onChange)}
                          />
                          <FormMessage />
                        </>
                    </FormControl>
                    
                    </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="Username"
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
                name="FirstName"
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
                name="LastName"
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
                name="Role"
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
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                    </SelectContent>
                  </Select>
  
                  <FormMessage />
                </FormItem>
                )}
              />
              

              <FormField
                control={form.control}
                name="Bio"
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