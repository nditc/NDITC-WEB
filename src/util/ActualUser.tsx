"use client";

import { useAuthContext } from "@/app/club/Components/Layout/AuthContextProvider";
import Error from "@/app/club/Components/Error";
import { CgSpinner } from "react-icons/cg";

const ActualUser = ({ passedUID }: { passedUID: string }) => {
  const uid = useAuthContext().userAuth?.uid;
  const loading = useAuthContext().loading;

  if (passedUID != uid) {
    return (
      <>
        {loading ? (
          <div className="grid h-screen w-full place-items-center">
            <CgSpinner className="mx-auto h-16 w-16 animate-spin text-primary" />
          </div>
        ) : (
          <Error statusCode={403} msg="Unauthorized User" dest={"/"} />
        )}
      </>
    );
  }
};

export default ActualUser;
