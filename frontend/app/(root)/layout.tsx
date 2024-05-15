import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
import AuthProvider from '@/providers/AuthProvider';
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import NavBar from "@/components/shared/navbar/topbar";
import { Toaster } from "@/components/ui/toaster";
import LeftSidebar from "@/components/shared/navbar/leftnav";

export const metadata: Metadata = {
  title: "Rapid AI",
  description: "Ship your AI App in a day",
};

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
          <div className="grid min-h-screen w-full lg:grid-cols-[180px_1fr]">
            <LeftSidebar />
            <div className="flex flex-col min-h-screen ">
              <NavBar />
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
              {children}
              </main>
              
            </div>
          </div>
          <Toaster />
        </ConvexClientProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
