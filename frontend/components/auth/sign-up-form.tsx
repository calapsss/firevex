'use client';

import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {auth} from '@/services/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignInForm() {
  const { toast } = useToast();
  const [isResetOpen, setIsResetOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const signup = async ({ email, password }: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user.user);
      router.push("/verify");
      
      toast({
        title: "Signed Up!",
        description: `Welcome to quantaIQ, ${user.user.email}!`,
      })
    } catch (error) {
      
      toast({
        title: "Error Signing Up",
        description: `${error}`,
      });
    } finally {
      
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="hover:bg-secondary hover:text-black">
            Sign Up
          </Button>
        </form>
      </Form>
 
      
     
      
    </>
  );
};