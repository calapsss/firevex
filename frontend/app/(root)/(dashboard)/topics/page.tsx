"use client";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EditProfile from "@/components/user/edit/profile-edit-card";

export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    console.log(userConvex);
    if (userConvex != null) return (
        <main>
            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
  <div className="flex justify-between mb-4">
    <h1 className="text-3xl font-bold">Topic Dashboard</h1>
    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
      Create New Topic
    </button>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-lg font-bold">Total Topics</h2>
      <p className="text-3xl font-bold">XXX</p>
    </div>
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-lg font-bold">Total Teams</h2>
      <p className="text-3xl font-bold">XXX</p>
    </div>
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-lg font-bold">Total Members</h2>
      <p className="text-3xl font-bold">XXX</p>
    </div>
  </div>

  <div className="mt-4">
    <h2 className="text-lg font-bold">Recent Topics</h2>
    <ul className="list-none mb-4">
      <li className="py-2 border-b border-gray-200">
        <a href="#" className="text-blue-600 hover:text-blue-900">
          Topic Name
        </a>
        <p className="text-gray-600 text-sm">Topic Description</p>
        <p className="text-gray-600 text-sm">Created by Username on Date</p>
      </li>
      <li className="py-2 border-b border-gray-200">
        <a href="#" className="text-blue-600 hover:text-blue-900">
          Topic Name
        </a>
        <p className="text-gray-600 text-sm">Topic Description</p>
        <p className="text-gray-600 text-sm">Created by Username on Date</p>
      </li>
    </ul>
  </div>

  <div className="mt-4">
    <h2 className="text-lg font-bold">Top Contributors</h2>
    <ul className="list-none mb-4">
      <li className="py-2 border-b border-gray-200">
        <a href="#" className="text-blue-600 hover:text-blue-900">
          Username
        </a>
        <p className="text-gray-600 text-sm">Bio</p>
        <p className="text-gray-600 text-sm">Contributed X topics</p>
      </li>
      <li className="py-2 border-b border-gray-200">
        <a href="#" className="text-blue-600 hover:text-blue-900">
          Username
        </a>
        <p className="text-gray-600 text-sm">Bio</p>
        <p className="text-gray-600 text-sm">Contributed X topics</p>
      </li>
    </ul>
  </div>
</div>

        </main>
    );
}
