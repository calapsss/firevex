

// import {
//     Card
// } from "@/components/ui/card"
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
//   } from "@/components/ui/avatar"
// import { auth } from "@/services/firebase"
// import { Button } from "@/components/ui/button"
// import {
//     CalendarIcon,
//     PersonIcon,
//     ImageIcon
// } from "@radix-ui/react-icons"

// import { useQuery } from "convex/react"
// import { api } from "@/convex/_generated/api"
// import Link from "next/link"
// import CommunityCardSkeleton from "@/components/skeletons/community-card-skeleton"
// import { Id } from "@/convex/_generated/dataModel"

// export default function CommunityCard({ communityId }: { communityId: string }){
//     const getConvexUser = useQuery(api.functions.users.getUser, {userId: auth.currentUser?.uid});
//     const getCommunity = useQuery(api.functions.communities.getCommunityById, {communityId: communityId});
//     const getCommunityMemberCount = useQuery(api.functions.community_members.getCommunityMemberCount, {community_id: communityId});
//     const getEventCount = useQuery(api.functions.events.getCommunityEvents, {communityId: communityId});
//     const getAuthorInfo = useQuery(api.functions.users.getUserById, {userId: getCommunity?.created_by as Id<"users">});
//     const isLoading = !getCommunity;
//     const isCommunityMember = useQuery(api.functions.community_members.getCommunityMemberId, {community_id: communityId, user_id: getConvexUser?._id});


//     if (isLoading) {
//         return (
//             <>
//                 <CommunityCardSkeleton />
//             </>
//         )
//     }

//     const cardInfo = {
//         name: getCommunity?.name,
//         author: getAuthorInfo?.username,
//         eventNumber: getEventCount?.length  ,
//         memberNumber: getCommunityMemberCount ,
//         postNumber: "Many",
//         logo: getCommunity?.logo_url ||"https://gitit-eta.vercel.app/assets/avatar/avatar.png"
//     }

//     return (
//         <>
//             <Card className="max-w-3xl p-3">
//                 <div className="flex items-center px-4 py-3">
//                     <Avatar className="w-16 h-16">
//                         <AvatarImage src={cardInfo.logo} alt="@gitit" />
//                         <AvatarFallback>Community LOGO</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-3 ">
//                         <span className="text-xl font-semibold antialiased block leading-tight">{cardInfo.name}</span>
//                         <span className="text-gray-600 text-md block">created by @{cardInfo.author}</span>
//                     </div>
//                 </div>
//                 <div className="flex items-center justify-between px-4 w-full ">
//                     <div className="flex items-center gap-2 w-full">
//                         <p className=" max-md:text-sm text-md flex flex-row hover:text-primary">
//                             <span className="pr-2"><PersonIcon className="w-6 h-6"/></span>
//                             <span>{cardInfo.memberNumber}</span>
//                             <span className="pl-1 max-md:hidden">members</span>
//                         </p>
//                         <p className=" text-md flex flex-row hover:text-primary">
//                             <span className="pr-2"><CalendarIcon className="w-6 h-6"/></span>
//                             <span>{cardInfo.eventNumber}</span>
//                             <span className="pl-1 max-md:hidden">events</span>
//                         </p>
//                         <p className=" text-md flex flex-row hover:text-primary">
//                             <span className="pr-2"><ImageIcon className="w-6 h-6"/></span>
//                             <span>{cardInfo.postNumber}</span>
//                             <span className="pl-1 max-md:hidden">photos</span>
//                         </p>
//                     </div>
//                     <div>
//                         <Link href={`/${getCommunity?.slug}`}>
//                         {isCommunityMember && <Button className="px-4 py-2 rounded-md">More Details</Button>}
//                         {!isCommunityMember && <Button className="px-8 py-2 rounded-md">Join</Button>}
//                         </Link>
//                     </div>
//                 </div>
//             </Card>
        
//         </>
//     )



// }