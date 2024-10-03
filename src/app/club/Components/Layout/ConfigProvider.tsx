"use client";

import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const context = createContext<{
  rank_visible: boolean;
  regStatus: boolean;
  configError: any;
}>({
  rank_visible: false,
  regStatus: false,
  configError: null,
});

export const ConfigContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const Route = usePathname();

  const [rankVisible, setRankVisible] = useState(false);
  const [regStatus, setRegStatus] = useState(false);

  const [canLoadData, setCanLoadData] = useState(false);
  const [gotData, setGotData] = useState(false);

  const [configError, setConfigError] = useState(null);

  useEffect(() => {
    if (Route.includes("club")) {
      setCanLoadData(true);
    }
  }, [Route]);

  useEffect(() => {
    if (canLoadData && !gotData) {
      getDoc(doc(db, "config", "config"))
        .then((data) => {
          setRankVisible(data.data()?.rank_visible);
          setRegStatus(data.data()?.registration_status);
        })
        .catch((err) => setConfigError(err));
    }
  }, [canLoadData, gotData]);

  return (
    <context.Provider
      value={{
        rank_visible: rankVisible,
        regStatus: regStatus,
        configError: configError,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useConfigContext = () => useContext(context);
