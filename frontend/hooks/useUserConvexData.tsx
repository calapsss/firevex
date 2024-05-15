"use client"
import { useState, useEffect } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useQuery, useConvex } from 'convex/react';
import {api} from '@/convex/_generated/api';
import { set } from 'react-hook-form';

const useUserConvexData = async () => {
  const convex = useConvex();
  const userData = await convex.query(api.functions.users.getUser);
  
    console.log("Userdata", userData)
    return userData;
};

export default useUserConvexData;