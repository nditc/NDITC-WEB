"use client";

import Error from "@/app/club/Components/Error";
import EventList from "@/app/club/Components/Events/EventList";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
import { useUserDataContext } from "@/app/_context/UserDataProvider";
import { useState, useEffect } from "react";
import Loading from "@/app/club/Components/Loading";
import { useRouter } from "next/navigation";

const getEvents = async (ndc_id: string, uid: string, ndc_roll: string) => {
  const res = await fetch("/api/getevents", {
    method: "POST",
    body: JSON.stringify({
      ndc_id: ndc_id,
      uid: uid,
      ndc_roll,
    }),
    cache: "no-store",
  });

  return res;
};

export const dynamic = "force-dynamic";

const Page = ({ params }: { params: { uid: string; memberid: string } }) => {
  const { userData, userDataLoading, dataError } = useUserDataContext();

  const { userAuth, loading, error } = useAuthContext();

  const uidVal = userAuth?.uid;
  const memberidval = userData?.ndc_id;

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState("");

  const [ongoingList, setOngoingList] = useState<any>(null);
  const [eventsList, setEventsList] = useState<any>(null);
  const Router = useRouter();
  useEffect(() => {
    if (!loading && !userDataLoading) {
      getEvents(memberidval, uidVal || "", userData?.ndc_roll || "")
        .then((r) => r.json())
        .then((resp) => {
          setIsLoading(false);

          setOngoingList(resp.ongoingList);

          setEventsList(resp.eventList);

          if (resp.error) {
            setIsLoading(false);
            setIsError(resp.error || "Error Occurred");
          }
        });
    }

    if (error || dataError) {
      setIsLoading(false);
      setIsError("Error Occurred");
    }

    if (!loading && !userDataLoading && (!userData || !userAuth)) {
      Router.push("/club/events/");
    }
  }, [userAuth, userData, loading, userDataLoading, error, dataError]);

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      {isError != "" && <Error statusCode={999} msg={isError} dest="/club" />}
      {isLoading && <Loading />}
      {!isLoading && isError == "" && (
        <div className="container py-[81px]">
          {ongoingList.length != 0 && (
            <div>
              <h1 className="container my-8 text-5xl">
                <span className="text-primary">ONGOING</span> EVENTS
              </h1>

              <EventList eventList={ongoingList} participate />
            </div>
          )}

          <h1 className="container my-8 text-5xl">
            <span className="text-primary">ALL</span> EVENTS
          </h1>

          <EventList eventList={eventsList} />
        </div>
      )}
    </main>
  );
};

export default Page;
