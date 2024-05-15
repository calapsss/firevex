import { useConvexAuth } from "convex/react";
import { useEffect, useState} from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id} from "@/convex/_generated/dataModel";
import  { AuthContext } from "@/providers/AuthProvider";


export default function useStoreUserEffect() {
    const { isAuthenticated } = useConvexAuth();
    const { user } : any = AuthContext();  
    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const storeUser = useMutation(api.users.createUser);


    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        async function createUser(){
            const id = await storeUser();
            setUserId(id);
        }
        createUser();
        return () => setUserId(null);
    }, [isAuthenticated, storeUser]
    )

    return userId;

}