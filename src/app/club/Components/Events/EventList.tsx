import { Timestamp } from "firebase/firestore";
import EventCard from "./EventCard";

const EventList = ({
  eventList,
  participate,
}: {
  eventList: any[];
  participate?: boolean;
}) => {
  return (
    <div className="grid justify-between gap-5 grid-fluid-fill-[290px] lg:grid-fluid-fill-[550px]">
      {eventList.map((e, i) => {
        return (
          <EventCard
            title={e.eventName}
            date={new Timestamp(e.date?._seconds, e.date?._nanoseconds)}
            endDate={
              new Timestamp(e.enddate?._seconds, e.enddate?._nanoseconds)
            }
            ongoingForParticipate={participate || false}
            image={e.imageURL}
            desc={e.description}
            id={e.id}
            key={i}
            category={e.category}
            participated={e.participated}
          />
        );
      })}
    </div>
  );
};

export default EventList;
