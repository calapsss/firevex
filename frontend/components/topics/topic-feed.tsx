"use client"
import {  PaginatedQueryArgs,
    PaginatedQueryReference,
    usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api"
import { Topic } from "@/convex/functions/topics";
import TopicCard from "./topic-card";
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
import TeamForm from "@/components/team/forms/create-team";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Ellipsis, EllipsisIcon, UsersRound } from "lucide-react";
import { start } from "repl";
type feedMode = "user" | "all";

interface Props {
  feedMode: feedMode
} 

export default function TopicFeed({feedMode } : Props){
    //Atleast ignore for now fix later

    // if (feedMode === "user" && userTeams )return (
    //     <Topics topics={userTeams} />
    // );

    if (feedMode === "all") return (
        <>
            <PaginatedView query={api.functions.topics.all as PaginatedQueryReference} args={{}}/>
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
        results: topics,
        status,
        loadMore,
    } = usePaginatedQuery(query, args, { initialNumItems: 3 });

    const [pages, setPages] = useState(topics);


    const [currentTopics, setCurrentTopic] = useState(topics);
    const [popItems, setPopItems] = useState(topics);
   

    function handleLoadLess(){
        if (currentTopics.length > 3) {  
            const poppedItems = currentTopics.slice(-3)
            const remainingItems = currentTopics.slice(0,-3)
            setPopItems([...popItems, ...poppedItems]);
            setCurrentTopic(remainingItems);
        }
    }

    function handleLoadMore(){
        if (status === "CanLoadMore" && popItems.length === 0) {
            loadMore(3);
        }    
        if (popItems.length >= 3 ){
            setCurrentTopic([...currentTopics, ...popItems.slice(-3)]);
            setPopItems(popItems.slice(0, -3));
        } else if (popItems.length > 0) {
            setCurrentTopic([...currentTopics, ...popItems]);
            setPopItems([]);
        }
    }
    console.log(popItems, currentTopics)

    useEffect(() => {
        setCurrentTopic(topics);
    }, [topics]);

    return( 
        <>
        
            <Topics topics={currentTopics} />
            <div className="flex flex-row gap-3 justify-center items-center">
                
                <Button className="mt-4" variant="outline" size="sm" onClick={() => handleLoadLess()}>Load Less <EllipsisIcon className="ml-2 w-4" /> </Button>
                <Button className="mt-4" variant="outline" size="sm" onClick={() => handleLoadMore()}>Load More <EllipsisIcon className="ml-2 w-4" /> </Button>
            </div>
            
        </>
        
       ) ;
}



function Topics(props: {topics: Topic[]}){
    return (
        <Dialog>
        <ul className=" max-h-1/3 gap-3 md:grid md:grid-cols-4 ">
            {props.topics.map((team: Topic) => (
                <TopicCard key={team._id} topic={team}/> 
            ))}
            
            <DialogTrigger className="h-full min-h-56 rounded-lg border bg-card text-card-foreground shadow-sm w-full items-center text-center hover:bg-gray-200">
                <div className="text-lg font-semibold flex items-center justify-center h-full hover:font-bold">
                
                <UsersRound /> Create a Topic
                
                </div>
            </DialogTrigger>
            
        </ul>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a Topic</DialogTitle>
                <DialogDescription>Start your team by adding the details</DialogDescription>
            </DialogHeader>
            <TeamForm formAction="create-team"/>
        </DialogContent>
        </Dialog>
    )
}