"use client"
import NavBar from "@/components/shared/navbar/topbar";
import LeftSidebar from "@/components/shared/navbar/leftnav";
import { useConvexAuth } from "convex/react";


export default function Home() {
  const {isAuthenticated} = useConvexAuth();
  if (!isAuthenticated) return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between ">
      Home
      </main>
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
      <header className="bg-gray-800 py-4 px-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Home Dashboard</h1>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Create New Team
          </button>
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Teams</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">Team 1</h3>
                <p className="text-gray-600">Description of Team 1</p>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">Team 2</h3>
                <p className="text-gray-600">Description of Team 2</p>
              </div>
            </li>
            {/* Add more team cards here */}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Recent Topics</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">Topic 1</h3>
                <p className="text-gray-600">Description of Topic 1</p>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">Topic 2</h3>
                <p className="text-gray-600">Description of Topic 2</p>
              </div>
            </li>
            {/* Add more topic cards here */}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Recent Contents</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">Content 1</h3>
                <p className="text-gray-600">Description of Content 1</p>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h3 className="text-lg font-bold">Content 2</h3>
                <p className="text-gray-600">Description of Content 2</p>
              </div>
            </li>
            {/* Add more content cards here */}
          </ul>
        </section>
      </main>
    </div>
  );
}

