import { useConvex, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TeamFeed from '@/components/team/team-feed';
import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useEffect, useState } from 'react';
import { Team } from '@/convex/functions/teams';
import {Button } from "@/components/ui/button";
import { ConvexHttpClient } from "convex/browser";
import { TeamTable } from '@/components/team/team-table';
import TopicFeed from "@/components/topics/topic-feed";
import {Separator} from "@/components/ui/separator";


export default async function Page({ params }: { params: { id: string } }) {
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const team = await client.query(api.functions.teams.get, {
        teamId: params.id as Id<"teams">,
    });

    if (team) return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
            <TopicFeed feedMode="team" teamId={params.id as Id<"teams">} />
          </section>
          <Separator />
          <section className="mb-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-2">Team Roster</h2>
              <Button> Invite Member</Button>              
            </div>

            <TeamTable teamId={params.id} />
            
          </section>
        </div>
      </div>
    );
  }
  