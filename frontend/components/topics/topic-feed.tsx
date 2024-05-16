"use client"
import {  PaginatedQueryArgs,
    PaginatedQueryReference,
    useConvex,
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
import TopicForm from "@/components/topics/forms/create-topic";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BookOpenTextIcon, Ellipsis, EllipsisIcon, PencilIcon, UsersRound } from "lucide-react";
import { start } from "repl";
import useUserConvexData from "@/hooks/useUserConvexData";
import { Id } from "@/convex/_generated/dataModel";
type feedMode = "user" | "all" | "team";

interface Props {
  feedMode: feedMode
  teamId?: Id<"teams">
} 

export default function TopicFeed({feedMode, teamId } : Props){
    //Atleast ignore for now fix later

    // if (feedMode === "user" && userTeams )return (
    //     <Topics topics={userTeams} />
    // );
   const convexUser = useUserConvexData();
    const [currentUser, setUser] = useState<Id<"users"> | null>(null);

    useEffect(() => {
        convexUser.then((user) => {
              // Code to run when the convexUser promise is fulfilled
           
              if(user?._id){
                setUser(user._id)
          }
           
        });
  }, [convexUser, currentUser]);

    if (feedMode === "all" && currentUser !== null) return (
        <>
            <PaginatedView query={api.functions.topics.getUserTopics as PaginatedQueryReference} args={{userId: currentUser}}/>
        </>
    )

    if (feedMode === "team" && currentUser !== null && teamId) return (
        <>
            <PaginatedView query={api.functions.topics.getTeamTopics as PaginatedQueryReference} args={{teamId: teamId}}/>
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
            {props.topics.map((topic: Topic) => (
                <TopicCard key={topic._id} topic={topic}/> 
            ))}
            
            <DialogTrigger className="h-full min-h-56 rounded-lg border bg-card text-card-foreground shadow-sm w-full items-center text-center hover:bg-gray-200">
                <div className="text-lg font-semibold flex items-center justify-center h-full hover:font-bold">
                
                <BookOpenTextIcon /> Create a Topic
                
                </div>
            </DialogTrigger>
            
        </ul>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a Topic</DialogTitle>
                <DialogDescription>Start a topic by adding the details</DialogDescription>
            </DialogHeader>
            <TopicForm formAction="create-topic"/>
        </DialogContent>
        </Dialog>
    )
}