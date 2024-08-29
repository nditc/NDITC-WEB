"use client";

import { auth, db } from "@/config/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const context = createContext<{
  userData: any | null | undefined;
  userDataLoading: boolean;
  dataError: boolean;
}>({ userData: null, userDataLoading: false, dataError: false });

export const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userAuth, loading] = useAuthState(auth);

  const [userData, setUserData] = useState<any | undefined>(null);
  const [userDataLoading, setUserDataLoading] = useState<boolean>(true);
  const [dataError, setDataError] = useState<boolean>(false);

  const Route = usePathname();

  const [canLoadData, setCanLoadData] = useState(false);

  useEffect(() => {
    if (Route.includes("club")) {
      setCanLoadData(true);
    }
  }, [Route]);

  useEffect(() => {
    if (canLoadData) {
      auth.currentUser?.reload();

      if (userAuth && userAuth.emailVerified) {
        const docRef = doc(db, "participants", userAuth.uid);

        updateDoc(docRef, { verified: true })
          .then(() => {
            getDoc(doc(db, "participants", userAuth.uid))
              .then((docs) => {
                setUserData(docs.data());
                setUserDataLoading(false);
              })
              .catch((err) => {
                setDataError(true);
                setUserDataLoading(false);
              });
          })
          .catch((err) => {
            setDataError(true);
            setUserDataLoading(false);
          });
      } else if (userAuth && !userAuth?.emailVerified) {
        setUserData(null);
      } else if (!loading) {
        setUserData(null);
      }
    }
  }, [userAuth, loading]);

  return (
    <context.Provider value={{ userData, userDataLoading, dataError }}>
      {children}
    </context.Provider>
  );
};

export const useUserDataContext = () => useContext(context);
