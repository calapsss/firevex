"use client"
import NavBar from "@/components/shared/navbar/topbar";
import LeftSidebar from "@/components/shared/navbar/leftnav";
import { useConvexAuth } from "convex/react";

import Head from 'next/head';
import TeamFeed from "@/components/team/team-feed";
import TopicFeed from "@/components/topics/topic-feed"
import RippleLoader from "@/components/animations/ripple"


export default function Home() {
  const {isAuthenticated, isLoading} = useConvexAuth();

  if (isLoading) return (
    <>
    <div className="fixed w-full mt-24 flex min-h-screen flex-col items-center justify-between ">
      <RippleLoader />
    </div>
      
    </>
    
  )

  if (!isAuthenticated) return (
    <>
      <div className="fixed w-full mt-24 flex min-h-screen flex-col items-center justify-between ">
      <LandingPage/>
      </div>
    </>

  );
  if(isAuthenticated) return (
    <>
      <HomeDashboard />
    </>
  )
}



function HomeDashboard() {
  return (
    <div className="h-screen flex flex-col">
   
      <div className="flex-1 p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Teams</h2>
          <TeamFeed feedMode="all" />
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Recent Topics</h2>
          <TopicFeed feedMode="all" />
        </section>
        
      </div>
    </div>
  );
}


function LandingPage() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>RapidAI.dev - Speed up your AI SaaS development</title>
      </Head>
      <header className="bg-gray-800 py-4 px-6">
        <h1 className="text-3xl font-bold text-white">RapidAI.dev</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Get started with AI SaaS development in minutes</h2>
          <p className="text-gray-600">RapidAI.dev provides a free basic SaaS starter with all the features you need to get started. Upgrade to our Pro version to unlock AI-powered features.</p>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Join the Waitlist
          </button>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">What you get with RapidAI.dev</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Basic SaaS Starter</h4>
                <p className="text-gray-600">Get started with a free basic SaaS starter that includes all the essential features.</p>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">AI-Powered Features</h4>
                <p className="text-gray-600">Upgrade to our Pro version to unlock AI-powered features that will take your SaaS to the next level.</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Join the Waitlist</h2>
          <p className="text-gray-600">Be the first to know when RapidAI.dev is available. Join our waitlist and get early access to our Pro version.</p>
          <form>
            <input type="email" placeholder="Enter your email address" className="bg-white shadow-md p-4 rounded w-full" />
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Join the Waitlist
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}