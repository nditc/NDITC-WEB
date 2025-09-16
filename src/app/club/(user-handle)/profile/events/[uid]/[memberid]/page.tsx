"use client";

import Error from "@/app/club/Components/Error";
import EventList from "@/app/club/Components/Events/EventList";
import { useAuthContext } from "@/app/_context/AuthContextProvider";
import { useUserDataContext } from "@/app/_context/UserDataProvider";
import { useState, useEffect } from "react";
import Loading from "@/app/club/Components/Loading";
import { useRouter } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";

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

  const [ongoingList, setOngoingList] = useState<any>([]);
  const [eventsList, setEventsList] = useState<any>([]);

  const Router = useRouter();

  useEffect(() => {
    if (!loading && !userDataLoading) {
      getEvents(memberidval, uidVal || "", userData?.ndc_roll || "")
        .then((r) => r.json())
        .then((resp) => {
          setIsLoading(false);
          setOngoingList(resp.ongoingList || []);
          setEventsList(resp.eventList || []);

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

  const noEvents =
    !isLoading &&
    isError === "" &&
    (ongoingList?.length === 0 && eventsList?.length === 0);

  return (
    <main className="min-h-screen w-full bg-[#F6F6F6]">
      {isError !== "" && <Error statusCode={501} msg={isError} dest="/club" />}
      {isLoading && <Loading />}
      {!isLoading && isError === "" && (
        <div className="container">
          {ongoingList.length !== 0 && (
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

          {eventsList.length !== 0 ? (
            <EventList eventList={eventsList} />
          ) : null}

          {noEvents && (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
              <PiSmileySad className="text-6xl mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold">No events available</h2>
              <p className="mt-2 text-gray-400">Please check back later.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Page;
