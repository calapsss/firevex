"use client"
import {  PaginatedQueryArgs,
    PaginatedQueryReference,
    usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api"
import { Team } from "@/convex/functions/teams";
import TeamCard from "./team-card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import {
    Card
  } from "@/components/ui/card"
import TeamForm from "./forms/create-team";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UsersRound } from "lucide-react";
type feedMode = "user" | "all";

interface Props {
  feedMode: feedMode
} 

export default function TeamFeed({feedMode } : Props){
    const userTeams = useQuery(api.functions.teams.userTeams)
    //Atleast ignore for now fix later

    if (feedMode === "user" && userTeams )return (
        <Teams teams={userTeams} />
    );

    if (feedMode === "all") return (
        <>
            <PaginatedView query={api.functions.teams.all as PaginatedQueryReference} args={{}}/>
        </>
    )
}








export function PaginatedView<Query extends PaginatedQueryReference>({
    query,
    args,
}: {
    query: Query;
    args: PaginatedQueryArgs<Query>;
}) {
    const {
        results: teams,
        status,
        loadMore,
    } = usePaginatedQuery(query, args, { initialNumItems: 3 });
    const [init, setInit] = useState(false)
    const [pages, setPages] = useState(teams);
    const [currentTeams, setCurrentTeam] = useState(teams);
    const itemsPerPage = 3;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(2);
    useEffect(() => {
        if(!init){
            setCurrentTeam(teams);
            if(teams.length > 0 ){
            setInit(true);}
        }
       
    }, [teams]);
    
    console.log("indices", startIndex, endIndex)
    console.log(currentTeams)
    console.log(teams)

    useEffect(() => {
        setCurrentTeam(teams.slice(startIndex, endIndex));
    }, [startIndex, endIndex])

    return( 
        <>
            <Teams teams={currentTeams} />
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className={
                                startIndex === 0 ?  "pointer-events-none opacity-50" : undefined
                            }
                            onClick={() => {
                                setEndIndex(startIndex);
                                setStartIndex(startIndex - itemsPerPage);
                            }} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            className={
                                startIndex === 100 ?  "pointer-events-none opacity-50" : undefined
                            }
                            onClick={ () => {
                             
                                if(status === "CanLoadMore"){
                                     loadMore(6)
                                }
                                setStartIndex(endIndex);
                                setEndIndex(startIndex + itemsPerPage);
                                
                                
                                
                            }} />
                    </PaginationItem>
                            

                </PaginationContent>
            </Pagination>
            
        </>
        
       ) ;
}



function Teams(props: {teams: Team[]}){
    return (
        <Dialog>
        <ul className=" max-h-1/3 gap-3 md:grid md:grid-cols-4 ">
            {props.teams.map((team: Team) => (
                <TeamCard key={team._id} team={team}/> 
            ))}
            
            <DialogTrigger className="h-full min-h-56 rounded-lg border bg-card text-card-foreground shadow-sm w-full items-center text-center hover:bg-gray-200">
                <div className="text-lg font-semibold flex items-center justify-center h-full hover:font-bold">
                
                <UsersRound /> Create a Team
                
                </div>
            </DialogTrigger>
            
        </ul>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a Team</DialogTitle>
                <DialogDescription>Start your team by adding the details</DialogDescription>
            </DialogHeader>
            <TeamForm formAction="create-team"/>
        </DialogContent>
        </Dialog>
    )
}