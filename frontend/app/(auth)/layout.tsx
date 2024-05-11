import "../globals.css";
import { Inter } from "next/font/google";
import React from "react";
import ConvexClientProvider from "../../providers/ConvexClientProvider";
import AuthProvider from '../../providers/AuthProvider';
import { Toaster } from "../../components/ui/toaster";
import Image from "next/image";


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
                    <div className="mt-20 w-full items-center">
                      <p className="text-4xl font-bold text-primary items-center text-center">
                        quantaIQ
                      </p>
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
  