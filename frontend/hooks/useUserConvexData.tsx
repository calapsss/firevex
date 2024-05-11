"use client"
import { useState, useEffect } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useQuery } from 'convex/react';
import {api} from '@/convex/_generated/api';
import { set } from 'react-hook-form';

const useUserConvexData = () => {
  const {user}:any = AuthContext();
  const [user_ID,  setUser_ID] = useState("notset");
  const userId = user.user?.uid; // Accessing the user's ID, assuming it's in `uid`
  useEffect(() => {
    setUser_ID(userId);
  }, [userId]);
  
  
  const userData = useQuery(api.functions.users.getUser, { userId: user_ID });
   
  return userData;
};

export default useUserConvexData;
