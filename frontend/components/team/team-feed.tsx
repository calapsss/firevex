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
import { Ellipsis, EllipsisIcon, UsersRound } from "lucide-react";
import { start } from "repl";
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

    const [pages, setPages] = useState(teams);


    const [currentTeams, setCurrentTeam] = useState(teams);
    const [popItems, setPopItems] = useState(teams);
   

    function handleLoadLess(){
        if (currentTeams.length > 3) {  
            const poppedItems = currentTeams.slice(-3)
            const remainingItems = currentTeams.slice(0,-3)
            setPopItems([...popItems, ...poppedItems]);
            setCurrentTeam(remainingItems);
        }
    }

    function handleLoadMore(){
        if (status === "CanLoadMore" && popItems.length === 0) {
            loadMore(3);
        }    
        if (popItems.length >= 3 ){
            setCurrentTeam([...currentTeams, ...popItems.slice(-3)]);
            setPopItems(popItems.slice(0, -3));
        } else if (popItems.length > 0) {
            setCurrentTeam([...currentTeams, ...popItems]);
            setPopItems([]);
        }
    }
    console.log(popItems, currentTeams)

    useEffect(() => {
        setCurrentTeam(teams);
    }, [teams]);

    return( 
        <>
        
            <Teams teams={currentTeams} />
            <div className="flex flex-row gap-3 justify-center items-center">
                
                <Button className="mt-4" variant="link" size="sm" onClick={() => handleLoadLess()}>Less Items<EllipsisIcon className="ml-2 w-4" /> </Button>
                <Button className="mt-4" variant="link" size="sm" onClick={() => handleLoadMore()}>More Items <EllipsisIcon className="ml-2 w-4" /> </Button>
            </div>
            
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