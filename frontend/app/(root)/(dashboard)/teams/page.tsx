"use client";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EditProfile from "@/components/user/edit/profile-edit-card";
import TeamForm from '@/components/team/forms/create-team';
import TeamCard from '../../../../components/team/team-card';

import Head from 'next/head';

export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    const teams = useQuery(api.functions.teams.userTeams);

    console.log(teams)
    console.log(userConvex);
    if (userConvex != null && teams != null) return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" >
            {/* <TeamForm formAction="create-team"/>
            <div className="flex flex-col gap-4">
                {
                    teams.map((team) => {
                        return (
                            <TeamCard team={team} />
                        )
                    })
                }
            </div> */}
            <TeamsDashboard />
        </div>
    );
}


function TeamsDashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Teams Dashboard</title>
      </Head>
      <main className="flex-1 overflow-y-auto p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Team Overview</h2>
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-bold">Team Name</h3>
            <p className="text-gray-600">Team Description</p>
            <ul className="flex flex-wrap -mx-4">
              <li className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white shadow-md p-4 rounded">
                  <h4 className="text-lg font-bold">Members</h4>
                  <ul>
                    <li>Member 1</li>
                    <li>Member 2</li>
                    {/* Add more members here */}
                  </ul>
                </div>
              </li>
              <li className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white shadow-md p-4 rounded">
                  <h4 className="text-lg font-bold">Topics</h4>
                  <ul>
                    <li>Topic 1</li>
                    <li>Topic 2</li>
                    {/* Add more topics here */}
                  </ul>
                </div>
              </li>
              <li className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white shadow-md p-4 rounded">
                  <h4 className="text-lg font-bold">Contents</h4>
                  <ul>
                    <li>Content 1</li>
                    <li>Content 2</li>
                    {/* Add more contents here */}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Team Activity</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Recent Updates</h4>
                <ul>
                  <li>Update 1</li>
                  <li>Update 2</li>
                  {/* Add more updates here */}
                </ul>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Upcoming Events</h4>
                <ul>
                  <li>Event 1</li>
                  <li>Event 2</li>
                  {/* Add more events here */}
                </ul>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
