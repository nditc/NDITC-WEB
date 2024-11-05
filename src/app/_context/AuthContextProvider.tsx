"use client";

import { auth } from "@/config/firebase";
import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const context = createContext<{
  userAuth: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}>({ userAuth: null, loading: false, error: undefined });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userAuth, loading, error] = useAuthState(auth);
  return (
    <context.Provider value={{ userAuth, loading, error }}>
      {children}
    </context.Provider>
  );
};

export const useAuthContext = () => useContext(context);
