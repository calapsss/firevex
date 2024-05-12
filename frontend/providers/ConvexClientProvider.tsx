"use client";
import { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import {useAuthFromFirebase} from "./useAuthFromProvider"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConvexProviderWithAuth client={convex} useAuth={useAuthFromFirebase}>{children}</ConvexProviderWithAuth>;
  
}