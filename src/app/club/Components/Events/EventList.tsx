import React from "react";
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
            date={e.date}
            endDate={e.enddate}
            ongoingForParticipate={participate || false}
            image={e.imageURL}
            desc={e.description}
            id={e.id}
            key={i}
            category={e.category}
          />
        );
      })}
    </div>
  );
};

export default EventList;
