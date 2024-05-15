"use client";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EditProfile from "@/components/user/edit/profile-edit-card";
import TeamForm from '@/components/team/forms/create-team';
import TeamCard from '../../../../components/team/team-card';

export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    const teams = useQuery(api.functions.teams.userTeams);

    console.log(teams)
    console.log(userConvex);
    if (userConvex != null && teams != null) return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" >
            <TeamForm formAction="create-team"/>
            <div className="flex flex-col gap-4">
                {
                    teams.map((team) => {
                        return (
                            <TeamCard team={team} />
                        )
                    })
                }
            </div>
        </div>
    );
}
