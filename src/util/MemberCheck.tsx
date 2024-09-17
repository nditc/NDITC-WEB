"use client";

import { useUserDataContext } from "@/app/club/Components/Layout/UserDataProvider";
import { auth, db } from "@/config/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const getConnectToNDITC = async (ndc_id: string, email: string) => {
  const res = await fetch("/api/createaccountndc", {
    method: "POST",
    body: JSON.stringify({ ndc_id: ndc_id, email: email }),
  });

  return res;
};

const MemberCheck = ({
  urlMemberID,
  noDeepMemberCheck,
}: {
  urlMemberID: string;
  noDeepMemberCheck?: boolean;
}) => {
  const { userData, userDataLoading, dataError } = useUserDataContext();
  const [userAuth, loading, error] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (userData?.ndc_id != "none" && !noDeepMemberCheck) {
      getConnectToNDITC(userData?.ndc_id, userAuth?.email || "").catch(() => {
        toast.error("You are not a member of NDITC!");
        updateDoc(doc(db, "participants", `${userAuth?.uid}`), {
          ndc_id: "",
        }).then(() => router.push("/"));
      });
    }
  }, []);

  useEffect(() => {
    if (
      urlMemberID != "none" &&
      userAuth &&
      !loading &&
      urlMemberID != userData?.ndc_id
    ) {
      router.push("/");
    }
  }, [userAuth, loading]);

  return <div />;
};

export default MemberCheck;
