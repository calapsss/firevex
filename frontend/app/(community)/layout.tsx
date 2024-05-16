import "../globals.css";
import { Inter } from "next/font/google";
import React from "react";
import ConvexClientProvider from "../../providers/ConvexClientProvider";
import AuthProvider from '../../providers/AuthProvider';
import { Toaster } from "../../components/ui/toaster";
import Image from "next/image";
import Logo from "@/components/shared/logo/logo";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
          <body className={inter.className}>
            
            <AuthProvider>
              <ConvexClientProvider>
  
   
              <main className="max-h-screen justify-center">
                  <section className = "main-container">
                    <div className="mt-4 w-full items-center justify-center text-center">
                      <Logo />
                    </div>
                    {children}
                  </section>
                  
              </main>
              <Toaster />
              </ConvexClientProvider>
              
            
            </AuthProvider>
            
        </body>
      </html>
      
    );
  }
  