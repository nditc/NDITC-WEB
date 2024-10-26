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
  updateUserData: Function;
}>({
  userData: null,
  userDataLoading: false,
  dataError: false,
  updateUserData: () => {},
});

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

  const [forceReload, setForceReload] = useState<number>(0);

  const updateUserData = () => {
    setForceReload(Math.random());
  };

  useEffect(() => {
    if (Route.includes("club")) {
      setCanLoadData(true);
    } else {
      setUserDataLoading(false);
      setDataError(true);
    }
  }, [Route]);

  useEffect(() => {
    if (canLoadData) {
      auth.currentUser?.reload();

      if (userAuth && userAuth.emailVerified) {
        const docRef = doc(db, "participants", userAuth.uid);

        getDoc(doc(db, "participants", userAuth.uid))
          .then((docs) => {
            if (!docs.data()?.verified) {
              updateDoc(docRef, { verified: true })
                .then(() => {
                  location.reload();
                })
                .catch(() => {
                  setDataError(true);
                  setUserDataLoading(false);
                });
            } else {
              setUserData(docs.data());
              setUserDataLoading(false);
            }
          })
          .catch((err) => {
            setDataError(true);
            setUserDataLoading(false);
          });
      } else if (userAuth && !userAuth?.emailVerified) {
        setUserData(null);
        setUserDataLoading(false);
      } else if (!loading) {
        setUserData(null);
        setUserDataLoading(false);
      }
    }
  }, [userAuth, loading, canLoadData, forceReload]);

  return (
    <context.Provider
      value={{ userData, userDataLoading, dataError, updateUserData }}
    >
      {children}
    </context.Provider>
  );
};

export const useUserDataContext = () => useContext(context);
