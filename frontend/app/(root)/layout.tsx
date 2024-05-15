import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
import AuthProvider from '@/providers/AuthProvider';
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import NavBar from "@/components/shared/navbar/topbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <NavBar />
          {children}
          <Toaster />
        </ConvexClientProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
