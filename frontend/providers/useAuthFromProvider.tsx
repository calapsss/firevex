import { auth } from "../services/firebase";
import {useCallback, useEffect, useMemo, useState} from 'react';


export function useAuthFromFirebase() {
    const [isAuthenticated, setIsAuthenticated] = useState<undefined | boolean>(
      undefined,
    );
  
    useEffect(() => {
      const subscription = auth.onAuthStateChanged(user => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
      return subscription;
    }, []);
  
    const fetchAccessToken = useCallback(
      async ({forceRefreshToken}: {forceRefreshToken: boolean}) => {
        const idToken = await auth.currentUser?.getIdToken(forceRefreshToken);
        return idToken ?? null;
      },
      [],
    );
    return useMemo(
      () => ({
        isLoading: isAuthenticated == null ? true : false,
        isAuthenticated: isAuthenticated ?? false,
        fetchAccessToken,
      }),
      [isAuthenticated, fetchAccessToken],
    );
  }
