import React, { useEffect } from "react";
import EventList from "../../features/events/EventList";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/events/eventApi";

const EventView = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(({ events }) => events);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <div>
      <EventList />
    </div>
  );
};

export default EventView;