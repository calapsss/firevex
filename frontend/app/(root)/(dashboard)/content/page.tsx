"use client";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EditProfile from "@/components/user/edit/profile-edit-card";

export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    console.log(userConvex);
    if (userConvex != null) return (
        <div >
            <ContentDashboard />
        </div>
    );
}

import Head from 'next/head';

function ContentDashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Content Dashboard</title>
      </Head>
      <main className="flex-1 overflow-y-auto p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Content Overview</h2>
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-bold">Content Title</h3>
            <p className="text-gray-600">Content Description</p>
            <ul className="flex flex-wrap -mx-4">
              <li className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white shadow-md p-4 rounded">
                  <h4 className="text-lg font-bold">Tags</h4>
                  <ul>
                    <li>Tag 1</li>
                    <li>Tag 2</li>
                    {/* Add more tags here */}
                  </ul>
                </div>
              </li>
              <li className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white shadow-md p-4 rounded">
                  <h4 className="text-lg font-bold">Attachments</h4>
                  <ul>
                    <li>Attachment 1</li>
                    <li>Attachment 2</li>
                    {/* Add more attachments here */}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Content Activity</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Recent Views</h4>
                <ul>
                  <li>View 1</li>
                  <li>View 2</li>
                  {/* Add more views here */}
                </ul>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Recent Comments</h4>
                <ul>
                  <li>Comment 1</li>
                  <li>Comment 2</li>
                  {/* Add more comments here */}
                </ul>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
