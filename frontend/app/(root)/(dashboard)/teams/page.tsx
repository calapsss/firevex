"use client";
import { useConvex, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TeamFeed from '@/components/team/team-feed';
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useState } from 'react';
import { Team } from '@/convex/functions/teams';

export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    const teams = useQuery(api.functions.teams.userTeams);
    console.log(teams)
    console.log(userConvex);
    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    // const currentTeam = searchParams.get("team");


    if (userConvex != null && teams != null ) return (
      <main className="flex-1 p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Teams</h2>
          <TeamFeed feedMode="all" />
        </section>    
      </main>
    );


}

